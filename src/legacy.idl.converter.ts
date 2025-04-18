/**
 * This is a port of the anchor command `anchor idl convert` to TypeScript.
 */
import { Idl } from "@coral-xyz/anchor";
import {
	IdlAccount,
	IdlConst,
	IdlDefinedFields,
	IdlEnumVariant,
	IdlErrorCode,
	IdlEvent,
	IdlField,
	IdlInstruction,
	IdlInstructionAccountItem,
	IdlInstructionAccounts,
	IdlMetadata,
	IdlType,
	IdlTypeDef,
	IdlTypeDefined,
} from "@coral-xyz/anchor/dist/cjs/idl";
import { sha256 } from "@noble/hashes/sha256";

import { camelCase } from "./camelcase";

function camelToUnderscore(key: string) {
	const result = key.replace(/([A-Z])/g, " $1");

	return result.split(" ").join("_").toLowerCase();
}

const snakeCase = camelToUnderscore;

// Legacy types based on the Rust structs
// Should be included in next minor release of anchor
type LegacyIdl = {
	version: string;
	name: string;
	docs?: string[];
	constants: LegacyIdlConst[];
	instructions: LegacyIdlInstruction[];
	accounts: LegacyIdlTypeDefinition[];
	types: LegacyIdlTypeDefinition[];
	events?: LegacyIdlEvent[];
	errors?: LegacyIdlErrorCode[];
	metadata?: { address: string };
};

type LegacyIdlConst = {
	name: string;
	type: LegacyIdlType;
	value: string;
};

type LegacyIdlInstruction = {
	name: string;
	docs?: string[];
	accounts: LegacyIdlAccountItem[];
	args: LegacyIdlField[];
	returns?: LegacyIdlType;
};

type LegacyIdlTypeDefinition = {
	name: string;
	docs?: string[];
	type: LegacyIdlTypeDefinitionTy;
};

type LegacyIdlTypeDefinitionTy =
	| { kind: "struct"; fields: LegacyIdlField[] }
	| { kind: "enum"; variants: LegacyIdlEnumVariant[] }
	| { kind: "alias"; value: LegacyIdlType };

type LegacyIdlField = {
	name: string;
	docs?: string[];
	type: LegacyIdlType;
};

type LegacyIdlEnumVariant = {
	name: string;
	fields?: LegacyEnumFields;
};

type LegacyEnumFields = LegacyIdlField[] | LegacyIdlType[];

type LegacyIdlEvent = {
	name: string;
	fields: LegacyIdlEventField[];
};

type LegacyIdlEventField = {
	name: string;
	type: LegacyIdlType;
	index: boolean;
};

type LegacyIdlErrorCode = {
	code: number;
	name: string;
	msg?: string;
};

type LegacyIdlAccountItem = LegacyIdlAccount | LegacyIdlAccounts;

type LegacyIdlAccount = {
	name: string;
	isMut: boolean;
	isSigner: boolean;
	isOptional?: boolean;
	docs?: string[];
	pda?: LegacyIdlPda;
	relations: string[];
};

type LegacyIdlAccounts = {
	name: string;
	accounts: LegacyIdlAccountItem[];
};

type LegacyIdlPda = {
	seeds: LegacyIdlSeed[];
	programId?: LegacyIdlSeed;
};

type LegacyIdlSeed =
	| { kind: "const"; type: LegacyIdlType; value: any }
	| { kind: "arg"; type: LegacyIdlType; path: string }
	| { kind: "account"; type: LegacyIdlType; account?: string; path: string };

type LegacyIdlType =
	| "bool"
	| "u8"
	| "i8"
	| "u16"
	| "i16"
	| "u32"
	| "i32"
	| "u64"
	| "i64"
	| "u128"
	| "i128"
	| "f32"
	| "f64"
	| "bytes"
	| "string"
	| "publicKey"
	| { vec: LegacyIdlType }
	| { option: LegacyIdlType }
	| { defined: string }
	| { array: [LegacyIdlType, number] }
	| { generic: string }
	| { definedWithTypeArgs: { name: string; args: LegacyIdlDefinedTypeArg[] } };

type LegacyIdlDefinedTypeArg = { generic: string } | { value: string } | { type: LegacyIdlType };

function convertLegacyIdl(legacyIdl: LegacyIdl, programAddress?: string): Idl {
	const address: string | undefined = programAddress ?? legacyIdl.metadata?.address;
	if (!address) {
		throw new Error("Program id missing in `idl.metadata.address` field");
	}

	return {
		accounts: (legacyIdl.accounts || []).map(convertAccount),
		address: address,
		constants: (legacyIdl.constants || []).map(convertConst),
		errors: legacyIdl.errors?.map(convertErrorCode) || [],
		events: legacyIdl.events?.map(convertEvent) || [],
		instructions: legacyIdl.instructions.map(convertInstruction),
		metadata: {
			name: legacyIdl.name,
			version: legacyIdl.version,
			spec: "0.1.0",
		} as IdlMetadata,
		types: [
			...(legacyIdl.types || []).map(convertTypeDef),
			...(legacyIdl.accounts || []).map(convertTypeDef),
			...(legacyIdl.events || []).map(convertEventToTypeDef),
		],
	};
}

function getDisc(prefix: string, name: string): number[] {
	const hash = sha256(`${prefix}:${name}`);

	return Array.from(hash.slice(0, 8));
}

function convertInstruction(instruction: LegacyIdlInstruction): IdlInstruction {
	const name = instruction.name;

	return {
		accounts: instruction.accounts.map(convertInstructionAccount),
		args: instruction.args.map(convertField),
		discriminator: getDisc("global", snakeCase(name)),
		name,
		returns: instruction.returns ? convertType(instruction.returns) : undefined,
	};
}

function convertAccount(account: LegacyIdlTypeDefinition): IdlAccount {
	return {
		discriminator: getDisc("account", camelCase(account.name, { preserveConsecutiveUppercase: true, pascalCase: true })),
		name: account.name,
	};
}

function convertTypeDef(typeDef: LegacyIdlTypeDefinition): IdlTypeDef {
	return {
		name: typeDef.name,
		type: convertTypeDefTy(typeDef.type),
	};
}

function convertTypeDefTy(type: LegacyIdlTypeDefinitionTy): IdlTypeDef["type"] {
	switch (type.kind) {
		case "struct":
			return {
				fields: type.fields.map(convertField),
				kind: "struct",
			};
		case "enum":
			return {
				kind: "enum",
				variants: type.variants.map(convertEnumVariant),
			};
		case "alias":
			return {
				alias: convertType(type.value),
				kind: "type",
			};
	}
}

function convertField(field: LegacyIdlField): IdlField {
	return {
		name: field.name,
		type: convertType(field.type),
	};
}

function convertEnumVariant(variant: LegacyIdlEnumVariant): IdlEnumVariant {
	return {
		fields: variant.fields ? convertEnumFields(variant.fields) : undefined,
		name: variant.name,
	};
}

function convertEnumFields(fields: LegacyEnumFields): IdlDefinedFields {
	if (Array.isArray(fields) && fields.length > 0 && typeof fields[0] === "object" && "type" in fields[0]) {
		return (fields as LegacyIdlField[]).map(convertField);
	} else {
		return (fields as LegacyIdlType[]).map((type) => convertType(type));
	}
}

function convertEvent(event: LegacyIdlEvent): IdlEvent {
	return {
		discriminator: getDisc("event", event.name),
		name: event.name,
	};
}

function convertErrorCode(error: LegacyIdlErrorCode): IdlErrorCode {
	return {
		code: error.code,
		msg: error.msg,
		name: error.name,
	};
}

function convertConst(constant: LegacyIdlConst): IdlConst {
	return {
		name: constant.name,
		type: convertType(constant.type),
		value: constant.value,
	};
}

function convertInstructionAccount(account: LegacyIdlAccountItem): IdlInstructionAccountItem {
	if ("accounts" in account) {
		return convertInstructionAccounts(account);
	} else {
		return {
			docs: account.docs || [],
			name: account.name,
			optional: account.isOptional || false,
			pda: account.pda ? convertPda(account.pda) : undefined,
			relations: account.relations || [],
			signer: account.isSigner || false,
			writable: account.isMut || false,
		};
	}
}

function convertInstructionAccounts(accounts: LegacyIdlAccounts): IdlInstructionAccounts {
	return {
		accounts: accounts.accounts.map(convertInstructionAccount),
		name: accounts.name,
	};
}

function convertPda(pda: LegacyIdlPda): { seeds: any[]; programId?: any } {
	return {
		programId: pda.programId ? convertSeed(pda.programId) : undefined,
		seeds: pda.seeds.map(convertSeed),
	};
}

function convertSeed(seed: LegacyIdlSeed): any {
	switch (seed.kind) {
		case "const":
			return { kind: "const", type: convertType(seed.type), value: seed.value };
		case "arg":
			return { kind: "arg", path: seed.path, type: convertType(seed.type) };
		case "account":
			return {
				account: seed.account,
				kind: "account",
				path: seed.path,
				type: convertType(seed.type),
			};
	}
}

function convertEventToTypeDef(event: LegacyIdlEvent): IdlTypeDef {
	return {
		name: event.name,
		type: {
			fields: event.fields.map((field) => ({
				name: field.name,
				type: convertType(field.type),
			})),
			kind: "struct",
		},
	};
}

function convertType(type: LegacyIdlType): IdlType {
	if (typeof type === "string") {
		return type === "publicKey" ? "pubkey" : type;
	} else if ("vec" in type) {
		return { vec: convertType(type.vec) };
	} else if ("option" in type) {
		return { option: convertType(type.option) };
	} else if ("defined" in type) {
		return { defined: { generics: [], name: type.defined } } as IdlTypeDefined;
	} else if ("array" in type) {
		return { array: [convertType(type.array[0]), type.array[1]] };
	} else if ("generic" in type) {
		return type;
	} else if ("definedWithTypeArgs" in type) {
		return {
			defined: {
				generics: type.definedWithTypeArgs.args.map(convertDefinedTypeArg),
				name: type.definedWithTypeArgs.name,
			},
		} as IdlTypeDefined;
	}
	throw new Error(`Unsupported type: ${JSON.stringify(type)}`);
}

function convertDefinedTypeArg(arg: LegacyIdlDefinedTypeArg): any {
	if ("generic" in arg) {
		return { generic: arg.generic };
	} else if ("value" in arg) {
		return { value: arg.value };
	} else if ("type" in arg) {
		return { type: convertType(arg.type) };
	}
	throw new Error(`Unsupported defined type arg: ${JSON.stringify(arg)}`);
}

export function convertLegacyIdlToV30(idl: any, programAddress?: string): Idl {
	const spec = idl.metadata?.spec;

	if (spec) {
		switch (spec) {
			case "0.1.0":
				return idl as Idl;
			default:
				throw new Error(`IDL spec not supported: ${spec ?? ""}`);
		}
	} else {
		const formattedIdl = convertLegacyIdl(idl as LegacyIdl, programAddress);

		return formattedIdl;
	}
}
