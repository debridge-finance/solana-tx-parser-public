import { Buffer } from "buffer";

import {
	PublicKey,
	TransactionInstruction,
	SystemInstruction,
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
	decodeInitializeAccount2Instruction,
	decodeInitializeAccount3Instruction,
	decodeInitializeMint2Instruction,
	decodeInitializeImmutableOwnerInstruction,
	decodeInitializeMintCloseAuthorityInstruction,
	decodeSyncNativeInstruction,
	decodeUiAmountToAmountInstruction,
	TOKEN_2022_PROGRAM_ID,
	ExtensionType,
	TransferFeeInstruction,
	decodeInitializeTransferFeeConfigInstruction,
	decodeTransferCheckedWithFeeInstruction,
	decodeWithdrawWithheldTokensFromMintInstruction,
	decodeWithdrawWithheldTokensFromAccountsInstruction,
	decodeHarvestWithheldTokensToMintInstruction,
	DefaultAccountStateInstruction,
	AccountState,
	defaultAccountStateInstructionData,
	memoTransferInstructionData,
	MemoTransferInstruction,
	cpiGuardInstructionData,
	CpiGuardInstruction,
	decodeInitializePermanentDelegateInstruction,
	TransferHookInstruction,
	initializeTransferHookInstructionData,
	updateTransferHookInstructionData,
	MetadataPointerInstruction,
	initializeMetadataPointerData,
	updateMetadataPointerData,
	GroupPointerInstruction,
	initializeGroupPointerData,
	updateGroupPointerData,
	GroupMemberPointerInstruction,
	initializeGroupMemberPointerData,
	updateGroupMemberPointerData,
	decodeSetTransferFeeInstruction,
} from "@solana/spl-token";
import { BN, BorshInstructionCoder, Idl, SystemProgram as SystemProgramIdl } from "@coral-xyz/anchor";
import { splDiscriminate } from "@solana/spl-type-length-value";

import {
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
	IdlInstructionAccountItem2,
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
import { compiledInstructionToInstruction, flattenTransactionResponse, parsedInstructionToInstruction, parseTransactionAccounts } from "./helpers";

function decodeSystemInstruction(instruction: TransactionInstruction): ParsedInstruction<SystemProgramIdl> {
	const ixType = SystemInstruction.decodeInstructionType(instruction);
	let parsed: ParsedIdlInstruction<SystemProgramIdl> | null;
	switch (ixType) {
		case "AdvanceNonceAccount": {
			const decoded = SystemInstruction.decodeNonceAdvance(instruction);

			parsed = {
				name: "advanceNonceAccount",
				args: { authorized: decoded.authorizedPubkey },
				accounts: [
					{ name: "nonce", isSigner: false, isWritable: true, pubkey: instruction.keys[0].pubkey },
					{ name: "recentBlockhashes", isSigner: false, isWritable: false, pubkey: instruction.keys[1].pubkey },
					{ name: "authorized", isSigner: true, isWritable: false, pubkey: instruction.keys[2].pubkey },
				],
			} as ParsedIdlInstruction<SystemProgramIdl, "advanceNonceAccount">;
			break;
		}
		case "Allocate": {
			const decoded = SystemInstruction.decodeAllocate(instruction);
			parsed = {
				name: "allocate",
				accounts: [{ name: "pubkey", pubkey: decoded.accountPubkey, isSigner: true, isWritable: true }],
				args: { space: new BN(decoded.space) },
			} as ParsedIdlInstruction<SystemProgramIdl, "allocate">;
			break;
		}
		case "AllocateWithSeed": {
			const decoded = SystemInstruction.decodeAllocateWithSeed(instruction);
			parsed = {
				name: "allocateWithSeed",
				accounts: [
					{ name: "account", pubkey: decoded.accountPubkey, isSigner: false, isWritable: true },
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
				accounts: [{ name: "pubkey", pubkey: decoded.accountPubkey, isSigner: true, isWritable: true }],
				args: { owner: decoded.programId },
			} as ParsedIdlInstruction<SystemProgramIdl, "assign">;
			break;
		}
		case "AssignWithSeed": {
			const decoded = SystemInstruction.decodeAssignWithSeed(instruction);
			parsed = {
				name: "assignWithSeed",
				accounts: [
					{ name: "account", pubkey: decoded.accountPubkey, isSigner: false, isWritable: true },
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
					{ name: "authorized", isSigner: true, isWritable: false, pubkey: decoded.authorizedPubkey },
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
					{ name: "from", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
					{ name: "to", pubkey: decoded.newAccountPubkey, isSigner: true, isWritable: true },
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
					{ name: "from", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
					{ name: "to", pubkey: decoded.newAccountPubkey, isSigner: false, isWritable: true },
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
					{ name: "nonce", pubkey: decoded.noncePubkey, isSigner: true, isWritable: true },
					{ name: "recentBlockhashes", isSigner: false, isWritable: false, pubkey: instruction.keys[1].pubkey },
					{ name: "rent", isSigner: false, isWritable: false, pubkey: instruction.keys[2].pubkey },
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
					{ name: "from", pubkey: decoded.fromPubkey, isSigner: true, isWritable: true },
					{ name: "to", pubkey: decoded.toPubkey, isWritable: true, isSigner: false },
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
					{ name: "from", pubkey: decoded.fromPubkey, isSigner: false, isWritable: true },
					{ name: "base", pubkey: decoded.basePubkey, isSigner: true, isWritable: false },
					{ name: "to", pubkey: decoded.toPubkey, isSigner: false, isWritable: true },
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
					{ name: "to", pubkey: decoded.toPubkey, isSigner: false, isWritable: true },
					{ name: "recentBlockhashes", isSigner: false, isWritable: false, pubkey: instruction.keys[2].pubkey },
					{ name: "rent", isSigner: false, isWritable: false, pubkey: instruction.keys[3].pubkey },
					{ name: "authorized", pubkey: decoded.noncePubkey, isSigner: true, isWritable: false },
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
	let parsed: ParsedIdlInstruction<SplToken> | null = null;
	const decoded = instruction.data[0];
	switch (decoded) {
		case TokenInstruction.InitializeMint: {
			const decodedIx = decodeInitializeMintInstructionUnchecked(instruction);
			parsed = {
				name: "initializeMint",
				accounts: [
					{ name: "mint", isSigner: false, isWritable: true, pubkey: instruction.keys[0].pubkey },
					{ name: "rent", isSigner: false, isWritable: false, pubkey: instruction.keys[1].pubkey },
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
					{ name: "account", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.owner },
					{ name: "rent", ...decodedIx.keys.rent },
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
				accounts: [{ name: "multisig", ...decodedIx.keys.account }, { name: "rent", ...decodedIx.keys.rent }, ...multisig],
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
					{ name: "authority", ...decodedIx.keys.owner },
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
			if (
				![AuthorityType.AccountOwner, AuthorityType.CloseAccount, AuthorityType.FreezeAccount, AuthorityType.MintTokens].includes(
					decodedIx.data.authorityType,
				)
			) {
				throw new Error("Unexpected authority type for token program");
			}
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "setAuthority",
				accounts: [{ name: "owned", ...decodedIx.keys.account }, { name: "owner", ...decodedIx.keys.currentAuthority }, ...multisig],
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "account", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.authority },
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
					{ name: "account", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "authority", ...decodedIx.keys.owner },
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
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.authority },
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
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.authority },
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
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "authority", ...decodedIx.keys.owner },
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
					{ name: "mint", ...decodedIx.keys.mint },
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
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "account", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.authority },
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
					{ name: "account", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "authority", ...decodedIx.keys.owner },
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
					{ name: "account", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "rent", ...decodedIx.keys.rent },
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
					{ name: "account", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
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
				accounts: [{ name: "mint", ...tokenMint }],
				args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken, "initializeMint2">;
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

function decodeToken2022Instruction(instruction: TransactionInstruction): ParsedInstruction<SplToken22> {
	let parsed: ParsedIdlInstruction<SplToken22> | null;
	const decoded = instruction.data[0];
	switch (decoded) {
		case TokenInstruction.InitializeMint: {
			const decodedIx = decodeInitializeMintInstructionUnchecked(instruction);
			parsed = {
				name: "initializeMint",
				accounts: [
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "rent", ...decodedIx.keys.rent },
				],
				args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken22, "initializeMint">;
			break;
		}
		case TokenInstruction.InitializeAccount: {
			const decodedIx = decodeInitializeAccountInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			parsed = {
				name: "initializeAccount",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.owner },
					{ name: "rent", ...decodedIx.keys.rent },
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "initializeAccount">;
			break;
		}
		case TokenInstruction.InitializeMultisig: {
			const decodedIx = decodeInitializeMultisigInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig",
				accounts: [{ name: "multisig", ...decodedIx.keys.account }, { name: "rent", ...decodedIx.keys.rent }, ...multisig],
				args: { m: decodedIx.data.m },
			} as ParsedIdlInstruction<SplToken22, "initializeMultisig">;
			break;
		}
		case TokenInstruction.Transfer: {
			const decodedIx = decodeTransferInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "transfer",
				accounts: [
					{ name: "source", ...decodedIx.keys.source },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "authority", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "transfer">;
			break;
		}
		case TokenInstruction.Approve: {
			const decodedIx = decodeApproveInstruction(instruction, TOKEN_2022_PROGRAM_ID);
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
		case TokenInstruction.Revoke: {
			const decodedIx = decodeRevokeInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "revoke",
				accounts: [{ name: "source", ...decodedIx.keys.account }, { name: "owner", ...decodedIx.keys.owner }, ...multisig],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "revoke">;
			break;
		}
		case TokenInstruction.SetAuthority: {
			const decodedIx = decodeSetAuthorityInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			const authrorityTypeMap = {
				[AuthorityType.AccountOwner]: { AccountOwner: {} },
				[AuthorityType.CloseAccount]: { CloseAccount: {} },
				[AuthorityType.FreezeAccount]: { FreezeAccount: {} },
				[AuthorityType.MintTokens]: { MintTokens: {} },
				[AuthorityType.CloseMint]: { CloseMint: {} },
				[AuthorityType.ConfidentialTransferFeeConfig]: { ConfidentialTransferFeeConfig: {} },
				[AuthorityType.ConfidentialTransferMint]: { ConfidentialTransferMint: {} },
				[AuthorityType.GroupMemberPointer]: { GroupMemberPointer: {} },
				[AuthorityType.GroupPointer]: { GroupPointer: {} },
				[AuthorityType.InterestRate]: { InterestRate: {} },
				[AuthorityType.MetadataPointer]: { MetadataPointer: {} },
				[AuthorityType.PermanentDelegate]: { PermanentDelegate: {} },
				[AuthorityType.TransferFeeConfig]: { TransferFeeConfig: {} },
				[AuthorityType.TransferHookProgramId]: { TransferHookProgramId: {} },
				[AuthorityType.WithheldWithdraw]: { WithheldWithdraw: {} },
			};
			parsed = {
				name: "setAuthority",
				accounts: [{ name: "owned", ...decodedIx.keys.account }, { name: "owner", ...decodedIx.keys.currentAuthority }, ...multisig],
				args: { authorityType: authrorityTypeMap[decodedIx.data.authorityType], newAuthority: decodedIx.data.newAuthority },
				programId: TOKEN_2022_PROGRAM_ID,
			} as ParsedIdlInstruction<SplToken22, "setAuthority">;
			break;
		}
		case TokenInstruction.MintTo: {
			const decodedIx = decodeMintToInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "mintTo",
				accounts: [
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "account", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.authority },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "mintTo">;
			break;
		}
		case TokenInstruction.Burn: {
			const decodedIx = decodeBurnInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "burn",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "authority", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "burn">;
			break;
		}
		case TokenInstruction.CloseAccount: {
			const decodedIx = decodeCloseAccountInstruction(instruction, TOKEN_2022_PROGRAM_ID);
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
		case TokenInstruction.FreezeAccount: {
			const decodedIx = decodeFreezeAccountInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "freezeAccount",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "freezeAccount">;
			break;
		}
		case TokenInstruction.ThawAccount: {
			const decodedIx = decodeThawAccountInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "thawAccount",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "owner", ...decodedIx.keys.authority },
					...multisig,
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "thawAccount">;
			break;
		}
		case TokenInstruction.TransferChecked: {
			const decodedIx = decodeTransferCheckedInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "transferChecked",
				accounts: [
					{ name: "source", ...decodedIx.keys.source },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "destination", ...decodedIx.keys.destination },
					{ name: "authority", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "transferChecked">;
			break;
		}
		case TokenInstruction.ApproveChecked: {
			const decodedIx = decodeApproveCheckedInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "approveChecked",
				accounts: [
					{ name: "source", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "delegate", ...decodedIx.keys.delegate },
					{ name: "owner", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "approveChecked">;
			break;
		}
		case TokenInstruction.MintToChecked: {
			const decodedIx = decodeMintToCheckedInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "mintToChecked",
				accounts: [
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "account", ...decodedIx.keys.destination },
					{ name: "owner", ...decodedIx.keys.authority },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "mintToChecked">;
			break;
		}
		case TokenInstruction.BurnChecked: {
			const decodedIx = decodeBurnCheckedInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "burnChecked",
				accounts: [
					{ name: "account", ...decodedIx.keys.account },
					{ name: "mint", ...decodedIx.keys.mint },
					{ name: "authority", ...decodedIx.keys.owner },
					...multisig,
				],
				args: { amount: new BN(decodedIx.data.amount.toString()), decimals: decodedIx.data.decimals },
			} as ParsedIdlInstruction<SplToken22, "burnChecked">;
			break;
		}
		case TokenInstruction.InitializeAccount2: {
			const decodedIx = decodeInitializeAccount2Instruction(instruction, TOKEN_2022_PROGRAM_ID);
			parsed = {
				name: "initializeAccount2",
				accounts: [
					{ name: "account", ...instruction.keys[0] },
					{ name: "mint", ...instruction.keys[1] },
					{ name: "rent", ...instruction.keys[2] },
				],
				args: { owner: new PublicKey(decodedIx.data.owner) },
			} as ParsedIdlInstruction<SplToken22, "initializeAccount2">;
			break;
		}
		case TokenInstruction.SyncNative: {
			parsed = {
				name: "syncNative",
				accounts: [{ name: "account", ...instruction.keys[0] }],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "syncNative">;
			break;
		}
		case TokenInstruction.InitializeAccount3: {
			const decodedIx = decodeInitializeAccount3Instruction(instruction, instruction.programId);
			parsed = {
				name: "initializeAccount3",
				accounts: [
					{ name: "account", ...instruction.keys[0] },
					{ name: "mint", ...instruction.keys[1] },
				],
				args: { owner: new PublicKey(decodedIx.data.owner) },
			} as ParsedIdlInstruction<SplToken22, "initializeAccount3">;
			break;
		}
		case TokenInstruction.InitializeMultisig2: {
			const multisig = instruction.keys.slice(1).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig2",
				accounts: [{ name: "multisig", ...instruction.keys[0] }, ...multisig],
				args: { m: instruction.data[1] },
			} as ParsedIdlInstruction<SplToken22, "initializeMultisig2">;
			break;
		}
		case TokenInstruction.InitializeMint2: {
			const decodedIx = decodeInitializeMint2Instruction(instruction);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse InitializeMint2 instruction`);
			parsed = {
				name: "initializeMint2",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken22, "initializeMint2">;
			break;
		}
		case TokenInstruction.GetAccountDataSize: {
			const tokenMint = instruction.keys[0].pubkey;
			if (!tokenMint) throw new Error(`Failed to parse GetAccountDataSize instruction`);
			const instructionData = getAccountDataSizeLayout.decode(instruction.data);
			const types = instructionData.extensions.map<Partial<Record<keyof typeof ExtensionType, Record<string, never>>>>((ext) => ({
				[ExtensionType[ext]]: {},
			}));

			parsed = {
				name: "getAccountDataSize",
				programId: instruction.programId,
				accounts: [{ name: "mint", isSigner: false, isWritable: false, pubkey: instruction.keys[0].pubkey }],
				args: {
					extensionTypes: types,
				},
			} as ParsedIdlInstruction<SplToken22, "getAccountDataSize">;
			break;
		}
		case TokenInstruction.InitializeImmutableOwner: {
			const decodedIx = decodeInitializeImmutableOwnerInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const account = decodedIx.keys.account;
			if (!account) throw new Error(`Failed to parse InitializeImmutableOwner instruction`);
			parsed = {
				name: "initializeImmutableOwner",
				accounts: [{ name: "tokenAccount", ...decodedIx.keys.account }],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "initializeImmutableOwner">;
			break;
		}
		case TokenInstruction.AmountToUiAmount: {
			const decodedIx = decodeAmountToUiAmountInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse AmountToUiAmount instruction`);
			parsed = {
				name: "amountToUiAmount",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplToken22, "amountToUiAmount">;
			break;
		}
		case TokenInstruction.UiAmountToAmount: {
			const decodedIx = decodeUiAmountToAmountInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse UiAmountToAmount instruction`);
			parsed = {
				name: "uiAmountToAmount",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { uiAmount: decodedIx.data.amount },
			} as ParsedIdlInstruction<SplToken22, "uiAmountToAmount">;
			break;
		}
		case TokenInstruction.InitializeMintCloseAuthority: {
			const decodedIx = decodeInitializeMintCloseAuthorityInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse InitializeMintCloseAuthority instruction`);
			parsed = {
				name: "initializeMintCloseAuthority",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { closeAuthority: decodedIx.data.closeAuthority },
			} as ParsedIdlInstruction<SplToken22, "initializeMintCloseAuthority">;
			break;
		}
		case TokenInstruction.CreateNativeMint: {
			const payer = instruction.keys[0].pubkey;
			if (!payer) throw new Error(`Failed to parse CreateNativeMint instruction`);
			parsed = {
				name: "createNativeMint",
				accounts: [
					{ name: "payer", isSigner: true, isWritable: true, pubkey: instruction.keys[0].pubkey },
					{ name: "crateNativeMint", isSigner: false, isWritable: true, pubkey: instruction.keys[1].pubkey },
					{ name: "systemProgram", isSigner: false, isWritable: false, pubkey: instruction.keys[2].pubkey },
				],
				args: {},
			} as ParsedIdlInstruction<SplToken22, "createNativeMint">;
			break;
		}
		case TokenInstruction.TransferFeeExtension: {
			const discriminator = instruction.data[1];
			switch (discriminator) {
				case TransferFeeInstruction.InitializeTransferFeeConfig: {
					const decodedIx = decodeInitializeTransferFeeConfigInstruction(instruction, TOKEN_2022_PROGRAM_ID);
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
				case TransferFeeInstruction.TransferCheckedWithFee: {
					const decodedIx = decodeTransferCheckedWithFeeInstruction(instruction, TOKEN_2022_PROGRAM_ID);
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
						// @ts-ignore - Expression produces a union type that is too complex to represent. We don't need type checks here
						parsed.accounts.push(...multisig);
					}
					break;
				}
				case TransferFeeInstruction.WithdrawWithheldTokensFromMint: {
					const decodedIx = decodeWithdrawWithheldTokensFromMintInstruction(instruction, TOKEN_2022_PROGRAM_ID);
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
				case TransferFeeInstruction.WithdrawWithheldTokensFromAccounts: {
					const decodedIx = decodeWithdrawWithheldTokensFromAccountsInstruction(instruction, TOKEN_2022_PROGRAM_ID);
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
				case TransferFeeInstruction.HarvestWithheldTokensToMint: {
					const decodedIx = decodeHarvestWithheldTokensToMintInstruction(instruction, TOKEN_2022_PROGRAM_ID);
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
				case TransferFeeInstruction.SetTransferFee: {
					const decodedIx = decodeSetTransferFeeInstruction(instruction, TOKEN_2022_PROGRAM_ID);
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
		case TokenInstruction.DefaultAccountStateExtension: {
			const discriminator = instruction.data[1];
			switch (discriminator) {
				case DefaultAccountStateInstruction.Initialize: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse InitializeDefaultAccountState instruction`);
					const instructionData = defaultAccountStateInstructionData.decode(instruction.data);
					parsed = {
						name: "initializeDefaultAccountState",
						accounts: [{ name: "mint", ...instruction.keys[0] }],
						args: { accountState: AccountState[instructionData.accountState] },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case DefaultAccountStateInstruction.Update: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse UpdateDefaultAccountState instruction`);
					const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
					const instructionData = defaultAccountStateInstructionData.decode(instruction.data);
					parsed = {
						name: "updateDefaultAccountState",
						accounts: [{ name: "mint", ...instruction.keys[0] }, { name: "freezeAuthority", ...instruction.keys[1] }, { ...multisig }],
						args: { accountState: AccountState[instructionData.accountState] },
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
		case TokenInstruction.MemoTransferExtension: {
			const account = instruction.keys[0].pubkey;
			if (!account) throw new Error(`Failed to parse MemoTransfersInstruction instruction`);
			const instructionData = memoTransferInstructionData.decode(instruction.data);
			parsed = {
				name: "memoTransfersInstruction",
				accounts: [{ name: "account", ...instruction.keys[0] }, { name: "authority", ...instruction.keys[1] }, { ...instruction.keys.slice(2) }],
				args: { memoTransferInstruction: MemoTransferInstruction[instructionData.memoTransferInstruction] },
			} as unknown as ParsedIdlInstruction<any>;
			break;
		}
		case TokenInstruction.InitializeNonTransferableMint: {
			const mint = instruction.keys[0].pubkey;
			if (!mint) throw new Error(`Failed to parse InitializeNonTransferableMint instruction`);
			parsed = {
				name: "initializeNonTransferableMint",
				accounts: [{ name: "mint", ...instruction.keys[0] }],
				args: {},
			} as unknown as ParsedIdlInstruction<any>;
			break;
		}
		case TokenInstruction.CpiGuardExtension: {
			const account = instruction.keys[0].pubkey;
			if (!account) throw new Error(`Failed to parse CreateCpiGuardInstruction instruction`);
			const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			const instructionData = cpiGuardInstructionData.decode(instruction.data);
			parsed = {
				name: "createCpiGuardInstruction",
				accounts: [{ name: "account", ...instruction.keys[0] }, { name: "authority", ...instruction.keys[1] }, { ...multisig }],
				args: { cpiGuardInstruction: CpiGuardInstruction[instructionData.cpiGuardInstruction] },
			} as unknown as ParsedIdlInstruction<any>;
			break;
		}
		case TokenInstruction.InitializePermanentDelegate: {
			const mint = instruction.keys[0].pubkey;
			if (!mint) throw new Error(`Failed to parse InitializePermanentDelegate instruction`);
			const decodedIx = decodeInitializePermanentDelegateInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			parsed = {
				name: "initializePermanentDelegate",
				accounts: [{ name: "account", ...decodedIx.keys.mint }],
				args: { delegate: decodedIx.data.delegate },
			} as unknown as ParsedIdlInstruction<any>;
			break;
		}
		case TokenInstruction.TransferHookExtension: {
			const discriminator = instruction.data[1];
			switch (discriminator) {
				case TransferHookInstruction.Initialize: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse InitializeTransferHook instruction`);
					const instructionData = initializeTransferHookInstructionData.decode(instruction.data);
					parsed = {
						name: "initializeTransferHook",
						accounts: [{ name: "mint", ...instruction.keys[0] }],
						args: { authority: instructionData.authority, transferHookProgramId: instructionData.transferHookProgramId },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case TransferHookInstruction.Update: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse UpdateTransferHook instruction`);
					const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
					const instructionData = updateTransferHookInstructionData.decode(instruction.data);
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
		case TokenInstruction.MetadataPointerExtension: {
			const discriminator = instruction.data[1];
			switch (discriminator) {
				case MetadataPointerInstruction.Initialize: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse InitializeMetadataPointer instruction`);
					const instructionData = initializeMetadataPointerData.decode(instruction.data);
					parsed = {
						name: "initializeMetadataPointer",
						accounts: [{ name: "mint", ...instruction.keys[0] }],
						args: { authority: instructionData.authority, metadataAddress: instructionData.metadataAddress },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case MetadataPointerInstruction.Update: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse UpdateMetadataPointer instruction`);
					const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
					const instructionData = updateMetadataPointerData.decode(instruction.data);
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
		case TokenInstruction.GroupPointerExtension: {
			const discriminator = instruction.data[1];
			switch (discriminator) {
				case GroupPointerInstruction.Initialize: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse InitializeGroupPointer instruction`);
					const instructionData = initializeGroupPointerData.decode(instruction.data);
					parsed = {
						name: "initializeGroupPointer",
						accounts: [{ name: "mint", ...instruction.keys[0] }],
						args: { authority: instructionData.authority, groupAddress: instructionData.groupAddress },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case GroupPointerInstruction.Update: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse UpdateGroupPointer instruction`);
					const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
					const instructionData = updateGroupPointerData.decode(instruction.data);
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
		case TokenInstruction.GroupMemberPointerExtension: {
			const discriminator = instruction.data[1];
			switch (discriminator) {
				case GroupMemberPointerInstruction.Initialize: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse InitializeGroupMemberPointer instruction`);
					const instructionData = initializeGroupMemberPointerData.decode(instruction.data);
					parsed = {
						name: "initializeGroupMemberPointer",
						accounts: [{ name: "mint", ...instruction.keys[0] }],
						args: { authority: instructionData.authority, memberAddress: instructionData.memberAddress },
					} as unknown as ParsedIdlInstruction<any>;
					break;
				}
				case GroupMemberPointerInstruction.Update: {
					const tokenMint = instruction.keys[0].pubkey;
					if (!tokenMint) throw new Error(`Failed to parse UpdateGroupMemberPointer instruction`);
					const multisig = instruction.keys.slice(2).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
					const instructionData = updateGroupMemberPointerData.decode(instruction.data);
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
			const [splDiscriminateInit, splDiscriminateUpdating, splDiscriminateRemove, splDiscriminateUpdate, splDiscriminateEmitter] = [
				"spl_token_metadata_interface:initialize_account",
				"spl_token_metadata_interface:updating_field",
				"spl_token_metadata_interface:remove_key_ix",
				"spl_token_metadata_interface:update_the_authority",
				"spl_token_metadata_interface:emitter",
			].map((s) => splDiscriminate(s));

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
		? { ...parsed, programId: TOKEN_2022_PROGRAM_ID }
		: { programId: TOKEN_2022_PROGRAM_ID, name: "unknown", accounts: instruction.keys, args: { unknown: instruction.data } };
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
			...[instruction.keys.length > 6 ? { name: "rent", ...instruction.keys[6] } : undefined],
		],
		args: {},
		programId: ASSOCIATED_TOKEN_PROGRAM_ID,
	} as ParsedInstruction<AssociatedTokenProgramIdlLike, "createAssociatedTokenAccount" | "createAssociatedTokenAccountIdempotent">;
}

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
