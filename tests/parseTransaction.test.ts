/* eslint-disable no-console */
import "mocha";
import assert from "assert";

import { BN, Idl } from "@project-serum/anchor";
import { PublicKey, Connection } from "@solana/web3.js";

import { SolanaParser } from "../src";
import { ParsedAccount, ParsedIdlInstruction, ParsedInstruction } from "../src/interfaces";

import { IDL as JupiterIdl, Jupiter } from "./idl/jupiter";

function stringifyAccount(account: ParsedAccount) {
	return `${account.name || "unknown"} @ ${account.pubkey.toBase58()}`;
}

function toString(value: unknown, depth: number = 0): string {
	if (typeof value === "string" || typeof value === "number") return `${"  ".repeat(depth)}${value}`;
	if (value instanceof Buffer) return `${"  ".repeat(depth)}0x${value.toString("hex")}`;
	if (value instanceof PublicKey) return `${"  ".repeat(depth)}${value.toBase58()}`;
	if (value instanceof BN) return `${"  ".repeat(depth)}${value.toString(10)}`;
	if (value instanceof Object) {
		let result = "  ".repeat(depth) + "{\n";
		for (const [name, val] of Object.entries(value)) {
			result += `${"  ".repeat(depth + 1) + name} = ${toString(val, depth + 1)}\n`;
		}
		result += "  ".repeat(depth) + "}";

		return result;
	}

	return value as string;
}

function stringifyArgs(args: unknown) {
	const result = [];
	for (const [argName, argValue] of Object.entries(args as { [s: string]: unknown })) {
		result.push(`${argName} = ${toString(argValue)}`);
	}

	return result.length > 0 ? result.join("\n") : "None";
}

function printParsedIx(parsedIx: ParsedInstruction<Idl>) {
	console.log(
		`----------\nProgram: ${parsedIx.programId.toBase58()}\nName: ${parsedIx.name}\n***Accounts***\n${parsedIx.accounts
			.map((account) => stringifyAccount(account))
			.join("\n")}\n\nargs: ${stringifyArgs(parsedIx.args)}`,
	);
}

function parseTransactionTest() {
	it("can parse jupiter tx", async () => {
		const rpcConnection = new Connection("https://jupiter.genesysgo.net");
		const txParser = new SolanaParser([{ idl: JupiterIdl as unknown as Idl, programId: "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo" }]);
		const parsed = await txParser.parseTransaction(
			rpcConnection,
			"5zgvxQjV6BisU8SfahqasBZGfXy5HJ3YxYseMBG7VbR4iypDdtdymvE1jmEMG7G39bdVBaHhLYUHUejSTtuZEpEj",
			false,
		);
		parsed?.find((pix) => pix.name === "tokenSwap") as ParsedIdlInstruction<Jupiter, "setTokenLedger">;
		parsed?.map((pix) => printParsedIx(pix));
		if (!parsed || parsed.length != 3) return Promise.reject("Failed to parse transaction correctly");
		const swap = parsed[1] as ParsedIdlInstruction<Jupiter, "tokenSwap">;
		assert.equal(swap.args.platformFeeBps.toString(), "0");
	});
}

describe("Test parse transaction", parseTransactionTest);
