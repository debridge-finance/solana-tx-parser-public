export type DlnSrc = {
	accounts: [
		{ discriminator: [146, 10, 19, 112, 191, 43, 175, 106]; name: "state" },
		{ discriminator: [62, 200, 109, 228, 254, 27, 147, 148]; name: "giveOrderState" },
		{ discriminator: [253, 24, 171, 44, 200, 204, 206, 81]; name: "nonceMaster" },
		{ discriminator: [253, 238, 80, 139, 23, 160, 35, 15]; name: "authorizedNativeSender" },
	];
	address: "src5qyZHqTqecJV4aY6Cb6zDZLMDzrDKKezs22MPHr4";
	constants: [];
	errors: [
		{ code: 6000; msg: "Order state-account have wrong pubkey. Perhaps you miscalculated order_id."; name: "GiveOrderStateWrongPubkey" },
		{ code: 6001; msg: "Order state-account have wrong status, for this action."; name: "GiveOrderStateWrongStatus" },
		{ code: 6002; msg: "Order wallet-account have wrong pubkey. Perhaps you miscalculated order_id."; name: "GiveOrderWalletWrongPubkey" },
		{ code: 6003; msg: "Can't calculate order id. Wrong input arguments."; name: "CalculationOrderIdError" },
		{ code: 6004; msg: "Incoming data resulted in match-overflow error."; name: "OverflowError" },
		{ code: 6005; msg: "Order already processed. Can't do this action."; name: "OrderAlreadyProcessed" },
		{ code: 6006; msg: "Too little patch for give amount. Please add more"; name: "WrongPatchAmount" },
		{
			code: 6007;
			msg: "Wrong parent ix program id. This method must be called by debridge program in execute_external call";
			name: "WrongClaimParentProgramId";
		},
		{ code: 6008; msg: "Wrong parent ix. This method must be called by debridge program in execute_external call"; name: "WrongClaimParentInstruction" },
		{
			code: 6009;
			msg: "Wrong parent ix accounts. This method must be called by debridge program in execute_external call";
			name: "WrongClaimParentInstructionAccounts";
		},
		{
			code: 6010;
			msg: "Wrong parent ix submission. This method must be called by debridge program in execute_external call";
			name: "WrongClaimParentSubmission";
		},
		{
			code: 6011;
			msg: "Wrong parent debridge-submission authority. This method must be called by debridge program in execute_external call";
			name: "WrongClaimParentSubmissionAuth";
		},
		{
			code: 6012;
			msg: "Wrong parent debridge-submission native sender. This method must be called by debridge program in execute_external call";
			name: "WrongClaimParentNativeSender";
		},
		{
			code: 6013;
			msg: "Wrong parent debridge-submission source chain. This method must be called by debridge program in execute_external call";
			name: "WrongClaimParentSourceChain";
		},
		{ code: 6014; msg: "Wrong size of receiver address for this chain"; name: "BadReceiverDstSize" },
		{ code: 6015; msg: "Wrong size of order authority address for this chain"; name: "BadOrderAuthorityDstSize" },
		{ code: 6016; msg: "Wrong size of allowed taker address for this chain"; name: "BadAllowedTakerDst" },
		{ code: 6017; msg: "Wrong size of fallback address address for this chain"; name: "BadFallbackAddressDstSize" },
		{ code: 6018; msg: "Affiliate fee already paid or not exists"; name: "AffiliateFeeNotReadyToPay" },
		{ code: 6019; msg: "Fix fee already paid"; name: "FixFeeAlreadyPaid" },
		{ code: 6020; msg: "Percent fee already paid"; name: "PercentFeeAlreadyPaid" },
		{ code: 6021; msg: "Orders with external call not allowed right now"; name: "ExternalCallDisables" },
		{ code: 6022; msg: "Fee ledger wallet pubkey miscalculated"; name: "FeeLedgerWalletWrongKey" },
		{ code: 6023; msg: "Cancel beneficiary not allowed, use cancel-beneficiary from order state-account"; name: "NotAllowedCancelBeneficiary" },
		{ code: 6024; msg: "The action cannot be continued, the program-state is on pause"; name: "StatePaused" },
		{ code: 6025; msg: "Can't unpause because the program is already running"; name: "StateWorking" },
		{ code: 6026; msg: "Wrong signer for realloc"; name: "WrongSigner" },
		{ code: 6027; msg: "Realloc not needed, new space equal to old one"; name: "ReallocNotNeeded" },
		{ code: 6028; msg: "Failed to parse extcall program id from receiver_dst field."; name: "WrongExtcallIdError" },
	];
	events: [
		{ discriminator: [106, 87, 74, 230, 32, 120, 71, 210]; name: "CreatedOrder" },
		{ discriminator: [187, 41, 27, 73, 12, 63, 13, 84]; name: "CreatedOrderId" },
		{ discriminator: [98, 176, 8, 102, 211, 245, 60, 182]; name: "ClaimedOrderCancel" },
		{ discriminator: [200, 45, 167, 251, 49, 232, 91, 13]; name: "ClaimedUnlock" },
		{ discriminator: [6, 189, 113, 78, 139, 50, 136, 69]; name: "IncreasedGiveAmount" },
	];
	instructions: [
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "payer"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "fee_ledger"; optional: false; relations: []; signer: false; writable: true },
			];
			args: [{ name: "new_state"; type: { defined: { generics: []; name: "NewState" } } }];
			discriminator: [190, 171, 224, 219, 217, 72, 199, 176];
			name: "initialize_state";
		},
		{
			accounts: [
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [67, 181, 233, 214, 215, 148, 245, 126];
			name: "realloc_state";
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "fixed_fee"; type: "u64" }];
			discriminator: [238, 14, 137, 181, 156, 157, 55, 27];
			name: "set_fixed_fee";
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "percent_fee_bps"; type: "u64" }];
			discriminator: [115, 39, 161, 77, 175, 252, 152, 141];
			name: "set_percent_fee_bps";
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "is_fee_refund"; type: "bool" }];
			discriminator: [127, 239, 175, 39, 72, 244, 47, 33];
			name: "set_is_fee_refund";
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "fee_beneficiary"; type: "pubkey" }];
			discriminator: [35, 243, 194, 253, 151, 40, 229, 251];
			name: "set_fee_beneficiry";
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "stop_tap"; type: "pubkey" }];
			discriminator: [80, 3, 201, 203, 245, 184, 51, 5];
			name: "set_stop_tap";
		},
		{
			accounts: [
				{
					accounts: [
						{
							docs: ["State account with service information", "There is a single state account for the entire program"];
							name: "state";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
						{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
					];
					name: "update_state";
				},
				{ docs: []; name: "new_protocol_authority"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [];
			discriminator: [96, 162, 46, 152, 72, 147, 175, 176];
			name: "set_protocol_authority";
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "stop_tap"; optional: false; relations: []; signer: true; writable: true },
			];
			args: [];
			discriminator: [44, 86, 151, 21, 158, 185, 8, 36];
			name: "pause_state";
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [133, 243, 138, 167, 154, 215, 251, 167];
			name: "unpause_state";
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: false;
				},
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "authorized_native_sender"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "chain_id"; type: { array: ["u8", 32] } }, { name: "new_authorized_native_sender"; type: "bytes" }];
			discriminator: [213, 75, 181, 116, 29, 225, 125, 209];
			name: "update_authorized_native_sender";
		},
		{
			accounts: [
				{ docs: []; name: "maker"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_mint"; optional: false; relations: []; signer: false; writable: false },
				{
					docs: [
						"Account with GiveOrderState",
						"seeds = [GiveOrderState::SEED, &order_id.to_bytes()],",
						"Will be initialized inside [`create_order`]",
					];
					name: "give_order_state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "authorized_native_sender"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "maker_wallet"; optional: false; relations: []; signer: false; writable: true },
				{
					docs: ["Wallet of `give_order_state`", "Will be initialized inside [`create_order`]"];
					name: "give_order_wallet";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "nonce_master"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "fee_ledger_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "associated_spl_token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "order_args"; type: { defined: { generics: []; name: "CreateOrderArgs" } } },
				{ name: "affiliate_fee"; type: { option: { defined: { generics: []; name: "AffiliateFee" } } } },
				{ name: "referral_code"; type: { option: "u32" } },
			];
			discriminator: [141, 54, 37, 207, 237, 210, 250, 215];
			name: "create_order";
		},
		{
			accounts: [
				{ docs: []; name: "maker"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "token_mint"; optional: false; relations: []; signer: false; writable: false },
				{
					docs: [
						"Account with GiveOrderState",
						"seeds = [GiveOrderState::SEED, &order_id.to_bytes()],",
						"Will be initialized inside [`create_order`]",
					];
					name: "give_order_state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "authorized_native_sender"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "maker_wallet"; optional: false; relations: []; signer: false; writable: true },
				{
					docs: ["Wallet of `give_order_state`", "Will be initialized inside [`create_order`]"];
					name: "give_order_wallet";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "nonce_master"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "fee_ledger_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "associated_spl_token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "order_args"; type: { defined: { generics: []; name: "CreateOrderArgs" } } },
				{ name: "affiliate_fee"; type: { option: { defined: { generics: []; name: "AffiliateFee" } } } },
				{ name: "referral_code"; type: { option: "u32" } },
				{ name: "nonce"; type: "u64" },
				{ name: "metadata"; type: "bytes" },
			];
			discriminator: [130, 131, 98, 190, 40, 206, 68, 50];
			name: "create_order_with_nonce";
		},
		{
			accounts: [
				{ docs: []; name: "give_order_state"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "give_order_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "give_patch_authority"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "give_patch_authority_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "order_id"; type: { array: ["u8", 32] } }, { name: "input_addition_to_give_amount"; type: "u64" }];
			discriminator: [64, 188, 129, 255, 64, 129, 139, 102];
			name: "patch_order_give";
		},
		{
			accounts: [
				{ docs: ["0"]; name: "submission"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["1"]; name: "submission_authority"; optional: false; relations: []; signer: true; writable: true },
				{
					docs: ["2", "State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: ["3"]; name: "fee_ledger"; optional: false; relations: []; signer: false; writable: true },
				{ docs: ["4"]; name: "fee_ledger_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: ["5"]; name: "instructions"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["6"]; name: "give_order_state"; optional: false; relations: []; signer: false; writable: true },
				{
					docs: ["Action beneficiary ATA", "If empty, then automatically initialized ATA (determined based on [`AccountInfo::owner`])"];
					name: "action_beneficiary_wallet";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: ["8"]; name: "action_beneficiary"; optional: false; relations: []; signer: false; writable: true },
				{ docs: ["9"]; name: "give_order_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: ["10"]; name: "token_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["11"]; name: "authorized_native_sender"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["12"]; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "order_id"; type: { array: ["u8", 32] } }];
			discriminator: [89, 81, 180, 79, 142, 144, 66, 251];
			name: "claim_unlock";
		},
		{
			accounts: [
				{ docs: ["0"]; name: "submission"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["1"]; name: "submission_authority"; optional: false; relations: []; signer: true; writable: true },
				{
					docs: ["2", "State account with service information", "There is a single state account for the entire program"];
					name: "state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: ["3"]; name: "fee_ledger"; optional: false; relations: []; signer: false; writable: true },
				{ docs: ["4"]; name: "fee_ledger_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: ["5"]; name: "instructions"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["6"]; name: "give_order_state"; optional: false; relations: []; signer: false; writable: true },
				{
					docs: ["Action beneficiary ATA", "If empty, then automatically initialized ATA (determined based on [`AccountInfo::owner`])"];
					name: "action_beneficiary_wallet";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: ["8"]; name: "action_beneficiary"; optional: false; relations: []; signer: false; writable: true },
				{ docs: ["9"]; name: "give_order_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: ["10"]; name: "token_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["11"]; name: "authorized_native_sender"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["12"]; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "order_id"; type: { array: ["u8", 32] } }];
			discriminator: [19, 97, 126, 238, 204, 141, 69, 76];
			name: "claim_order_cancel";
		},
		{
			accounts: [
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "fee_ledger"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "fee_beneficiary"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [24, 156, 23, 253, 46, 76, 247, 202];
			name: "withdraw_fix_fee";
		},
		{
			accounts: [
				{
					accounts: [
						{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: false },
						{ docs: []; name: "fee_ledger"; optional: false; relations: []; signer: false; writable: true },
						{ docs: []; name: "fee_beneficiary"; optional: false; relations: []; signer: true; writable: true },
						{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
					];
					name: "withdraw_fee";
				},
				{ docs: []; name: "fee_ledger_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "fee_beneficiary_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "token_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [50, 219, 95, 73, 93, 162, 245, 14];
			name: "withdraw_percent_fee";
		},
		{
			accounts: [
				{ docs: []; name: "affiliate_fee_beneficiary"; optional: false; relations: []; signer: true; writable: false },
				{ docs: []; name: "affiliate_fee_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "give_order_state"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "give_order_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "order_id"; type: { array: ["u8", 32] } }];
			discriminator: [143, 79, 158, 208, 125, 51, 86, 85];
			name: "withdraw_affiliate_fee";
		},
	];
	metadata: { name: "dln_src"; version: "3.0.0"; spec: "" };
	types: [
		{
			name: "Order";
			type: {
				fields: [
					{ name: "maker_order_nonce"; type: "u64" },
					{ name: "maker_src"; type: "bytes" },
					{ name: "give"; type: { defined: { generics: []; name: "Offer" } } },
					{ name: "take"; type: { defined: { generics: []; name: "Offer" } } },
					{ name: "receiver_dst"; type: "bytes" },
					{ name: "give_patch_authority_src"; type: "bytes" },
					{ name: "order_authority_address_dst"; type: "bytes" },
					{ name: "allowed_taker_dst"; type: { option: "bytes" } },
					{ name: "allowed_cancel_beneficiary_src"; type: { option: "bytes" } },
					{ name: "external_call"; type: { option: { defined: { generics: []; name: "ExternalCallParams" } } } },
				];
				kind: "struct";
			};
		},
		{ name: "ExternalCallParams"; type: { fields: [{ name: "external_call_shortcut"; type: { array: ["u8", 32] } }]; kind: "struct" } },
		{
			name: "Offer";
			type: {
				fields: [
					{ name: "chain_id"; type: { array: ["u8", 32] } },
					{ name: "token_address"; type: "bytes" },
					{ name: "amount"; type: { array: ["u8", 32] } },
				];
				kind: "struct";
			};
		},
		{
			name: "NewState";
			type: {
				fields: [
					{ name: "fixed_fee"; type: "u64" },
					{ name: "percent_fee_bps"; type: "u64" },
					{ name: "is_fee_refund"; type: "bool" },
					{ name: "fee_beneficiary"; type: "pubkey" },
				];
				kind: "struct";
			};
		},
		{ name: "AffiliateFee"; type: { fields: [{ name: "beneficiary"; type: "pubkey" }, { name: "amount"; type: "u64" }]; kind: "struct" } },
		{
			name: "CreateOrderArgs";
			type: {
				fields: [
					{ name: "give_original_amount"; type: "u64" },
					{ name: "take"; type: { defined: { generics: []; name: "Offer" } } },
					{ name: "receiver_dst"; type: "bytes" },
					{ name: "external_call"; type: { option: "bytes" } },
					{ name: "give_patch_authority_src"; type: "pubkey" },
					{ name: "allowed_cancel_beneficiary_src"; type: { option: "pubkey" } },
					{ name: "order_authority_address_dst"; type: "bytes" },
					{ name: "allowed_taker_dst"; type: { option: "bytes" } },
				];
				kind: "struct";
			};
		},
		{
			name: "GiveOrderStatus";
			type: {
				kind: "enum";
				variants: [
					{
						fields: [
							{ name: "give_amount"; type: { option: "u64" } },
							{ name: "fix_fee"; type: { option: "u64" } },
							{ name: "percent_fee"; type: { option: "u64" } },
							{ name: "affiliate_fee"; type: { option: { defined: { generics: []; name: "AffiliateFee" } } } },
							{ name: "allowed_cancel_beneficiary"; type: { option: "pubkey" } },
							{ name: "give_patch_authority"; type: "pubkey" },
							{ name: "take_chain_id"; type: { array: ["u8", 32] } },
						];
						name: "Created";
					},
					{ fields: [{ name: "affiliate_fee"; type: { option: { defined: { generics: []; name: "AffiliateFee" } } } }]; name: "ClaimedUnlock" },
					{ fields: [{ name: "affiliate_fee"; type: { option: { defined: { generics: []; name: "AffiliateFee" } } } }]; name: "ClaimedCancel" },
				];
			};
		},
		{
			name: "state";
			type: {
				fields: [
					{ name: "protocol_authority"; type: "pubkey" },
					{ name: "fixed_fee"; type: "u64" },
					{ name: "percent_fee_bps"; type: "u64" },
					{ name: "is_fee_refund"; type: "bool" },
					{ name: "fee_beneficiary"; type: "pubkey" },
					{ name: "bump"; type: "u8" },
					{ name: "stop_tap"; type: "pubkey" },
					{ name: "is_working"; type: "bool" },
				];
				kind: "struct";
			};
		},
		{
			name: "giveOrderState";
			type: {
				fields: [
					{ name: "status"; type: { defined: { generics: []; name: "GiveOrderStatus" } } },
					{ name: "bump"; type: "u8" },
					{ name: "wallet_bump"; type: "u8" },
				];
				kind: "struct";
			};
		},
		{ name: "nonceMaster"; type: { fields: [{ name: "nonce"; type: "u64" }]; kind: "struct" } },
		{ name: "authorizedNativeSender"; type: { fields: [{ name: "dst_address"; type: "bytes" }, { name: "bump"; type: "u8" }]; kind: "struct" } },
		{
			name: "CreatedOrder";
			type: {
				fields: [
					{ name: "order"; type: { defined: { generics: []; name: "Order" } } },
					{ name: "fix_fee"; type: "u64" },
					{ name: "percent_fee"; type: "u64" },
				];
				kind: "struct";
			};
		},
		{ name: "CreatedOrderId"; type: { fields: [{ name: "order_id"; type: { array: ["u8", 32] } }]; kind: "struct" } },
		{ name: "ClaimedOrderCancel"; type: { fields: []; kind: "struct" } },
		{ name: "ClaimedUnlock"; type: { fields: []; kind: "struct" } },
		{
			name: "IncreasedGiveAmount";
			type: { fields: [{ name: "order_give_final_amount"; type: "u64" }, { name: "final_percent_fee"; type: "u64" }]; kind: "struct" };
		},
	];
};

export const IDL: DlnSrc = {
	accounts: [
		{ discriminator: [146, 10, 19, 112, 191, 43, 175, 106], name: "state" },
		{ discriminator: [62, 200, 109, 228, 254, 27, 147, 148], name: "giveOrderState" },
		{ discriminator: [253, 24, 171, 44, 200, 204, 206, 81], name: "nonceMaster" },
		{ discriminator: [253, 238, 80, 139, 23, 160, 35, 15], name: "authorizedNativeSender" },
	],
	address: "src5qyZHqTqecJV4aY6Cb6zDZLMDzrDKKezs22MPHr4",
	constants: [],
	errors: [
		{ code: 6000, msg: "Order state-account have wrong pubkey. Perhaps you miscalculated order_id.", name: "GiveOrderStateWrongPubkey" },
		{ code: 6001, msg: "Order state-account have wrong status, for this action.", name: "GiveOrderStateWrongStatus" },
		{ code: 6002, msg: "Order wallet-account have wrong pubkey. Perhaps you miscalculated order_id.", name: "GiveOrderWalletWrongPubkey" },
		{ code: 6003, msg: "Can't calculate order id. Wrong input arguments.", name: "CalculationOrderIdError" },
		{ code: 6004, msg: "Incoming data resulted in match-overflow error.", name: "OverflowError" },
		{ code: 6005, msg: "Order already processed. Can't do this action.", name: "OrderAlreadyProcessed" },
		{ code: 6006, msg: "Too little patch for give amount. Please add more", name: "WrongPatchAmount" },
		{
			code: 6007,
			msg: "Wrong parent ix program id. This method must be called by debridge program in execute_external call",
			name: "WrongClaimParentProgramId",
		},
		{ code: 6008, msg: "Wrong parent ix. This method must be called by debridge program in execute_external call", name: "WrongClaimParentInstruction" },
		{
			code: 6009,
			msg: "Wrong parent ix accounts. This method must be called by debridge program in execute_external call",
			name: "WrongClaimParentInstructionAccounts",
		},
		{
			code: 6010,
			msg: "Wrong parent ix submission. This method must be called by debridge program in execute_external call",
			name: "WrongClaimParentSubmission",
		},
		{
			code: 6011,
			msg: "Wrong parent debridge-submission authority. This method must be called by debridge program in execute_external call",
			name: "WrongClaimParentSubmissionAuth",
		},
		{
			code: 6012,
			msg: "Wrong parent debridge-submission native sender. This method must be called by debridge program in execute_external call",
			name: "WrongClaimParentNativeSender",
		},
		{
			code: 6013,
			msg: "Wrong parent debridge-submission source chain. This method must be called by debridge program in execute_external call",
			name: "WrongClaimParentSourceChain",
		},
		{ code: 6014, msg: "Wrong size of receiver address for this chain", name: "BadReceiverDstSize" },
		{ code: 6015, msg: "Wrong size of order authority address for this chain", name: "BadOrderAuthorityDstSize" },
		{ code: 6016, msg: "Wrong size of allowed taker address for this chain", name: "BadAllowedTakerDst" },
		{ code: 6017, msg: "Wrong size of fallback address address for this chain", name: "BadFallbackAddressDstSize" },
		{ code: 6018, msg: "Affiliate fee already paid or not exists", name: "AffiliateFeeNotReadyToPay" },
		{ code: 6019, msg: "Fix fee already paid", name: "FixFeeAlreadyPaid" },
		{ code: 6020, msg: "Percent fee already paid", name: "PercentFeeAlreadyPaid" },
		{ code: 6021, msg: "Orders with external call not allowed right now", name: "ExternalCallDisables" },
		{ code: 6022, msg: "Fee ledger wallet pubkey miscalculated", name: "FeeLedgerWalletWrongKey" },
		{ code: 6023, msg: "Cancel beneficiary not allowed, use cancel-beneficiary from order state-account", name: "NotAllowedCancelBeneficiary" },
		{ code: 6024, msg: "The action cannot be continued, the program-state is on pause", name: "StatePaused" },
		{ code: 6025, msg: "Can't unpause because the program is already running", name: "StateWorking" },
		{ code: 6026, msg: "Wrong signer for realloc", name: "WrongSigner" },
		{ code: 6027, msg: "Realloc not needed, new space equal to old one", name: "ReallocNotNeeded" },
		{ code: 6028, msg: "Failed to parse extcall program id from receiver_dst field.", name: "WrongExtcallIdError" },
	],
	events: [
		{ discriminator: [106, 87, 74, 230, 32, 120, 71, 210], name: "CreatedOrder" },
		{ discriminator: [187, 41, 27, 73, 12, 63, 13, 84], name: "CreatedOrderId" },
		{ discriminator: [98, 176, 8, 102, 211, 245, 60, 182], name: "ClaimedOrderCancel" },
		{ discriminator: [200, 45, 167, 251, 49, 232, 91, 13], name: "ClaimedUnlock" },
		{ discriminator: [6, 189, 113, 78, 139, 50, 136, 69], name: "IncreasedGiveAmount" },
	],
	instructions: [
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "payer", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "fee_ledger", optional: false, relations: [], signer: false, writable: true },
			],
			args: [{ name: "new_state", type: { defined: { generics: [], name: "NewState" } } }],
			discriminator: [190, 171, 224, 219, 217, 72, 199, 176],
			name: "initialize_state",
		},
		{
			accounts: [
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [],
			discriminator: [67, 181, 233, 214, 215, 148, 245, 126],
			name: "realloc_state",
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "fixed_fee", type: "u64" }],
			discriminator: [238, 14, 137, 181, 156, 157, 55, 27],
			name: "set_fixed_fee",
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "percent_fee_bps", type: "u64" }],
			discriminator: [115, 39, 161, 77, 175, 252, 152, 141],
			name: "set_percent_fee_bps",
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "is_fee_refund", type: "bool" }],
			discriminator: [127, 239, 175, 39, 72, 244, 47, 33],
			name: "set_is_fee_refund",
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "fee_beneficiary", type: "pubkey" }],
			discriminator: [35, 243, 194, 253, 151, 40, 229, 251],
			name: "set_fee_beneficiry",
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "stop_tap", type: "pubkey" }],
			discriminator: [80, 3, 201, 203, 245, 184, 51, 5],
			name: "set_stop_tap",
		},
		{
			accounts: [
				{
					accounts: [
						{
							docs: ["State account with service information", "There is a single state account for the entire program"],
							name: "state",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
						{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
					],
					name: "update_state",
				},
				{ docs: [], name: "new_protocol_authority", optional: false, relations: [], signer: true, writable: false },
			],
			args: [],
			discriminator: [96, 162, 46, 152, 72, 147, 175, 176],
			name: "set_protocol_authority",
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "stop_tap", optional: false, relations: [], signer: true, writable: true },
			],
			args: [],
			discriminator: [44, 86, 151, 21, 158, 185, 8, 36],
			name: "pause_state",
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [],
			discriminator: [133, 243, 138, 167, 154, 215, 251, 167],
			name: "unpause_state",
		},
		{
			accounts: [
				{
					docs: ["State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: false,
				},
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "authorized_native_sender", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "chain_id", type: { array: ["u8", 32] } },
				{ name: "new_authorized_native_sender", type: "bytes" },
			],
			discriminator: [213, 75, 181, 116, 29, 225, 125, 209],
			name: "update_authorized_native_sender",
		},
		{
			accounts: [
				{ docs: [], name: "maker", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_mint", optional: false, relations: [], signer: false, writable: false },
				{
					docs: [
						"Account with GiveOrderState",
						"seeds = [GiveOrderState::SEED, &order_id.to_bytes()],",
						"Will be initialized inside [`create_order`]",
					],
					name: "give_order_state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "authorized_native_sender", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "maker_wallet", optional: false, relations: [], signer: false, writable: true },
				{
					docs: ["Wallet of `give_order_state`", "Will be initialized inside [`create_order`]"],
					name: "give_order_wallet",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "nonce_master", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "fee_ledger_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "associated_spl_token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "order_args", type: { defined: { generics: [], name: "CreateOrderArgs" } } },
				{ name: "affiliate_fee", type: { option: { defined: { generics: [], name: "AffiliateFee" } } } },
				{ name: "referral_code", type: { option: "u32" } },
			],
			discriminator: [141, 54, 37, 207, 237, 210, 250, 215],
			name: "create_order",
		},
		{
			accounts: [
				{ docs: [], name: "maker", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "token_mint", optional: false, relations: [], signer: false, writable: false },
				{
					docs: [
						"Account with GiveOrderState",
						"seeds = [GiveOrderState::SEED, &order_id.to_bytes()],",
						"Will be initialized inside [`create_order`]",
					],
					name: "give_order_state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "authorized_native_sender", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "maker_wallet", optional: false, relations: [], signer: false, writable: true },
				{
					docs: ["Wallet of `give_order_state`", "Will be initialized inside [`create_order`]"],
					name: "give_order_wallet",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "nonce_master", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "fee_ledger_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "associated_spl_token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "order_args", type: { defined: { generics: [], name: "CreateOrderArgs" } } },
				{ name: "affiliate_fee", type: { option: { defined: { generics: [], name: "AffiliateFee" } } } },
				{ name: "referral_code", type: { option: "u32" } },
				{ name: "nonce", type: "u64" },
				{ name: "metadata", type: "bytes" },
			],
			discriminator: [130, 131, 98, 190, 40, 206, 68, 50],
			name: "create_order_with_nonce",
		},
		{
			accounts: [
				{ docs: [], name: "give_order_state", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "give_order_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "give_patch_authority", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "give_patch_authority_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "order_id", type: { array: ["u8", 32] } },
				{ name: "input_addition_to_give_amount", type: "u64" },
			],
			discriminator: [64, 188, 129, 255, 64, 129, 139, 102],
			name: "patch_order_give",
		},
		{
			accounts: [
				{ docs: ["0"], name: "submission", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["1"], name: "submission_authority", optional: false, relations: [], signer: true, writable: true },
				{
					docs: ["2", "State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: ["3"], name: "fee_ledger", optional: false, relations: [], signer: false, writable: true },
				{ docs: ["4"], name: "fee_ledger_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: ["5"], name: "instructions", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["6"], name: "give_order_state", optional: false, relations: [], signer: false, writable: true },
				{
					docs: ["Action beneficiary ATA", "If empty, then automatically initialized ATA (determined based on [`AccountInfo::owner`])"],
					name: "action_beneficiary_wallet",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: ["8"], name: "action_beneficiary", optional: false, relations: [], signer: false, writable: true },
				{ docs: ["9"], name: "give_order_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: ["10"], name: "token_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["11"], name: "authorized_native_sender", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["12"], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "order_id", type: { array: ["u8", 32] } }],
			discriminator: [89, 81, 180, 79, 142, 144, 66, 251],
			name: "claim_unlock",
		},
		{
			accounts: [
				{ docs: ["0"], name: "submission", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["1"], name: "submission_authority", optional: false, relations: [], signer: true, writable: true },
				{
					docs: ["2", "State account with service information", "There is a single state account for the entire program"],
					name: "state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: ["3"], name: "fee_ledger", optional: false, relations: [], signer: false, writable: true },
				{ docs: ["4"], name: "fee_ledger_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: ["5"], name: "instructions", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["6"], name: "give_order_state", optional: false, relations: [], signer: false, writable: true },
				{
					docs: ["Action beneficiary ATA", "If empty, then automatically initialized ATA (determined based on [`AccountInfo::owner`])"],
					name: "action_beneficiary_wallet",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: ["8"], name: "action_beneficiary", optional: false, relations: [], signer: false, writable: true },
				{ docs: ["9"], name: "give_order_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: ["10"], name: "token_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["11"], name: "authorized_native_sender", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["12"], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "order_id", type: { array: ["u8", 32] } }],
			discriminator: [19, 97, 126, 238, 204, 141, 69, 76],
			name: "claim_order_cancel",
		},
		{
			accounts: [
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "fee_ledger", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "fee_beneficiary", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [],
			discriminator: [24, 156, 23, 253, 46, 76, 247, 202],
			name: "withdraw_fix_fee",
		},
		{
			accounts: [
				{
					accounts: [
						{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: false },
						{ docs: [], name: "fee_ledger", optional: false, relations: [], signer: false, writable: true },
						{ docs: [], name: "fee_beneficiary", optional: false, relations: [], signer: true, writable: true },
						{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
					],
					name: "withdraw_fee",
				},
				{ docs: [], name: "fee_ledger_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "fee_beneficiary_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "token_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [],
			discriminator: [50, 219, 95, 73, 93, 162, 245, 14],
			name: "withdraw_percent_fee",
		},
		{
			accounts: [
				{ docs: [], name: "affiliate_fee_beneficiary", optional: false, relations: [], signer: true, writable: false },
				{ docs: [], name: "affiliate_fee_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "give_order_state", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "give_order_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "order_id", type: { array: ["u8", 32] } }],
			discriminator: [143, 79, 158, 208, 125, 51, 86, 85],
			name: "withdraw_affiliate_fee",
		},
	],
	metadata: { name: "dln_src", version: "3.0.0", spec: "" },
	types: [
		{
			name: "Order",
			type: {
				fields: [
					{ name: "maker_order_nonce", type: "u64" },
					{ name: "maker_src", type: "bytes" },
					{ name: "give", type: { defined: { generics: [], name: "Offer" } } },
					{ name: "take", type: { defined: { generics: [], name: "Offer" } } },
					{ name: "receiver_dst", type: "bytes" },
					{ name: "give_patch_authority_src", type: "bytes" },
					{ name: "order_authority_address_dst", type: "bytes" },
					{ name: "allowed_taker_dst", type: { option: "bytes" } },
					{ name: "allowed_cancel_beneficiary_src", type: { option: "bytes" } },
					{ name: "external_call", type: { option: { defined: { generics: [], name: "ExternalCallParams" } } } },
				],
				kind: "struct",
			},
		},
		{ name: "ExternalCallParams", type: { fields: [{ name: "external_call_shortcut", type: { array: ["u8", 32] } }], kind: "struct" } },
		{
			name: "Offer",
			type: {
				fields: [
					{ name: "chain_id", type: { array: ["u8", 32] } },
					{ name: "token_address", type: "bytes" },
					{ name: "amount", type: { array: ["u8", 32] } },
				],
				kind: "struct",
			},
		},
		{
			name: "NewState",
			type: {
				fields: [
					{ name: "fixed_fee", type: "u64" },
					{ name: "percent_fee_bps", type: "u64" },
					{ name: "is_fee_refund", type: "bool" },
					{ name: "fee_beneficiary", type: "pubkey" },
				],
				kind: "struct",
			},
		},
		{
			name: "AffiliateFee",
			type: {
				fields: [
					{ name: "beneficiary", type: "pubkey" },
					{ name: "amount", type: "u64" },
				],
				kind: "struct",
			},
		},
		{
			name: "CreateOrderArgs",
			type: {
				fields: [
					{ name: "give_original_amount", type: "u64" },
					{ name: "take", type: { defined: { generics: [], name: "Offer" } } },
					{ name: "receiver_dst", type: "bytes" },
					{ name: "external_call", type: { option: "bytes" } },
					{ name: "give_patch_authority_src", type: "pubkey" },
					{ name: "allowed_cancel_beneficiary_src", type: { option: "pubkey" } },
					{ name: "order_authority_address_dst", type: "bytes" },
					{ name: "allowed_taker_dst", type: { option: "bytes" } },
				],
				kind: "struct",
			},
		},
		{
			name: "GiveOrderStatus",
			type: {
				kind: "enum",
				variants: [
					{
						fields: [
							{ name: "give_amount", type: { option: "u64" } },
							{ name: "fix_fee", type: { option: "u64" } },
							{ name: "percent_fee", type: { option: "u64" } },
							{ name: "affiliate_fee", type: { option: { defined: { generics: [], name: "AffiliateFee" } } } },
							{ name: "allowed_cancel_beneficiary", type: { option: "pubkey" } },
							{ name: "give_patch_authority", type: "pubkey" },
							{ name: "take_chain_id", type: { array: ["u8", 32] } },
						],
						name: "Created",
					},
					{ fields: [{ name: "affiliate_fee", type: { option: { defined: { generics: [], name: "AffiliateFee" } } } }], name: "ClaimedUnlock" },
					{ fields: [{ name: "affiliate_fee", type: { option: { defined: { generics: [], name: "AffiliateFee" } } } }], name: "ClaimedCancel" },
				],
			},
		},
		{
			name: "state",
			type: {
				fields: [
					{ name: "protocol_authority", type: "pubkey" },
					{ name: "fixed_fee", type: "u64" },
					{ name: "percent_fee_bps", type: "u64" },
					{ name: "is_fee_refund", type: "bool" },
					{ name: "fee_beneficiary", type: "pubkey" },
					{ name: "bump", type: "u8" },
					{ name: "stop_tap", type: "pubkey" },
					{ name: "is_working", type: "bool" },
				],
				kind: "struct",
			},
		},
		{
			name: "giveOrderState",
			type: {
				fields: [
					{ name: "status", type: { defined: { generics: [], name: "GiveOrderStatus" } } },
					{ name: "bump", type: "u8" },
					{ name: "wallet_bump", type: "u8" },
				],
				kind: "struct",
			},
		},
		{ name: "nonceMaster", type: { fields: [{ name: "nonce", type: "u64" }], kind: "struct" } },
		{
			name: "authorizedNativeSender",
			type: {
				fields: [
					{ name: "dst_address", type: "bytes" },
					{ name: "bump", type: "u8" },
				],
				kind: "struct",
			},
		},
		{
			name: "CreatedOrder",
			type: {
				fields: [
					{ name: "order", type: { defined: { generics: [], name: "Order" } } },
					{ name: "fix_fee", type: "u64" },
					{ name: "percent_fee", type: "u64" },
				],
				kind: "struct",
			},
		},
		{ name: "CreatedOrderId", type: { fields: [{ name: "order_id", type: { array: ["u8", 32] } }], kind: "struct" } },
		{ name: "ClaimedOrderCancel", type: { fields: [], kind: "struct" } },
		{ name: "ClaimedUnlock", type: { fields: [], kind: "struct" } },
		{
			name: "IncreasedGiveAmount",
			type: {
				fields: [
					{ name: "order_give_final_amount", type: "u64" },
					{ name: "final_percent_fee", type: "u64" },
				],
				kind: "struct",
			},
		},
	],
};
