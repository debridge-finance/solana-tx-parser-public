import { TransactionInstruction } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { ParsedInstruction } from "../interfaces";
import { AssociatedTokenProgramIdl } from "../programs";

function decodeAssociatedTokenInstruction(instruction: TransactionInstruction): ParsedInstruction<AssociatedTokenProgramIdl> {
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
	} as ParsedInstruction<AssociatedTokenProgramIdl, "createAssociatedTokenAccount" | "createAssociatedTokenAccountIdempotent">;
}

export { decodeAssociatedTokenInstruction };
