import { ComputeBudgetInstruction, TransactionInstruction } from "@solana/web3.js";
import { BN } from "bn.js";

import { ParsedIdlInstruction, ParsedInstruction } from "../interfaces";
import { ComputeBudget } from "../programs/compute.budget";

export function decodeComputeBudgetInstruction(instruction: TransactionInstruction): ParsedInstruction<ComputeBudget> {
	const type = ComputeBudgetInstruction.decodeInstructionType(instruction);
	let parsed: ParsedIdlInstruction<ComputeBudget> | null;
	switch (type) {
		case "RequestHeapFrame": {
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
		case "RequestUnits": {
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
		case "SetComputeUnitLimit": {
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
		case "SetComputeUnitPrice": {
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
