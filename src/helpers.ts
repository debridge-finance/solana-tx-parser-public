import { utils } from "@coral-xyz/anchor";
import {
	AccountMeta,
	CompiledInstruction,
	LoadedAddresses,
	Message,
	MessageCompiledInstruction,
	PartiallyDecodedInstruction,
	PublicKey,
	TransactionInstruction,
	VersionedMessage,
	VersionedTransactionResponse,
} from "@solana/web3.js";

import { ProgramLogContext } from "./interfaces";

export function hexToBuffer(data: string) {
	const rawHex = data.startsWith("0x") ? data.slice(2) : data;

	return Buffer.from(rawHex);
}

/**
 * Parse transaction message and extract account metas
 * @param message transaction message
 * @returns parsed accounts metas
 */
export function parseTransactionAccounts<T extends Message | VersionedMessage>(
	message: T,
	loadedAddresses: T extends VersionedMessage ? LoadedAddresses | undefined : undefined = undefined,
): AccountMeta[] {
	const accounts: PublicKey[] = message.version === "legacy" ? message.accountKeys : message.staticAccountKeys;
	const readonlySignedAccountsCount = message.header.numReadonlySignedAccounts;
	const readonlyUnsignedAccountsCount = message.header.numReadonlyUnsignedAccounts;
	const requiredSignaturesAccountsCount = message.header.numRequiredSignatures;
	const totalAccounts = accounts.length;
	let parsedAccounts: AccountMeta[] = accounts.map((account, idx) => {
		const isWritable =
			idx < requiredSignaturesAccountsCount - readonlySignedAccountsCount ||
			(idx >= requiredSignaturesAccountsCount && idx < totalAccounts - readonlyUnsignedAccountsCount);

		return {
			isSigner: idx < requiredSignaturesAccountsCount,
			isWritable,
			pubkey: new PublicKey(account),
		} as AccountMeta;
	});
	const [ALTWritable, ALTReadOnly] =
		message.version === "legacy" ? [[], []] : loadedAddresses ? [loadedAddresses.writable, loadedAddresses.readonly] : [[], []]; // message.getAccountKeys({ accountKeysFromLookups: loadedAddresses }).keySegments().slice(1); // omit static keys
	if (ALTWritable) parsedAccounts = [...parsedAccounts, ...ALTWritable.map((pubkey) => ({ isSigner: false, isWritable: true, pubkey }))];
	if (ALTReadOnly) parsedAccounts = [...parsedAccounts, ...ALTReadOnly.map((pubkey) => ({ isSigner: false, isWritable: false, pubkey }))];

	return parsedAccounts;
}

/**
 * Converts compiled instruction into common TransactionInstruction
 * @param compiledInstruction
 * @param parsedAccounts account meta, result of {@link parseTransactionAccounts}
 * @returns TransactionInstruction
 */
export function compiledInstructionToInstruction<Ix extends CompiledInstruction | MessageCompiledInstruction>(
	compiledInstruction: Ix,
	parsedAccounts: AccountMeta[],
): TransactionInstruction {
	if (typeof compiledInstruction.data === "string") {
		const ci = compiledInstruction as CompiledInstruction;

		return new TransactionInstruction({
			data: utils.bytes.bs58.decode(ci.data),
			programId: parsedAccounts[ci.programIdIndex].pubkey,
			keys: ci.accounts.map((accountIdx) => parsedAccounts[accountIdx]),
		});
	} else {
		const ci = compiledInstruction as MessageCompiledInstruction;

		return new TransactionInstruction({
			data: Buffer.from(ci.data),
			programId: parsedAccounts[ci.programIdIndex].pubkey,
			keys: ci.accountKeyIndexes.map((accountIndex) => {
				if (accountIndex >= parsedAccounts.length)
					throw new Error(
						`Trying to resolve account at index ${accountIndex} while parsedAccounts is only ${parsedAccounts.length}. \
						Looks like you're trying to parse versioned transaction, make sure that LoadedAddresses are passed to the \
						parseTransactionAccounts function`,
					);

				return parsedAccounts[accountIndex];
			}),
		});
	}
}

function parsedAccountsToMeta(accounts: PublicKey[], accountMeta: AccountMeta[]): AccountMeta[] {
	const meta = accountMeta.map((m) => ({ pk: m.pubkey.toString(), ...m }));

	return accounts.map((account) => {
		const encoded = account.toString();
		const found = meta.find((item) => item.pk === encoded);
		if (!found) throw new Error(`Account ${encoded} not present in account meta!`);

		return found;
	});
}

export function parsedInstructionToInstruction(parsedInstruction: PartiallyDecodedInstruction, accountMeta: AccountMeta[]): TransactionInstruction {
	return new TransactionInstruction({
		data: utils.bytes.bs58.decode(parsedInstruction.data),
		programId: parsedInstruction.programId,
		keys: parsedAccountsToMeta(parsedInstruction.accounts, accountMeta),
	});
}

/**
 * Converts transaction response with CPI into artifical transaction that contains all instructions from tx and CPI
 * @param transaction transactionResponse to convert from
 * @returns Transaction object
 */
export function flattenTransactionResponse(transaction: VersionedTransactionResponse): TransactionInstruction[] {
	const result: TransactionInstruction[] = [];
	if (transaction === null || transaction === undefined) return [];
	const txInstructions = transaction.transaction.message.compiledInstructions;
	const accountsMeta = parseTransactionAccounts(transaction.transaction.message, transaction.meta?.loadedAddresses);
	const orderedCII = (transaction?.meta?.innerInstructions || []).sort((a, b) => a.index - b.index);
	const totalCalls =
		(transaction.meta?.innerInstructions || []).reduce((accumulator, cii) => accumulator + cii.instructions.length, 0) + txInstructions.length;
	let lastPushedIx = -1;
	let callIndex = -1;
	for (const CII of orderedCII) {
		// push original instructions until we meet CPI
		while (lastPushedIx !== CII.index) {
			lastPushedIx += 1;
			callIndex += 1;
			result.push(compiledInstructionToInstruction(txInstructions[lastPushedIx], accountsMeta));
		}
		for (const CIIEntry of CII.instructions) {
			result.push(compiledInstructionToInstruction(CIIEntry, accountsMeta));
			callIndex += 1;
		}
	}
	while (callIndex < totalCalls - 1) {
		lastPushedIx += 1;
		callIndex += 1;
		result.push(compiledInstructionToInstruction(txInstructions[lastPushedIx], accountsMeta));
	}

	return result;
}

/**
 * @private
 */
function newLogContext(programId: string, depth: number, id: number, instructionIndex: number): ProgramLogContext {
	return {
		logMessages: [],
		dataLogs: [],
		rawLogs: [],
		errors: [],
		programId,
		depth,
		id,
		instructionIndex,
	};
}

function generateLogsParsingRegex() {
	const knownMsgs = [
		"{}'s writable privilege escalated",
		"{}'s signer privilege escalated",
		"Unknown program {}",
		"Account {} is not executable",
		"Unable to deserialize config account: {}",
		"account {} is not in account list",
		"account {} signer_key().is_none()",
		"account[{}].signer_key() does not match Config data)",
		"account {} is not in stored signer list",
		"account[0].signer_key().is_none()",
		"new config contains duplicate keys",
		"too few signers: {}; expected: {}",
		"instruction data too large",
		"Checking if destination stake is mergeable",
		"Checking if source stake is mergeable",
		"Merging stake accounts",
		"expected uninitialized stake account owner to be {}, not {}",
		"expected uninitialized stake account data len to be {}, not {}",
		"expected uninitialized stake account to be uninitialized",
		"expected vote account owner to be {}, not {}",
		"stake is not active",
		"redelegating to the same vote account not permitted",
		"invalid stake account data",
		"Unable to merge due to metadata mismatch",
		"Unable to merge due to voter mismatch",
		"Unable to merge due to stake deactivation",
		"invalid proof data",
		"proof verification failed: {}",
		"proof_verification failed: {}",
		"CloseContextState",
		"VerifyZeroBalance",
		"VerifyWithdraw",
		"VerifyCiphertextCiphertextEquality",
		"VerifyTransfer",
		"VerifyTransferWithFee",
		"VerifyPubkeyValidity",
		"VerifyRangeProof",
		"VerifyBatchedRangeProof64",
		"VerifyBatchedRangeProof128",
		"VerifyBatchedRangeProof256",
		"VerifyCiphertextCommitmentEquality",
		"VerifyGroupedCiphertext2HandlesValidity",
		"VerifyBatchedGroupedCiphertext2HandlesValidity",
		"VerifyFeeSigma",
		"VerifyGroupedCiphertext3HandlesValidity",
		"VerifyBatchedGroupedCiphertext3HandlesValidity",
		"Create: address {} does not match derived address {}",
		"Allocate: 'to' account {} must sign",
		"Allocate: account {} already in use",
		"Allocate: requested {}, max allowed {}",
		"Assign: account {} must sign",
		"Create Account: account {} already in use",
		"Transfer: `from` must not carry data",
		"Transfer: insufficient lamports {}, need {}",
		"Transfer: `from` account {} must sign",
		"Transfer: 'from' account {} must sign",
		"Transfer: 'from' address {} does not match derived address {}",
		"Advance nonce account: recent blockhash list is empty",
		"Initialize nonce account: recent blockhash list is empty",
		"Advance nonce account: Account {} must be writeable",
		"Advance nonce account: Account {} must be a signer",
		"Advance nonce account: nonce can only advance once per slot",
		"Advance nonce account: Account {} state is invalid",
		"Withdraw nonce account: Account {} must be writeable",
		"Withdraw nonce account: insufficient lamports {}, need {}",
		"Withdraw nonce account: nonce can only advance once per slot",
		"Withdraw nonce account: Account {} must sign",
		"Initialize nonce account: Account {} must be writeable",
		"Initialize nonce account: insufficient lamports {}, need {}",
		"Initialize nonce account: Account {} state is invalid",
		"Authorize nonce account: Account {} must be writeable",
		"Authorize nonce account: Account {} state is invalid",
		"Authorize nonce account: Account {} must sign",
		"Failed to get runtime environment: {}",
		"Failed to register syscalls: {}",
		"Write overflow: {} &lt; {}",
		"Poseidon hashing {} sequences is not supported",
		"Overflow while calculating the compute cost",
		"{} Hashing {} sequences in one syscall is over the limit {}",
		"Invalid account info pointer `{}': {} != {}",
		"Internal error: index mismatch for account {}",
		"Account data size realloc limited to {} in inner instructions",
		"Table account must not be allocated",
		"Authority account must be a signer",
		"Payer account must be a signer",
		"{} is not a recent slot",
		"Table address must match derived address: {}",
		"Lookup table is already frozen",
		"Deactivated tables cannot be frozen",
		"Empty lookup tables cannot be frozen",
		"Deactivated tables cannot be extended",
		"Lookup table is full and cannot contain more addresses",
		"Must extend with at least one address",
		"Extended lookup table length {} would exceed max capacity of {}",
		"Lookup table is frozen",
		"Lookup table is already deactivated",
		"Lookup table cannot be the recipient of reclaimed lamports",
		"Lookup table is not deactivated",
		"Table cannot be closed until it's fully deactivated in {} blocks",
	];

	const prepareLineForRegex = (l: string) =>
		l.replaceAll("{}", ".*").replaceAll("(", "\\(").replaceAll(")", "\\)").replaceAll("]", "\\]").replaceAll("[", "\\[");

	const regexTemplate = `\
(?<logTruncated>^Log truncated$)|\
(?<programInvoke>^Program (?<invokeProgramId>[1-9A-HJ-NP-Za-km-z]{32,}) invoke \\[(?<level>\\d+)\\]$)|\
(?<programSuccessResult>^Program (?<successResultProgramId>[1-9A-HJ-NP-Za-km-z]{32,}) success$)|\
(?<programFailedResult>^Program (?<failedResultProgramId>[1-9A-HJ-NP-Za-km-z]{32,}) failed: (?<failedResultErr>.*)$)|\
(?<programCompleteFailedResult>^Program failed to complete: (?<failedCompleteError>.*)$)|\
(?<programLog>^Program log: (?<logMessage>.*)$)|\
(?<programData>^Program data: (?<data>.*)$)|\
(?<programConsumed>^Program (?<consumedProgramId>[1-9A-HJ-NP-Za-km-z]{32,}) consumed (?<consumedComputeUnits>\\d*) of (?<allComputedUnits>\\d*) compute units$)|\
(?<programReturn>^Program return: (?<returnProgramId>[1-9A-HJ-NP-Za-km-z]{32,}) (?<returnMessage>.*)$)|\
(?<errorMessage>^(${knownMsgs.map(prepareLineForRegex).join("|")})$)`;

	return new RegExp(regexTemplate, "s");
}

type ImmediateLogContext = {
	id: number;
	currentInstruction: number;
	currentDepth: number;
};

type FullLogContext = {
	immediate: ImmediateLogContext;
	callStack: string[];
	callIds: number[];
};

function programEnter(context: FullLogContext, invokedProgram: string, invokeLevel: number): ProgramLogContext {
	if (invokeLevel != context.immediate.currentDepth + 1)
		throw new Error(`invoke depth mismatch, log: ${invokeLevel}, expected: ${context.immediate.currentDepth}`);
	context.immediate.id += 1;
	context.immediate.currentDepth += 1;

	context.callStack.push(invokedProgram);
	context.callIds.push(context.immediate.id);

	return newLogContext(invokedProgram, invokeLevel, context.immediate.id, context.immediate.currentInstruction);
}

function programExit(context: FullLogContext, exitedProgram: string): number {
	const lastProgram = context.callStack.pop();
	const lastCallIndex = context.callIds.pop();
	if (lastCallIndex === undefined) throw new Error("callIds malformed");
	if (lastProgram != exitedProgram) throw new Error("[ProramExit] callstack mismatch");

	context.immediate.currentDepth -= 1;
	if (context.immediate.currentDepth === 0) {
		context.immediate.currentInstruction += 1;
	}

	return lastCallIndex;
}

/**
 * Parses transaction logs and provides additional context such as
 * - programId that generated the message
 * - call id of instruction, that generated the message
 * - call depth of instruction
 * - data messages, log messages and error messages
 * @param logs logs from TransactionResponse.meta.logs
 * @returns parsed logs with call depth and additional context
 */
export function parseLogs(logs: string[]): ProgramLogContext[] {
	const parserRe = generateLogsParsingRegex();
	const programLogs: ProgramLogContext[] = [];

	const immediate: ImmediateLogContext = {
		id: -1,
		currentInstruction: 0,
		currentDepth: 0,
	};
	const context: FullLogContext = {
		immediate,
		callStack: [],
		callIds: [],
	};

	const getCurrentCallId = (c: FullLogContext) => c.callIds[c.callIds.length - 1];
	const getCurrentProgram = (c: FullLogContext) => c.callStack[c.callStack.length - 1];

	for (const log of logs) {
		const match = parserRe.exec(log);
		if (!match || !match.groups) {
			throw new Error(`Failed to parse log line: ${log}`);
		}

		if (match.groups.programInvoke) {
			const program = match.groups.invokeProgramId;
			const level = Number(match.groups.level);
			const newProgramContext = programEnter(context, program, level);

			newProgramContext.rawLogs.push(log);
			programLogs.push(newProgramContext);
		} else if (match.groups.programSuccessResult) {
			const lastCallIndex = programExit(context, match.groups.successResultProgramId);
			programLogs[lastCallIndex].rawLogs.push(log);
		} else if (match.groups.programFailedResult) {
			const lastCallIndex = programExit(context, match.groups.failedResultProgramId);

			programLogs[lastCallIndex].rawLogs.push(log);
			programLogs[lastCallIndex].errors.push(log);
		} else if (match.groups.programCompleteFailedResult) {
			const currentCall = getCurrentCallId(context);

			programLogs[currentCall].rawLogs.push(log);
			programLogs[currentCall].errors.push(match.groups.failedCompleteError);
		} else {
			const currentCall = getCurrentCallId(context);
			programLogs[currentCall].rawLogs.push(log);

			if (match.groups.logTruncated) {
				programLogs[currentCall].invokeResult = "Log truncated";
			} else if (match.groups.programLog) {
				programLogs[currentCall].logMessages.push(match.groups.logMessage);
			} else if (match.groups.programData) {
				programLogs[currentCall].dataLogs.push(match.groups.data);
			} else if (match.groups.programConsumed) {
				programLogs[currentCall].unitsConsumed = Number(match.groups.consumedComputeUnits);
			} else if (match.groups.programReturn) {
				const returnProgram = match.groups.returnProgramId;
				if (getCurrentProgram(context) != returnProgram) throw new Error("[InvokeReturn]: callstack mismatch");
				programLogs[currentCall].invokeResult = match.groups.returnMessage;
			} else if (match.groups.errorMessage) {
				programLogs[currentCall].errors.push(log);
			}
		}
	}

	return programLogs;
}

/** Python script to extract native solana logs
 *
 # coding=utf8
# the above tag defines encoding for this document and is for Python 2.x compatibility

import re
import os

regex = r"ic_msg!\((\s|.)*?,\s*?\"(?P<log>.*?)\""

def print_logs(data):
    matches = re.finditer(regex, data)
    for m in matches:
        print(m.group('log'))

def open_files_in_directory(directory):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if '.rs' not in filename:
                continue
            file_path = os.path.join(root, filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    print(f'Opened file: {file_path}')
                    content = file.read()
                    print_logs(content)
            except Exception as e:
                print(f'Could not open file {file_path}: {e}')
        for d in dirs:
            if d == '.' or d == '..':
                continue
            open_files_in_directory(os.path.join(root, d))

if __name__ == "__main__":
    open_files_in_directory('INPUT DIR HERE')

 */
