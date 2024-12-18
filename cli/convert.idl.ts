import { writeFileSync } from "fs";
import { convertLegacyIdlToV30 } from "../src";
import { IDL } from "../tests/idl/dst";

async function main() {
	const typeName = "SplToken22";
	const res = convertLegacyIdlToV30(IDL, "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo");
	const stringified = JSON.stringify(res);
	writeFileSync(
		"./src/programs/spl-token-22.program.ts",
		`export declare type ${typeName} = ${stringified};\nexport const IDL: ${typeName} = ${stringified};\n`,
	);
}

main().catch(console.error);
