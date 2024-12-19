/* eslint-disable no-console */
import "mocha";
import assert from "assert";

import { Connection, clusterApiUrl } from "@solana/web3.js";

import { SolanaParser } from "../src";
import { ParsedIdlInstruction } from "../src/interfaces";

import { IDL as DlnSrcIdl, DlnSrc } from "./idl/src";

const rpcConnection = new Connection(clusterApiUrl("mainnet-beta"));
const parser = new SolanaParser([{ idl: DlnSrcIdl, programId: "src5qyZHqTqecJV4aY6Cb6zDZLMDzrDKKezs22MPHr4" }]);

describe("Test parse transaction", () => {
	it("can parse create tx", async () => {
		const parsed = await parser.parseTransactionByHash(
			rpcConnection,
			"3ggTVbZvk38HfKTQ8fcTYkvTeDc1uw75KTGUzpm1MVHFJWHhFSbQBALshBmszepZDULqTqxnMJhAPiT6UgXMUK5d",
			false,
		);

		const createOrder = parsed?.find((pix) => pix.name === "create_order_with_nonce") as ParsedIdlInstruction<DlnSrc, "create_order_with_nonce">;
		assert.equal(createOrder.args.order_args.give_original_amount.toString(), "3011764280");
		assert.equal(createOrder.accounts[0].name, "maker");
	});
});
