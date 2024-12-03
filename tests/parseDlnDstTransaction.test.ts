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

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		assert.equal(fulfillOrder.args.unvalidated_order.maker_order_nonce.toString(), "1730296839695");
	});
});
