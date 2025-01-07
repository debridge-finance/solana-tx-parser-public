import {
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
	decodeSyncNativeInstruction,
	decodeUiAmountToAmountInstruction,
} from "@solana/spl-token";
import { BN } from "@coral-xyz/anchor";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";

import { ParsedInstruction, ParsedIdlInstruction } from "../interfaces";
import { SplTokenIdl } from "../programs";

function decodeTokenInstruction(instruction: TransactionInstruction): ParsedInstruction<SplTokenIdl> {
	let parsed: ParsedIdlInstruction<SplTokenIdl> | null = null;
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
			} as ParsedIdlInstruction<SplTokenIdl, "initializeMint">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "initializeAccount">;
			break;
		}
		case TokenInstruction.InitializeMultisig: {
			const decodedIx = decodeInitializeMultisigInstruction(instruction);
			const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig",
				accounts: [{ name: "multisig", ...decodedIx.keys.account }, { name: "rent", ...decodedIx.keys.rent }, ...multisig],
				args: { m: decodedIx.data.m },
			} as ParsedIdlInstruction<SplTokenIdl, "initializeMultisig">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "transfer">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "approve">;
			break;
		}
		case TokenInstruction.Revoke: {
			const decodedIx = decodeRevokeInstruction(instruction);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "revoke",
				accounts: [{ name: "source", ...decodedIx.keys.account }, { name: "owner", ...decodedIx.keys.owner }, ...multisig],
				args: {},
			} as ParsedIdlInstruction<SplTokenIdl, "revoke">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "setAuthority">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "mintTo">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "burn">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "closeAccount">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "freezeAccount">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "thawAccount">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "transferChecked">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "approveChecked">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "mintToChecked">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "burnChecked">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "initializeAccount2">;
			break;
		}
		case TokenInstruction.SyncNative: {
			const decodedIx = decodeSyncNativeInstruction(instruction);
			parsed = {
				name: "syncNative",
				accounts: [{ name: "account", ...decodedIx.keys.account }],
				args: {},
			} as ParsedIdlInstruction<SplTokenIdl, "syncNative">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "initializeAccount3">;
			break;
		}
		case TokenInstruction.InitializeMultisig2: {
			const multisig = instruction.keys.slice(1).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig2",
				accounts: [{ name: "multisig", ...instruction.keys[0] }, ...multisig],
				args: { m: instruction.data[1] },
			} as ParsedIdlInstruction<SplTokenIdl, "initializeMultisig2">;
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
			} as ParsedIdlInstruction<SplTokenIdl, "initializeMint2">;
			break;
		}
		case TokenInstruction.InitializeImmutableOwner: {
			const decodedIx = decodeInitializeImmutableOwnerInstruction(instruction, instruction.programId);
			parsed = {
				name: "initializeImmutableOwner",
				accounts: [{ name: "account", ...decodedIx.keys.account }],
				args: {},
			} as ParsedIdlInstruction<SplTokenIdl, "initializeImmutableOwner">;
			break;
		}
		case TokenInstruction.AmountToUiAmount: {
			const decodedIx = decodeAmountToUiAmountInstruction(instruction);
			parsed = {
				name: "amountToUiAmount",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { amount: new BN(decodedIx.data.amount.toString()) },
			} as ParsedIdlInstruction<SplTokenIdl, "amountToUiAmount">;
			break;
		}
		case TokenInstruction.UiAmountToAmount: {
			const decodedIx = decodeUiAmountToAmountInstruction(instruction);
			parsed = {
				name: "uiAmountToAmount",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { uiAmount: new BN(decodedIx.data.amount).toString() },
			} as ParsedIdlInstruction<SplTokenIdl, "uiAmountToAmount">;
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

export { decodeTokenInstruction };
