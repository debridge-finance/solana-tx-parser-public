import { Buffer } from "buffer";

import {
	PublicKey,
	TransactionInstruction,
	SystemProgram,
	Connection,
	Message,
	AccountMeta,
	ParsedMessage,
	PartiallyDecodedInstruction,
	Finality,
	VersionedMessage,
	LoadedAddresses,
	VersionedTransaction,
	AddressLookupTableAccount,
	AccountInfo,
} from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { BorshInstructionCoder, Idl } from "@coral-xyz/anchor";

import {
	IdlAccount,
	IdlInstructionAccountItem2,
	InstructionNames,
	InstructionParserInfo,
	InstructionParsers,
	ParsedIdlArgs,
	ParsedInstruction,
	ParserFunction,
	ProgramInfoType,
	UnknownInstruction,
} from "./interfaces";
import {
	decodeSystemInstruction,
	decodeTokenInstruction,
	decodeToken2022Instruction,
	decodeAssociatedTokenInstruction,
	decodeComputeBudgetInstruction,
} from "./decoders";
import { compiledInstructionToInstruction, flattenTransactionResponse, parsedInstructionToInstruction, parseTransactionAccounts } from "./helpers";

const COMPUTE_BUDGET_PROGRAM_ID = new PublicKey("ComputeBudget111111111111111111111111111111");

function flattenIdlAccounts(accounts: IdlInstructionAccountItem2[], prefix?: string): IdlAccount[] {
	return accounts
		.map((account) => {
			const accName = account.name;
			if ("accounts" in account) {
				const newPrefix = prefix ? `${prefix}.${accName}` : accName;

				return flattenIdlAccounts(account.accounts, newPrefix);
			} else {
				return {
					...account,
					name: prefix ? `${prefix}.${accName}` : accName,
				};
			}
		})
		.flat();
}

/**
 * Class for parsing arbitrary solana transactions in various formats
 * - by txHash
 * - from raw transaction data (base64 encoded or buffer)
 * - @solana/web3.js getTransaction().message object
 * - @solana/web3.js getParsedTransaction().message or Transaction.compileMessage() object
 * - @solana/web3.js TransactionInstruction object
 */
export class SolanaParser {
	private instructionParsers: InstructionParsers;

	/**
	 * Initializes parser object
	 * `SystemProgram`, `TokenProgram` and `AssociatedTokenProgram` are supported by default
	 * but may be overriden by providing custom idl/custom parser
	 * @param programInfos list of objects which contains programId and corresponding idl
	 * @param parsers list of pairs (programId, custom parser)
	 */
	constructor(programInfos: ProgramInfoType[], parsers?: InstructionParserInfo[]) {
		const standartParsers: InstructionParserInfo[] = [
			[SystemProgram.programId.toBase58(), decodeSystemInstruction],
			[TOKEN_PROGRAM_ID.toBase58(), decodeTokenInstruction],
			[TOKEN_2022_PROGRAM_ID.toBase58(), decodeToken2022Instruction],
			[ASSOCIATED_TOKEN_PROGRAM_ID.toBase58(), decodeAssociatedTokenInstruction],
			[COMPUTE_BUDGET_PROGRAM_ID.toBase58(), decodeComputeBudgetInstruction],
		];
		let result: InstructionParsers;
		parsers = parsers || [];
		for (const programInfo of programInfos) {
			parsers.push(this.buildIdlParser(new PublicKey(programInfo.programId), programInfo.idl));
		}

		if (!parsers) {
			result = new Map(standartParsers);
		} else {
			// first set provided parsers
			result = new Map(parsers);
			// append standart parsers if parser not exist yet
			for (const parserInfo of standartParsers) {
				if (!result.has(parserInfo[0])) {
					result.set(...parserInfo);
				}
			}
		}

		this.instructionParsers = result;
	}

	/**
	 * Adds (or updates) parser for provided programId
	 * @param programId program id to add parser for
	 * @param parser parser to parse programId instructions
	 */
	addParser(programId: PublicKey, parser: ParserFunction<Idl, string>) {
		this.instructionParsers.set(programId.toBase58(), parser);
	}

	/**
	 * Adds (or updates) parser for provided programId
	 * @param programId program id to add parser for
	 * @param idl IDL that describes anchor program
	 */
	addParserFromIdl(programId: PublicKey | string, idl: Idl) {
		this.instructionParsers.set(...this.buildIdlParser(new PublicKey(programId), idl));
	}

	private buildIdlParser(programId: PublicKey, idl: Idl): InstructionParserInfo {
		const idlParser: ParserFunction<typeof idl, InstructionNames<typeof idl>> = (instruction: TransactionInstruction) => {
			const coder = new BorshInstructionCoder(idl);
			const parsedIx = coder.decode(instruction.data);
			if (!parsedIx) {
				return this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data);
			} else {
				const ix = idl.instructions.find((instr) => instr.name === parsedIx.name);
				if (!ix) {
					return this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data, parsedIx.name);
				}
				const flatIdlAccounts = flattenIdlAccounts(ix.accounts);
				const accounts = instruction.keys.map((meta, idx) => {
					if (idx < flatIdlAccounts.length) {
						return {
							name: flatIdlAccounts[idx].name,
							...meta,
						};
					}
					// "Remaining accounts" are unnamed in Anchor.
					else {
						return {
							name: `Remaining ${idx - flatIdlAccounts.length}`,
							...meta,
						};
					}
				});

				return {
					name: parsedIx.name,
					accounts: accounts,
					programId: instruction.programId,
					args: parsedIx.data as ParsedIdlArgs<typeof idl, (typeof idl)["instructions"][number]["name"]>, // as IxArgsMap<typeof idl, typeof idl["instructions"][number]["name"]>,
				};
			}
		};

		return [programId.toBase58(), idlParser.bind(this)];
	}

	/**
	 * Removes parser for provided program id
	 * @param programId program id to remove parser for
	 */
	removeParser(programId: PublicKey) {
		this.instructionParsers.delete(programId.toBase58());
	}

	private buildUnknownParsedInstruction(programId: PublicKey, accounts: AccountMeta[], argData: unknown, name?: string): UnknownInstruction {
		return {
			programId,
			accounts,
			args: { unknown: argData },
			name: name || "unknown",
		};
	}

	/**
	 * Parses instruction
	 * @param instruction transaction instruction to parse
	 * @returns parsed transaction instruction or UnknownInstruction
	 */
	parseInstruction<I extends Idl, IxName extends InstructionNames<I>>(instruction: TransactionInstruction): ParsedInstruction<I, IxName> {
		if (!this.instructionParsers.has(instruction.programId.toBase58())) {
			return this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data);
		} else {
			const parser = this.instructionParsers.get(instruction.programId.toBase58()) as ParserFunction<I, IxName>;

			return parser(instruction);
		}
	}

	/**
	 * Parses transaction data
	 * @param txMessage message to parse
	 * @param altLoadedAddresses VersionedTransaction.meta.loaddedAddresses if tx is versioned
	 * @returns list of parsed instructions
	 */
	parseTransactionData<T extends Message | VersionedMessage>(
		txMessage: T,
		altLoadedAddresses: T extends VersionedMessage ? LoadedAddresses | undefined : undefined = undefined,
	): ParsedInstruction<Idl, string>[] {
		const parsedAccounts = parseTransactionAccounts(txMessage, altLoadedAddresses);

		return txMessage.compiledInstructions.map((instruction) => this.parseInstruction(compiledInstructionToInstruction(instruction, parsedAccounts)));
	}

	/**
	 * Parses transaction data retrieved from Connection.getParsedTransaction
	 * @param txParsedMessage message to parse
	 * @returns list of parsed instructions
	 */
	parseTransactionParsedData(txParsedMessage: ParsedMessage): ParsedInstruction<Idl, string>[] {
		const parsedAccounts = txParsedMessage.accountKeys.map((metaLike) => ({
			isSigner: metaLike.signer,
			isWritable: metaLike.writable,
			pubkey: metaLike.pubkey,
		}));

		return txParsedMessage.instructions.map((parsedIx) =>
			this.parseInstruction(parsedInstructionToInstruction(parsedIx as PartiallyDecodedInstruction, parsedAccounts)),
		);
	}

	/**
	 * Fetches tx from blockchain and parses it
	 * @param connection web3 Connection
	 * @param txId transaction id
	 * @param flatten - true if CPI calls need to be parsed too
	 * @returns list of parsed instructions
	 */
	async parseTransactionByHash(
		connection: Connection,
		txId: string,
		flatten: boolean = false,
		commitment: Finality = "confirmed",
	): Promise<ParsedInstruction<Idl, string>[] | null> {
		const transaction = await connection.getTransaction(txId, { commitment: commitment, maxSupportedTransactionVersion: 0 });
		if (!transaction) return null;
		if (flatten) {
			const flattened = flattenTransactionResponse(transaction);

			return flattened.map((ix) => this.parseInstruction(ix));
		}

		return this.parseTransactionData(transaction.transaction.message, transaction.meta?.loadedAddresses);
	}

	/**
	 * Parses transaction dump
	 * @param txDump base64-encoded string or raw Buffer which contains tx dump
	 * @returns list of parsed instructions
	 */
	async parseTransactionDump(connection: Connection, txDump: string | Buffer): Promise<ParsedInstruction<Idl, string>[]> {
		if (!(txDump instanceof Buffer)) txDump = Buffer.from(txDump, "base64");
		const vtx = VersionedTransaction.deserialize(txDump);
		let loadedAddresses: LoadedAddresses = { writable: [], readonly: [] };

		if (vtx.version !== "legacy") {
			const accountsToFetch = vtx.message.addressTableLookups.map((alt) => alt.accountKey);
			if (accountsToFetch.length > 0) {
				const fetched = await connection.getMultipleAccountsInfo(accountsToFetch);
				const altAccounts = fetched
					.filter((f) => f !== null && f.data.length > 0)
					.map((f) => AddressLookupTableAccount.deserialize((<AccountInfo<Buffer>>f).data));

				const altWritableAccounts: PublicKey[] = [];
				const altReadonlyAccounts: PublicKey[] = [];
				vtx.message.addressTableLookups.map((compiledALT, idx) => {
					altWritableAccounts.push(...compiledALT.writableIndexes.map((writableIdx) => altAccounts[idx].addresses[writableIdx]));
					altReadonlyAccounts.push(...compiledALT.readonlyIndexes.map((writableIdx) => altAccounts[idx].addresses[writableIdx]));
				});
				loadedAddresses = {
					readonly: altReadonlyAccounts,
					writable: altWritableAccounts,
				};
			}
		}

		return this.parseTransactionData(vtx.message, loadedAddresses);
	}
}
