import { struct, u16, u8 } from "@solana/buffer-layout";
import { u64 } from "@solana/buffer-layout-utils";
import {
	TokenInstruction,
	TokenInvalidInstructionDataError,
	TokenInvalidInstructionKeysError,
	TokenInvalidInstructionProgramError,
	TokenInvalidInstructionTypeError,
	TransferFeeInstruction,
} from "@solana/spl-token";
import { AccountMeta, PublicKey, TransactionInstruction } from "@solana/web3.js";

export interface SetTransferFeeInstructionData {
	instruction: TokenInstruction.TransferFeeExtension;
	transferFeeInstruction: TransferFeeInstruction.SetTransferFee;
	transferFeeBasisPoints: number;
	maximumFee: bigint;
}

export const setTransferFeeInstructionData = struct<SetTransferFeeInstructionData>([
	u8("instruction"),
	u8("transferFeeInstruction"),
	u16("transferFeeBasisPoints"),
	u64("maximumFee"),
]);

/** A decoded, valid SetTransferFee instruction */
export interface DecodedSetTransferFeeInstruction {
	programId: PublicKey;
	keys: {
		mint: AccountMeta;
		authority: AccountMeta;
		signers: AccountMeta[] | null;
	};
	data: {
		instruction: TokenInstruction.TransferFeeExtension;
		transferFeeInstruction: TransferFeeInstruction.SetTransferFee;
		transferFeeBasisPoints: number;
		maximumFee: bigint;
	};
}

/**
 * Decode an SetTransferFee instruction and validate it
 *
 * @param instruction Transaction instruction to decode
 * @param programId   SPL Token program account
 *
 * @return Decoded, valid instruction
 */
export function decodeSetTransferFeeInstruction(instruction: TransactionInstruction, programId: PublicKey): DecodedSetTransferFeeInstruction {
	if (!instruction.programId.equals(programId)) throw new TokenInvalidInstructionProgramError();
	if (instruction.data.length !== setTransferFeeInstructionData.span) throw new TokenInvalidInstructionDataError();

	const {
		keys: { mint, authority, signers },
		data,
	} = decodeSetTransferFeeInstructionUnchecked(instruction);
	if (data.instruction !== TokenInstruction.TransferFeeExtension || data.transferFeeInstruction !== TransferFeeInstruction.SetTransferFee)
		throw new TokenInvalidInstructionTypeError();
	if (!mint) throw new TokenInvalidInstructionKeysError();

	return {
		programId,
		keys: {
			mint,
			authority,
			signers: signers ? signers : null,
		},
		data,
	};
}

/** A decoded, valid SetTransferFee instruction */
export interface DecodedSetTransferFeeInstructionUnchecked {
	programId: PublicKey;
	keys: {
		mint: AccountMeta;
		authority: AccountMeta;
		signers: AccountMeta[] | undefined;
	};
	data: {
		instruction: TokenInstruction.TransferFeeExtension;
		transferFeeInstruction: TransferFeeInstruction.SetTransferFee;
		transferFeeBasisPoints: number;
		maximumFee: bigint;
	};
}

/**
 * Decode a SetTransferFee instruction without validating it
 *
 * @param instruction Transaction instruction to decode
 *
 * @return Decoded, non-validated instruction
 */
export function decodeSetTransferFeeInstructionUnchecked({
	programId,
	keys: [mint, authority, ...signers],
	data,
}: TransactionInstruction): DecodedSetTransferFeeInstructionUnchecked {
	const { instruction, transferFeeInstruction, transferFeeBasisPoints, maximumFee } = setTransferFeeInstructionData.decode(data);

	return {
		programId,
		keys: {
			mint,
			authority,
			signers,
		},
		data: {
			instruction,
			transferFeeInstruction,
			transferFeeBasisPoints,
			maximumFee,
		},
	};
}
