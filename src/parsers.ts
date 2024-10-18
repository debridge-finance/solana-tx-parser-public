import { Buffer } from "buffer";

import {
	PublicKey,
	TransactionInstruction,
	SystemInstruction,
	SystemProgram,
	Connection,
	Message,
	Transaction,
	AccountMeta,
	ParsedMessage,
	ParsedInstruction as SolanaParsedInstruction,
	PartiallyDecodedInstruction,
	Finality,
	VersionedMessage,
	LoadedAddresses,
	VersionedTransactionResponse,
	ParsedTransactionWithMeta,
	StakeInstruction,
	StakeProgram,
} from "@solana/web3.js";
import * as spl from "@solana/spl-token";
import { BN, BorshInstructionCoder, Idl, SystemProgram as SystemProgramIdl } from "@project-serum/anchor";
import { blob, struct, u8 } from "@solana/buffer-layout";
import { splDiscriminate } from "@solana/spl-type-length-value";

import { SplToken } from "./programs/spl-token.program";
import { SplToken22 } from "./programs/spl-token-22.program";
import {
	AssociatedTokenProgramIdlLike,
	IdlAccount,
	IdlAccountItem,
	IdlAccounts,
	InstructionNames,
	InstructionParserInfo,
	InstructionParsers,
	ParsedIdlArgs,
	ParsedIdlInstruction,
	ParsedInstruction,
	ParserFunction,
	ProgramInfoType,
	UnknownInstruction,
} from "./interfaces";
import {
	compiledInstructionToInstruction,
	flattenParsedTransaction,
	flattenTransactionResponse,
	parsedInstructionToInstruction,
	parseTransactionAccounts,
} from "./helpers";
import {
	decodeSetTransferFeeInstruction,
	emitLayout,
	getAccountDataSizeLayout,
	metadataLayout,
	removeKeyLayout,
	updateAuthorityLayout,
	updateMetadataLayout,
} from "./programs/token-extensions";
import { StakeLayout } from "./programs/stake.program";

const MEMO_PROGRAM_V1 = "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo";
const MEMO_PROGRAM_V2 = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";

function decodeSystemInstruction(instruction: TransactionInstruction): ParsedInstruction<SystemProgramIdl> {
	const ixType = SystemInstruction.decodeInstructionType(instruction);
	let parsed: ParsedIdlInstruction<SystemProgramIdl> | null;
	switch (ixType) {
		case "AdvanceNonceAccount": {
			const decoded = SystemInstruction.decodeNonceAdvance(instruction);
			parsed = {
				name: "advanceNonceAccount",
				accounts: [
					{ name: "nonce", pubkey: decoded.noncePubkey, isSigner: false, isWritable: true },
					{ name: "recentBlockhashSysvar", ...instruction.keys[1] },
					{ name: "nonceAuthority", pubkey: decoded.authorizedPubkey, isSigner: true, isWritable: false },
				],
				args: {},
			} as ParsedIdlInstruction<SystemProgramIdl, "advanceNonceAccount">;
			break;
		}
		case "Allocate": {
			const decoded = SystemInstruction.decodeAllocate(instruction);
			parsed = {
				name: "allocate",
				accounts: [{ name: "newAccount", pubkey: decoded.accountPubkey, isSigner: true, isWritable: true }],
				args: { space: new BN(decoded.space) },
			} as ParsedIdlInstruction<SystemProgramIdl, "allocate">;
			break;
		}
		case "AllocateWithSeed": {
			const decoded = SystemInstruction.decodeAllocateWithSeed(instruction);
			parsed = {
				name: "allocateWithSeed",
				accounts: [
					{ name: "newAccount", pubkey: decoded.accountPubkey, isSigner: false, isWritable: true },
					{ name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
				],
				args: {
					seed: decoded.seed,
					space: new BN(decoded.space),
					owner: decoded.programId,
					base: decoded.basePubkey,
				},
			} as ParsedIdlInstruction<SystemProgramIdl, "allocateWithSeed">;
			break;
		}
		case "Assign": {
			const decoded = SystemInstruction.decodeAssign(instruction);
			parsed = {
				name: "assign",
				accounts: [{ name: "assignedAccount", pubkey: decoded.accountPubkey, isSigner: true, isWritable: true }],
				args: { owner: decoded.programId },
			} as ParsedIdlInstruction<SystemProgramIdl, "assign">;
			break;
		}
		case "AssignWithSeed": {
			const decoded = SystemInstruction.decodeAssignWithSeed(instruction);
			parsed = {
				name: "assignWithSeed",
				accounts: [
					{ name: "assigned", pubkey: decoded.accountPubkey, isSigner: false, isWritable: true },
					{ name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
				],
				args: {
					seed: decoded.seed, // string
					owner: decoded.programId,
					base: decoded.basePubkey,
				},
			} as ParsedIdlInstruction<SystemProgramIdl, "assignWithSeed">;
			break;
		}
		case "AuthorizeNonceAccount": {
			const decoded = SystemInstruction.decodeNonceAuthorize(instruction);
			parsed = {
				name: "authorizeNonceAccount",
				accounts: [
					{ name: "nonce", isSigner: false, isWritable: true, pubkey: decoded.noncePubkey },
					{ name: "nonceAuthority", isSigner: true, isWritable: false, pubkey: decoded.authorizedPubkey },
				],
				args: { authorized: decoded.newAuthorizedPubkey },
			} as ParsedIdlInstruction<SystemProgramIdl, "authorizeNonceAccount">;
			break;
		}
		case "Create": {
			const decoded = SystemInstruction.decodeCreateAccount(instruction);
			parsed = {
				name: "createAccount",
				accounts: [
					{ name: "payer", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
					{ name: "newAccount", pubkey: decoded.newAccountPubkey, isSigner: true, isWritable: true },
				],
				args: { lamports: new BN(decoded.lamports), owner: decoded.programId, space: new BN(decoded.space) },
			} as ParsedIdlInstruction<SystemProgramIdl, "createAccount">;
			break;
		}
		case "CreateWithSeed": {
			const decoded = SystemInstruction.decodeCreateWithSeed(instruction);
			parsed = {
				name: "createAccountWithSeed",
				accounts: [
					{ name: "payer", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
					{ name: "created", pubkey: decoded.newAccountPubkey, isSigner: false, isWritable: true },
					{ name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
				],
				args: {
					lamports: new BN(decoded.lamports),
					owner: decoded.programId,
					space: new BN(decoded.space),
					seed: decoded.seed,
					base: decoded.basePubkey,
				},
			} as ParsedIdlInstruction<SystemProgramIdl, "createAccountWithSeed">;
			break;
		}
		case "InitializeNonceAccount": {
			const decoded = SystemInstruction.decodeNonceInitialize(instruction);
			parsed = {
				name: "initializeNonceAccount",
				accounts: [
					{ name: "nonce", pubkey: decoded.noncePubkey, isSigner: false, isWritable: true },
					{ name: "recentBlockhashSysvar", ...instruction.keys[1] },
					{ name: "rentSysvar", ...instruction.keys[2] },
				],
				args: { authorized: decoded.authorizedPubkey },
			} as ParsedIdlInstruction<SystemProgramIdl, "initializeNonceAccount">;
			break;
		}
		case "Transfer": {
			const decoded = SystemInstruction.decodeTransfer(instruction);
			parsed = {
				name: "transfer",
				accounts: [
					{ name: "sender", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
					{ name: "receiver", pubkey: decoded.toPubkey, isWritable: true, isSigner: false },
				],
				args: { lamports: new BN(decoded.lamports.toString()) },
			} as ParsedIdlInstruction<SystemProgramIdl, "transfer">;
			break;
		}
		case "TransferWithSeed": {
			const decoded = SystemInstruction.decodeTransferWithSeed(instruction);
			parsed = {
				name: "transferWithSeed",
				accounts: [
					{ name: "sender", pubkey: decoded.fromPubkey, isSigner: false, isWritable: true },
					{ name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
					{ name: "receiver", pubkey: decoded.toPubkey, isSigner: false, isWritable: true },
				],
				args: { owner: decoded.programId, lamports: new BN(decoded.lamports.toString()), seed: decoded.seed },
			} as ParsedIdlInstruction<SystemProgramIdl, "transferWithSeed">;
			break;
		}
		case "WithdrawNonceAccount": {
			const decoded = SystemInstruction.decodeNonceWithdraw(instruction);
			parsed = {
				name: "withdrawNonceAccount",
				accounts: [
					{ name: "nonce", pubkey: decoded.noncePubkey, isSigner: false, isWritable: true },
					{ name: "recepient", pubkey: decoded.toPubkey, isSigner: false, isWritable: true },
					{ name: "recentBlockhashSysvar", ...instruction.keys[2] },
					{ name: "rentSysvar", ...instruction.keys[3] },
					{ name: "nonceAuthority", pubkey: decoded.noncePubkey, isSigner: true, isWritable: false },
				],
				args: { lamports: new BN(decoded.lamports) },
			} as ParsedIdlInstruction<SystemProgramIdl, "withdrawNonceAccount">;
			break;
		}
		default: {
			parsed = null;
		}
	}

	return parsed
		? {
				...parsed,
				programId: SystemProgram.programId,
			}
		: {
				programId: SystemProgram.programId,
				name: "unknown",
				accounts: instruction.keys,
				args: { unknown: instruction.data },
			};
}

function decodeTokenInstruction(instruction: TransactionInstruction): ParsedInstruction<SplToken> {
	let parsed: ParsedIdlInstruction<SplToken> | null;
	const decoded = u8().decode(instruction.data);
	switch (decoded) {
		case spl.TokenInstruction.InitializeMint: {
			const decodedIx = spl.decodeInitializeMintInstruction(instruction);
			parsed = {
				name: "initializeMint",
				accounts: [
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "rentSysvar", ...decodedIx.keys.rent },
				],
				args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken, "initializeMint">;
			break;
		}
		case spl.TokenInstruction.InitializeAccount: {
			const decodedIx = spl.decodeInitializeAccountInstruction(instruction);
			parsed = {
				name: "initializeAccount",
				accounts: [
					{ name: "newAccount", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.owner },
					{ name: "rentSysvar", ...decodedIx.keys.rent },
				],
				args: {},
			} as ParsedIdlInstruction<SplToken, "initializeAccount">;
			break;
		}
		case spl.TokenInstruction.InitializeMultisig: {
			const decodedIx = spl.decodeInitializeMultisigInstruction(instruction);
			const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig",
				accounts: [{ name: "multisig", ...decodedIx.keys.account }, { name: "rentSysvar", ...decodedIx.keys.rent }, ...multisig],
				args: { m: decodedIx.data.m },
			} as ParsedIdlInstruction<SplToken, "initializeMultisig">;
			break;
		}
		case spl.TokenInstruction.Transfer: {
			const decodedIx = spl.decodeTransferInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "transfer",
				accounts: [
					{ name: "source", ...decodedIx.keys.source },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken, "transfer">;
			break;
		}
		case spl.TokenInstruction.Approve: {
			const decodedIx = spl.decodeApproveInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "approve",
				accounts: [
					{ name: "source", ...decodedIx.keys.account },
					{ name: "delegate", ...decodedIx.keys.delegate },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken, "approve">;
			break;
		}
		case spl.TokenInstruction.Revoke: {
			const decodedIx = spl.decodeRevokeInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "revoke",
				accounts: [{ name: "source", ...decodedIx.keys.account }, { name: "owner", ...decodedIx.keys.owner }, ...multisig],
				args: {},
			} as ParsedIdlInstruction<SplToken, "revoke">;
			break;
		}
		case spl.TokenInstruction.SetAuthority: {
			const decodedIx = spl.decodeSetAuthorityInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "setAuthority",
				accounts: [{ name: "account", ...decodedIx.keys.account }, { name: "currentAuthority", ...decodedIx.keys.currentAuthority }, ...multisig],
				args: { authorityType: decodedIx.data.authorityType, newAuthority: decodedIx.data.newAuthority },
			} as ParsedIdlInstruction<SplToken, "setAuthority">;
			break;
		}
		case spl.TokenInstruction.MintTo: {
			const decodedIx = spl.decodeMintToInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "mintTo",
				accounts: [
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "mintTo", ...decodedIx.keys.destination },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken, "mintTo">;
			break;
		}
		case spl.TokenInstruction.Burn: {
			const decodedIx = spl.decodeBurnInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "burn",
				accounts: [
					{ name: "burnFrom", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken, "burn">;
			break;
		}
		case spl.TokenInstruction.CloseAccount: {
			const decodedIx = spl.decodeCloseAccountInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "closeAccount",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken, "closeAccount">;
			break;
		}
		case spl.TokenInstruction.FreezeAccount: {
			const decodedIx = spl.decodeFreezeAccountInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "freezeAccount",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken, "freezeAccount">;
			break;
		}
		case spl.TokenInstruction.ThawAccount: {
			const decodedIx = spl.decodeThawAccountInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "thawAccount",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken, "thawAccount">;
			break;
		}
		case spl.TokenInstruction.TransferChecked: {
			const decodedIx = spl.decodeTransferCheckedInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "transferChecked",
				accounts: [
					{ name: "source", ...decodedIx.keys.source },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken, "transferChecked">;
			break;
		}
		case spl.TokenInstruction.ApproveChecked: {
			const decodedIx = spl.decodeApproveCheckedInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "approveChecked",
				accounts: [
					{ name: "source", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "delegate", ...decodedIx.keys.delegate },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken, "approveChecked">;
			break;
		}
		case spl.TokenInstruction.MintToChecked: {
			const decodedIx = spl.decodeMintToCheckedInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "mintToChecked",
				accounts: [
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "mintTo", ...decodedIx.keys.destination },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken, "mintToChecked">;
			break;
		}
		case spl.TokenInstruction.BurnChecked: {
			const decodedIx = spl.decodeBurnCheckedInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "burnChecked",
				accounts: [
					{ name: "burnFrom", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken, "burnChecked">;
			break;
		}
		case spl.TokenInstruction.InitializeAccount2: {
			interface InitializeAccount2InstructionData {
				instruction: spl.TokenInstruction.InitializeAccount2;
				owner: Uint8Array;
			}

			const initializeAccount2InstructionData = struct<InitializeAccount2InstructionData>([u8("instruction"), blob(32, "owner")]);

			const decodedIx = initializeAccount2InstructionData.decode(instruction.data);
			parsed = {
				name: "initializeAccount2",
				accounts: [
					{ name: "newAccount", ...instruction.keys[0] },
					{ name: "tokenMint", ...instruction.keys[1] },
					{ name: "rentSysvar", ...instruction.keys[2] },
				],
				args: { authority: new PublicKey(decodedIx.owner) },
			} as ParsedIdlInstruction<SplToken, "initializeAccount2">;
			break;
		}
		case spl.TokenInstruction.SyncNative: {
			parsed = {
				name: "syncNative",
				accounts: [{ name: "account", ...instruction.keys[0] }],
				args: {},
			} as ParsedIdlInstruction<SplToken, "syncNative">;
			break;
		}
		case spl.TokenInstruction.InitializeAccount3: {
			interface InitializeAccount3InstructionData {
				instruction: spl.TokenInstruction.InitializeAccount3;
				owner: Uint8Array;
			}

			const initializeAccount3InstructionData = struct<InitializeAccount3InstructionData>([u8("instruction"), blob(32, "owner")]);

			const decodedIx = initializeAccount3InstructionData.decode(instruction.data);
			parsed = {
				name: "initializeAccount3",
				accounts: [
					{ name: "newAccount", ...instruction.keys[0] },
					{ name: "tokenMint", ...instruction.keys[1] },
				],
				args: { authority: new PublicKey(decodedIx.owner) },
			} as ParsedIdlInstruction<SplToken, "initializeAccount3">;
			break;
		}
		case spl.TokenInstruction.InitializeMultisig2: {
			const multisig = instruction.keys.slice(1).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig2",
				accounts: [{ name: "multisig", ...instruction.keys[0] }, ...multisig],
				args: { m: instruction.data[1] },
			} as ParsedIdlInstruction<SplToken, "initializeMultisig2">;
			break;
		}
		case spl.TokenInstruction.InitializeMint2: {
			const decodedIx = spl.decodeInitializeMintInstructionUnchecked(instruction);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse InitializeMint2 instruction`);
			parsed = {
				name: "initializeMint2",
				accounts: [{ name: "tokenMint", ...decodedIx.keys.mint }],
				args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken, "initializeMint2">;
			break;
		}
		default: {
			parsed = null;
		}
	}

	return parsed
		? {
				...parsed,
				programId: spl.TOKEN_PROGRAM_ID,
			}
		: {
				programId: spl.TOKEN_PROGRAM_ID,
				name: "unknown",
				accounts: instruction.keys,
				args: { unknown: instruction.data },
			};
}

function decodeToken2022Instruction(instruction: TransactionInstruction): ParsedInstruction<SplToken> {
	let parsed: ParsedIdlInstruction<SplToken22> | null;
	const decoded = u8().decode(instruction.data);
	switch (decoded) {
		case spl.TokenInstruction.InitializeMint: {
			const decodedIx = spl.decodeInitializeMintInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			parsed = {
				name: "initializeMint",
				accounts: [
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "rentSysvar", ...decodedIx.keys.rent },
				],
				args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken22, "initializeMint">;
			break;
		}
		case spl.TokenInstruction.InitializeAccount: {
			const decodedIx = spl.decodeInitializeAccountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			parsed = {
				name: "initializeAccount",
				accounts: [
					{ name: "newAccount", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.owner },
					{ name: "rentSysvar", ...decodedIx.keys.rent },
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "initializeAccount">;
			break;
		}
		case spl.TokenInstruction.InitializeMultisig: {
			const decodedIx = spl.decodeInitializeMultisigInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig",
				accounts: [{ name: "multisig", ...decodedIx.keys.account }, { name: "rentSysvar", ...decodedIx.keys.rent }, ...multisig],
				args: { m: decodedIx.data.m },
			} as ParsedIdlInstruction<SplToken22, "initializeMultisig">;
			break;
		}
		case spl.TokenInstruction.Transfer: {
			const decodedIx = spl.decodeTransferInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "transfer",
				accounts: [
					{ name: "source", ...decodedIx.keys.source },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "transfer">;
			break;
		}
		case spl.TokenInstruction.Approve: {
			const decodedIx = spl.decodeApproveInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "approve",
				accounts: [
					{ name: "source", ...decodedIx.keys.account },
					{ name: "delegate", ...decodedIx.keys.delegate },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "approve">;
			break;
		}
		case spl.TokenInstruction.Revoke: {
			const decodedIx = spl.decodeRevokeInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "revoke",
				accounts: [{ name: "source", ...decodedIx.keys.account }, { name: "owner", ...decodedIx.keys.owner }, ...multisig],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "revoke">;
			break;
		}
		case spl.TokenInstruction.SetAuthority: {
			const decodedIx = spl.decodeSetAuthorityInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "setAuthority",
				accounts: [{ name: "account", ...decodedIx.keys.account }, { name: "currentAuthority", ...decodedIx.keys.currentAuthority }, ...multisig],
				args: { authorityType: Number(decodedIx.data.authorityType), newAuthority: decodedIx.data.newAuthority },
				programId: spl.TOKEN_2022_PROGRAM_ID,
			} as ParsedIdlInstruction<SplToken22, "setAuthority">;
			break;
		}
		case spl.TokenInstruction.MintTo: {
			const decodedIx = spl.decodeMintToInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "mintTo",
				accounts: [
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "mintTo", ...decodedIx.keys.destination },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "mintTo">;
			break;
		}
		case spl.TokenInstruction.Burn: {
			const decodedIx = spl.decodeBurnInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "burn",
				accounts: [
					{ name: "burnFrom", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "burn">;
			break;
		}
		case spl.TokenInstruction.CloseAccount: {
			const decodedIx = spl.decodeCloseAccountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "closeAccount",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "closeAccount">;
			break;
		}
		case spl.TokenInstruction.FreezeAccount: {
			const decodedIx = spl.decodeFreezeAccountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "freezeAccount",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "freezeAccount">;
			break;
		}
		case spl.TokenInstruction.ThawAccount: {
			const decodedIx = spl.decodeThawAccountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "thawAccount",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "thawAccount">;
			break;
		}
		case spl.TokenInstruction.TransferChecked: {
			const decodedIx = spl.decodeTransferCheckedInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "transferChecked",
				accounts: [
					{ name: "source", ...decodedIx.keys.source },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "transferChecked">;
			break;
		}
		case spl.TokenInstruction.ApproveChecked: {
			const decodedIx = spl.decodeApproveCheckedInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "approveChecked",
				accounts: [
					{ name: "source", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "delegate", ...decodedIx.keys.delegate },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "approveChecked">;
			break;
		}
		case spl.TokenInstruction.MintToChecked: {
			const decodedIx = spl.decodeMintToCheckedInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "mintToChecked",
				accounts: [
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "mintTo", ...decodedIx.keys.destination },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "mintToChecked">;
			break;
		}
		case spl.TokenInstruction.BurnChecked: {
			const decodedIx = spl.decodeBurnCheckedInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "burnChecked",
				accounts: [
					{ name: "burnFrom", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "burnChecked">;
			break;
		}
		case spl.TokenInstruction.InitializeAccount2: {
			interface InitializeAccount2InstructionData {
				instruction: spl.TokenInstruction.InitializeAccount2;
				owner: Uint8Array;
			}

			const initializeAccount2InstructionData = struct<InitializeAccount2InstructionData>([u8("instruction"), blob(32, "owner")]);

			const decodedIx = initializeAccount2InstructionData.decode(instruction.data);
			parsed = {
				name: "initializeAccount2",
				accounts: [
					{ name: "newAccount", ...instruction.keys[0] },
					{ name: "tokenMint", ...instruction.keys[1] },
					{ name: "rentSysvar", ...instruction.keys[2] },
				],
				args: { owner: new PublicKey(decodedIx.owner) },
			} as ParsedIdlInstruction<SplToken22, "initializeAccount2">;
			break;
		}
		case spl.TokenInstruction.SyncNative: {
			parsed = {
				name: "syncNative",
				accounts: [{ name: "account", ...instruction.keys[0] }],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "syncNative">;
			break;
		}
		case spl.TokenInstruction.InitializeAccount3: {
			interface InitializeAccount3InstructionData {
				instruction: spl.TokenInstruction.InitializeAccount3;
				owner: Uint8Array;
			}

			const initializeAccount3InstructionData = struct<InitializeAccount3InstructionData>([u8("instruction"), blob(32, "owner")]);

			const decodedIx = initializeAccount3InstructionData.decode(instruction.data);
			parsed = {
				name: "initializeAccount3",
				accounts: [
					{ name: "newAccount", ...instruction.keys[0] },
					{ name: "tokenMint", ...instruction.keys[1] },
				],
				args: { owner: new PublicKey(decodedIx.owner) },
			} as ParsedIdlInstruction<SplToken22, "initializeAccount3">;
			break;
		}
		case spl.TokenInstruction.InitializeMultisig2: {
			const multisig = instruction.keys.slice(1).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig2",
				accounts: [{ name: "multisig", ...instruction.keys[0] }, ...multisig],
				args: { m: instruction.data[1] },
			} as ParsedIdlInstruction<SplToken22, "initializeMultisig2">;
			break;
		}
		case spl.TokenInstruction.InitializeMint2: {
			const decodedIx = spl.decodeInitializeMintInstructionUnchecked(instruction);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse InitializeMint2 instruction`);
			parsed = {
				name: "initializeMint2",
				accounts: [{ name: "tokenMint", ...decodedIx.keys.mint }],
				args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken22, "initializeMint2">;
			break;
		}
		case spl.TokenInstruction.GetAccountDataSize: {
			const tokenMint = instruction.keys[0].pubkey;
			if (!tokenMint) throw new Error(`Failed to parse GetAccountDataSize instruction`);
			const instructionData = getAccountDataSizeLayout.decode(instruction.data);
			parsed = {
				name: "getAccountDataSize",
				accounts: [{ name: "mint", ...instruction.keys[0] }],
				args: { extensionTypes: instructionData.extensions.map((ext) => spl.ExtensionType[ext]) },
			} as unknown as ParsedIdlInstruction<SplToken22, "getAccountDataSize">;
			break;
		}
		case spl.TokenInstruction.InitializeImmutableOwner: {
			const decodedIx = spl.decodeInitializeImmutableOwnerInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const account = decodedIx.keys.account;
			if (!account) throw new Error(`Failed to parse InitializeImmutableOwner instruction`);
			parsed = {
				name: "initializeImmutableOwner",
				accounts: [{ name: "account", ...decodedIx.keys.account }],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "initializeImmutableOwner">;
			break;
		}
		case spl.TokenInstruction.AmountToUiAmount: {
			const decodedIx = spl.decodeAmountToUiAmountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse AmountToUiAmount instruction`);
			parsed = {
				name: "amountToUiAmount",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "amountToUiAmount">;
			break;
		}
		case spl.TokenInstruction.UiAmountToAmount: {
			const decodedIx = spl.decodeUiAmountToAmountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse UiAmountToAmount instruction`);
			parsed = {
				name: "uiAmountToAmount",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { uiAmount: decodedIx.data.amount },
			} as ParsedIdlInstruction<SplToken22, "uiAmountToAmount">;
			break;
		}
		case spl.TokenInstruction.InitializeMintCloseAuthority: {
			const decodedIx = spl.decodeInitializeMintCloseAuthorityInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse InitializeMintCloseAuthority instruction`);
			parsed = {
				name: "initializeMintCloseAuthority",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { closeAuthority: decodedIx.data.closeAuthority },
			} as ParsedIdlInstruction<SplToken22, "initializeMintCloseAuthority">;
			break;
		}
		case spl.TokenInstruction.TransferFeeExtension: {
			const discriminator = u8().decode(instruction.data.slice(1));
			switch (discriminator) {
				case spl.TransferFeeInstruction.InitializeTransferFeeConfig: {
					const decodedIx = spl.decodeInitializeTransferFeeConfigInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
					const tokenMint = decodedIx.keys.mint;
					if (!tokenMint) throw new Error(`Failed to parse InitializeTransferFeeConfig instruction`);
					parsed = {
						name: "initializeTransferFeeConfig",
						accounts: [{ name: "mint", ...decodedIx.keys.mint }],
						args: {
							transferFeeConfigAuthority: decodedIx.data.transferFeeConfigAuthority,
							withdrawWithheldAuthority: decodedIx.data.withdrawWithheldAuthority,
							transferFeeBasisPoints: decodedIx.data.transferFeeBasisPoints,
							maximumFee: decodedIx.data.maximumFee,
						},
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case spl.TransferFeeInstruction.TransferCheckedWithFee: {
					const decodedIx = spl.decodeTransferCheckedWithFeeInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
					const tokenMint = decodedIx.keys.mint;
					if (!tokenMint) throw new Error(`Failed to parse TransferCheckedWithFee instruction`);
					parsed = {
						name: "transferCheckedWithFee",
						accounts: [
							{ name: "source", ...decodedIx.keys.source },
							{ name: "mint", ...decodedIx.keys.mint },
							{ name: "destination", ...decodedIx.keys.destination },
							{ name: "authority", ...decodedIx.keys.authority },
						],
						args: {
							amount: decodedIx.data.amount,
							decimals: decodedIx.data.decimals,
							fee: decodedIx.data.fee,
						},
					} as unknown as ParsedIdlInstruction<any>;
					if (decodedIx.keys.signers) {
						const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
						parsed.accounts.push(...multisig);
					}
					break;
				}
				case spl.TransferFeeInstruction.WithdrawWithheldTokensFromMint: {
					const decodedIx = spl.decodeWithdrawWithheldTokensFromMintInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
					const tokenMint = decodedIx.keys.mint;
					if (!tokenMint) throw new Error(`Failed to parse WithdrawWithheldTokensFromMint instruction`);
					parsed = {
						name: "withdrawWithheldTokensFromMint",
						accounts: [
							{ name: "mint", ...decodedIx.keys.mint },
							{ name: "destination", ...decodedIx.keys.destination },
							{ name: "authority", ...decodedIx.keys.authority },
						],
						args: {},
					} as unknown as ParsedIdlInstruction<any>;
					if (decodedIx.keys.signers) {
						const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
						parsed.accounts.push(...multisig);
					}
					break;
				}
				case spl.TransferFeeInstruction.WithdrawWithheldTokensFromAccounts: {
					const decodedIx = spl.decodeWithdrawWithheldTokensFromAccountsInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
					const tokenMint = decodedIx.keys.mint;
					if (!tokenMint) throw new Error(`Failed to parse WithdrawWithheldTokensFromAccounts instruction`);
					parsed = {
						name: "withdrawWithheldTokensFromAccounts",
						accounts: [
							{ name: "mint", ...decodedIx.keys.mint },
							{ name: "destination", ...decodedIx.keys.destination },
							{ name: "authority", ...decodedIx.keys.authority },
						],
						args: {},
					} as unknown as ParsedIdlInstruction<any>;
					if (decodedIx.keys.signers) {
						const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
						parsed.accounts.push(...multisig);
					}
					if (decodedIx.keys.sources) {
						const multisig = decodedIx.keys.sources.map((meta, idx) => ({ name: `source_${idx}`, ...meta }));
						parsed.accounts.push(...multisig);
					}
					break;
				}
				case spl.TransferFeeInstruction.HarvestWithheldTokensToMint: {
					const decodedIx = spl.decodeHarvestWithheldTokensToMintInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
					const tokenMint = decodedIx.keys.mint;
					if (!tokenMint) throw new Error(`Failed to parse HarvestWithheldTokensToMint instruction`);
					parsed = {
						name: "harvestWithheldTokensToMint",
						accounts: [{ name: "mint", ...decodedIx.keys.mint }],
						args: {},
					} as unknown as ParsedIdlInstruction<any>;
					if (decodedIx.keys.sources) {
						const multisig = decodedIx.keys.sources.map((meta, idx) => ({ name: `source_${idx}`, ...meta }));
						parsed.accounts.push(...multisig);
					}
					break;
				}
				case spl.TransferFeeInstruction.SetTransferFee: {
					const decodedIx = decodeSetTransferFeeInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
					const tokenMint = decodedIx.keys.mint;
					if (!tokenMint) throw new Error(`Failed to parse SetTransferFee instruction`);
					parsed = {
						name: "setTransferFee",
						accounts: [
							{ name: "mint", ...decodedIx.keys.mint },
							{ name: "authority", ...decodedIx.keys.authority },
						],
						args: { transferFeeBasisPoints: decodedIx.data.transferFeeBasisPoints, maximumFee: decodedIx.data.maximumFee },
					} as unknown as ParsedIdlInstruction<any>;
					if (decodedIx.keys.signers) {
						const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
						parsed.accounts.push(...multisig);
					}
					break;
				}
				default: {
					parsed = null;
					break;
				}
			}
			break;
		}
		case spl.TokenInstruction.DefaultAccountStateExtension: {
			const discriminator = u8().decode(instruction.data.slice(1));
			switch (discriminator) {
				case spl.DefaultAccountStateInstruction.Initialize: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse InitializeDefaultAccountState instruction`);
					const instructionData = spl.defaultAccountStateInstructionData.decode(instruction.data);
					parsed = {
						name: "initializeDefaultAccountState",
						accounts: [{ name: "mint", ...instruction.keys[0] }],
						args: { accountState: spl.AccountState[instructionData.accountState] },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case spl.DefaultAccountStateInstruction.Update: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse UpdateDefaultAccountState instruction`);
					const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
					const instructionData = spl.defaultAccountStateInstructionData.decode(instruction.data);
					parsed = {
						name: "updateDefaultAccountState",
						accounts: [{ name: "mint", ...instruction.keys[0] }, { name: "freezeAuthority", ...instruction.keys[1] }, { ...multisig }],
						args: { accountState: spl.AccountState[instructionData.accountState] },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				default: {
					parsed = null;
					break;
				}
			}
			break;
		}
		case spl.TokenInstruction.MemoTransferExtension: {
			const account = instruction.keys[0].pubkey;
			if (!account) throw new Error(`Failed to parse MemoTransfersInstruction instruction`);
			const instructionData = spl.memoTransferInstructionData.decode(instruction.data);
			parsed = {
				name: "memoTransfersInstruction",
				accounts: [{ name: "account", ...instruction.keys[0] }, { name: "authority", ...instruction.keys[1] }, { ...instruction.keys.slice(2) }],
				args: { memoTransferInstruction: spl.MemoTransferInstruction[instructionData.memoTransferInstruction] },
			} as unknown as ParsedIdlInstruction<any>;
			break;
		}
		case spl.TokenInstruction.CreateNativeMint: {
			const payer = instruction.keys[0].pubkey;
			if (!payer) throw new Error(`Failed to parse CreateNativeMint instruction`);
			parsed = {
				name: "createNativeMint",
				accounts: [
					{ name: "payer", ...instruction.keys[0] },
					{ name: "nativeMintId", ...instruction.keys[1] },
					{ name: "systemProgram", ...instruction.keys[2] },
				],
				args: {},
			} as unknown as ParsedIdlInstruction<any>;
			break;
		}
		case spl.TokenInstruction.InitializeNonTransferableMint: {
			const mint = instruction.keys[0].pubkey;
			if (!mint) throw new Error(`Failed to parse InitializeNonTransferableMint instruction`);
			parsed = {
				name: "initializeNonTransferableMint",
				accounts: [{ name: "mint", ...instruction.keys[0] }],
				args: {},
			} as unknown as ParsedIdlInstruction<any>;
			break;
		}
		case spl.TokenInstruction.CpiGuardExtension: {
			const account = instruction.keys[0].pubkey;
			if (!account) throw new Error(`Failed to parse CreateCpiGuardInstruction instruction`);
			const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			const instructionData = spl.cpiGuardInstructionData.decode(instruction.data);
			parsed = {
				name: "createCpiGuardInstruction",
				accounts: [{ name: "account", ...instruction.keys[0] }, { name: "authority", ...instruction.keys[1] }, { ...multisig }],
				args: { cpiGuardInstruction: spl.CpiGuardInstruction[instructionData.cpiGuardInstruction] },
			} as unknown as ParsedIdlInstruction<any>;
			break;
		}
		case spl.TokenInstruction.InitializePermanentDelegate: {
			const mint = instruction.keys[0].pubkey;
			if (!mint) throw new Error(`Failed to parse InitializePermanentDelegate instruction`);
			const decodedIx = spl.decodeInitializePermanentDelegateInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			parsed = {
				name: "initializePermanentDelegate",
				accounts: [{ name: "account", ...decodedIx.keys.mint }],
				args: { delegate: decodedIx.data.delegate },
			} as unknown as ParsedIdlInstruction<any>;
			break;
		}
		case spl.TokenInstruction.TransferHookExtension: {
			const discriminator = u8().decode(instruction.data.slice(1));
			switch (discriminator) {
				case spl.TransferHookInstruction.Initialize: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse InitializeTransferHook instruction`);
					const instructionData = spl.initializeTransferHookInstructionData.decode(instruction.data);
					parsed = {
						name: "initializeTransferHook",
						accounts: [{ name: "mint", ...instruction.keys[0] }],
						args: { authority: instructionData.authority, transferHookProgramId: instructionData.transferHookProgramId },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case spl.TransferHookInstruction.Update: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse UpdateTransferHook instruction`);
					const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
					const instructionData = spl.updateTransferHookInstructionData.decode(instruction.data);
					parsed = {
						name: "updateTransferHook",
						accounts: [{ name: "mint", ...instruction.keys[0] }, { name: "authority", ...instruction.keys[1] }, { ...multisig }],
						args: { transferHookProgramId: instructionData.transferHookProgramId },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				default: {
					parsed = null;
					break;
				}
			}
			break;
		}
		case spl.TokenInstruction.MetadataPointerExtension: {
			const discriminator = u8().decode(instruction.data.slice(1));
			switch (discriminator) {
				case spl.MetadataPointerInstruction.Initialize: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse InitializeMetadataPointer instruction`);
					const instructionData = spl.initializeMetadataPointerData.decode(instruction.data);
					parsed = {
						name: "initializeMetadataPointer",
						accounts: [{ name: "mint", ...instruction.keys[0] }],
						args: { authority: instructionData.authority, metadataAddress: instructionData.metadataAddress },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case spl.MetadataPointerInstruction.Update: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse UpdateMetadataPointer instruction`);
					const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
					const instructionData = spl.updateMetadataPointerData.decode(instruction.data);
					parsed = {
						name: "updateMetadataPointer",
						accounts: [{ name: "mint", ...instruction.keys[0] }, { name: "authority", ...instruction.keys[1] }, { ...multisig }],
						args: { metadataAddress: instructionData.metadataAddress },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				default: {
					parsed = null;
					break;
				}
			}
			break;
		}
		case spl.TokenInstruction.GroupPointerExtension: {
			const discriminator = u8().decode(instruction.data.slice(1));
			switch (discriminator) {
				case spl.GroupPointerInstruction.Initialize: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse InitializeGroupPointer instruction`);
					const instructionData = spl.initializeGroupPointerData.decode(instruction.data);
					parsed = {
						name: "initializeGroupPointer",
						accounts: [{ name: "mint", ...instruction.keys[0] }],
						args: { authority: instructionData.authority, groupAddress: instructionData.groupAddress },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case spl.GroupPointerInstruction.Update: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse UpdateGroupPointer instruction`);
					const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
					const instructionData = spl.updateGroupPointerData.decode(instruction.data);
					parsed = {
						name: "updateGroupPointer",
						accounts: [{ name: "mint", ...instruction.keys[0] }, { name: "authority", ...instruction.keys[1] }, { ...multisig }],
						args: { groupAddress: instructionData.groupAddress },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				default: {
					parsed = null;
					break;
				}
			}
			break;
		}
		case spl.TokenInstruction.GroupMemberPointerExtension: {
			const discriminator = u8().decode(instruction.data.slice(1));
			switch (discriminator) {
				case spl.GroupMemberPointerInstruction.Initialize: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse InitializeGroupMemberPointer instruction`);
					const instructionData = spl.initializeGroupMemberPointerData.decode(instruction.data);
					parsed = {
						name: "initializeGroupMemberPointer",
						accounts: [{ name: "mint", ...instruction.keys[0] }],
						args: { authority: instructionData.authority, memberAddress: instructionData.memberAddress },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case spl.GroupMemberPointerInstruction.Update: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse UpdateGroupMemberPointer instruction`);
					const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
					const instructionData = spl.updateGroupMemberPointerData.decode(instruction.data);
					parsed = {
						name: "updateGroupMemberPointer",
						accounts: [{ name: "mint", ...instruction.keys[0] }, { name: "authority", ...instruction.keys[1] }, { ...multisig }],
						args: { memberAddress: instructionData.memberAddress },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				default: {
					parsed = null;
					break;
				}
			}
			break;
		}
		default: {
			const discriminator = instruction.data.slice(0, 8).toString("hex");
			switch (discriminator) {
				case splDiscriminate("spl_token_metadata_interface:initialize_account").toString("hex"): {
					const metadata = metadataLayout.decode(instruction.data);
					parsed = {
						name: "initializeMetadata",
						accounts: [
							{ name: "metadata", ...instruction.keys[0] },
							{ name: "updateAuthority", ...instruction.keys[1] },
							{ name: "mint", ...instruction.keys[2] },
							{ name: "mintAuthority", ...instruction.keys[3] },
						],
						args: {
							name: metadata.name,
							symbol: metadata.symbol,
							uri: metadata.uri,
						},
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case splDiscriminate("spl_token_metadata_interface:updating_field").toString("hex"): {
					const data = updateMetadataLayout.decode(instruction.data);
					parsed = {
						name: "updateField",
						accounts: [
							{ name: "metadata", ...instruction.keys[0] },
							{ name: "updateAuthority", ...instruction.keys[1] },
						],
						args: {
							field: data.field,
							value: data.value,
						},
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case splDiscriminate("spl_token_metadata_interface:remove_key_ix").toString("hex"): {
					const data = removeKeyLayout.decode(instruction.data);
					parsed = {
						name: "removeKey",
						accounts: [
							{ name: "metadata", ...instruction.keys[0] },
							{ name: "updateAuthority", ...instruction.keys[1] },
						],
						args: {
							idempotent: data.idempotent,
							value: data.key,
						},
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case splDiscriminate("spl_token_metadata_interface:update_the_authority").toString("hex"): {
					const data = updateAuthorityLayout.decode(instruction.data);
					parsed = {
						name: "updateAuthority",
						accounts: [
							{ name: "metadata", ...instruction.keys[0] },
							{ name: "oldAuthority", ...instruction.keys[1] },
						],
						args: {
							newAuthority: new PublicKey(data.newAuthority),
						},
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case splDiscriminate("spl_token_metadata_interface:emitter").toString("hex"): {
					const data = emitLayout.decode(instruction.data);
					parsed = {
						name: "emit",
						accounts: [{ name: "metadata", ...instruction.keys[0] }],
						args: data,
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				default:
					parsed = null;
			}
			break;
		}
	}

	return parsed
		? {
				...parsed,
				programId: spl.TOKEN_2022_PROGRAM_ID,
			}
		: {
				programId: spl.TOKEN_2022_PROGRAM_ID,
				name: "unknown",
				accounts: instruction.keys,
				args: { unknown: instruction.data },
			};
}

function decodeAssociatedTokenInstruction(instruction: TransactionInstruction): ParsedInstruction<AssociatedTokenProgramIdlLike> {
	return {
		name: "createAssociatedTokenAccount",
		accounts: [
			{ name: "fundingAccount", ...instruction.keys[0] },
			{ name: "newAccount", ...instruction.keys[1] },
			{ name: "wallet", ...instruction.keys[2] },
			{ name: "tokenMint", ...instruction.keys[3] },
			{ name: "systemProgram", ...instruction.keys[4] },
			{ name: "tokenProgram", ...instruction.keys[5] },
			...[instruction.keys.length > 5 ? { name: "rentSysvar", ...instruction.keys[6] } : undefined],
		],
		args: {},
		programId: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
	} as ParsedInstruction<AssociatedTokenProgramIdlLike, "createAssociatedTokenAccount">;
}

function decodeStakeInstruction(instruction: TransactionInstruction): ParsedInstruction<StakeLayout> {
	const parseAccount = (key: any) => ({
		pubkey: key.pubkey,
		isSigner: key.isSigner,
		isWritable: key.isWritable,
	});

	let parsed: ParsedIdlInstruction<StakeLayout> | null;
	const decoded = StakeInstruction.decodeInstructionType(instruction);

	switch (decoded) {
		case "Initialize": {
			const decodedIx = StakeInstruction.decodeInitialize(instruction);
			parsed = {
				name: "initialize",
				accounts: [
					{
						name: "stakePubkey",
						...parseAccount(instruction.keys[0]),
					},
					{
						name: "clockSysvar",
						...parseAccount(instruction.keys[1]),
					},
				],
				args: {
					authorized: decodedIx.authorized,
					lockup: decodedIx.lockup,
				},
			} as ParsedIdlInstruction<StakeLayout, "initialize">;
			break;
		}
		case "Authorize": {
			const decodedIx = StakeInstruction.decodeAuthorize(instruction);
			parsed = {
				name: "authorize",
				accounts: [
					{
						name: "stakePubkey",
						...parseAccount(instruction.keys[0]),
					},
					{
						name: "clockSysvar",
						...parseAccount(instruction.keys[1]),
					},
					{
						name: "stakeAuthority",
						...parseAccount(instruction.keys[2]),
					},
				],
				args: {
					newAuthorized: decodedIx.newAuthorizedPubkey,
					stakeAuthorizationType: decodedIx.stakeAuthorizationType,
				},
			} as ParsedIdlInstruction<StakeLayout, "authorize">;

			if (instruction.keys.length > 3) {
				parsed.accounts.push({
					name: "custodianPubkey",
					...parseAccount(instruction.keys[3]),
				});
			}
			break;
		}
		case "AuthorizeWithSeed": {
			const decodedIx = StakeInstruction.decodeAuthorizeWithSeed(instruction);
			parsed = {
				name: "authorizeWithSeed",
				accounts: [
					{
						name: "stakePubkey",
						...parseAccount(instruction.keys[0]),
					},
					{
						name: "stakeAuthority",
						...parseAccount(instruction.keys[1]),
					},
					{
						name: "clockSysvar",
						...parseAccount(instruction.keys[2]),
					},
				],
				args: {
					newAuthorized: decodedIx.newAuthorizedPubkey,
					stakeAuthorizationType: decodedIx.stakeAuthorizationType,
					authoritySeed: decodedIx.authoritySeed,
					authorityOwner: decodedIx.authorityOwner,
				},
			} as ParsedIdlInstruction<StakeLayout, "authorizeWithSeed">;

			if (instruction.keys.length > 3) {
				parsed.accounts.push({
					name: "custodianPubkey",
					...parseAccount(instruction.keys[3]),
				});
			}
			break;
		}
		case "Deactivate": {
			const decodedIx = StakeInstruction.decodeDeactivate(instruction);
			parsed = {
				name: "deactivate",
				accounts: [
					{
						name: "stakePubkey",
						...parseAccount(instruction.keys[0]),
					},
					{
						name: "clockSysvar",
						...parseAccount(instruction.keys[1]),
					},
					{
						name: "stakeAuthority",
						...parseAccount(instruction.keys[2]),
					},
				],
				args: {
					stakePubkey: decodedIx.stakePubkey,
					authorizedPubkey: decodedIx.authorizedPubkey,
				},
			} as ParsedIdlInstruction<StakeLayout, "deactivate">;
			break;
		}
		case "Delegate": {
			const decodedIx = StakeInstruction.decodeDelegate(instruction);
			parsed = {
				name: "delegate",
				accounts: [
					{
						name: "stakePubkey",
						...parseAccount(instruction.keys[0]),
					},
					{
						name: "votePubkey",
						...parseAccount(instruction.keys[1]),
					},
					{
						name: "clockSysvar",
						...parseAccount(instruction.keys[2]),
					},
					{
						name: "sysvarStakeHistory",
						...parseAccount(instruction.keys[3]),
					},
					{
						name: "stakeConfig",
						...parseAccount(instruction.keys[4]),
					},
					{
						name: "stakeAuthority",
						...parseAccount(instruction.keys[5]),
					},
				],
				args: {
					stakePubkey: decodedIx.stakePubkey,
					authorizedPubkey: decodedIx.authorizedPubkey,
					votePubkey: decodedIx.votePubkey,
				} as any,
			} as ParsedIdlInstruction<StakeLayout, "delegate">;
			break;
		}
		case "Merge": {
			const decodedIx = StakeInstruction.decodeMerge(instruction);
			parsed = {
				name: "merge",
				accounts: [
					{
						name: "stakePubkey",
						...parseAccount(instruction.keys[0]),
					},
					{
						name: "sourceStakePubkey",
						...parseAccount(instruction.keys[1]),
					},
					{
						name: "clockSysvar",
						...parseAccount(instruction.keys[2]),
					},
					{
						name: "sysvarStakeHistory",
						...parseAccount(instruction.keys[3]),
					},
					{
						name: "stakeAuthority",
						...parseAccount(instruction.keys[4]),
					},
				],
				args: {
					stakePubkey: decodedIx.stakePubkey,
					authorizedPubkey: decodedIx.authorizedPubkey,
					sourceStakePubKey: decodedIx.sourceStakePubKey,
				} as any,
			} as ParsedIdlInstruction<StakeLayout, "merge">;
			break;
		}
		case "Split": {
			const decodedIx = StakeInstruction.decodeSplit(instruction);
			parsed = {
				name: "split",
				accounts: [
					{
						name: "stakePubkey",
						...parseAccount(instruction.keys[0]),
					},
					{
						name: "splitStakePubkey",
						...parseAccount(instruction.keys[1]),
					},
					{
						name: "stakeAuthority",
						...parseAccount(instruction.keys[2]),
					},
				],
				args: {
					stakePubkey: decodedIx.stakePubkey,
					authorizedPubkey: decodedIx.authorizedPubkey,
					splitStakePubkey: decodedIx.splitStakePubkey,
					lamports: decodedIx.lamports,
				} as any,
			} as ParsedIdlInstruction<StakeLayout, "split">;
			break;
		}
		case "Withdraw": {
			const decodedIx = StakeInstruction.decodeWithdraw(instruction);
			parsed = {
				name: "withdraw",
				accounts: [
					{
						name: "stakePubkey",
						...parseAccount(instruction.keys[0]),
					},
					{
						name: "toPubkey",
						...parseAccount(instruction.keys[1]),
					},
					{
						name: "clockSysvar",
						...parseAccount(instruction.keys[2]),
					},
					{
						name: "sysvarStakeHistory",
						...parseAccount(instruction.keys[3]),
					},
					{
						name: "stakeAuthority",
						...parseAccount(instruction.keys[4]),
					},
				],
				args: {
					stakePubkey: decodedIx.stakePubkey,
					authorizedPubkey: decodedIx.authorizedPubkey,
					toPubkey: decodedIx.toPubkey,
					custodianPubkey: decodedIx.custodianPubkey,
					lamports: decodedIx.lamports,
				} as any,
			} as ParsedIdlInstruction<StakeLayout, "withdraw">;
			if (instruction.keys.length > 5) {
				parsed.accounts.push({
					name: "custodianPubkey",
					...parseAccount(instruction.keys[5]),
				});
			}
			break;
		}
		default: {
			parsed = null;
			break;
		}
	}

	return parsed
		? {
				...parsed,
				programId: StakeProgram.programId,
			}
		: {
				programId: StakeProgram.programId,
				name: "unknown",
				accounts: instruction.keys,
				args: { unknown: instruction.data },
			};
}

function flattenIdlAccounts(accounts: IdlAccountItem[], prefix?: string): IdlAccount[] {
	return accounts
		.map((account) => {
			const accName = account.name;
			if (Object.prototype.hasOwnProperty.call(account, "accounts")) {
				const newPrefix = prefix ? `${prefix} > ${accName}` : accName;

				return flattenIdlAccounts((<IdlAccounts>account).accounts, newPrefix);
			} else {
				return {
					...(<IdlAccount>account),
					name: prefix ? `${prefix} > ${accName}` : accName,
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
	private instructionDecoders: Map<PublicKey | string, BorshInstructionCoder>;
	/**
	 * Initializes parser object
	 * `SystemProgram`, `TokenProgram` and `AssociatedTokenProgram` are supported by default
	 * but may be overriden by providing custom idl/custom parser
	 * @param programInfos list of objects which contains programId and corresponding idl
	 * @param parsers list of pairs (programId, custom parser)
	 */
	constructor(programInfos: ProgramInfoType[], parsers?: InstructionParserInfo[]) {
		this.instructionDecoders = new Map();
		this.instructionParsers = new Map();
		const standardParsers: InstructionParserInfo[] = [
			[SystemProgram.programId.toBase58(), decodeSystemInstruction],
			[spl.TOKEN_PROGRAM_ID.toBase58(), decodeTokenInstruction],
			[spl.TOKEN_2022_PROGRAM_ID.toBase58(), decodeToken2022Instruction],
			[spl.ASSOCIATED_TOKEN_PROGRAM_ID.toBase58(), decodeAssociatedTokenInstruction],
			[StakeProgram.programId.toBase58(), decodeStakeInstruction],
		];

		for (const programInfo of programInfos) {
			this.addParserFromIdl(new PublicKey(programInfo.programId), programInfo.idl);
		}

		let result: InstructionParsers;
		if (!parsers) {
			result = new Map(standardParsers);
		} else {
			// first set provided parsers
			result = new Map(parsers);
			// append standart parsers if parser not exist yet
			for (const parserInfo of standardParsers) {
				if (!result.has(parserInfo[0])) {
					result.set(...parserInfo);
				}
			}
		}

		result.forEach((parser, key) => this.instructionParsers.set(key, parser));
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
		this.instructionDecoders.set(programId, new BorshInstructionCoder(idl));
		this.instructionParsers.set(...this.buildIdlParser(programId, idl));
	}

	isParserAvailble(programId: PublicKey | string): boolean {
		return this.instructionParsers.has(programId);
	}

	retrieveParserReadyProgramIds(): Array<string> {
		const programIds = Array.from(this.instructionParsers.keys());
		return programIds.map((key) => key.toString());
	}

	private buildIdlParser(programId: PublicKey | string, idl: Idl): InstructionParserInfo {
		const idlParser: ParserFunction<typeof idl, InstructionNames<typeof idl>> = (instruction: TransactionInstruction, decoder: BorshInstructionCoder) => {
			const parsedIx = decoder?.decode(instruction.data);
			if (!parsedIx) {
				return this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data);
			} else {
				const ix = idl.instructions.find((instr) => instr.name === parsedIx.name);
				if (!ix) {
					return this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data, parsedIx.name);
				}
				const flatIdlAccounts = flattenIdlAccounts(<IdlAccountItem[]>ix.accounts);
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
					accounts,
					programId: instruction.programId,
					args: parsedIx.data as ParsedIdlArgs<typeof idl, (typeof idl)["instructions"][number]["name"]>, // as IxArgsMap<typeof idl, typeof idl["instructions"][number]["name"]>,
				};
			}
		};

		return [programId, idlParser.bind(this)];
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
			try {
				const parser = this.instructionParsers.get(instruction.programId.toBase58()) as ParserFunction<I, IxName>;
				const decoder = this.instructionDecoders.get(instruction.programId.toBase58()) as BorshInstructionCoder;

				return parser(instruction, decoder);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error("Parser does not matching the instruction args", {
					programId: instruction.programId.toBase58(),
					instructionData: instruction.data.toString("hex"),
				});

				return this.buildUnknownParsedInstruction(instruction.programId, instruction.keys, instruction.data);
			}
		}
	}

	/**
	 * Parses transaction data along with inner instructions
	 * @param tx response to parse
	 * @returns list of parsed instructions
	 */
	parseTransactionWithInnerInstructions<T extends VersionedTransactionResponse>(tx: T): ParsedInstruction<Idl, string>[] {
		const flattened = flattenTransactionResponse(tx);

		return flattened.map(({ parentProgramId, ...ix }) => {
			const parsedIx = this.parseInstruction(ix);
			if (parentProgramId) {
				parsedIx.parentProgramId = parentProgramId;
			}

			return parsedIx;
		});
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
	 * Parses transaction data retrieved from Connection.getParsedTransaction along with the inner instructions
	 * @param txParsedMessage message to parse
	 * @returns list of parsed instructions
	 */
	parseParsedTransactionWithInnerInstructions(txn: ParsedTransactionWithMeta): ParsedInstruction<Idl, string>[] {
		const allInstructions = flattenParsedTransaction(txn);
		const parsedAccounts = txn.transaction.message.accountKeys.map((metaLike) => ({
			isSigner: metaLike.signer,
			isWritable: metaLike.writable,
			pubkey: metaLike.pubkey,
		}));

		return allInstructions.map(({ parentProgramId, ...instruction }) => {
			let parsedIns: ParsedInstruction<Idl, string>;
			if ("data" in instruction) {
				parsedIns = this.parseInstruction(parsedInstructionToInstruction(instruction, parsedAccounts));
			} else {
				parsedIns = this.convertSolanaParsedInstruction(instruction);
			}

			if (parentProgramId) {
				parsedIns.parentProgramId = parentProgramId;
			}

			return parsedIns;
		});
	}

	convertSolanaParsedInstruction(instruction: SolanaParsedInstruction): ParsedInstruction<Idl, string> {
		const parsed = instruction.parsed as { type: string; info: unknown };

		const pId = instruction.programId.toBase58();
		if (pId === MEMO_PROGRAM_V2 || pId === MEMO_PROGRAM_V1) {
			return {
				name: "Memo",
				programId: instruction.programId,
				args: { message: parsed },
				accounts: [],
			};
		}

		return {
			name: parsed.type,
			programId: instruction.programId,
			args: parsed.info,
			accounts: [],
		};
	}

	/**
	 * Fetches tx from blockchain and parses it
	 * @param connection web3 Connection
	 * @param txId transaction id
	 * @param flatten - true if CPI calls need to be parsed too
	 * @returns list of parsed instructions
	 */
	async parseTransaction(
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
	parseTransactionDump(txDump: string | Buffer): ParsedInstruction<Idl, string>[] {
		if (!(txDump instanceof Buffer)) txDump = Buffer.from(txDump, "base64");
		const tx = Transaction.from(txDump);
		const message = tx.compileMessage();

		return this.parseTransactionData(message);
	}
}
