import { BN, Idl, IdlTypes } from "@project-serum/anchor";
import { AccountMeta, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

/**
 * Context of logs for specific instruction
 */
export type LogContext = {
	rawLogs: string[];
	errors: string[];
	logMessages: string[];
	dataLogs: string[];
	programId: string;
	depth: number;
	id: number;
	instructionIndex: number;
	invokeResult?: string;
};

export type TransactionWithLogs = {
	logs?: string[];
	transaction: Transaction;
};

/**
 * Map which keys are programIds (base58-encoded) and values are ix parsers
 */
export type InstructionParsers = Map<string, ParserFunction<Idl, string>>;
/**
 * Function that takes transaction ix and returns parsed variant
 */
export type ParserFunction<I extends Idl, IxName extends InstructionNames<I>> = (arg: TransactionInstruction) => ParsedInstruction<I, IxName>;

/**
 * public key as base58 string, parser
 */
export type InstructionParserInfo = [string, ParserFunction<Idl, string>];

export interface ParsedAccount extends AccountMeta {
	/** Account name, same as in Idl, nested accounts look like `account > nestedAccount` */
	name?: string;
}

/**
 * Instructions args with correct types for specific instruction by instruction name
 */
export type ParsedIdlArgsByInstructionName<I extends Idl, Ix extends I["instructions"][number]> = {
	[ArgName in Ix["args"][number]["name"]]: DecodeType<(Ix["args"][number] & { name: ArgName })["type"], IdlTypes<I>>;
};

export type InstructionNames<I extends Idl> = I["instructions"][number]["name"];

export type ParsedIdlArgs<I extends Idl, IxName extends InstructionNames<I> = InstructionNames<I>> = ParsedIdlArgsByInstructionName<I, IxByName<I, IxName>>;

export type ParsedArgs = {
	[key: string]: unknown;
};

export type UnknownInstruction = {
	name: "unknown" | string;
	args: { unknown: unknown };
	accounts: ParsedAccount[];
	programId: PublicKey;
};

export type ParsedInstruction<I extends Idl, IxName extends InstructionNames<I> = InstructionNames<I>> =
	| UnknownInstruction
	| ParsedIdlInstruction<I, IxName>
	| ParsedCustomInstruction;

export interface ParsedCustomInstruction {
	/** Instruction name */
	name: string;
	programId: PublicKey;
	/** Parsed arguments */
	args: unknown;
	/** Parsed accounts */
	accounts: ParsedAccount[];
}

export interface ParsedIdlInstruction<I extends Idl, IxName extends InstructionNames<I> = InstructionNames<I>> {
	/** Instruction name */
	name: IxName;
	programId: PublicKey;
	/** Parsed arguments */
	args: ParsedIdlArgs<I, IxName>;
	/** Parsed accounts */
	accounts: ParsedAccount[];
}

export interface ProgramInfoType {
	idl: Idl;
	programId: PublicKey | string;
}

/**
 * @private
 */
type TypeMap = {
	publicKey: PublicKey;
	bool: boolean;
	string: string;
} & {
	[K in "u8" | "i8" | "u16" | "i16" | "u32" | "i32" | "f32" | "f64"]: number;
} & {
	[K in "u64" | "i64" | "u128" | "i128"]: BN;
};

type IdlType = Idl["instructions"][number]["args"][number]["type"];

/**
 * @private
 */
export type DecodeType<T extends IdlType, Defined> = T extends keyof TypeMap
	? TypeMap[T]
	: T extends { defined: keyof Defined }
	? Defined[T["defined"]]
	: T extends { option: { defined: keyof Defined } }
	? Defined[T["option"]["defined"]]
	: T extends { option: keyof TypeMap }
	? TypeMap[T["option"]]
	: T extends { vec: keyof TypeMap }
	? TypeMap[T["vec"]][]
	: T extends { vec: keyof Defined }
	? Defined[T["vec"]][]
	: T extends { array: [defined: keyof TypeMap, size: number] }
	? TypeMap[T["array"][0]][]
	: unknown;

/**
 * Interface to get instruction by name from IDL
 */
export type IxByName<I extends Idl, IxName extends I["instructions"][number]["name"]> = I["instructions"][number] & { name: IxName };

export type IdlAccount = {
	name: string;
	isMut: boolean;
	isSigner: boolean;
};

export type IdlAccounts = {
	name: string;
	accounts: IdlAccount[];
};

/**
 * @private
 */
export type IdlAccountItem = IdlAccounts | IdlAccount;

/**
 * @private
 */
export type AssociatedTokenProgramIdlLike = {
	name: "associated_token_program";
	version: "1.0.3";
	instructions: [
		{
			name: "createAssociatedTokenAccount";
			accounts: [
				{
					name: "fundingAccount";
					isMut: true;
					isSigner: true;
				},
				{
					name: "newAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "wallet";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenMint";
					isMut: false;
					isSigner: false;
				},
				{
					name: "systemProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "rentSysvar";
					isMut: false;
					isSigner: false;
				},
			];
			args: [];
		},
	];
};
