export declare type StakeLayout = {
	version: "1.0.0";
	name: "stake_program";
	instructions: [
		{
			name: "initialize";
			accounts: [
				{
					name: "stakePubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "clockSysvar";
					isMut: true;
					isSigner: false;
				},
			];
			args: [
				{
					name: "index";
					type: "u32";
				},
				{
					name: "authorized";
					type: {
						defined: "AuthorizedType";
					};
				},
				{
					name: "lockup";
					type: {
						defined: "COption<LockupType>";
					};
				},
			];
		},
		{
			name: "authorize";
			accounts: [
				{
					name: "stakePubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "clockSysvar";
					isMut: true;
					isSigner: false;
				},
				{
					name: "authorizedPubkey";
					isMut: false;
					isSigner: true;
				},
				{
					name: "custodianPubkey";
					isMut: false;
					isSigner: true;
					optional: true;
				},
			];
			args: [
				{
					name: "index";
					type: "u32";
				},
				{
					name: "newAuthorized";
					type: "publicKey";
				},
				{
					name: "stakeAuthorizationType";
					type: {
						defined: "StakeAuthorizationType";
					};
				},
			];
		},
		{
			name: "authorizeWithSeed";
			accounts: [
				{
					name: "stakePubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "authorizedPubkey";
					isMut: false;
					isSigner: true;
				},
				{
					name: "clockSysvar";
					isMut: true;
					isSigner: false;
				},
				{
					name: "custodianPubkey";
					isMut: false;
					isSigner: true;
					optional: true;
				},
			];
			args: [
				{
					name: "index";
					type: "u32";
				},
				{
					name: "newAuthorized";
					type: "publicKey";
				},
				{
					name: "stakeAuthorizationType";
					type: {
						defined: "StakeAuthorizationType";
					};
				},
				{
					name: "authoritySeed";
					type: "string";
				},
				{
					name: "authorityOwner";
					type: "publicKey";
				},
			];
		},
		{
			name: "deactivate";
			accounts: [
				{
					name: "stakePubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "clockSysvar";
					isMut: true;
					isSigner: false;
				},
				{
					name: "authorizedPubkey";
					isMut: false;
					isSigner: true;
				},
			];
			args: [
				{
					name: "index";
					type: "u32";
				},
				{
					name: "stakePubkey";
					type: "publicKey";
				},
				{
					name: "authorizedPubkey";
					type: "publicKey";
				},
			];
		},
		{
			name: "delegate";
			accounts: [
				{
					name: "stakePubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "votePubkey";
					isMut: false;
					isSigner: false;
				},
				{
					name: "clockSysvar";
					isMut: false;
					isSigner: false;
				},
				{
					name: "sysvarStakeHistory";
					isMut: false;
					isSigner: false;
				},
				{
					name: "stakeConfig";
					isMut: false;
					isSigner: false;
				},
				{
					name: "authorizedPubkey";
					isMut: false;
					isSigner: true;
				},
			];
			args: [
				{
					name: "index";
					type: "u32";
				},
			];
		},
		{
			name: "merge";
			accounts: [
				{
					name: "stakePubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "sourceStakePubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "clockSysvar";
					isMut: false;
					isSigner: false;
				},
				{
					name: "sysvarStakeHistory";
					isMut: false;
					isSigner: false;
				},
				{
					name: "authorizedPubkey";
					isMut: false;
					isSigner: true;
				},
			];
			args: [
				{
					name: "index";
					type: "u32";
				},
			];
		},
		{
			name: "split";
			accounts: [
				{
					name: "stakePubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "splitStakePubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "authorizedPubkey";
					isMut: false;
					isSigner: true;
				},
			];
			args: [
				{
					name: "index";
					type: "u32";
				},
				{
					name: "lamports";
					type: "u64";
				},
			];
		},
		{
			name: "withdraw";
			accounts: [
				{
					name: "stakePubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "toPubkey";
					isMut: true;
					isSigner: false;
				},
				{
					name: "clockSysvar";
					isMut: false;
					isSigner: false;
				},
				{
					name: "sysvarStakeHistory";
					isMut: false;
					isSigner: false;
				},
				{
					name: "authorizedPubkey";
					isMut: false;
					isSigner: true;
				},
				{
					name: "custodianPubkey";
					isMut: false;
					isSigner: true;
					optional: true;
				},
			];
			args: [
				{
					name: "index";
					type: "u32";
				},
				{
					name: "lamports";
					type: "u64";
				},
			];
		},
	];
	types: [
		{
			name: "AuthorizedType";
			type: {
				kind: "struct";
				fields: [
					{
						name: "staker";
						type: "publicKey";
					},
					{
						name: "withdrawer";
						type: "publicKey";
					},
				];
			};
		},
		{
			name: "LockupType";
			type: {
				kind: "struct";
				fields: [
					{
						name: "unixTimestamp";
						type: "u64";
					},
					{
						name: "epoch";
						type: "u64";
					},
					{
						name: "custodian";
						type: "publicKey";
					},
				];
			};
		},
		{
			name: "StakeAuthorizationType";
			type: {
				kind: "struct";
				fields: [
					{
						name: "index";
						type: "u32";
					},
				];
			};
		},
	];
};
