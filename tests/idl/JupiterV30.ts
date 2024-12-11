export declare type JupiterV30 = {
	accounts: [{ discriminator: [168, 138, 232, 85, 49, 147, 3, 2]; name: "tokenLedger" }];
	address: "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo";
	constants: [];
	errors: [
		{ code: 6000; msg: "Slippage tolerance exceeded"; name: "SlippageToleranceExceeded" },
		{ code: 6001; msg: "Invalid token ledger"; name: "InvalidTokenLedger" },
		{ code: 6002; msg: "Missing token ledger"; name: "MissingTokenLedger" },
		{ code: 6003; msg: "Missing mercurial exchange token account"; name: "MissingMercurialExchangeTokenAccount" },
		{ code: 6004; msg: "Ledger token account does not match"; name: "LedgerTokenAccountDoesNotMatch" },
		{ code: 6005; msg: "Missing platform fee account"; name: "MissingPlatformFeeAccount" },
		{ code: 6006; msg: "Invalid calculation"; name: "InvalidCalculation" },
	];
	events: [];
	instructions: [
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "swap_state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pool_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_token_account"; optional: false; relations: []; signer: false; writable: true },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [31, 248, 60, 226, 215, 168, 55, 199];
			name: "mercurial_exchange";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "swap"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "swap_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "clock"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "input_user_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "input_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "output_user_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "output_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "fees_token_account"; optional: false; relations: []; signer: false; writable: true },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [145, 158, 184, 212, 3, 74, 156, 118];
			name: "saber_exchange";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "swap"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "swap_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "input_user_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "input_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "output_user_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "output_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "fees_token_account"; optional: false; relations: []; signer: false; writable: true },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [64, 62, 98, 226, 52, 74, 37, 178];
			name: "saber_swap";
		},
		{
			accounts: [
				{ docs: []; name: "add_decimals_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "wrapper"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "wrapper_mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "wrapper_underlying_tokens"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "user_underlying_tokens"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_wrapped_tokens"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [30, 130, 91, 146, 128, 80, 145, 232];
			name: "saber_add_decimals_deposit";
		},
		{
			accounts: [
				{ docs: []; name: "add_decimals_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "wrapper"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "wrapper_mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "wrapper_underlying_tokens"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "owner"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "user_underlying_tokens"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_wrapped_tokens"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [228, 191, 206, 12, 242, 90, 137, 34];
			name: "saber_add_decimals_withdraw";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "swap"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "input_user_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "input_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "input_fees_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "output_user_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "output_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "output_fees_account"; optional: false; relations: []; signer: false; writable: true },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [94, 31, 159, 252, 144, 67, 4, 100];
			name: "sencha_exchange";
		},
		{
			accounts: [
				{
					accounts: [
						{ docs: []; name: "market"; optional: false; relations: []; signer: false; writable: true },
						{ docs: []; name: "open_orders"; optional: false; relations: []; signer: false; writable: true },
						{ docs: []; name: "request_queue"; optional: false; relations: []; signer: false; writable: true },
						{ docs: []; name: "event_queue"; optional: false; relations: []; signer: false; writable: true },
						{ docs: []; name: "bids"; optional: false; relations: []; signer: false; writable: true },
						{ docs: []; name: "asks"; optional: false; relations: []; signer: false; writable: true },
						{ docs: []; name: "coin_vault"; optional: false; relations: []; signer: false; writable: true },
						{ docs: []; name: "pc_vault"; optional: false; relations: []; signer: false; writable: true },
						{ docs: []; name: "vault_signer"; optional: false; relations: []; signer: false; writable: false },
					];
					name: "market";
				},
				{ docs: []; name: "authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "order_payer_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "coin_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pc_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "dex_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "rent"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "side"; type: { defined: { generics: []; name: "Side" } } },
				{ name: "in_amount"; type: { option: "u64" } },
				{ name: "minimum_out_amount"; type: "u64" },
				{ name: "platform_fee_bps"; type: "u8" },
			];
			discriminator: [88, 183, 70, 249, 214, 118, 82, 210];
			name: "serum_swap";
		},
		{
			accounts: [
				{ docs: []; name: "token_swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "swap"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "swap_source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "swap_destination"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_fee"; optional: false; relations: []; signer: false; writable: true },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [187, 192, 118, 212, 62, 109, 28, 213];
			name: "token_swap";
		},
		{
			accounts: [
				{ docs: []; name: "token_swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "swap"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "swap_source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "swap_destination"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_fee"; optional: false; relations: []; signer: false; writable: true },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [55, 100, 17, 243, 242, 181, 43, 165];
			name: "step_token_swap";
		},
		{
			accounts: [
				{ docs: []; name: "token_swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "swap"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "swap_state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "swap_source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "swap_destination"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_fee"; optional: false; relations: []; signer: false; writable: true },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [167, 38, 59, 37, 132, 60, 95, 68];
			name: "cropper_token_swap";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "amm_id"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "amm_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "amm_open_orders"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "amm_target_orders"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_coin_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_pc_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_program_id"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "serum_market"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_bids"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_asks"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_event_queue"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_coin_vault_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_pc_vault_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_vault_signer"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_source_owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [177, 173, 42, 240, 184, 4, 124, 81];
			name: "raydium_swap";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "amm_id"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "amm_authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "amm_open_orders"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_coin_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_pc_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_program_id"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "serum_market"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_bids"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_asks"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_event_queue"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_coin_vault_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_pc_vault_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "serum_vault_signer"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_source_owner"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [69, 227, 98, 93, 237, 202, 223, 140];
			name: "raydium_swap_v2";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pool"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pool_signer"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pool_mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "base_token_vault"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "quote_token_vault"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "fee_pool_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "wallet_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "user_base_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_quote_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "in_amount"; type: { option: "u64" } },
				{ name: "minimum_out_amount"; type: "u64" },
				{ name: "side"; type: { defined: { generics: []; name: "Side" } } },
				{ name: "platform_fee_bps"; type: "u8" },
			];
			discriminator: [251, 232, 119, 166, 225, 185, 169, 161];
			name: "aldrin_swap";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pool"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pool_signer"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pool_mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "base_token_vault"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "quote_token_vault"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "fee_pool_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "wallet_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "user_base_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_quote_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "curve"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "in_amount"; type: { option: "u64" } },
				{ name: "minimum_out_amount"; type: "u64" },
				{ name: "side"; type: { defined: { generics: []; name: "Side" } } },
				{ name: "platform_fee_bps"; type: "u8" },
			];
			discriminator: [190, 166, 89, 139, 33, 152, 16, 10];
			name: "aldrin_v2_swap";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pool"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_signer"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_source_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_ticks_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "wallet_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [235, 160, 175, 122, 61, 177, 2, 247];
			name: "crema_token_swap";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "authority"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "amm"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "source_info"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "destination_info"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "swap_source"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "swap_destination"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "pool_mint"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "fee_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pyth_account"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pyth_pc_account"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "config_account"; optional: false; relations: []; signer: false; writable: true },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [0, 49, 246, 1, 36, 153, 11, 93];
			name: "lifinity_token_swap";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "signer"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "factory_state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "pool_state"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "input_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "output_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "input_vault"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "output_vault"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "last_observation_state"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "core_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "in_amount"; type: { option: "u64" } }, { name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [38, 241, 21, 107, 120, 59, 184, 249];
			name: "cykura_swap";
		},
		{
			accounts: [
				{ docs: []; name: "swap_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "whirlpool"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_owner_account_a"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_vault_a"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_owner_account_b"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_vault_b"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "tick_array0"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "tick_array1"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "tick_array2"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "oracle"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "in_amount"; type: { option: "u64" } },
				{ name: "minimum_out_amount"; type: "u64" },
				{ name: "a_to_b"; type: "bool" },
				{ name: "platform_fee_bps"; type: "u8" },
			];
			discriminator: [123, 229, 184, 63, 12, 0, 92, 145];
			name: "whirlpool_swap";
		},
		{
			accounts: [
				{ docs: []; name: "token_ledger"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_destination_token_account"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "user_transfer_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "minimum_out_amount"; type: "u64" }, { name: "platform_fee_bps"; type: "u8" }];
			discriminator: [81, 42, 179, 152, 221, 1, 181, 120];
			name: "risk_check_and_fee";
		},
		{
			accounts: [
				{ docs: []; name: "token_ledger"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "payer"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [244, 63, 250, 192, 50, 44, 172, 250];
			name: "initialize_token_ledger";
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
	];
	metadata: { name: "jupiter"; version: "0.1.0"; spec: "" };
	types: [
		{
			name: "Swap";
			type: {
				fields: [
					{ name: "tokens"; type: "u64" },
					{ name: "min_tokens"; type: "u64" },
					{ name: "side"; type: { defined: { generics: []; name: "Side" } } },
				];
				kind: "struct";
			};
		},
		{
			name: "Swap";
			type: {
				fields: [
					{ name: "tokens"; type: "u64" },
					{ name: "min_tokens"; type: "u64" },
					{ name: "side"; type: { defined: { generics: []; name: "Side" } } },
				];
				kind: "struct";
			};
		},
		{
			name: "Swap";
			type: {
				fields: [{ name: "amount_in"; type: "u64" }, { name: "minimum_amount_out"; type: "u64" }];
				kind: "struct";
			};
		},
		{
			name: "Swap";
			type: {
				fields: [
					{ name: "amount"; type: "u64" },
					{ name: "other_amount_threshold"; type: "u64" },
					{ name: "sqrt_price_limit"; type: "u128" },
					{ name: "amount_specified_is_input"; type: "bool" },
					{ name: "a_to_b"; type: "bool" },
				];
				kind: "struct";
			};
		},
		{ name: "SwapInstrution"; type: { kind: "enum"; variants: [{ fields: [{ defined: { generics: []; name: "Swap" } }]; name: "Swap" }] } },
		{ name: "Side"; type: { kind: "enum"; variants: [{ name: "Bid" }, { name: "Ask" }] } },
		{ name: "Direction"; type: { kind: "enum"; variants: [{ name: "LeftToRight" }, { name: "RightToLeft" }] } },
		{
			name: "tokenLedger";
			type: {
				fields: [{ name: "token_account"; type: "pubkey" }, { name: "amount"; type: "u64" }];
				kind: "struct";
			};
		},
	];
};

export const IDL: JupiterV30 = {
	accounts: [{ discriminator: [168, 138, 232, 85, 49, 147, 3, 2], name: "tokenLedger" }],
	address: "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo",
	constants: [],
	errors: [
		{ code: 6000, msg: "Slippage tolerance exceeded", name: "SlippageToleranceExceeded" },
		{ code: 6001, msg: "Invalid token ledger", name: "InvalidTokenLedger" },
		{ code: 6002, msg: "Missing token ledger", name: "MissingTokenLedger" },
		{ code: 6003, msg: "Missing mercurial exchange token account", name: "MissingMercurialExchangeTokenAccount" },
		{ code: 6004, msg: "Ledger token account does not match", name: "LedgerTokenAccountDoesNotMatch" },
		{ code: 6005, msg: "Missing platform fee account", name: "MissingPlatformFeeAccount" },
		{ code: 6006, msg: "Invalid calculation", name: "InvalidCalculation" },
	],
	events: [],
	instructions: [
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "swap_state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pool_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_token_account", optional: false, relations: [], signer: false, writable: true },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [31, 248, 60, 226, 215, 168, 55, 199],
			name: "mercurial_exchange",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "swap", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "swap_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "clock", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "input_user_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "input_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "output_user_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "output_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "fees_token_account", optional: false, relations: [], signer: false, writable: true },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [145, 158, 184, 212, 3, 74, 156, 118],
			name: "saber_exchange",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "swap", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "swap_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "input_user_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "input_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "output_user_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "output_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "fees_token_account", optional: false, relations: [], signer: false, writable: true },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [64, 62, 98, 226, 52, 74, 37, 178],
			name: "saber_swap",
		},
		{
			accounts: [
				{ docs: [], name: "add_decimals_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "wrapper", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "wrapper_mint", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "wrapper_underlying_tokens", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "owner", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "user_underlying_tokens", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_wrapped_tokens", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [30, 130, 91, 146, 128, 80, 145, 232],
			name: "saber_add_decimals_deposit",
		},
		{
			accounts: [
				{ docs: [], name: "add_decimals_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "wrapper", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "wrapper_mint", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "wrapper_underlying_tokens", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "owner", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "user_underlying_tokens", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_wrapped_tokens", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [228, 191, 206, 12, 242, 90, 137, 34],
			name: "saber_add_decimals_withdraw",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "swap", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "input_user_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "input_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "input_fees_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "output_user_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "output_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "output_fees_account", optional: false, relations: [], signer: false, writable: true },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [94, 31, 159, 252, 144, 67, 4, 100],
			name: "sencha_exchange",
		},
		{
			accounts: [
				{
					accounts: [
						{ docs: [], name: "market", optional: false, relations: [], signer: false, writable: true },
						{ docs: [], name: "open_orders", optional: false, relations: [], signer: false, writable: true },
						{ docs: [], name: "request_queue", optional: false, relations: [], signer: false, writable: true },
						{ docs: [], name: "event_queue", optional: false, relations: [], signer: false, writable: true },
						{ docs: [], name: "bids", optional: false, relations: [], signer: false, writable: true },
						{ docs: [], name: "asks", optional: false, relations: [], signer: false, writable: true },
						{ docs: [], name: "coin_vault", optional: false, relations: [], signer: false, writable: true },
						{ docs: [], name: "pc_vault", optional: false, relations: [], signer: false, writable: true },
						{ docs: [], name: "vault_signer", optional: false, relations: [], signer: false, writable: false },
					],
					name: "market",
				},
				{ docs: [], name: "authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "order_payer_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "coin_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pc_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "dex_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "rent", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "side", type: { defined: { generics: [], name: "Side" } } },
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [88, 183, 70, 249, 214, 118, 82, 210],
			name: "serum_swap",
		},
		{
			accounts: [
				{ docs: [], name: "token_swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "swap", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "source", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "swap_source", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "swap_destination", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_mint", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_fee", optional: false, relations: [], signer: false, writable: true },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [187, 192, 118, 212, 62, 109, 28, 213],
			name: "token_swap",
		},
		{
			accounts: [
				{ docs: [], name: "token_swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "swap", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "source", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "swap_source", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "swap_destination", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_mint", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_fee", optional: false, relations: [], signer: false, writable: true },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [55, 100, 17, 243, 242, 181, 43, 165],
			name: "step_token_swap",
		},
		{
			accounts: [
				{ docs: [], name: "token_swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "swap", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "swap_state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "source", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "swap_source", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "swap_destination", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_mint", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_fee", optional: false, relations: [], signer: false, writable: true },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [167, 38, 59, 37, 132, 60, 95, 68],
			name: "cropper_token_swap",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "amm_id", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "amm_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "amm_open_orders", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "amm_target_orders", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_coin_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_pc_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_program_id", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "serum_market", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_bids", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_asks", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_event_queue", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_coin_vault_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_pc_vault_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_vault_signer", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_source_owner", optional: false, relations: [], signer: true, writable: false },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [177, 173, 42, 240, 184, 4, 124, 81],
			name: "raydium_swap",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "amm_id", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "amm_authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "amm_open_orders", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_coin_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_pc_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_program_id", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "serum_market", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_bids", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_asks", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_event_queue", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_coin_vault_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_pc_vault_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "serum_vault_signer", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_source_owner", optional: false, relations: [], signer: true, writable: false },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [69, 227, 98, 93, 237, 202, 223, 140],
			name: "raydium_swap_v2",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pool", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pool_signer", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pool_mint", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "base_token_vault", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "quote_token_vault", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "fee_pool_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "wallet_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "user_base_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_quote_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "side", type: { defined: { generics: [], name: "Side" } } },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [251, 232, 119, 166, 225, 185, 169, 161],
			name: "aldrin_swap",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pool", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pool_signer", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pool_mint", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "base_token_vault", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "quote_token_vault", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "fee_pool_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "wallet_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "user_base_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_quote_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "curve", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "side", type: { defined: { generics: [], name: "Side" } } },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [190, 166, 89, 139, 33, 152, 16, 10],
			name: "aldrin_v2_swap",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pool", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_signer", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_source_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_ticks_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "wallet_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [235, 160, 175, 122, 61, 177, 2, 247],
			name: "crema_token_swap",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "authority", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "amm", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "source_info", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "destination_info", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "swap_source", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "swap_destination", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "pool_mint", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "fee_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pyth_account", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pyth_pc_account", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "config_account", optional: false, relations: [], signer: false, writable: true },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [0, 49, 246, 1, 36, 153, 11, 93],
			name: "lifinity_token_swap",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "signer", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "factory_state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "pool_state", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "input_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "output_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "input_vault", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "output_vault", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "last_observation_state", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "core_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [38, 241, 21, 107, 120, 59, 184, 249],
			name: "cykura_swap",
		},
		{
			accounts: [
				{ docs: [], name: "swap_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "whirlpool", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_owner_account_a", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_vault_a", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_owner_account_b", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_vault_b", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "tick_array0", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "tick_array1", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "tick_array2", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "oracle", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "in_amount", type: { option: "u64" } },
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "a_to_b", type: "bool" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [123, 229, 184, 63, 12, 0, 92, 145],
			name: "whirlpool_swap",
		},
		{
			accounts: [
				{ docs: [], name: "token_ledger", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_destination_token_account", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "user_transfer_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "minimum_out_amount", type: "u64" },
				{ name: "platform_fee_bps", type: "u8" },
			],
			discriminator: [81, 42, 179, 152, 221, 1, 181, 120],
			name: "risk_check_and_fee",
		},
		{
			accounts: [
				{ docs: [], name: "token_ledger", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "payer", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [],
			discriminator: [244, 63, 250, 192, 50, 44, 172, 250],
			name: "initialize_token_ledger",
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
	],
	metadata: { name: "jupiter", version: "0.1.0", spec: "" },
	types: [
		{
			name: "Swap",
			type: {
				fields: [
					{ name: "tokens", type: "u64" },
					{ name: "min_tokens", type: "u64" },
					{ name: "side", type: { defined: { generics: [], name: "Side" } } },
				],
				kind: "struct",
			},
		},
		{
			name: "Swap",
			type: {
				fields: [
					{ name: "tokens", type: "u64" },
					{ name: "min_tokens", type: "u64" },
					{ name: "side", type: { defined: { generics: [], name: "Side" } } },
				],
				kind: "struct",
			},
		},
		{
			name: "Swap",
			type: {
				fields: [
					{ name: "amount_in", type: "u64" },
					{ name: "minimum_amount_out", type: "u64" },
				],
				kind: "struct",
			},
		},
		{
			name: "Swap",
			type: {
				fields: [
					{ name: "amount", type: "u64" },
					{ name: "other_amount_threshold", type: "u64" },
					{ name: "sqrt_price_limit", type: "u128" },
					{ name: "amount_specified_is_input", type: "bool" },
					{ name: "a_to_b", type: "bool" },
				],
				kind: "struct",
			},
		},
		{ name: "SwapInstrution", type: { kind: "enum", variants: [{ fields: [{ defined: { generics: [], name: "Swap" } }], name: "Swap" }] } },
		{ name: "Side", type: { kind: "enum", variants: [{ name: "Bid" }, { name: "Ask" }] } },
		{ name: "Direction", type: { kind: "enum", variants: [{ name: "LeftToRight" }, { name: "RightToLeft" }] } },
		{
			name: "tokenLedger",
			type: {
				fields: [
					{ name: "token_account", type: "pubkey" },
					{ name: "amount", type: "u64" },
				],
				kind: "struct",
			},
		},
	],
};
