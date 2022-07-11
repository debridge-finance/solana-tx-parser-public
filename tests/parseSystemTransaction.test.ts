import assert from "assert";

import { clusterApiUrl, Connection } from "@solana/web3.js";

import { SolanaParser } from "../src/index";

function parseSysTx() {
	const connection = new Connection(clusterApiUrl("devnet"));
	const parser = new SolanaParser([]);
	const txId = "35wgJWUiYVRi5xEEEZmeMGiqh2anTjK17UMSp4ZGXpm8wJYxT27MqKzjaRxc3QaNZvxURTdiDmjHP8NQoeoxxe4P";
	it("can parse system tx", async () => {
		const parsed = await parser.parseTransaction(connection, txId);
		if (!parsed) throw new Error("failed to parse");
		assert.equal(parsed[0].name, "createAccount");
		assert.equal(parsed[1].name, "initializeAccount");
	});
}

describe("parse system transaction", parseSysTx);
