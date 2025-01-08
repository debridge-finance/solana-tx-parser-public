import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import {
	AuthorityType,
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
import { BN } from "@coral-xyz/anchor";
import { splDiscriminate } from "@solana/spl-type-length-value";

import {
	emitLayout,
	getAccountDataSizeLayout,
	metadataLayout,
	removeKeyLayout,
	updateAuthorityLayout,
	updateMetadataLayout,
} from "../programs/token-extensions";
import { SplToken22Idl } from "../programs";
import { ParsedIdlInstruction, ParsedInstruction } from "../interfaces";

function decodeToken2022Instruction(instruction: TransactionInstruction): ParsedInstruction<SplToken22Idl> {
	let parsed: ParsedIdlInstruction<SplToken22Idl> | null;
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
			} as ParsedIdlInstruction<SplToken22Idl, "initializeMint">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "initializeAccount">;
			break;
		}
		case TokenInstruction.InitializeMultisig: {
			const decodedIx = decodeInitializeMultisigInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.signers.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig",
				accounts: [{ name: "multisig", ...decodedIx.keys.account }, { name: "rent", ...decodedIx.keys.rent }, ...multisig],
				args: { m: decodedIx.data.m },
			} as ParsedIdlInstruction<SplToken22Idl, "initializeMultisig">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "transfer">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "approve">;
			break;
		}
		case TokenInstruction.Revoke: {
			const decodedIx = decodeRevokeInstruction(instruction, TOKEN_2022_PROGRAM_ID);
			const multisig = decodedIx.keys.multiSigners.map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "revoke",
				accounts: [{ name: "source", ...decodedIx.keys.account }, { name: "owner", ...decodedIx.keys.owner }, ...multisig],
				args: {},
			} as ParsedIdlInstruction<SplToken22Idl, "revoke">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "setAuthority">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "mintTo">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "burn">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "closeAccount">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "freezeAccount">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "thawAccount">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "transferChecked">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "approveChecked">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "mintToChecked">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "burnChecked">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "initializeAccount2">;
			break;
		}
		case TokenInstruction.SyncNative: {
			parsed = {
				name: "syncNative",
				accounts: [{ name: "account", ...instruction.keys[0] }],
				args: {},
			} as ParsedIdlInstruction<SplToken22Idl, "syncNative">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "initializeAccount3">;
			break;
		}
		case TokenInstruction.InitializeMultisig2: {
			const multisig = instruction.keys.slice(1).map((meta, idx) => ({ name: `signer_${idx}`, ...meta }));
			parsed = {
				name: "initializeMultisig2",
				accounts: [{ name: "multisig", ...instruction.keys[0] }, ...multisig],
				args: { m: instruction.data[1] },
			} as ParsedIdlInstruction<SplToken22Idl, "initializeMultisig2">;
			break;
		}
		case TokenInstruction.InitializeMint2: {
			const decodedIx = decodeInitializeMint2Instruction(instruction, instruction.programId);
			const tokenMint = decodedIx.keys.mint;
			if (!tokenMint) throw new Error(`Failed to parse InitializeMint2 instruction`);
			parsed = {
				name: "initializeMint2",
				accounts: [{ name: "mint", ...decodedIx.keys.mint }],
				args: { decimals: decodedIx.data.decimals, mintAuthority: decodedIx.data.mintAuthority, freezeAuthority: decodedIx.data.freezeAuthority },
			} as ParsedIdlInstruction<SplToken22Idl, "initializeMint2">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "getAccountDataSize">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "initializeImmutableOwner">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "amountToUiAmount">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "uiAmountToAmount">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "initializeMintCloseAuthority">;
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
			} as ParsedIdlInstruction<SplToken22Idl, "createNativeMint">;
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

export { decodeToken2022Instruction };
