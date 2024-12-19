import { splTokenProgram } from "@coral-xyz/spl-token";
import { BN, Idl, IdlTypes, DecodeType } from "@coral-xyz/anchor";
import { AccountMeta, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

export type SplToken = ReturnType<typeof splTokenProgram>["idl"];
/**
 * Context of logs for specific instruction
 */
export type ProgramLogContext = {
	rawLogs: string[];
	errors: string[];
	logMessages: string[];
	dataLogs: string[];
	programId: string;
	depth: number;
	id: number;
	instructionIndex: number;
	invokeResult?: string;
	unitsConsumed?: number;
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
	/** Account name, same as in Idl, nested accounts look like `account.nestedAccount` */
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
	accounts: IdlAccountsToFlatMeta<IxByName<I, IxName>["accounts"]>;
}

export type IdlInstructionAccountItem2 = IdlInstructionAccount | IdlInstructionAccounts;
export type IdlInstructionAccount = {
	name: string;
	docs?: string[];
	writable?: boolean;
	signer?: boolean;
	optional?: boolean;
	address?: string;
	relations?: string[];
};
export type IdlInstructionAccounts = {
	name: string;
	accounts: IdlInstructionAccountItem2[];
};

export type IdlAccountsToFlatMeta<T extends IdlInstructionAccountItem2[], Prefix extends string = ""> = T extends [infer First, ...infer Rest]
	? First extends IdlInstructionAccounts
		? [
				...IdlAccountsToFlatMeta<First["accounts"], `${Prefix}${First["name"]}.`>,
				...IdlAccountsToFlatMeta<Rest extends IdlInstructionAccountItem2[] ? Rest : [], Prefix>,
			]
		: First extends IdlInstructionAccount
			? [
					{
						name: `${Prefix}${First["name"]}`;
						isSigner: First["signer"] extends boolean ? First["signer"] : false;
						isWritable: First["writable"] extends boolean ? First["writable"] : false;
						pubkey: PublicKey;
					},
					...IdlAccountsToFlatMeta<Rest extends IdlInstructionAccountItem2[] ? Rest : [], Prefix>,
				]
			: never
	: [];

export interface ProgramInfoType {
	idl: Idl;
	programId: PublicKey | string;
}

/**
 * @private
 */
type TypeMap = {
	publicKey: PublicKey;
	pubkey: PublicKey;
	bool: boolean;
	string: string;
} & {
	[K in "u8" | "i8" | "u16" | "i16" | "u32" | "i32" | "f32" | "f64"]: number;
} & {
	[K in "u64" | "i64" | "u128" | "i128"]: BN;
};

type IdlType = Idl["instructions"][number]["args"][number]["type"];

/**
 * @deprecated
 * @private
 */
export type LegacyDecodeType<T extends IdlType, Defined> = T extends keyof TypeMap
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
	signer?: boolean;
	writable?: boolean;
};

export type IdlAccounts = {
	name: string;
	accounts: IdlAccount[];
};

/**
 * @private
 */
export type IdlInstructionAccountItem = IdlAccounts | IdlAccount;

/**
 * @private
 */
export interface AssociatedTokenProgramIdlLike extends Idl {
	name: "associated_token_program";
	address: "";
	metadata: {
		name: "associated_token_program";
		version: "1.0.3";
		spec: "";
	};
	instructions: [
		{
			discriminator: [0];
			name: "createAssociatedTokenAccountIdempotent";
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
					name: "rent";
					isMut: false;
					isSigner: false;
				},
			];
			args: [];
		},
		{
			discriminator: [];
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
					name: "rent";
					isMut: false;
					isSigner: false;
				},
			];
			args: [];
		},
	];
}
