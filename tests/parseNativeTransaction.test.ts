/* eslint-disable no-console */
import "mocha";
import assert from "assert";

import { Connection, clusterApiUrl } from "@solana/web3.js";

import { ParsedIdlInstruction, SolanaParser, idl } from "../src";

const rpcConnection = new Connection(clusterApiUrl("mainnet-beta"));
const parser = new SolanaParser([]);

describe("Test parse transaction", () => {
	it("can parse transfer tx", async () => {
		const parsed = await parser.parseTransactionByHash(
			rpcConnection,
			"5UcRhpbnCzgsp9RJ9vt3PRYSy1TMMdAFExWXhfASbwuAmYi7L1sw3u2eWQ3911veefpAFrcidmqmDT2Fkag4kQHh",
			false,
		);

		const transfer = parsed?.find((pix) => pix.name === "transfer") as ParsedIdlInstruction<idl.SplTokenIdl, "transfer">;

		assert.equal(transfer.args.amount.toString(), "10000");
	});

	it("can parse system tx", async () => {
		const parsed = await parser.parseTransactionByHash(
			rpcConnection,
			"5Gvo9kn6AvAFA4caLo6nkVj4aZwCcPJW42ywCRjSmUvwokra16WbAexrKr9dDc7sqTAjJ3G46GgqWYtvvbC48ACX",
			false,
		);

		const createATA = parsed?.find((pix) => pix.name === "createAssociatedTokenAccount");

		assert.equal(Boolean(createATA), true);
	});

	it("can parse base64 tx", async () => {
		const parsed = await parser.parseTransactionDump(
			rpcConnection,
			"Ad/g5OAEaHD3s+moNYVi7UI8R1j0SoFnqOvQv2VhmRT+qvzBcNOOdVKI4j6zAAhblJozVESD4xm/lA2bHDuOiwwBAAEEpWj8ArX39WwJz86zDyZtAlZE9cSVTjPRIN58jtbQPZxhpNDI0S/2ZBfLMb6HeLXgaGGz97EK3dyVlkLYtIg5VPpl7O120Zak9/VrCtDtHyWP+nrMkyrs29yWTK7zUYtQBt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKmaseti9QY1Urgrk5uy9MkXzPc5i5Vq+PxmDQT6B2833QIDAwECAAkDECcAAAAAAAADAwEAAAEJ",
		);

		const transfer = parsed?.find((pix) => pix.name === "transfer") as ParsedIdlInstruction<idl.SplTokenIdl, "transfer">;

		assert.equal(transfer.args.amount.toString(), "10000");
	});
});
