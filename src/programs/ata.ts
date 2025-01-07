export declare type AssociatedTokenProgram = {
	name: "associated_token_program";
	address: "";
	metadata: {
		name: "associated_token_program";
		version: "1.0.3";
		spec: "0.1.0";
	};
	instructions: [
		{
			discriminator: [0];
			name: "createAssociatedTokenAccountIdempotent";
			accounts: [
				{
					name: "fundingAccount";
					isMut: true;
					isSigner: true;
				},
				{
					name: "newAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "wallet";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenMint";
					isMut: false;
					isSigner: false;
				},
				{
					name: "systemProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "rent";
					isMut: false;
					isSigner: false;
				},
			];
			args: [];
		},
		{
			discriminator: [];
			name: "createAssociatedTokenAccount";
			accounts: [
				{
					name: "fundingAccount";
					isMut: true;
					isSigner: true;
				},
				{
					name: "newAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "wallet";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenMint";
					isMut: false;
					isSigner: false;
				},
				{
					name: "systemProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "rent";
					isMut: false;
					isSigner: false;
				},
			];
			args: [];
		},
	];
};
