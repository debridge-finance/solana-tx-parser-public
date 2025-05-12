export declare type Jupiter = {
	accounts: [{ discriminator: [156, 247, 9, 188, 54, 108, 85, 77]; name: "TokenLedger" }];
	address: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4";
	constants: [];
	errors: [
		{ code: 6000; msg: "Empty route"; name: "EmptyRoute" },
		{ code: 6001; msg: "Slippage tolerance exceeded"; name: "SlippageToleranceExceeded" },
		{ code: 6002; msg: "Invalid calculation"; name: "InvalidCalculation" },
		{ code: 6003; msg: "Missing platform fee account"; name: "MissingPlatformFeeAccount" },
		{ code: 6004; msg: "Invalid slippage"; name: "InvalidSlippage" },
		{ code: 6005; msg: "Not enough percent to 100"; name: "NotEnoughPercent" },
		{ code: 6006; msg: "Token input index is invalid"; name: "InvalidInputIndex" },
		{ code: 6007; msg: "Token output index is invalid"; name: "InvalidOutputIndex" },
		{ code: 6008; msg: "Not Enough Account keys"; name: "NotEnoughAccountKeys" },
		{ code: 6009; msg: "Non zero minimum out amount not supported"; name: "NonZeroMinimumOutAmountNotSupported" },
		{ code: 6010; msg: "Invalid route plan"; name: "InvalidRoutePlan" },
		{ code: 6011; msg: "Invalid referral authority"; name: "InvalidReferralAuthority" },
		{ code: 6012; msg: "Token account doesn't match the ledger"; name: "LedgerTokenAccountDoesNotMatch" },
		{ code: 6013; msg: "Invalid token ledger"; name: "InvalidTokenLedger" },
		{ code: 6014; msg: "Token program ID is invalid"; name: "IncorrectTokenProgramID" },
		{ code: 6015; msg: "Token program not provided"; name: "TokenProgramNotProvided" },
		{ code: 6016; msg: "Swap not supported"; name: "SwapNotSupported" },
		{ code: 6017; msg: "Exact out amount doesn't match"; name: "ExactOutAmountNotMatched" },
		{ code: 6018; msg: "Source mint and destination mint cannot the same"; name: "SourceAndDestinationMintCannotBeTheSame" },
	];
	events: [
		{ discriminator: [64, 198, 205, 232, 38, 8, 113, 226]; name: "SwapEvent" },
		{ discriminator: [73, 79, 78, 127, 184, 213, 13, 220]; name: "FeeEvent" },
	];
	instructions: [
		{
			accounts: [
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "user_source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_token_account"; optional: true; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "platform_fee_account"; optional: true; relations: []; signer: false; writable: true },
			];
			args: [
				{ name: "route_plan"; type: { vec: { defined: { generics: []; name: "RoutePlanStep" } } } },
				{ name: "in_amount"; type: "u64" },
				{ name: "quoted_out_amount"; type: "u64" },
				{ name: "slippage_bps"; type: "u16" },
				{ name: "platform_fee_bps"; type: "u8" },
			];
			discriminator: [229, 23, 203, 151, 122, 227, 173, 42];
			name: "route";
			returns: "u64";
		},
		{
			accounts: [
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "user_source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_token_account"; optional: true; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "platform_fee_account"; optional: true; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_ledger"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "route_plan"; type: { vec: { defined: { generics: []; name: "RoutePlanStep" } } } },
				{ name: "quoted_out_amount"; type: "u64" },
				{ name: "slippage_bps"; type: "u16" },
				{ name: "platform_fee_bps"; type: "u8" },
			];
			discriminator: [150, 86, 71, 116, 167, 93, 14, 104];
			name: "route_with_token_ledger";
			returns: "u64";
		},
		{
			accounts: [
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "program_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "program_source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "program_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "source_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "destination_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "platform_fee_account"; optional: true; relations: []; signer: false; writable: true },
				{ docs: []; name: "token2022_program"; optional: true; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "id"; type: "u8" },
				{ name: "route_plan"; type: { vec: { defined: { generics: []; name: "RoutePlanStep" } } } },
				{ name: "in_amount"; type: "u64" },
				{ name: "quoted_out_amount"; type: "u64" },
				{ name: "slippage_bps"; type: "u16" },
				{ name: "platform_fee_bps"; type: "u8" },
			];
			discriminator: [193, 32, 155, 51, 65, 214, 156, 129];
			name: "shared_accounts_route";
			returns: "u64";
		},
		{
			accounts: [
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "program_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "program_source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "program_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "source_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "destination_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "platform_fee_account"; optional: true; relations: []; signer: false; writable: true },
				{ docs: []; name: "token2022_program"; optional: true; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_ledger"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "id"; type: "u8" },
				{ name: "route_plan"; type: { vec: { defined: { generics: []; name: "RoutePlanStep" } } } },
				{ name: "quoted_out_amount"; type: "u64" },
				{ name: "slippage_bps"; type: "u16" },
				{ name: "platform_fee_bps"; type: "u8" },
			];
			discriminator: [230, 121, 143, 80, 119, 159, 106, 170];
			name: "shared_accounts_route_with_token_ledger";
			returns: "u64";
		},
		{
			accounts: [
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "user_source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_token_account"; optional: true; relations: []; signer: false; writable: true },
				{ docs: []; name: "source_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "destination_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "platform_fee_account"; optional: true; relations: []; signer: false; writable: true },
				{ docs: []; name: "token2022_program"; optional: true; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "route_plan"; type: { vec: { defined: { generics: []; name: "RoutePlanStep" } } } },
				{ name: "out_amount"; type: "u64" },
				{ name: "quoted_in_amount"; type: "u64" },
				{ name: "slippage_bps"; type: "u16" },
				{ name: "platform_fee_bps"; type: "u8" },
			];
			discriminator: [208, 51, 239, 151, 123, 43, 237, 92];
			name: "exact_out_route";
			returns: "u64";
		},
		{
			accounts: [
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "program_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "program_source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "program_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "source_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "destination_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "platform_fee_account"; optional: true; relations: []; signer: false; writable: true },
				{ docs: []; name: "token2022_program"; optional: true; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "id"; type: "u8" },
				{ name: "route_plan"; type: { vec: { defined: { generics: []; name: "RoutePlanStep" } } } },
				{ name: "out_amount"; type: "u64" },
				{ name: "quoted_in_amount"; type: "u64" },
				{ name: "slippage_bps"; type: "u16" },
				{ name: "platform_fee_bps"; type: "u8" },
			];
			discriminator: [176, 209, 105, 168, 154, 125, 69, 62];
			name: "shared_accounts_exact_out_route";
			returns: "u64";
		},
		{
			accounts: [
				{ docs: []; name: "token_ledger"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_account"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [228, 85, 185, 112, 78, 79, 77, 2];
			name: "set_token_ledger";
		},
		{
			accounts: [
				{ docs: []; name: "open_orders"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "payer"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "dex_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "rent"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "market"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [229, 194, 212, 172, 8, 10, 134, 147];
			name: "create_open_orders";
		},
		{
			accounts: [
				{ docs: []; name: "token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "bump"; type: "u8" }];
			discriminator: [147, 241, 123, 100, 244, 132, 174, 118];
			name: "create_token_account";
		},
		{
			accounts: [
				{ docs: []; name: "open_orders"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "payer"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "program_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "dex_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "rent"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "market"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "id"; type: "u8" }];
			discriminator: [28, 226, 32, 148, 188, 136, 113, 171];
			name: "create_program_open_orders";
		},
		{
			accounts: [
				{ docs: []; name: "wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "program_authority"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "id"; type: "u8" }];
			discriminator: [62, 198, 214, 193, 213, 159, 108, 210];
			name: "claim";
			returns: "u64";
		},
		{
			accounts: [
				{ docs: []; name: "payer"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "wallet"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "program_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "program_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "associated_token_token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "associated_token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "id"; type: "u8" }];
			discriminator: [116, 206, 27, 191, 166, 19, 0, 73];
			name: "claim_token";
			returns: "u64";
		},
		{
			accounts: [
				{ docs: []; name: "token_ledger"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "payer"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [232, 242, 197, 253, 240, 143, 129, 52];
			name: "create_token_ledger";
		},
	];
	metadata: { name: "jupiter"; version: "0.1.0"; spec: "0.1.0" };
	types: [
		{ name: "AmountWithSlippage"; type: { fields: [{ name: "amount"; type: "u64" }, { name: "slippage_bps"; type: "u16" }]; kind: "struct" } },
		{
			name: "RoutePlanStep";
			type: {
				fields: [
					{ name: "swap"; type: { defined: { generics: []; name: "Swap" } } },
					{ name: "percent"; type: "u8" },
					{ name: "input_index"; type: "u8" },
					{ name: "output_index"; type: "u8" },
				];
				kind: "struct";
			};
		},
		{
			name: "PlatformFeeType";
			type: {
				kind: "enum";
				variants: [
					{ fields: [{ name: "mint"; type: "pubkey" }]; name: "SourceMint" },
					{ fields: [{ name: "mint"; type: "pubkey" }]; name: "DestinationMint" },
					{ name: "Zero" },
				];
			};
		},
		{ name: "Side"; type: { kind: "enum"; variants: [{ name: "Bid" }, { name: "Ask" }] } },
		{
			name: "Swap";
			type: {
				kind: "enum";
				variants: [
					{ name: "Saber" },
					{ name: "SaberAddDecimalsDeposit" },
					{ name: "SaberAddDecimalsWithdraw" },
					{ name: "TokenSwap" },
					{ name: "Sencha" },
					{ name: "Step" },
					{ name: "Cropper" },
					{ name: "Raydium" },
					{ fields: [{ name: "a_to_b"; type: "bool" }]; name: "Crema" },
					{ name: "Lifinity" },
					{ name: "Mercurial" },
					{ name: "Cykura" },
					{ fields: [{ name: "side"; type: { defined: { generics: []; name: "Side" } } }]; name: "Serum" },
					{ name: "MarinadeDeposit" },
					{ name: "MarinadeUnstake" },
					{ fields: [{ name: "side"; type: { defined: { generics: []; name: "Side" } } }]; name: "Aldrin" },
					{ fields: [{ name: "side"; type: { defined: { generics: []; name: "Side" } } }]; name: "AldrinV2" },
					{ fields: [{ name: "a_to_b"; type: "bool" }]; name: "Whirlpool" },
					{ fields: [{ name: "x_to_y"; type: "bool" }]; name: "Invariant" },
					{ name: "Meteora" },
					{ name: "GooseFX" },
					{ fields: [{ name: "stable"; type: "bool" }]; name: "DeltaFi" },
					{ name: "Balansol" },
					{ fields: [{ name: "x_to_y"; type: "bool" }]; name: "MarcoPolo" },
					{ fields: [{ name: "side"; type: { defined: { generics: []; name: "Side" } } }]; name: "Dradex" },
					{ name: "LifinityV2" },
					{ name: "RaydiumClmm" },
					{ fields: [{ name: "side"; type: { defined: { generics: []; name: "Side" } } }]; name: "Openbook" },
					{ fields: [{ name: "side"; type: { defined: { generics: []; name: "Side" } } }]; name: "Phoenix" },
					{ fields: [{ name: "from_token_id"; type: "u64" }, { name: "to_token_id"; type: "u64" }]; name: "Symmetry" },
					{ name: "TokenSwapV2" },
					{ name: "HeliumTreasuryManagementRedeemV0" },
					{ name: "StakeDexStakeWrappedSol" },
					{ fields: [{ name: "bridge_stake_seed"; type: "u32" }]; name: "StakeDexSwapViaStake" },
					{ name: "GooseFXV2" },
					{ name: "Perps" },
					{ name: "PerpsAddLiquidity" },
					{ name: "PerpsRemoveLiquidity" },
					{ name: "MeteoraDlmm" },
					{ fields: [{ name: "side"; type: { defined: { generics: []; name: "Side" } } }]; name: "OpenBookV2" },
					{ name: "RaydiumClmmV2" },
					{ fields: [{ name: "bridge_stake_seed"; type: "u32" }]; name: "StakeDexPrefundWithdrawStakeAndDepositStake" },
					{
						fields: [
							{ name: "pool_index"; type: "u8" },
							{ name: "quantity_is_input"; type: "bool" },
							{ name: "quantity_is_collateral"; type: "bool" },
						];
						name: "Clone";
					},
					{
						fields: [
							{ name: "src_lst_value_calc_accs"; type: "u8" },
							{ name: "dst_lst_value_calc_accs"; type: "u8" },
							{ name: "src_lst_index"; type: "u32" },
							{ name: "dst_lst_index"; type: "u32" },
						];
						name: "SanctumS";
					},
					{ fields: [{ name: "lst_value_calc_accs"; type: "u8" }, { name: "lst_index"; type: "u32" }]; name: "SanctumSAddLiquidity" },
					{ fields: [{ name: "lst_value_calc_accs"; type: "u8" }, { name: "lst_index"; type: "u32" }]; name: "SanctumSRemoveLiquidity" },
					{ name: "RaydiumCP" },
					{
						fields: [
							{ name: "a_to_b"; type: "bool" },
							{ name: "remaining_accounts_info"; type: { option: { defined: { generics: []; name: "RemainingAccountsInfo" } } } },
						];
						name: "WhirlpoolSwapV2";
					},
					{ name: "OneIntro" },
					{ name: "PumpdotfunWrappedBuy" },
					{ name: "PumpdotfunWrappedSell" },
					{ name: "PerpsV2" },
					{ name: "PerpsV2AddLiquidity" },
					{ name: "PerpsV2RemoveLiquidity" },
					{ name: "MoonshotWrappedBuy" },
					{ name: "MoonshotWrappedSell" },
					{ name: "StabbleStableSwap" },
					{ name: "StabbleWeightedSwap" },
					{ fields: [{ name: "x_to_y"; type: "bool" }]; name: "Obric" },
					{ name: "FoxBuyFromEstimatedCost" },
					{ fields: [{ name: "is_y"; type: "bool" }]; name: "FoxClaimPartial" },
					{ fields: [{ name: "is_quote_to_base"; type: "bool" }]; name: "SolFi" },
				];
			};
		},
		{
			name: "RemainingAccountsSlice";
			type: {
				fields: [{ name: "accounts_type"; type: { defined: { generics: []; name: "AccountsType" } } }, { name: "length"; type: "u8" }];
				kind: "struct";
			};
		},
		{
			name: "RemainingAccountsInfo";
			type: { fields: [{ name: "slices"; type: { vec: { defined: { generics: []; name: "RemainingAccountsSlice" } } } }]; kind: "struct" };
		},
		{ name: "AccountsType"; type: { kind: "enum"; variants: [{ name: "TransferHookA" }, { name: "TransferHookB" }] } },
		{ name: "TokenLedger"; type: { fields: [{ name: "token_account"; type: "pubkey" }, { name: "amount"; type: "u64" }]; kind: "struct" } },
		{
			name: "SwapEvent";
			type: {
				fields: [
					{ name: "amm"; type: "pubkey" },
					{ name: "input_mint"; type: "pubkey" },
					{ name: "input_amount"; type: "u64" },
					{ name: "output_mint"; type: "pubkey" },
					{ name: "output_amount"; type: "u64" },
				];
				kind: "struct";
			};
		},
		{
			name: "FeeEvent";
			type: { fields: [{ name: "account"; type: "pubkey" }, { name: "mint"; type: "pubkey" }, { name: "amount"; type: "u64" }]; kind: "struct" };
		},
	];
};
export const IDL: Jupiter = {
	accounts: [{ discriminator: [156, 247, 9, 188, 54, 108, 85, 77], name: "TokenLedger" }],
	address: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",
	constants: [],
	errors: [
		{ code: 6000, msg: "Empty route", name: "EmptyRoute" },
		{ code: 6001, msg: "Slippage tolerance exceeded", name: "SlippageToleranceExceeded" },
		{ code: 6002, msg: "Invalid calculation", name: "InvalidCalculation" },
		{ code: 6003, msg: "Missing platform fee account", name: "MissingPlatformFeeAccount" },
		{ code: 6004, msg: "Invalid slippage", name: "InvalidSlippage" },
		{ code: 6005, msg: "Not enough percent to 100", name: "NotEnoughPercent" },
		{ code: 6006, msg: "Token input index is invalid", name: "InvalidInputIndex" },
		{ code: 6007, msg: "Token output index is invalid", name: "InvalidOutputIndex" },
		{ code: 6008, msg: "Not Enough Account keys", name: "NotEnoughAccountKeys" },
		{ code: 6009, msg: "Non zero minimum out amount not supported", name: "NonZeroMinimumOutAmountNotSupported" },
		{ code: 6010, msg: "Invalid route plan", name: "InvalidRoutePlan" },
		{ code: 6011, msg: "Invalid referral authority", name: "InvalidReferralAuthority" },
		{ code: 6012, msg: "Token account doesn't match the ledger", name: "LedgerTokenAccountDoesNotMatch" },
		{ code: 6013, msg: "Invalid token ledger", name: "InvalidTokenLedger" },
		{ code: 6014, msg: "Token program ID is invalid", name: "IncorrectTokenProgramID" },
		{ code: 6015, msg: "Token program not provided", name: "TokenProgramNotProvided" },
		{ code: 6016, msg: "Swap not supported", name: "SwapNotSupported" },
		{ code: 6017, msg: "Exact out amount doesn't match", name: "ExactOutAmountNotMatched" },
		{ code: 6018, msg: "Source mint and destination mint cannot the same", name: "SourceAndDestinationMintCannotBeTheSame" },
	],
	events: [
		{ discriminator: [64, 198, 205, 232, 38, 8, 113, 226], name: "SwapEvent" },
		{ discriminator: [73, 79, 78, 127, 184, 213, 13, 220], name: "FeeEvent" },
	],
	instructions: [
		{
			accounts: [
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "user_source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_token_account", optional: true, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "platform_fee_account", optional: true, relations: [], signer: false, writable: true },
			],
			args: [
				{ name: "route_plan", type: { vec: { defined: { generics: [], name: "RoutePlanStep" } } } },
				{ name: "in_amount", type: "u64" },
				{ name: "quoted_out_amount", type: "u64" },
				{ name: "slippage_bps", type: "u16" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [229, 23, 203, 151, 122, 227, 173, 42],
			name: "route",
			returns: "u64",
		},
		{
			accounts: [
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "user_source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_token_account", optional: true, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "platform_fee_account", optional: true, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_ledger", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "route_plan", type: { vec: { defined: { generics: [], name: "RoutePlanStep" } } } },
				{ name: "quoted_out_amount", type: "u64" },
				{ name: "slippage_bps", type: "u16" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [150, 86, 71, 116, 167, 93, 14, 104],
			name: "route_with_token_ledger",
			returns: "u64",
		},
		{
			accounts: [
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "program_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "program_source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "program_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "source_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "destination_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "platform_fee_account", optional: true, relations: [], signer: false, writable: true },
				{ docs: [], name: "token2022_program", optional: true, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "id", type: "u8" },
				{ name: "route_plan", type: { vec: { defined: { generics: [], name: "RoutePlanStep" } } } },
				{ name: "in_amount", type: "u64" },
				{ name: "quoted_out_amount", type: "u64" },
				{ name: "slippage_bps", type: "u16" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [193, 32, 155, 51, 65, 214, 156, 129],
			name: "shared_accounts_route",
			returns: "u64",
		},
		{
			accounts: [
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "program_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "program_source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "program_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "source_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "destination_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "platform_fee_account", optional: true, relations: [], signer: false, writable: true },
				{ docs: [], name: "token2022_program", optional: true, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_ledger", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "id", type: "u8" },
				{ name: "route_plan", type: { vec: { defined: { generics: [], name: "RoutePlanStep" } } } },
				{ name: "quoted_out_amount", type: "u64" },
				{ name: "slippage_bps", type: "u16" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [230, 121, 143, 80, 119, 159, 106, 170],
			name: "shared_accounts_route_with_token_ledger",
			returns: "u64",
		},
		{
			accounts: [
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "user_source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_token_account", optional: true, relations: [], signer: false, writable: true },
				{ docs: [], name: "source_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "destination_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "platform_fee_account", optional: true, relations: [], signer: false, writable: true },
				{ docs: [], name: "token2022_program", optional: true, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "route_plan", type: { vec: { defined: { generics: [], name: "RoutePlanStep" } } } },
				{ name: "out_amount", type: "u64" },
				{ name: "quoted_in_amount", type: "u64" },
				{ name: "slippage_bps", type: "u16" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [208, 51, 239, 151, 123, 43, 237, 92],
			name: "exact_out_route",
			returns: "u64",
		},
		{
			accounts: [
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "program_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "program_source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "program_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "source_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "destination_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "platform_fee_account", optional: true, relations: [], signer: false, writable: true },
				{ docs: [], name: "token2022_program", optional: true, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "id", type: "u8" },
				{ name: "route_plan", type: { vec: { defined: { generics: [], name: "RoutePlanStep" } } } },
				{ name: "out_amount", type: "u64" },
				{ name: "quoted_in_amount", type: "u64" },
				{ name: "slippage_bps", type: "u16" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [176, 209, 105, 168, 154, 125, 69, 62],
			name: "shared_accounts_exact_out_route",
			returns: "u64",
		},
		{
			accounts: [
				{ docs: [], name: "token_ledger", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_account", optional: false, relations: [], signer: false, writable: false },
			],
			args: [],
			discriminator: [228, 85, 185, 112, 78, 79, 77, 2],
			name: "set_token_ledger",
		},
		{
			accounts: [
				{ docs: [], name: "open_orders", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "payer", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "dex_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "rent", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "market", optional: false, relations: [], signer: false, writable: false },
			],
			args: [],
			discriminator: [229, 194, 212, 172, 8, 10, 134, 147],
			name: "create_open_orders",
		},
		{
			accounts: [
				{ docs: [], name: "token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "bump", type: "u8" }],
			discriminator: [147, 241, 123, 100, 244, 132, 174, 118],
			name: "create_token_account",
		},
		{
			accounts: [
				{ docs: [], name: "open_orders", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "payer", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "program_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "dex_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "rent", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "market", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "id", type: "u8" }],
			discriminator: [28, 226, 32, 148, 188, 136, 113, 171],
			name: "create_program_open_orders",
		},
		{
			accounts: [
				{ docs: [], name: "wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "program_authority", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "id", type: "u8" }],
			discriminator: [62, 198, 214, 193, 213, 159, 108, 210],
			name: "claim",
			returns: "u64",
		},
		{
			accounts: [
				{ docs: [], name: "payer", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "wallet", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "program_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "program_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "associated_token_token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "associated_token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "id", type: "u8" }],
			discriminator: [116, 206, 27, 191, 166, 19, 0, 73],
			name: "claim_token",
			returns: "u64",
		},
		{
			accounts: [
				{ docs: [], name: "token_ledger", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "payer", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [],
			discriminator: [232, 242, 197, 253, 240, 143, 129, 52],
			name: "create_token_ledger",
		},
	],
	metadata: { name: "jupiter", version: "0.1.0", spec: "0.1.0" },
	types: [
		{
			name: "AmountWithSlippage",
			type: {
				fields: [
					{ name: "amount", type: "u64" },
					{ name: "slippage_bps", type: "u16" },
				],
				kind: "struct",
			},
		},
		{
			name: "RoutePlanStep",
			type: {
				fields: [
					{ name: "swap", type: { defined: { generics: [], name: "Swap" } } },
					{ name: "percent", type: "u8" },
					{ name: "input_index", type: "u8" },
					{ name: "output_index", type: "u8" },
				],
				kind: "struct",
			},
		},
		{
			name: "PlatformFeeType",
			type: {
				kind: "enum",
				variants: [
					{ fields: [{ name: "mint", type: "pubkey" }], name: "SourceMint" },
					{ fields: [{ name: "mint", type: "pubkey" }], name: "DestinationMint" },
					{ name: "Zero" },
				],
			},
		},
		{ name: "Side", type: { kind: "enum", variants: [{ name: "Bid" }, { name: "Ask" }] } },
		{
			name: "Swap",
			type: {
				kind: "enum",
				variants: [
					{ name: "Saber" },
					{ name: "SaberAddDecimalsDeposit" },
					{ name: "SaberAddDecimalsWithdraw" },
					{ name: "TokenSwap" },
					{ name: "Sencha" },
					{ name: "Step" },
					{ name: "Cropper" },
					{ name: "Raydium" },
					{ fields: [{ name: "a_to_b", type: "bool" }], name: "Crema" },
					{ name: "Lifinity" },
					{ name: "Mercurial" },
					{ name: "Cykura" },
					{ fields: [{ name: "side", type: { defined: { generics: [], name: "Side" } } }], name: "Serum" },
					{ name: "MarinadeDeposit" },
					{ name: "MarinadeUnstake" },
					{ fields: [{ name: "side", type: { defined: { generics: [], name: "Side" } } }], name: "Aldrin" },
					{ fields: [{ name: "side", type: { defined: { generics: [], name: "Side" } } }], name: "AldrinV2" },
					{ fields: [{ name: "a_to_b", type: "bool" }], name: "Whirlpool" },
					{ fields: [{ name: "x_to_y", type: "bool" }], name: "Invariant" },
					{ name: "Meteora" },
					{ name: "GooseFX" },
					{ fields: [{ name: "stable", type: "bool" }], name: "DeltaFi" },
					{ name: "Balansol" },
					{ fields: [{ name: "x_to_y", type: "bool" }], name: "MarcoPolo" },
					{ fields: [{ name: "side", type: { defined: { generics: [], name: "Side" } } }], name: "Dradex" },
					{ name: "LifinityV2" },
					{ name: "RaydiumClmm" },
					{ fields: [{ name: "side", type: { defined: { generics: [], name: "Side" } } }], name: "Openbook" },
					{ fields: [{ name: "side", type: { defined: { generics: [], name: "Side" } } }], name: "Phoenix" },
					{
						fields: [
							{ name: "from_token_id", type: "u64" },
							{ name: "to_token_id", type: "u64" },
						],
						name: "Symmetry",
					},
					{ name: "TokenSwapV2" },
					{ name: "HeliumTreasuryManagementRedeemV0" },
					{ name: "StakeDexStakeWrappedSol" },
					{ fields: [{ name: "bridge_stake_seed", type: "u32" }], name: "StakeDexSwapViaStake" },
					{ name: "GooseFXV2" },
					{ name: "Perps" },
					{ name: "PerpsAddLiquidity" },
					{ name: "PerpsRemoveLiquidity" },
					{ name: "MeteoraDlmm" },
					{ fields: [{ name: "side", type: { defined: { generics: [], name: "Side" } } }], name: "OpenBookV2" },
					{ name: "RaydiumClmmV2" },
					{ fields: [{ name: "bridge_stake_seed", type: "u32" }], name: "StakeDexPrefundWithdrawStakeAndDepositStake" },
					{
						fields: [
							{ name: "pool_index", type: "u8" },
							{ name: "quantity_is_input", type: "bool" },
							{ name: "quantity_is_collateral", type: "bool" },
						],
						name: "Clone",
					},
					{
						fields: [
							{ name: "src_lst_value_calc_accs", type: "u8" },
							{ name: "dst_lst_value_calc_accs", type: "u8" },
							{ name: "src_lst_index", type: "u32" },
							{ name: "dst_lst_index", type: "u32" },
						],
						name: "SanctumS",
					},
					{
						fields: [
							{ name: "lst_value_calc_accs", type: "u8" },
							{ name: "lst_index", type: "u32" },
						],
						name: "SanctumSAddLiquidity",
					},
					{
						fields: [
							{ name: "lst_value_calc_accs", type: "u8" },
							{ name: "lst_index", type: "u32" },
						],
						name: "SanctumSRemoveLiquidity",
					},
					{ name: "RaydiumCP" },
					{
						fields: [
							{ name: "a_to_b", type: "bool" },
							{ name: "remaining_accounts_info", type: { option: { defined: { generics: [], name: "RemainingAccountsInfo" } } } },
						],
						name: "WhirlpoolSwapV2",
					},
					{ name: "OneIntro" },
					{ name: "PumpdotfunWrappedBuy" },
					{ name: "PumpdotfunWrappedSell" },
					{ name: "PerpsV2" },
					{ name: "PerpsV2AddLiquidity" },
					{ name: "PerpsV2RemoveLiquidity" },
					{ name: "MoonshotWrappedBuy" },
					{ name: "MoonshotWrappedSell" },
					{ name: "StabbleStableSwap" },
					{ name: "StabbleWeightedSwap" },
					{ fields: [{ name: "x_to_y", type: "bool" }], name: "Obric" },
					{ name: "FoxBuyFromEstimatedCost" },
					{ fields: [{ name: "is_y", type: "bool" }], name: "FoxClaimPartial" },
					{ fields: [{ name: "is_quote_to_base", type: "bool" }], name: "SolFi" },
				],
			},
		},
		{
			name: "RemainingAccountsSlice",
			type: {
				fields: [
					{ name: "accounts_type", type: { defined: { generics: [], name: "AccountsType" } } },
					{ name: "length", type: "u8" },
				],
				kind: "struct",
			},
		},
		{
			name: "RemainingAccountsInfo",
			type: { fields: [{ name: "slices", type: { vec: { defined: { generics: [], name: "RemainingAccountsSlice" } } } }], kind: "struct" },
		},
		{ name: "AccountsType", type: { kind: "enum", variants: [{ name: "TransferHookA" }, { name: "TransferHookB" }] } },
		{
			name: "TokenLedger",
			type: {
				fields: [
					{ name: "token_account", type: "pubkey" },
					{ name: "amount", type: "u64" },
				],
				kind: "struct",
			},
		},
		{
			name: "SwapEvent",
			type: {
				fields: [
					{ name: "amm", type: "pubkey" },
					{ name: "input_mint", type: "pubkey" },
					{ name: "input_amount", type: "u64" },
					{ name: "output_mint", type: "pubkey" },
					{ name: "output_amount", type: "u64" },
				],
				kind: "struct",
			},
		},
		{
			name: "FeeEvent",
			type: {
				fields: [
					{ name: "account", type: "pubkey" },
					{ name: "mint", type: "pubkey" },
					{ name: "amount", type: "u64" },
				],
				kind: "struct",
			},
		},
	],
};
