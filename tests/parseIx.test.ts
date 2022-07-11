import "mocha";
import assert from "assert";

import { SplToken } from "@project-serum/anchor";
import { TransactionInstruction, Keypair } from "@solana/web3.js";
import * as spl from "@solana/spl-token";

import { SolanaParser } from "../src/index";
import { ParsedIdlInstruction } from "../src/interfaces";

function parseInstructionTest() {
	const parser = new SolanaParser([]);
	it("can parse spl ix", () => {
		const kp1 = Keypair.generate();
		const kp2 = Keypair.generate();
		const kp3 = Keypair.generate();
		const init3Ix = new TransactionInstruction({
			programId: spl.TOKEN_PROGRAM_ID,
			keys: [
				{ isSigner: false, isWritable: true, pubkey: kp1.publicKey },
				{ isSigner: false, isWritable: false, pubkey: kp2.publicKey },
			],
			data: Buffer.concat([Buffer.from([spl.TokenInstruction.InitializeAccount3]), kp3.publicKey.toBuffer()]),
		});
		const parsed = parser.parseInstruction(init3Ix) as ParsedIdlInstruction<SplToken, "initializeAccount3">;
		assert.equal(parsed.args.authority.toBase58(), kp3.publicKey.toBase58());
		assert.equal(parsed.name, "initializeAccount3");
	});
}

describe("Parse raw instruction data", parseInstructionTest);
