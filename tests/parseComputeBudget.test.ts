/* eslint-disable no-console */
import "mocha";
import assert from "assert";

import { ComputeBudgetProgram, TransactionInstruction } from "@solana/web3.js";

import { SolanaParser } from "../src";
import { ParsedIdlInstruction } from "../src/interfaces";
import { ComputeBudgetIdl } from "../src/programs";

const parser = new SolanaParser([]);

describe("Test parse compute budget ixs", () => {
	it("can parse ixs", () => {
		const COMPUTE_UNIT_REQUEST_UNITS = { units: 345, additionalFee: 666 };
		const COMPUTE_UNIT_LIMIT = 200_010;
		const COMPUTE_UNIT_PRICE = 12345;
		const COMPUTE_UNIT_FRAME = 100;
		const COMPUTE_UNIT_ACCOUNT_SIZE_LIMIT = 0x256;

		const setLoadedAccountsDataSizeLimitData = Buffer.alloc(5);
		setLoadedAccountsDataSizeLimitData[0] = 4;
		setLoadedAccountsDataSizeLimitData.writeUint32LE(COMPUTE_UNIT_ACCOUNT_SIZE_LIMIT, 1);

		const heapFrameData = Buffer.alloc(5);
		heapFrameData[0] = 1;
		heapFrameData.writeUint32LE(COMPUTE_UNIT_FRAME, 1);
		const ixs = [
			new TransactionInstruction({
				keys: [],
				programId: ComputeBudgetProgram.programId,
				data: setLoadedAccountsDataSizeLimitData,
			}),
			ComputeBudgetProgram.requestHeapFrame({ bytes: COMPUTE_UNIT_FRAME }),
			ComputeBudgetProgram.setComputeUnitLimit({ units: COMPUTE_UNIT_LIMIT }),
			ComputeBudgetProgram.setComputeUnitPrice({ microLamports: COMPUTE_UNIT_PRICE }),
			ComputeBudgetProgram.requestUnits(COMPUTE_UNIT_REQUEST_UNITS),
			new TransactionInstruction({ keys: [], programId: ComputeBudgetProgram.programId, data: heapFrameData }),
		];
		let parsed = parser.parseInstruction(ixs[0]) as ParsedIdlInstruction<ComputeBudgetIdl>;
		assert.equal(parsed.name, "setLoadedAccountsDataSizeLimit");
		assert.equal(parsed.args.bytes, COMPUTE_UNIT_ACCOUNT_SIZE_LIMIT);

		parsed = parser.parseInstruction(ixs[1]) as ParsedIdlInstruction<ComputeBudgetIdl>;
		assert.equal(parsed.name, "requestHeapFrame");
		assert.equal(parsed.args.bytes, COMPUTE_UNIT_FRAME);

		parsed = parser.parseInstruction(ixs[2]) as ParsedIdlInstruction<ComputeBudgetIdl>;
		assert.equal(parsed.name, "setComputeUnitLimit");
		assert.equal(parsed.args.units, COMPUTE_UNIT_LIMIT);

		parsed = parser.parseInstruction(ixs[3]) as ParsedIdlInstruction<ComputeBudgetIdl>;
		assert.equal(parsed.name, "setComputeUnitPrice");
		assert.equal(parsed.args.microLamports, COMPUTE_UNIT_PRICE);

		parsed = parser.parseInstruction(ixs[4]) as ParsedIdlInstruction<ComputeBudgetIdl>;
		assert.equal(parsed.name, "requestUnits");
		assert.equal(parsed.args.units, COMPUTE_UNIT_REQUEST_UNITS.units);
		assert.equal(parsed.args.additionalFee, COMPUTE_UNIT_REQUEST_UNITS.additionalFee);

		parsed = parser.parseInstruction(ixs[5]) as ParsedIdlInstruction<ComputeBudgetIdl>;
		assert.equal(parsed.name, "requestHeapFrame");
		assert.equal(parsed.args.bytes, COMPUTE_UNIT_FRAME);
	});
});
