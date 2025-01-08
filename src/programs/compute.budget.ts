export declare type ComputeBudget = {
	address: "ComputeBudget111111111111111111111111111111";
	metadata: {
		name: "computeBudgetProgram";
		version: "1.0.3";
		spec: "0.1.0";
	};
	constants: [];
	errors: [];
	accounts: [];
	types: [];
	instructions: [
		{
			discriminator: [0];
			accounts: [];
			name: "requestUnits";
			args: [{ type: "u32"; name: "units" }, { type: "u32"; name: "additionalFee" }];
		},
		{
			discriminator: [1];
			name: "requestHeapFrame";
			accounts: [];
			args: [{ type: "u32"; name: "bytes" }];
		},
		{
			discriminator: [2];
			name: "setComputeUnitLimit";
			accounts: [];
			args: [{ type: "u32"; name: "units" }];
		},
		{
			discriminator: [3];
			name: "setComputeUnitPrice";
			accounts: [];
			args: [{ type: "u64"; name: "microLamports" }];
		},
		{
			discriminator: [4];
			name: "setLoadedAccountsDataSizeLimit";
			accounts: [];
			args: [{ type: "u32"; name: "bytes" }];
		},
	];
};
