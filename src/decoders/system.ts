import { BN } from "@coral-xyz/anchor";
import { TransactionInstruction, SystemInstruction, SystemProgram } from "@solana/web3.js";

import { ParsedIdlInstruction, ParsedInstruction } from "../interfaces";
import { SystemProgramIdl } from "../programs";

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

export { decodeSystemInstruction };
