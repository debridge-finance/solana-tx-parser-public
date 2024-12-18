export declare type SplToken22 = {
	accounts: [
		{ discriminator: [80, 188, 245, 20, 95, 138, 57, 156]; name: "Mint" },
		{ discriminator: [113, 66, 224, 54, 188, 119, 240, 101]; name: "Account" },
		{ discriminator: [224, 116, 121, 186, 68, 161, 79, 236]; name: "Multisig" },
	];
	address: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
	constants: [];
	errors: [
		{ code: 0; msg: "Lamport balance below rent-exempt threshold"; name: "NotRentExempt" },
		{ code: 1; msg: "Insufficient funds"; name: "InsufficientFunds" },
		{ code: 2; msg: "Invalid Mint"; name: "InvalidMint" },
		{ code: 3; msg: "Account not associated with this Mint"; name: "MintMismatch" },
		{ code: 4; msg: "Owner does not match"; name: "OwnerMismatch" },
		{ code: 5; msg: "Fixed supply"; name: "FixedSupply" },
		{ code: 6; msg: "Already in use"; name: "AlreadyInUse" },
		{ code: 7; msg: "Invalid number of provided signers"; name: "InvalidNumberOfProvidedSigners" },
		{ code: 8; msg: "Invalid number of required signers"; name: "InvalidNumberOfRequiredSigners" },
		{ code: 9; msg: "State is uninitialized"; name: "UninitializedState" },
		{ code: 10; msg: "Instruction does not support native tokens"; name: "NativeNotSupported" },
		{ code: 11; msg: "Non-native account can only be closed if its balance is zero"; name: "NonNativeHasBalance" },
		{ code: 12; msg: "Invalid instruction"; name: "InvalidInstruction" },
		{ code: 13; msg: "State is invalid for requested operation"; name: "InvalidState" },
		{ code: 14; msg: "Operation overflowed"; name: "Overflow" },
		{ code: 15; msg: "Account does not support specified authority type"; name: "AuthorityTypeNotSupported" },
		{ code: 16; msg: "This token mint cannot freeze accounts"; name: "MintCannotFreeze" },
		{ code: 17; msg: "Account is frozen"; name: "AccountFrozen" },
		{ code: 18; msg: "The provided decimals value different from the Mint decimals"; name: "MintDecimalsMismatch" },
		{ code: 19; msg: "Instruction does not support non-native tokens"; name: "NonNativeNotSupported" },
		{ code: 20; msg: "Extension type does not match already existing extensions"; name: "ExtensionTypeMismatch" },
		{ code: 21; msg: "Extension does not match the base type provided"; name: "ExtensionBaseMismatch" },
		{ code: 22; msg: "Extension already initialized on this account"; name: "ExtensionAlreadyInitialized" },
		{ code: 23; msg: "An account can only be closed if its confidential balance is zero"; name: "ConfidentialTransferAccountHasBalance" },
		{ code: 24; msg: "Account not approved for confidential transfers"; name: "ConfidentialTransferAccountNotApproved" },
		{ code: 25; msg: "Account not accepting deposits or transfers"; name: "ConfidentialTransferDepositsAndTransfersDisabled" },
		{ code: 26; msg: "ElGamal public key mismatch"; name: "ConfidentialTransferElGamalPubkeyMismatch" },
		{ code: 27; msg: "Balance mismatch"; name: "ConfidentialTransferBalanceMismatch" },
		{ code: 28; msg: "Mint has non-zero supply. Burn all tokens before closing the mint"; name: "MintHasSupply" },
		{ code: 29; msg: "No authority exists to perform the desired operation"; name: "NoAuthorityExists" },
		{ code: 30; msg: "Transfer fee exceeds maximum of 10,000 basis points"; name: "TransferFeeExceedsMaximum" },
		{
			code: 31;
			msg: "Mint required for this account to transfer tokens, use `transfer_checked` or `transfer_checked_with_fee`";
			name: "MintRequiredForTransfer";
		},
		{ code: 32; msg: "Calculated fee does not match expected fee"; name: "FeeMismatch" },
		{ code: 33; msg: "Fee parameters associated with zero-knowledge proofs do not match fee parameters in mint"; name: "FeeParametersMismatch" },
		{ code: 34; msg: "The owner authority cannot be changed"; name: "ImmutableOwner" },
		{
			code: 35;
			msg: "An account can only be closed if its withheld fee balance is zero, harvest fees to the mint and try again";
			name: "AccountHasWithheldTransferFees";
		},
		{ code: 36; msg: "No memo in previous instruction, required for recipient to receive a transfer"; name: "NoMemo" },
		{ code: 37; msg: "Transfer is disabled for this mint"; name: "NonTransferable" },
		{ code: 38; msg: "Non-transferable tokens can't be minted to an account without immutable ownership"; name: "NonTransferableNeedsImmutableOwnership" },
		{
			code: 39;
			msg: "The total number of `Deposit` and `Transfer` instructions to an account cannot exceed\n            the associated `maximum_pending_balance_credit_counter`";
			name: "MaximumPendingBalanceCreditCounterExceeded";
		},
		{ code: 40; msg: "Deposit amount exceeds maximum limit"; name: "MaximumDepositAmountExceeded" },
		{ code: 41; msg: "CPI Guard cannot be enabled or disabled in CPI"; name: "CpiGuardSettingsLocked" },
		{
			code: 42;
			msg: "CPI Guard is enabled, and a program attempted to transfer user funds via CPI without using a delegate";
			name: "CpiGuardTransferBlocked";
		},
		{ code: 43; msg: "CPI Guard is enabled, and a program attempted to burn user funds via CPI without using a delegate"; name: "CpiGuardBurnBlocked" },
		{
			code: 44;
			msg: "CPI Guard is enabled, and a program attempted to close an account via CPI without returning lamports to owner";
			name: "CpiGuardCloseAccountBlocked";
		},
		{ code: 45; msg: "CPI Guard is enabled, and a program attempted to approve a delegate via CPI"; name: "CpiGuardApproveBlocked" },
		{ code: 46; msg: "CPI Guard is enabled, and a program attempted to add or replace an authority via CPI"; name: "CpiGuardSetAuthorityBlocked" },
		{ code: 47; msg: "Account ownership cannot be changed while CPI Guard is enabled"; name: "CpiGuardOwnerChangeBlocked" },
		{ code: 48; msg: "Extension not found in account data"; name: "ExtensionNotFound" },
		{ code: 49; msg: "Non-confidential transfers disabled"; name: "NonConfidentialTransfersDisabled" },
		{ code: 50; msg: "An account can only be closed if the confidential withheld fee is zero"; name: "ConfidentialTransferFeeAccountHasWithheldFee" },
		{ code: 51; msg: "A mint or an account is initialized to an invalid combination of extensions"; name: "InvalidExtensionCombination" },
		{ code: 52; msg: "Extension allocation with overwrite must use the same length"; name: "InvalidLengthForAlloc" },
		{ code: 53; msg: "Failed to decrypt a confidential transfer account"; name: "AccountDecryption" },
		{ code: 54; msg: "Failed to generate proof"; name: "ProofGeneration" },
		{ code: 55; msg: "An invalid proof instruction offset was provided"; name: "InvalidProofInstructionOffset" },
		{ code: 56; msg: "Harvest of withheld tokens to mint is disabled"; name: "HarvestToMintDisabled" },
		{ code: 57; msg: "Split proof context state accounts not supported for instruction"; name: "SplitProofContextStateAccountsNotSupported" },
		{ code: 58; msg: "Not enough proof context state accounts provided"; name: "NotEnoughProofContextStateAccounts" },
		{ code: 59; msg: "Ciphertext is malformed"; name: "MalformedCiphertext" },
		{ code: 60; msg: "Ciphertext arithmetic failed"; name: "CiphertextArithmeticFailed" },
	];
	events: [];
	instructions: [
		{
			accounts: [
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "rent"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "decimals"; type: "u8" },
				{ name: "mintAuthority"; type: "pubkey" },
				{ name: "freezeAuthority"; type: { defined: { generics: []; name: "COption<Pubkey>" } } },
			];
			discriminator: [209, 42, 195, 4, 129, 85, 209, 44];
			name: "initializeMint";
		},
		{
			accounts: [
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "rent"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [74, 115, 99, 93, 197, 69, 103, 7];
			name: "initializeAccount";
		},
		{
			accounts: [
				{ docs: []; name: "multisig"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "rent"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "m"; type: "u8" }];
			discriminator: [220, 130, 117, 21, 27, 227, 78, 213];
			name: "initializeMultisig";
		},
		{
			accounts: [
				{ docs: []; name: "source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "authority"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "amount"; type: "u64" }];
			discriminator: [163, 52, 200, 231, 140, 3, 69, 186];
			name: "transfer";
		},
		{
			accounts: [
				{ docs: []; name: "source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "delegate"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "amount"; type: "u64" }];
			discriminator: [69, 74, 217, 36, 115, 117, 97, 76];
			name: "approve";
		},
		{
			accounts: [
				{ docs: []; name: "source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [];
			discriminator: [170, 23, 31, 34, 133, 173, 93, 242];
			name: "revoke";
		},
		{
			accounts: [
				{ docs: []; name: "owned"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "signer"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [
				{ name: "authorityType"; type: { defined: { generics: []; name: "AuthorityType" } } },
				{ name: "newAuthority"; type: { defined: { generics: []; name: "COption<Pubkey>" } } },
			];
			discriminator: [133, 250, 37, 21, 110, 163, 26, 121];
			name: "setAuthority";
		},
		{
			accounts: [
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "amount"; type: "u64" }];
			discriminator: [241, 34, 48, 186, 37, 179, 123, 192];
			name: "mintTo";
		},
		{
			accounts: [
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "authority"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "amount"; type: "u64" }];
			discriminator: [116, 110, 29, 56, 107, 219, 42, 93];
			name: "burn";
		},
		{
			accounts: [
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [];
			discriminator: [125, 255, 149, 14, 110, 34, 72, 24];
			name: "closeAccount";
		},
		{
			accounts: [
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [];
			discriminator: [253, 75, 82, 133, 167, 238, 43, 130];
			name: "freezeAccount";
		},
		{
			accounts: [
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [];
			discriminator: [115, 152, 79, 213, 213, 169, 184, 35];
			name: "thawAccount";
		},
		{
			accounts: [
				{ docs: []; name: "source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "destination"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "authority"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "amount"; type: "u64" }, { name: "decimals"; type: "u8" }];
			discriminator: [119, 250, 202, 24, 253, 135, 244, 121];
			name: "transferChecked";
		},
		{
			accounts: [
				{ docs: []; name: "source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "delegate"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "amount"; type: "u64" }, { name: "decimals"; type: "u8" }];
			discriminator: [47, 197, 254, 42, 58, 201, 58, 109];
			name: "approveChecked";
		},
		{
			accounts: [
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "amount"; type: "u64" }, { name: "decimals"; type: "u8" }];
			discriminator: [229, 236, 36, 240, 118, 225, 45, 125];
			name: "mintToChecked";
		},
		{
			accounts: [
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "authority"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "amount"; type: "u64" }, { name: "decimals"; type: "u8" }];
			discriminator: [198, 121, 200, 102, 120, 208, 155, 178];
			name: "burnChecked";
		},
		{
			accounts: [
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "rent"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "owner"; type: "pubkey" }];
			discriminator: [8, 182, 149, 144, 185, 31, 209, 105];
			name: "initializeAccount2";
		},
		{
			accounts: [{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true }];
			args: [];
			discriminator: [155, 219, 36, 36, 239, 128, 21, 65];
			name: "syncNative";
		},
		{
			accounts: [
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "owner"; type: "pubkey" }];
			discriminator: [23, 142, 140, 135, 21, 160, 133, 64];
			name: "initializeAccount3";
		},
		{
			accounts: [
				{ docs: []; name: "multisig"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "signer"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "m"; type: "u8" }];
			discriminator: [81, 239, 73, 39, 27, 148, 2, 146];
			name: "initializeMultisig2";
		},
		{
			accounts: [{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: true }];
			args: [
				{ name: "decimals"; type: "u8" },
				{ name: "mintAuthority"; type: "pubkey" },
				{ name: "freezeAuthority"; type: { defined: { generics: []; name: "COption<Pubkey>" } } },
			];
			discriminator: [95, 108, 198, 210, 72, 243, 143, 235];
			name: "initializeMint2";
		},
		{
			accounts: [{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false }];
			args: [{ name: "extensionTypes"; type: { vec: { defined: { generics: []; name: "ExtensionType" } } } }];
			discriminator: [16, 177, 210, 128, 21, 45, 111, 31];
			name: "getAccountDataSize";
		},
		{
			accounts: [{ docs: []; name: "tokenAccount"; optional: false; relations: []; signer: false; writable: true }];
			args: [];
			discriminator: [141, 50, 15, 44, 195, 247, 34, 60];
			name: "initializeImmutableOwner";
		},
		{
			accounts: [{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false }];
			args: [{ name: "amount"; type: "u64" }];
			discriminator: [160, 145, 200, 98, 242, 156, 30, 90];
			name: "amountToUiAmount";
		},
		{
			accounts: [{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false }];
			args: [{ name: "uiAmount"; type: { defined: { generics: []; name: "&'astr" } } }];
			discriminator: [173, 243, 64, 4, 103, 31, 56, 52];
			name: "uiAmountToAmount";
		},
		{
			accounts: [{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: true }];
			args: [{ name: "closeAuthority"; type: { defined: { generics: []; name: "COption<Pubkey>" } } }];
			discriminator: [117, 167, 56, 158, 201, 160, 209, 109];
			name: "initializeMintCloseAuthority";
		},
		{
			accounts: [
				{ docs: []; name: "account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "payer"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "systemProgram"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "extensionTypes"; type: { vec: { defined: { generics: []; name: "ExtensionType" } } } }];
			discriminator: [79, 177, 5, 90, 135, 125, 234, 85];
			name: "reallocate";
		},
		{
			accounts: [
				{ docs: []; name: "payer"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "crateNativeMint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "systemProgram"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [114, 254, 53, 96, 51, 248, 117, 109];
			name: "createNativeMint";
		},
		{
			accounts: [{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: true }];
			args: [];
			discriminator: [242, 68, 44, 126, 194, 231, 206, 200];
			name: "initializeNonTransferableMint";
		},
		{
			accounts: [{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: true }];
			args: [{ name: "delegate"; type: "pubkey" }];
			discriminator: [98, 200, 9, 70, 17, 203, 130, 60];
			name: "initializePermanentDelegate";
		},
		{
			accounts: [
				{ docs: []; name: "sourceAccount"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destinationAccount"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "authority"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [];
			discriminator: [221, 166, 235, 25, 123, 95, 232, 59];
			name: "withdrawExcessLamports";
		},
	];
	metadata: { name: "spl_token_2022"; version: "1.0.0"; spec: "0.1.0" };
	types: [
		{ name: "AccountState"; type: { kind: "enum"; variants: [{ name: "Uninitialized" }, { name: "Initialized" }, { name: "Frozen" }] } },
		{
			name: "AuthorityType";
			type: {
				kind: "enum";
				variants: [
					{ name: "MintTokens" },
					{ name: "FreezeAccount" },
					{ name: "AccountOwner" },
					{ name: "CloseAccount" },
					{ name: "TransferFeeConfig" },
					{ name: "WithheldWithdraw" },
					{ name: "CloseMint" },
					{ name: "InterestRate" },
					{ name: "PermanentDelegate" },
					{ name: "ConfidentialTransferMint" },
					{ name: "TransferHookProgramId" },
					{ name: "ConfidentialTransferFeeConfig" },
					{ name: "MetadataPointer" },
					{ name: "GroupPointer" },
					{ name: "GroupMemberPointer" },
				];
			};
		},
		{
			name: "ExtensionType";
			type: {
				kind: "enum";
				variants: [
					{ name: "Uninitialized" },
					{ name: "TransferFeeConfig" },
					{ name: "TransferFeeAmount" },
					{ name: "MintCloseAuthority" },
					{ name: "ConfidentialTransferMint" },
					{ name: "ConfidentialTransferAccount" },
					{ name: "DefaultAccountState" },
					{ name: "ImmutableOwner" },
					{ name: "MemoTransfer" },
					{ name: "NonTransferable" },
					{ name: "InterestBearingConfig" },
					{ name: "CpiGuard" },
					{ name: "PermanentDelegate" },
					{ name: "NonTransferableAccount" },
					{ name: "TransferHook" },
					{ name: "TransferHookAccount" },
					{ name: "ConfidentialTransferFeeConfig" },
					{ name: "ConfidentialTransferFeeAmount" },
					{ name: "MetadataPointer" },
					{ name: "TokenMetadata" },
					{ name: "GroupPointer" },
					{ name: "TokenGroup" },
					{ name: "GroupMemberPointer" },
					{ name: "TokenGroupMember" },
					{ name: "VariableLenMintTest" },
					{ name: "AccountPaddingTest" },
					{ name: "MintPaddingTest" },
				];
			};
		},
		{
			name: "Mint";
			type: {
				fields: [
					{ name: "mintAuthority"; type: { defined: { generics: []; name: "COption<Pubkey>" } } },
					{ name: "supply"; type: "u64" },
					{ name: "decimals"; type: "u8" },
					{ name: "isInitialized"; type: "bool" },
					{ name: "freezeAuthority"; type: { defined: { generics: []; name: "COption<Pubkey>" } } },
				];
				kind: "struct";
			};
		},
		{
			name: "Account";
			type: {
				fields: [
					{ name: "mint"; type: "pubkey" },
					{ name: "owner"; type: "pubkey" },
					{ name: "amount"; type: "u64" },
					{ name: "delegate"; type: { defined: { generics: []; name: "COption<Pubkey>" } } },
					{ name: "state"; type: { defined: { generics: []; name: "AccountState" } } },
					{ name: "isNative"; type: { defined: { generics: []; name: "COption<u64>" } } },
					{ name: "delegatedAmount"; type: "u64" },
					{ name: "closeAuthority"; type: { defined: { generics: []; name: "COption<Pubkey>" } } },
				];
				kind: "struct";
			};
		},
		{
			name: "Multisig";
			type: {
				fields: [
					{ name: "m"; type: "u8" },
					{ name: "n"; type: "u8" },
					{ name: "isInitialized"; type: "bool" },
					{ name: "signers"; type: { array: ["pubkey", 11] } },
				];
				kind: "struct";
			};
		},
	];
};
