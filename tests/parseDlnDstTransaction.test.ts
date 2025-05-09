/* eslint-disable no-console */
import "mocha";
import assert from "assert";

import { Connection, clusterApiUrl } from "@solana/web3.js";

import { SolanaParser } from "../src";
import { ParsedIdlEvent, ParsedIdlInstruction } from "../src/interfaces";

import { IDL as DlnDstIdl, DlnDst } from "./idl/dst";
import { IDL as JupIdl, Jupiter } from "./idl/jupiter_v6";

const rpcConnection = new Connection(clusterApiUrl("mainnet-beta"));
const parser = new SolanaParser([
	{ idl: DlnDstIdl, programId: "dst5MGcFPoBeREFAA5E3tU5ij8m5uVYwkzkSAbsLbNo" },
	{ idl: JupIdl, programId: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4" },
]);

describe("Test parse transaction", () => {
	it("can parse fulfill tx", async () => {
		const parsed = await parser.parseTransactionByHash(
			rpcConnection,
			"4V5XFQ8ViuWi4VxHWb7bCZtWGzyPgZnKTf6ABnC1VUXd2y5wgfrn8EGmzwst1iP19ySPA7jwx87KWX3S2GYUh8Lr",
			true,
		);

		const fulfillOrder = parsed?.find((pix) => pix.name === "fulfill_order") as ParsedIdlInstruction<DlnDst, "fulfill_order">;
		assert.equal(fulfillOrder.args.unvalidated_order.maker_order_nonce.toString(), "1737321940254");

		const swapEvent = parsed?.find((pix) => pix.name === "SwapEvent") as ParsedIdlEvent<Jupiter, "SwapEvent">;
		assert.equal(swapEvent.args.output_amount.toString(), "1798522248");
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
