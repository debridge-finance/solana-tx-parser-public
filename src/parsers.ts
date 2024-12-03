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
	PartiallyDecodedInstruction,
	Finality,
	VersionedMessage,
	LoadedAddresses,
} from "@solana/web3.js";
import * as spl from "@solana/spl-token";
import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	AuthorityType,
	TOKEN_PROGRAM_ID,
	TokenInstruction,
	decodeApproveCheckedInstruction,
	decodeApproveInstruction,
	decodeBurnCheckedInstruction,
	decodeBurnInstruction,
	decodeCloseAccountInstruction,
	decodeFreezeAccountInstruction,
	decodeInitializeAccountInstruction,
	decodeInitializeMintInstruction,
	decodeInitializeMintInstructionUnchecked,
	decodeInitializeMultisigInstruction,
	decodeMintToCheckedInstruction,
	decodeMintToInstruction,
	decodeRevokeInstruction,
	decodeSetAuthorityInstruction,
	decodeThawAccountInstruction,
	decodeTransferCheckedInstruction,
	decodeTransferInstruction,
	decodeAmountToUiAmountInstruction,
	decodeHarvestWithheldTokensToMintInstruction,
	decodeInitializeAccount2Instruction,
	decodeInitializeAccount3Instruction,
	decodeInitializeMint2Instruction,
	decodeInitializeImmutableOwnerInstruction,
	decodeInitializeMintCloseAuthorityInstruction,
	decodeInitializePermanentDelegateInstruction,
	decodeSyncNativeInstruction,
	decodeUiAmountToAmountInstruction,
} from "@solana/spl-token";
import { BN, BorshInstructionCoder, Idl, SystemProgram as SystemProgramIdl } from "@coral-xyz/anchor";
import { blob, struct, u8 } from "@solana/buffer-layout";
import { splDiscriminate } from "@solana/spl-type-length-value";

import {
	decodeSetTransferFeeInstruction,
	emitLayout,
	getAccountDataSizeLayout,
	metadataLayout,
	removeKeyLayout,
	updateAuthorityLayout,
	updateMetadataLayout,
} from "./programs/token-extensions";
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
	SplToken,
	UnknownInstruction,
} from "./interfaces";
import {
	compiledInstructionToInstruction,
	flattenTransactionResponse,
	parsedInstructionToInstruction,
	parseTransactionAccounts,
	uncapitalize,
} from "./helpers";

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
		case TokenInstruction.InitializeMint: {
			const decodedIx = decodeInitializeMintInstructionUnchecked(instruction);
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
		case TokenInstruction.InitializeAccount: {
			const decodedIx = decodeInitializeAccountInstruction(instruction);
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
		case TokenInstruction.InitializeMultisig: {
			const decodedIx = decodeInitializeMultisigInstruction(instruction);
			const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig",
				accounts: [{ name: "multisig", ...decodedIx.keys.account }, { name: "rentSysvar", ...decodedIx.keys.rent }, ...multisig],
				args: { m: decodedIx.data.m },
			} as ParsedIdlInstruction<SplToken, "initializeMultisig">;
			break;
		}
		case TokenInstruction.Transfer: {
			const decodedIx = decodeTransferInstruction(instruction);
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
		case TokenInstruction.Approve: {
			const decodedIx = decodeApproveInstruction(instruction);
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
		case TokenInstruction.Revoke: {
			const decodedIx = decodeRevokeInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "revoke",
				accounts: [{ name: "source", ...decodedIx.keys.account }, { name: "owner", ...decodedIx.keys.owner }, ...multisig],
				args: {},
			} as ParsedIdlInstruction<SplToken, "revoke">;
			break;
		}
		case TokenInstruction.SetAuthority: {
			const decodedIx = decodeSetAuthorityInstruction(instruction);
			const authrorityTypeMap = {
				[AuthorityType.AccountOwner]: { accountOwner: {} },
				[AuthorityType.CloseAccount]: { closeAccount: {} },
				[AuthorityType.FreezeAccount]: { freezeAccount: {} },
				[AuthorityType.MintTokens]: { mintTokens: {} },
			};
			if (![AuthorityType.AccountOwner, AuthorityType.CloseAccount, AuthorityType.FreezeAccount, AuthorityType.MintTokens].includes(decodedIx.data.authorityType)) {
				throw new Error('Unexpected authority type for token program')
			}
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "setAuthority",
				accounts: [{ name: "account", ...decodedIx.keys.account }, { name: "currentAuthority", ...decodedIx.keys.currentAuthority }, ...multisig],
				// @ts-ignore
				args: { authorityType: authrorityTypeMap[decodedIx.data.authorityType], newAuthority: decodedIx.data.newAuthority },
			} as ParsedIdlInstruction<SplToken, "setAuthority">;
			break;
		}
		case TokenInstruction.MintTo: {
			const decodedIx = decodeMintToInstruction(instruction);
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
		case TokenInstruction.Burn: {
			const decodedIx = decodeBurnInstruction(instruction);
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
		case TokenInstruction.CloseAccount: {
			const decodedIx = decodeCloseAccountInstruction(instruction);
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
		case TokenInstruction.FreezeAccount: {
			const decodedIx = decodeFreezeAccountInstruction(instruction);
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
		case TokenInstruction.ThawAccount: {
			const decodedIx = decodeThawAccountInstruction(instruction);
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
		case TokenInstruction.TransferChecked: {
			const decodedIx = decodeTransferCheckedInstruction(instruction);
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
		case TokenInstruction.ApproveChecked: {
			const decodedIx = decodeApproveCheckedInstruction(instruction);
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
		case TokenInstruction.MintToChecked: {
			const decodedIx = decodeMintToCheckedInstruction(instruction);
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
		case TokenInstruction.BurnChecked: {
			const decodedIx = decodeBurnCheckedInstruction(instruction);
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
		case TokenInstruction.InitializeAccount2: {
			const decodedIx = decodeInitializeAccount2Instruction(instruction);
			parsed = {
				name: "initializeAccount2",
				accounts: [
					{ name: "newAccount", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "rentSysvar", ...decodedIx.keys.rent },
				],
				args: { owner: new PublicKey(decodedIx.data.owner) },
			} as ParsedIdlInstruction<SplToken, "initializeAccount2">;
			break;
		}
		case TokenInstruction.SyncNative: {
			const decodedIx = decodeSyncNativeInstruction(instruction);
			parsed = {
				name: "syncNative",
				accounts: [{ name: "account", ...decodedIx.keys.account }],
				args: {},
			} as ParsedIdlInstruction<SplToken, "syncNative">;
			break;
		}
		case TokenInstruction.InitializeAccount3: {
			const decodedIx = decodeInitializeAccount3Instruction(instruction);
			parsed = {
				name: "initializeAccount3",
				accounts: [
					{ name: "newAccount", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
				],
				args: { owner: new PublicKey(decodedIx.data.owner) },
			} as ParsedIdlInstruction<SplToken, "initializeAccount3">;
			break;
		}
		case TokenInstruction.InitializeMultisig2: {
			const multisig = instruction.keys.slice(1).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig2",
				accounts: [{ name: "multisig", ...instruction.keys[0] }, ...multisig],
				args: { m: instruction.data[1] },
			} as ParsedIdlInstruction<SplToken, "initializeMultisig2">;
			break;
		}
		case TokenInstruction.InitializeMint2: {
			const decodedIx = decodeInitializeMint2Instruction(instruction);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse InitializeMint2 instruction`);
			parsed = {
				name: "initializeMint2",
				accounts: [{ name: "tokenMint", ...tokenMint }],
				args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken, "initializeMint2">;
			break;
		}
		case TokenInstruction.GetAccountDataSize: {
			// TODO: ix missing in the idl for now
			break;
		}
		case TokenInstruction.InitializeImmutableOwner: {
			const decodedIx = decodeInitializeImmutableOwnerInstruction(instruction, instruction.programId);
			parsed = {
				name: "initializeImmutableOwner",
				accounts: [{ name: "account", ...decodedIx.keys.account }],
				args: {},
			} as ParsedIdlInstruction<SplToken, "initializeImmutableOwner">;
			break;
		}
		case TokenInstruction.AmountToUiAmount: {
			const decodedIx = decodeAmountToUiAmountInstruction(instruction);
			parsed = {
				name: "amountToUiAmount",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken, "amountToUiAmount">;
			break;
		}
		case TokenInstruction.UiAmountToAmount: {
			const decodedIx = decodeUiAmountToAmountInstruction(instruction);
			parsed = {
				name: "uiAmountToAmount",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { uiAmount: new BN(decodedIx.data.amount).toString() },
			} as ParsedIdlInstruction<SplToken, "uiAmountToAmount">;
			break;
		}
		case TokenInstruction.InitializeMintCloseAuthority: {
			// TODO: ix missing in the idl for now
			const decodedIx = decodeInitializeMintCloseAuthorityInstruction(instruction, instruction.programId);
			// parsed = {
			// 	name: "",
			// 	accounts: [{ name: "mint", ...decodedIx.keys.mint }],
			// 	args: { uiAmount: new BN(decodedIx.data.amount).toString() },
			// } as ParsedIdlInstruction<SplToken, "">;
			break;
		}
		case TokenInstruction.TransferFeeExtension: {
			// TODO: ix missing in the idl for now
			// const decodedIx = (instruction);
			// parsed = {
			// 	name: "uiAmountToAmount",
			// 	accounts: [{ name: "mint", ...decodedIx.keys.mint }],
			// 	args: { uiAmount: new BN(decodedIx.data.amount).toString() },
			// } as ParsedIdlInstruction<SplToken, "">;
			break;
		}
		case TokenInstruction.ConfidentialTransferExtension: {
			// TODO: ix missing in the idl for now
			break;
		}
		case TokenInstruction.DefaultAccountStateExtension: {
			// TODO: ix missing in the idl for now
			break;
		}
		case TokenInstruction.Reallocate: {
			// TODO: ix missing in the idl for now
			break;
		}
		case TokenInstruction.MemoTransferExtension: {
			// TODO: ix missing in the idl for now
			break;
		}
		case TokenInstruction.CreateNativeMint: {
			// TODO: ix missing in the idl for now
			break;
		}
		case TokenInstruction.InitializeNonTransferableMint: {
			break;
		}
		case TokenInstruction.InterestBearingMintExtension: {
			break;
		}
		case TokenInstruction.CpiGuardExtension: {
			break;
		}
		case TokenInstruction.InitializePermanentDelegate: {
			// TODO: ix missing in the idl for now
			// const decoded = decodeInitializePermanentDelegateInstruction(instruction, instruction.programId);
			break;
		}
		case TokenInstruction.TransferHookExtension: {
			break;
		}
		case TokenInstruction.MetadataPointerExtension: {
			break;
		}
		case TokenInstruction.GroupPointerExtension: {
			break;
		}
		case TokenInstruction.GroupMemberPointerExtension: {
			break;
		}
		default: {
			parsed = null;
		}
	}

	return parsed
		? {
				...parsed,
				programId: TOKEN_PROGRAM_ID,
		  }
		: {
				programId: TOKEN_PROGRAM_ID,
				name: "unknown",
				accounts: instruction.keys,
				args: { unknown: instruction.data },
		  };
}

async function decodeToken2022Instruction(instruction: TransactionInstruction): Promise<ParsedInstruction<SplToken>> {
	let parsed: ParsedIdlInstruction<SplToken22> | null;
	const decoded = u8().decode(instruction.data);
	switch (decoded) {
		case spl.TokenInstruction.InitializeMint: {
			const decodedIx = spl.decodeInitializeMintInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			parsed = {
				name: "initialize_mint",
				accounts: [
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "rent", ...decodedIx.keys.rent },
				],
				args: { decimals: decodedIx.data.decimals, mint_authority: decodedIx.data.mintAuthority, freeze_authority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken22, "initialize_mint">;
			break;
		}
		case spl.TokenInstruction.InitializeAccount: {
			const decodedIx = spl.decodeInitializeAccountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			parsed = {
				name: "initialize_account",
				accounts: [
					{ name: "newAccount", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.owner },
					{ name: "rentSysvar", ...decodedIx.keys.rent },
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "initialize_account">;
			break;
		}
		case spl.TokenInstruction.InitializeMultisig: {
			const decodedIx = spl.decodeInitializeMultisigInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initialize_multisig",
				accounts: [{ name: "multisig", ...decodedIx.keys.account }, { name: "rentSysvar", ...decodedIx.keys.rent }, ...multisig],
				args: { m: decodedIx.data.m },
			} as ParsedIdlInstruction<SplToken22, "initialize_multisig">;
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
				name: "set_authority",
				accounts: [{ name: "account", ...decodedIx.keys.account }, { name: "current_authority", ...decodedIx.keys.currentAuthority }, ...multisig],
				args: { authority_type: Number(decodedIx.data.authorityType), new_authority: decodedIx.data.newAuthority },
				programId: spl.TOKEN_2022_PROGRAM_ID,
			} as ParsedIdlInstruction<SplToken22, "set_authority">;
			break;
		}
		case spl.TokenInstruction.MintTo: {
			const decodedIx = spl.decodeMintToInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "mint_to",
				accounts: [
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "mintTo", ...decodedIx.keys.destination },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "mint_to">;
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
				name: "close_account",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "close_account">;
			break;
		}
		case spl.TokenInstruction.FreezeAccount: {
			const decodedIx = spl.decodeFreezeAccountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "freeze_account",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "freeze_account">;
			break;
		}
		case spl.TokenInstruction.ThawAccount: {
			const decodedIx = spl.decodeThawAccountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "thaw_account",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "thaw_account">;
			break;
		}
		case spl.TokenInstruction.TransferChecked: {
			const decodedIx = spl.decodeTransferCheckedInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "transfer_checked",
				accounts: [
					{ name: "source", ...decodedIx.keys.source },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "transfer_checked">;
			break;
		}
		case spl.TokenInstruction.ApproveChecked: {
			const decodedIx = spl.decodeApproveCheckedInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "approve_checked",
				accounts: [
					{ name: "source", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "delegate", ...decodedIx.keys.delegate },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "approve_checked">;
			break;
		}
		case spl.TokenInstruction.MintToChecked: {
			const decodedIx = spl.decodeMintToCheckedInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "mint_to_checked",
				accounts: [
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "mintTo", ...decodedIx.keys.destination },
					{ name: "authority", ...decodedIx.keys.authority },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "mint_to_checked">;
			break;
		}
		case spl.TokenInstruction.BurnChecked: {
			const decodedIx = spl.decodeBurnCheckedInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "burn_checked",
				accounts: [
					{ name: "burnFrom", ...decodedIx.keys.account },
					{ name: "tokenMint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "burn_checked">;
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
				name: "initialize_account2",
				accounts: [
					{ name: "newAccount", ...instruction.keys[0] },
					{ name: "tokenMint", ...instruction.keys[1] },
					{ name: "rentSysvar", ...instruction.keys[2] },
				],
				args: { owner: new PublicKey(decodedIx.owner) },
			} as ParsedIdlInstruction<SplToken22, "initialize_account2">;
			break;
		}
		case spl.TokenInstruction.SyncNative: {
			parsed = {
				name: "sync_native",
				accounts: [{ name: "account", ...instruction.keys[0] }],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "sync_native">;
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
				name: "initialize_account3",
				accounts: [
					{ name: "newAccount", ...instruction.keys[0] },
					{ name: "tokenMint", ...instruction.keys[1] },
				],
				args: { owner: new PublicKey(decodedIx.owner) },
			} as ParsedIdlInstruction<SplToken22, "initialize_account3">;
			break;
		}
		case spl.TokenInstruction.InitializeMultisig2: {
			const multisig = instruction.keys.slice(1).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initialize_multisig2",
				accounts: [{ name: "multisig", ...instruction.keys[0] }, ...multisig],
				args: { m: instruction.data[1] },
			} as ParsedIdlInstruction<SplToken22, "initialize_multisig2">;
			break;
		}
		case spl.TokenInstruction.InitializeMint2: {
			const decodedIx = spl.decodeInitializeMintInstructionUnchecked(instruction);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse InitializeMint2 instruction`);
			parsed = {
				name: "initialize_mint2",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { decimals: decodedIx.data.decimals, mint_authority: decodedIx.data.mintAuthority, freeze_authority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken22, "initialize_mint2">;
			break;
		}
		case spl.TokenInstruction.GetAccountDataSize: {
			const tokenMint = instruction.keys[0].pubkey;
			if (!tokenMint) throw new Error(`Failed to parse GetAccountDataSize instruction`);
			const instructionData = getAccountDataSizeLayout.decode(instruction.data);
			parsed = {
				name: "get_account_data_size",
				accounts: [{ name: "mint", ...instruction.keys[0] }],
				args: { extensionTypes: instructionData.extensions.map((ext) => spl.ExtensionType[ext]) },
			} as unknown as ParsedIdlInstruction<SplToken22, "get_account_data_size">;
			break;
		}
		case spl.TokenInstruction.InitializeImmutableOwner: {
			const decodedIx = spl.decodeInitializeImmutableOwnerInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const account = decodedIx.keys.account;
			if (!account) throw new Error(`Failed to parse InitializeImmutableOwner instruction`);
			parsed = {
				name: "initialize_immutable_owner",
				accounts: [{ name: "account", ...decodedIx.keys.account }],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "initialize_immutable_owner">;
			break;
		}
		case spl.TokenInstruction.AmountToUiAmount: {
			const decodedIx = spl.decodeAmountToUiAmountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse AmountToUiAmount instruction`);
			parsed = {
				name: "amount_to_ui_amount",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "amount_to_ui_amount">;
			break;
		}
		case spl.TokenInstruction.UiAmountToAmount: {
			const decodedIx = spl.decodeUiAmountToAmountInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse UiAmountToAmount instruction`);
			parsed = {
				name: "ui_amount_to_amount",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { ui_amount: decodedIx.data.amount },
			} as ParsedIdlInstruction<SplToken22, "ui_amount_to_amount">;
			break;
		}
		case spl.TokenInstruction.InitializeMintCloseAuthority: {
			const decodedIx = spl.decodeInitializeMintCloseAuthorityInstruction(instruction, spl.TOKEN_2022_PROGRAM_ID);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse InitializeMintCloseAuthority instruction`);
			parsed = {
				name: "initialize_mint_close_authority",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { close_authority: decodedIx.data.closeAuthority },
			} as ParsedIdlInstruction<SplToken22, "initialize_mint_close_authority">;
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
			const [splDiscriminateInit, splDiscriminateUpdating, splDiscriminateRemove, splDiscriminateUpdate, splDiscriminateEmitter] = await Promise.all([
				splDiscriminate("spl_token_metadata_interface:initialize_account"),
				splDiscriminate("spl_token_metadata_interface:updating_field"),
				splDiscriminate("spl_token_metadata_interface:remove_key_ix"),
				splDiscriminate("spl_token_metadata_interface:update_the_authority"),
				splDiscriminate("spl_token_metadata_interface:emitter"),
			]);

			switch (discriminator) {
				case splDiscriminateInit.toString(): {
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
				case splDiscriminateUpdating.toString(): {
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
				case splDiscriminateRemove.toString(): {
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
				case splDiscriminateUpdate.toString(): {
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
				case splDiscriminateEmitter.toString(): {
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
		? { ...parsed, programId: spl.TOKEN_2022_PROGRAM_ID }
		: { programId: spl.TOKEN_2022_PROGRAM_ID, name: "unknown", accounts: instruction.keys, args: { unknown: instruction.data } };
}

function decodeAssociatedTokenInstruction(instruction: TransactionInstruction): ParsedInstruction<AssociatedTokenProgramIdlLike> {
	return {
		name: instruction.data[0] == 0 ? "createAssociatedTokenAccountIdempotent" : "createAssociatedTokenAccount",
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
		programId: ASSOCIATED_TOKEN_PROGRAM_ID,
	} as ParsedInstruction<AssociatedTokenProgramIdlLike, "createAssociatedTokenAccount" | "createAssociatedTokenAccountIdempotent">;
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
			[ASSOCIATED_TOKEN_PROGRAM_ID.toBase58(), decodeAssociatedTokenInstruction],
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
	parseTransactionDump(txDump: string | Buffer): ParsedInstruction<Idl, string>[] {
		if (!(txDump instanceof Buffer)) txDump = Buffer.from(txDump, "base64");
		const tx = Transaction.from(txDump);
		const message = tx.compileMessage();

		return this.parseTransactionData(message);
	}
}
