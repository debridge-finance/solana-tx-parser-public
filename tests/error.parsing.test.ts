import { Connection, VersionedTransaction, clusterApiUrl } from "@solana/web3.js";

import { parseLogs, SolanaParser } from "../src";

describe("Can process errors", () => {
	const parser = new SolanaParser([]);
	const conn = new Connection(clusterApiUrl("mainnet-beta"));
	describe("Can parse logs with errors", () => {
		it("can parsee logs with unknown idl", async () => {
			const vtx = VersionedTransaction.deserialize(
				Buffer.from(
					"AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAIDPs3sTdC9HmTtCOqiokKX5TnHZG63KabK0+rcZQOBf7obl9aLzABo6Ukp3hhEEtJGerWkkk+QY/G7oOakUaAQRDCnyoNDXTKzuUNo6x9vy6pgqwA1nxr0CNlL76VL4T1KobI1prlbOGLOOMvUunBeUXXtSSDR+8SE/fFPCt536DyAwZGb+UhFzL/7K26csOb57yM5bvF9xJrLEObOkAAAAC71MjzcMpPjCs90pOUL08cshFTYFZEFYZfj6fkg7rlRBTr0X6BEjXe4J2ghN63tfjSkShK/dwpygzzp2eeT0c5tPf93HRsnGuIcsSiHv4oF0CcfFGiDChuMhYrvKdbhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpjJclj04kifG7PRApFI4NgwtaE5na/xCEBI572Nvp+FmDaDE2dLga/qbAABDv0i94Ld8Em35Ij/kKxE/xI7feLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwQABQLgkwQABAAJAzB1AAAAAAAABQsGAQIHAwAACAkKC/0D2nzvipYJB+kBMFXr6AEAAAAqAAAAMHg3NURFMzE4NzRlY2Q3NTVDNkIwMDA0MTEwNzRiNzRCYTVhNDY3QzE5gR4CjKAskoost2yNuIDZXeis3GSl7PEFwC/QyHSHVYeWd9oSOXj6fBG/f8zP+e2weuJUJJv9D1Cu6Hdk3sz5Q8DOzT2ZoPBw8/FSsxoPUI/NCS/yD4QhzC30fi4M5QAKAQfxxh5XUO/sa8ebXaAH6l9tmKQaZ/+UGTGkSYTrptdOaDIr+AozucxkhWP8SUgX/jPPg6+QX+tCNy66qXNHZJUpNBED23HbqsOEhtGtOmVRTSppFFJu2D2CW3u4Abp40e2CEed1xlBein/c0kT7w7K2yogJflAfuYF0BoaD8PW8KBhbIPpGhZUUawEP5OzrSvvgG4jmyR0W8wjHPKdJLDUV4zGgCxDbB8kk8l0mT5cW2RYQGsQlNk6iZYIrAVQI8VBHajKCk6BDb1YhRtB8NaMuIsajHLkWUpY/ceQcX3O9yOyk1VfXrO1jYYvnG0oIPQC2/z4wzg+tr2fBhxQChiWHXxtQYX7i8E3Cwv4A7u5cCrg24hrWjS9njwHzvp2bq5MK1SqoYab+BOA5NfLT4zG62WKLBPRdsnpUuTBWqzCNF9OCpcVEN2V2l6B8iuYmkeaKVwXCQxTwzKO7AQAA",
					"base64",
				),
			);
			const sim = await conn.simulateTransaction(vtx, { replaceRecentBlockhash: true, innerInstructions: true });
			console.log(sim.value.logs);
			const parsedLogs = parseLogs(sim.value.logs!);
			console.log(sim.value.innerInstructions);
			console.log(parsedLogs);
			console.log(sim.value);
		});
	});
});
