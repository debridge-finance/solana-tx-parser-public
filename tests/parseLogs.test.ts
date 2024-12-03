import "mocha";
import assert from "assert";

import { clusterApiUrl, Connection, GetVersionedTransactionConfig, VersionedTransaction } from "@solana/web3.js";

import { parseLogs } from "../src";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const connection = new Connection(clusterApiUrl("mainnet-beta"));

const config: GetVersionedTransactionConfig = {
	commitment: "confirmed",
	maxSupportedTransactionVersion: 0,
};

describe("Test parse logs", () => {
	beforeEach(async () => {
		await sleep(1000);
	});

	it("claim DBR from lfg vault", async () => {
		const transaction = await connection.getTransaction("vExfjh4tsxGij52vzwXAFm85atUoEuSeFdkbe3nP3s7ykmqpwYYQR2ueuJuiLuFL4AdBdQWFnNBPe9jnTkq3244", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 5);
	});

	it("claim DBR from lfg vault 2", async () => {
		const transaction = await connection.getTransaction("3JvmKGK2rmXWqSLFF7rjMtUejgN6pyJLrbAeCFuYAeV4avUwLzorveYG9bDP7FxZfQnoLw3BozChU8PGSZFYcss2", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 10);
	});

	it("claim DBR solana", async () => {
		const transaction = await connection.getTransaction("4VJawfedqZ1EMeDZtaj4mibbqzLMhCHcNwuCPH3TZ3BiYRoHb9Ys5pMhQeC2cvcYex4E41cwCg3CPznypEvxty4q", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 10);
	});

	it("claim DBR evm", async () => {
		const transaction = await connection.getTransaction("32LEkwDy9ddTmuRSttDvMyEbx3cbVWhz73gDYkTVBABX1DPVLqMdgGGYkn1xkSAnmdUd379Qs61j3ngvycoJKBri", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 5);
	});

	it("create order", async () => {
		const transaction = await connection.getTransaction("3ggTVbZvk38HfKTQ8fcTYkvTeDc1uw75KTGUzpm1MVHFJWHhFSbQBALshBmszepZDULqTqxnMJhAPiT6UgXMUK5d", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 9);
	});

	it("create order", async () => {
		const transaction = await connection.getTransaction("4VH6mCzijNG8PM2tZBq3PkAdqtJnkBoHk54s9EEVbcuqWyXmfUGWz6WPmMhgwLGfXJpJf3qd7C8zuoSKYeav4z9C", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 12);
	});

	it("swap and create order", async () => {
		const transaction = await connection.getTransaction("4U9MhiLjCLXwi8q2mC7NrejGGkCExTuo8ibUm2xHG5qu6BiVeDaLieZkxKnusJY7fUH2LTqPL6E23pxpkJQusKdn", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 14);
	});

	it("claim", async () => {
		const transaction = await connection.getTransaction("29pkpwVtAseSivXgWogcNot17QM6XUXVSzVzemEa83KRTA7wrJcvok6ExmTDTQNFRVzkoPGYDx9tQLNfYBjMjSVN", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 13);
	});

	it("send", async () => {
		const transaction = await connection.getTransaction("smvvcUj7KCN16VLCBXsJC7VieTKM3pDNSNRBygcaipiicdq2mevB5iUk5dSRtCk7fnPsKT2jdbtMiCymEppvywL", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 8);
	});

	it("cancel", async () => {
		const transaction = await connection.getTransaction("BKguzw48fZNMkxEtZVVg2BXJB15r3fP1bykKBDCQp549bzn6KTxmSFTR9c9Lw9yxDrUbph31dhYFZLyMpfG6eMN", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 4);
	});

	it("send unlock", async () => {
		const transaction = await connection.getTransaction("53bkomu4z4dR7hxXTEcSz3nawQud6dzCeUjXQ4sm56TwJr9WsCFSbBCbks1BPeyYoWwuPFw68RxWeerJPeoAJhhb", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 16);
	});

	it("send batch unlock", async () => {
		const transaction = await connection.getTransaction("3WQnzbjPUFc55rHLzq2F65ma8anT5eiZTXhVR2DmFGwYuhbEDSnuEQ7yzJzkshwfR3xxAJYBLhs7fnr5s5dpp8Ue", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 11);
	});

	it("fill ext storage", async () => {
		const transaction = await connection.getTransaction("3UsPeqCEssRFkPTAuZhnAbo58UJAyD3ELfRfiXGLrfNkzn2UQJkeeAY2rs7rDbEikmA5tL5xc9MpZ2V4DUvGReKo", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 4);
	});

	it("execute ext storage", async () => {
		const transaction = await connection.getTransaction("T1sddCsAfW3S8LNXJJmJivyni6e4Mvf1yRneco5Ef6rvqE3yGo7uaDT67w6MrGprWkHPdwSa5fDhyALN84UHpzr", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 13);
	});

	it("fulfill", async () => {
		const transaction = await connection.getTransaction("2H1jBCXaqoy8XZFvdsbZzC9bKU3V2C43YoDEJZVBMUg5wKf12LMt4fqT8j65D7SZY1PNfgMFiTRFXqpcAt5Wdc4z", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 9);
	});

	it("swap and fulfill", async () => {
		const transaction = await connection.getTransaction("3f4Cg5sKWMZzJLYrm5rZzZnn4kdUpyr9EjcCh7zMrj3PwgAfogibv7YiigDBdLxp8MDT7scGh4gSdEJ3BvBbWhnC", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 19);
	});

	it("cancel order", async () => {
		const transaction = await connection.getTransaction("Y4RSvrxrj4tVGTK6JqJPJGkLmSC4AJNjhsk98nGz2chw5NHa8YT2CiPPQYy2XUFmxjxLJapWmV5Cq9gAKsBU8uj", config);
		const parsed = parseLogs(transaction?.meta?.logMessages ?? []);

		assert.equal(parsed.length, 18);
	});
});
