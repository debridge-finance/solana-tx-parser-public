import { ComputeBudgetInstruction, TransactionInstruction } from "@solana/web3.js";
import { BN } from "bn.js";

import { ParsedIdlInstruction, ParsedInstruction } from "../interfaces";
import { ComputeBudget } from "../programs/compute.budget";

export function decodeComputeBudgetInstruction(instruction: TransactionInstruction): ParsedInstruction<ComputeBudget> {
	const type = instruction.data[0]; // ComputeBudgetInstruction.decodeInstructionType(instruction);
	let parsed: ParsedIdlInstruction<ComputeBudget> | null;
	switch (type) {
		case 0: {
			const decoded = ComputeBudgetInstruction.decodeRequestUnits(instruction);
			parsed = {
				name: "requestUnits",
				accounts: [],
				args: {
					units: decoded.units,
					additionalFee: decoded.additionalFee,
				},
				programId: instruction.programId,
			} as ParsedIdlInstruction<ComputeBudget, "requestUnits">;
			break;
		}
		case 1: {
			const decoded = ComputeBudgetInstruction.decodeRequestHeapFrame(instruction);
			parsed = {
				name: "requestHeapFrame",
				accounts: [],
				args: {
					bytes: decoded.bytes,
				},
				programId: instruction.programId,
			} as ParsedIdlInstruction<ComputeBudget, "requestHeapFrame">;
			break;
		}
		case 2: {
			const decoded = ComputeBudgetInstruction.decodeSetComputeUnitLimit(instruction);
			parsed = {
				name: "setComputeUnitLimit",
				accounts: [],
				args: {
					units: decoded.units,
				},
				programId: instruction.programId,
			} as ParsedIdlInstruction<ComputeBudget, "setComputeUnitLimit">;
			break;
		}
		case 3: {
			const decoded = ComputeBudgetInstruction.decodeSetComputeUnitPrice(instruction);
			parsed = {
				name: "setComputeUnitPrice",
				accounts: [],
				args: {
					microLamports: new BN(decoded.microLamports.toString()),
				},
				programId: instruction.programId,
			} as ParsedIdlInstruction<ComputeBudget, "setComputeUnitPrice">;
			break;
		}
		case 4: {
			parsed = {
				name: "setLoadedAccountsDataSizeLimit",
				accounts: [],
				args: {
					bytes: instruction.data.readUInt32LE(1),
				},
				programId: instruction.programId,
			} as ParsedIdlInstruction<ComputeBudget, "setLoadedAccountsDataSizeLimit">;
			break;
		}
		default: {
			parsed = null;
		}
	}

	return parsed
		? parsed
		: {
				programId: instruction.programId,
				name: "unknown",
				accounts: instruction.keys,
				args: { unknown: instruction.data },
			};
}
