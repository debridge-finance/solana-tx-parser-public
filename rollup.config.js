import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
	input: "src/index.ts",
	plugins: [
		commonjs(),
		nodeResolve({
			browser: true,
			preferBuiltins: false,
			dedupe: ["buffer"],
			extensions: [".js", ".ts"],
			mainFields: ["browser", "module", "main"],
		}),
		typescript({
			tsconfig: "./tsconfig.esm.json",
			moduleResolution: "node",
			target: "es2019",
			outputToFilesystem: false,
		}),
		terser(),
	],
	external: ["@solana/web3.js", "@coral-xyz/anchor"],
	output: {
		file: "dist/browser/index.js",
		format: "es",
		sourcemap: true,
	},
};
