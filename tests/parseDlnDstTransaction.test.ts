/* eslint-disable no-console */
import "mocha";
import assert from "assert";

import { Connection, clusterApiUrl } from "@solana/web3.js";

import { SolanaParser } from "../src";
import { ParsedIdlInstruction } from "../src/interfaces";

import { IDL as DlnDstIdl, DlnDst } from "./idl/dst";

const rpcConnection = new Connection(clusterApiUrl("mainnet-beta"));
const parser = new SolanaParser([{ idl: DlnDstIdl, programId: "dst5MGcFPoBeREFAA5E3tU5ij8m5uVYwkzkSAbsLbNo" }]);

describe("Test parse transaction", () => {
	it("can parse fulfill tx", async () => {
		const parsed = await parser.parseTransactionByHash(
			rpcConnection,
			"2H1jBCXaqoy8XZFvdsbZzC9bKU3V2C43YoDEJZVBMUg5wKf12LMt4fqT8j65D7SZY1PNfgMFiTRFXqpcAt5Wdc4z",
			false,
		);

		const fulfillOrder = parsed?.find((pix) => pix.name === "fulfill_order") as ParsedIdlInstruction<DlnDst, "fulfill_order">;
		assert.equal(fulfillOrder.args.unvalidated_order.maker_order_nonce.toString(), "1730296839695");
	});

	it("can parse send_batch_unlock tx", async () => {
		const parsed = await parser.parseTransactionByHash(
			rpcConnection,
			"HLNFpn7Aj9AgL5umSKQyKPHgvnK5YvmLMBfJQnRZTQQ23ZFRh9wi1gxusj7WWGgFG1DFZ5zmsPnZ7N6AtC4Tzaq",
			false,
		);

		const unlock = parsed?.find((v) => v.name === "send_batch_unlock") as ParsedIdlInstruction<DlnDst, "send_batch_unlock">;
		assert.equal(unlock.accounts[10].name, "sending.bridge");
	});
});
