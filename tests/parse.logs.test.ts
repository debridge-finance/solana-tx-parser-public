import { parseLogs } from "../src";

describe("Can parse logs with errors", () => {
	it("can parse logs 1", () => {
		const raw = `
Program ComputeBudget111111111111111111111111111111 invoke [1]
Program ComputeBudget111111111111111111111111111111 success
Program ComputeBudget111111111111111111111111111111 invoke [1]
Program ComputeBudget111111111111111111111111111111 success
Program DEbrdGj3HsRsAzx6uH4MKyREKxVAfBydijLUF3ygsFfh invoke [1]
Program log: Instruction: ExecuteExternalCall
Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]
Program log: Instruction: Transfer
Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 443356 compute units
Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success
Program 11111111111111111111111111111111 invoke [2]
Program 11111111111111111111111111111111 success
Program log: Expected: BepkY2zf8EHpwRYReFk5vVkCWXV4zKvcbks9C9WAPbeR, Actual: 3NnaFRS4PqCj3k5xtFmFoLi5Z9kSR7HsAA4YzaMio3Ky
Program log: AnchorError thrown in programs/debridge/src/external_call_storage.rs:194. Error Code: WrongAccountForExternalCall. Error Number: 20140. Error Message: WrongAccountForExternalCall.
Program DEbrdGj3HsRsAzx6uH4MKyREKxVAfBydijLUF3ygsFfh consumed 92119 of 499700 compute units
Program DEbrdGj3HsRsAzx6uH4MKyREKxVAfBydijLUF3ygsFfh failed: custom program error: 0x4eac`;
		const logs = raw.split("\n").filter((s) => s.length != 0);

		console.log();
		const parsed = parseLogs(logs);
		console.log(parsed);
	});
});
