import { writeFileSync } from "fs";
import { convertLegacyIdlToV30 } from "../src";
import { IDL } from "../tests/idl/jupiter";

async function main() {
    const res = convertLegacyIdlToV30(IDL, "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo");
    writeFileSync("JupiterV30.ts", JSON.stringify(res));
}

main().catch(console.error);