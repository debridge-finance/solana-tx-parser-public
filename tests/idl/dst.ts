export type DlnDst = {
	accounts: [
		{ discriminator: [138, 112, 38, 132, 187, 6, 169, 235]; name: "takeOrderPatch" },
		{ discriminator: [53, 68, 38, 179, 142, 197, 150, 197]; name: "authorizedSrcContract" },
		{ discriminator: [147, 214, 97, 159, 59, 67, 236, 166]; name: "takeOrderState" },
		{ discriminator: [146, 10, 19, 112, 191, 43, 175, 106]; name: "state" },
	];
	address: "dst5MGcFPoBeREFAA5E3tU5ij8m5uVYwkzkSAbsLbNo";
	constants: [];
	errors: [
		{ code: 6000; name: "WrongAmount" },
		{ code: 6001; name: "WrongBeneficiarySize" },
		{ code: 6002; name: "WrongChainId" },
		{ code: 6003; name: "WrongMint" },
		{ code: 6004; name: "WrongOrderId" },
		{ code: 6005; name: "WrongPrepareSendNextIxDiscriminator" },
		{ code: 6006; name: "WrongPrepareSendNextIxProgramId" },
		{ code: 6007; name: "WrongReceiverWalletOwner" },
		{ code: 6008; name: "WrongTakerAta" },
		{ code: 6009; name: "WrongReceiverAta" },
		{ code: 6010; name: "WrongTakeTokenAddress" },
		{ code: 6011; name: "WrongNativeTaker" },
		{ code: 6012; name: "WrongNativeDst" },
		{ code: 6013; name: "WrongTakeOrderPatch" },
		{ code: 6014; name: "WrongAuthorizedSrcContract" },
		{ code: 6015; name: "CalculationOrderIdError" },
		{ code: 6016; name: "UnlockNotAllowed" },
		{ code: 6017; name: "FixedFeeCalculationError" },
		{ code: 6018; name: "NotAllowedEmptyBatch" },
		{ code: 6019; name: "NotAllowedCancelBeneficiary" },
		{ code: 6020; name: "NotAllowedTaker" },
		{ code: 6021; name: "InvalidAllowedCancelBeneficiarySrcSize" },
		{ code: 6022; name: "InvalidMakerSrcSize" },
		{ code: 6023; name: "InvalidGivePatchAuthoritySrcSize" },
		{ code: 6024; name: "InvalidReceiverDstSize" },
		{ code: 6025; name: "InvalidOrderAuthorityDstSize" },
		{ code: 6026; name: "InvalidAllowedTakerDst" },
		{ code: 6027; name: "InvalidTakeOfferAmount" },
		{ code: 6028; name: "MatchOverflowWhileCalculateInputAmount" },
		{ code: 6029; name: "OverflowWhileApplyTakeOrderPatch" },
		{ code: 6030; name: "ChainPaused" },
		{ code: 6031; name: "WrongSigner" },
		{ code: 6032; name: "ReallocNotNeeded" },
		{ code: 6033; name: "OverflowError" },
		{ code: 6034; name: "WrongExtcall" },
		{ code: 6035; name: "WrongExtcallWallet" },
		{ code: 6036; name: "ExtcallWalletAlreadyUsed" },
		{ code: 6037; name: "WrongExtcallAuthOwner" },
		{ code: 6038; name: "WrongExtcallIdError" },
		{ code: 6039; name: "WrongExtcallStorage" },
	];
	events: [
		{ discriminator: [87, 122, 98, 236, 219, 55, 5, 98]; name: "StateInitialized" },
		{ discriminator: [210, 174, 131, 213, 40, 182, 83, 110]; name: "Fulfilled" },
		{ discriminator: [80, 95, 27, 102, 221, 162, 177, 24]; name: "SentUnlock" },
		{ discriminator: [78, 205, 115, 248, 199, 138, 234, 42]; name: "SentOrderCancel" },
		{ discriminator: [108, 56, 128, 68, 168, 113, 168, 239]; name: "OrderCancelled" },
		{ discriminator: [7, 219, 41, 79, 233, 63, 20, 0]; name: "DecreaseTakeAmount" },
	];
	instructions: [
		{
			accounts: [
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "authorized_dst_native_sender"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "authorized_dst_native_sender_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "native_token_mint"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "associated_spl_token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
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
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: true },
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
						{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: true },
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
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "authorized_src_contract"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "chain_id"; type: { array: ["u8", 32] } }, { name: "src_contract"; type: "bytes" }];
			discriminator: [136, 132, 246, 126, 114, 104, 229, 33];
			name: "initialize_src_contract_address";
		},
		{
			accounts: [
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "authorized_src_contract"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "chain_id"; type: { array: ["u8", 32] } }, { name: "src_contract"; type: "bytes" }];
			discriminator: [124, 255, 153, 114, 38, 94, 30, 185];
			name: "update_src_contract_address";
		},
		{
			accounts: [
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "authorized_src_contract"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "protocol_authority"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "chain_id"; type: { array: ["u8", 32] } }];
			discriminator: [213, 159, 152, 65, 153, 86, 184, 100];
			name: "unpause_src_contract_address";
		},
		{
			accounts: [
				{ docs: []; name: "state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "authorized_src_contract"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "stop_tap"; optional: false; relations: []; signer: true; writable: false },
			];
			args: [{ name: "chain_id"; type: { array: ["u8", 32] } }];
			discriminator: [5, 188, 58, 214, 92, 59, 215, 172];
			name: "pause_src_contract_address";
		},
		{
			accounts: [
				{
					docs: [
						"Take Order State-Account",
						"Not exists at moment of call, will inititlize in `cancel_order`",
						'Seeds: `[b"TAKE_ORDER_STATE", &order_id]`',
					];
					name: "take_order_state";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{
					docs: [
						"Account with address of dln::src contract in [`Order::give.chain_id`] chain",
						"Using here for validate supporting of order give chain and size of addresses",
						'Seeds: `[b"AUTHORIZED_SRC_CONTRACT", order.give.chain_id]`',
					];
					name: "authorized_src_contract";
					optional: false;
					relations: [];
					signer: false;
					writable: false;
				},
				{
					docs: ["Must be equal to [`Order::order_authority_address_dst`]"];
					name: "canceler";
					optional: false;
					relations: [];
					signer: true;
					writable: true;
				},
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "unvalidated_order"; type: { defined: { generics: []; name: "Order" } } }, { name: "order_id"; type: { array: ["u8", 32] } }];
			discriminator: [95, 129, 237, 240, 8, 49, 223, 132];
			name: "cancel_order";
		},
		{
			accounts: [
				{ docs: []; name: "take_order_state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["👤 User Authority"]; name: "send_from"; optional: false; relations: []; signer: false; writable: true },
				{
					docs: ["👤 User token account from which money is sent"];
					name: "send_from_wallet";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "payer"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "payer_wallet"; optional: false; relations: []; signer: false; writable: true },
				{
					docs: ["The account that stores support and fee information for a specific chain"];
					name: "chain_support_info";
					optional: false;
					relations: [];
					signer: false;
					writable: false;
				},
				{ docs: []; name: "debridge_state"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["Solana system program"]; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["System spl token program"]; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "instructions"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [];
			discriminator: [177, 100, 244, 195, 126, 99, 57, 43];
			name: "prepare_send";
		},
		{
			accounts: [
				{ docs: []; name: "take_order_state"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "taker"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "taker_wallet"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "receiver_dst"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "authorized_src_contract"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "take_order_patch"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "unvalidated_order"; type: { defined: { generics: []; name: "Order" } } },
				{ name: "order_id"; type: { array: ["u8", 32] } },
				{ name: "unlock_authority"; type: { option: "pubkey" } },
			];
			discriminator: [61, 214, 39, 248, 65, 212, 153, 36];
			name: "fulfill_order";
		},
		{
			accounts: [
				{ docs: []; name: "take_order_patch"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "authorized_src_contract"; optional: false; relations: []; signer: false; writable: false },
				{ docs: []; name: "patcher"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [
				{ name: "unvalidated_order"; type: { defined: { generics: []; name: "Order" } } },
				{ name: "order_id"; type: { array: ["u8", 32] } },
				{ name: "new_subtrahend"; type: "u64" },
			];
			discriminator: [143, 123, 133, 249, 52, 97, 111, 114];
			name: "patch_take_order";
		},
		{
			accounts: [
				{ docs: []; name: "take_order_state"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "canceler"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "authorized_src_contract"; optional: false; relations: []; signer: false; writable: false },
				{
					accounts: [
						{
							docs: [
								"The task of this account is to store the Nonce, which is necessary for the uniqueness of each Send",
								"Initialized on the fly, if needed",
							];
							name: "nonce_storage";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{ docs: ["👤 User Authority"]; name: "send_from"; optional: false; relations: []; signer: false; writable: true },
						{
							docs: ["👤 User token account from which money is sent"];
							name: "send_from_wallet";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{ docs: ["Solana system program"]; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
						{
							docs: ["Storage for unlock\\cancel external call"];
							name: "external_call_storage";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: [
								"The account that stores information about external call current state.",
								"",
								"It has [`ExternalCallMeta'] structure and is initialized when `submission_params` is not None.",
								"If `submission_params` is None this account is ignored",
							];
							name: "external_call_meta";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: ["The account allows the user to get a discount when using the bridge"];
							name: "discount";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{
							docs: [
								"The account determines whether it is possible to take fix fee from sending tokens",
								"and the percentage of these tokens. Otherwise fix fee in SOL is taken",
							];
							name: "bridge_fee";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{
							docs: [
								"The account contains all the information about the operation of the bridge",
								"",
								"There are the address of the token with which the bridge works,",
								"the amount of liquidity stored, the collected fee amount and",
								"the settings for the operation of the bridge",
							];
							name: "bridge";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: ["The mint account of the token with which the bridge works"];
							name: "token_mint";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: ["The account stores the user's staking tokens and the fee collected by the bridge in tokens"];
							name: "staking_wallet";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: [
								"The PDA that is the authorization for the transfer of tokens to the user",
								"",
								"It's wrapper token mint authority account for mint bridge,",
								"staking token account owner for send bridge and changing",
								"balance in bridge_data",
							];
							name: "mint_authority";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{
							docs: ["The account that stores support and fee information for a specific chain"];
							name: "chain_support_info";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{ docs: ["Debridge settings  program"]; name: "settings_program"; optional: false; relations: []; signer: false; writable: false },
						{ docs: ["System spl token program"]; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
						{
							docs: [
								"State account with service information",
								"",
								"This account from settings program is also a unique state for debridge program.",
							];
							name: "state";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: [
								"Beneficiary of the commission in the system",
								"",
								"The unique value of this account is stored in the state account",
								"Implied that this will be an account belonging to another program (FeeProxy),",
								"which will be responsible for the distribution of commissions",
							];
							name: "fee_beneficiary";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{ docs: []; name: "debridge_program"; optional: false; relations: []; signer: false; writable: false },
					];
					name: "sending";
				},
			];
			args: [{ name: "order_id"; type: { array: ["u8", 32] } }, { name: "cancel_beneficiary"; type: "bytes" }, { name: "execution_fee"; type: "u64" }];
			discriminator: [40, 200, 11, 68, 214, 45, 181, 172];
			name: "send_order_cancel";
		},
		{
			accounts: [
				{ docs: []; name: "take_order_state"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "unlocker"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "authorized_src_contract"; optional: false; relations: []; signer: false; writable: false },
				{
					accounts: [
						{
							docs: [
								"The task of this account is to store the Nonce, which is necessary for the uniqueness of each Send",
								"Initialized on the fly, if needed",
							];
							name: "nonce_storage";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{ docs: ["👤 User Authority"]; name: "send_from"; optional: false; relations: []; signer: false; writable: true },
						{
							docs: ["👤 User token account from which money is sent"];
							name: "send_from_wallet";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{ docs: ["Solana system program"]; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
						{
							docs: ["Storage for unlock\\cancel external call"];
							name: "external_call_storage";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: [
								"The account that stores information about external call current state.",
								"",
								"It has [`ExternalCallMeta'] structure and is initialized when `submission_params` is not None.",
								"If `submission_params` is None this account is ignored",
							];
							name: "external_call_meta";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: ["The account allows the user to get a discount when using the bridge"];
							name: "discount";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{
							docs: [
								"The account determines whether it is possible to take fix fee from sending tokens",
								"and the percentage of these tokens. Otherwise fix fee in SOL is taken",
							];
							name: "bridge_fee";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{
							docs: [
								"The account contains all the information about the operation of the bridge",
								"",
								"There are the address of the token with which the bridge works,",
								"the amount of liquidity stored, the collected fee amount and",
								"the settings for the operation of the bridge",
							];
							name: "bridge";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: ["The mint account of the token with which the bridge works"];
							name: "token_mint";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: ["The account stores the user's staking tokens and the fee collected by the bridge in tokens"];
							name: "staking_wallet";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: [
								"The PDA that is the authorization for the transfer of tokens to the user",
								"",
								"It's wrapper token mint authority account for mint bridge,",
								"staking token account owner for send bridge and changing",
								"balance in bridge_data",
							];
							name: "mint_authority";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{
							docs: ["The account that stores support and fee information for a specific chain"];
							name: "chain_support_info";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{ docs: ["Debridge settings  program"]; name: "settings_program"; optional: false; relations: []; signer: false; writable: false },
						{ docs: ["System spl token program"]; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
						{
							docs: [
								"State account with service information",
								"",
								"This account from settings program is also a unique state for debridge program.",
							];
							name: "state";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: [
								"Beneficiary of the commission in the system",
								"",
								"The unique value of this account is stored in the state account",
								"Implied that this will be an account belonging to another program (FeeProxy),",
								"which will be responsible for the distribution of commissions",
							];
							name: "fee_beneficiary";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{ docs: []; name: "debridge_program"; optional: false; relations: []; signer: false; writable: false },
					];
					name: "sending";
				},
			];
			args: [{ name: "order_id"; type: { array: ["u8", 32] } }, { name: "beneficiary"; type: "bytes" }, { name: "execution_fee"; type: "u64" }];
			discriminator: [197, 114, 196, 249, 170, 75, 173, 204];
			name: "send_unlock";
		},
		{
			accounts: [
				{ docs: []; name: "unlocker"; optional: false; relations: []; signer: true; writable: true },
				{ docs: []; name: "authorized_src_contract"; optional: false; relations: []; signer: false; writable: false },
				{
					accounts: [
						{
							docs: [
								"The task of this account is to store the Nonce, which is necessary for the uniqueness of each Send",
								"Initialized on the fly, if needed",
							];
							name: "nonce_storage";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{ docs: ["👤 User Authority"]; name: "send_from"; optional: false; relations: []; signer: false; writable: true },
						{
							docs: ["👤 User token account from which money is sent"];
							name: "send_from_wallet";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{ docs: ["Solana system program"]; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
						{
							docs: ["Storage for unlock\\cancel external call"];
							name: "external_call_storage";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: [
								"The account that stores information about external call current state.",
								"",
								"It has [`ExternalCallMeta'] structure and is initialized when `submission_params` is not None.",
								"If `submission_params` is None this account is ignored",
							];
							name: "external_call_meta";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: ["The account allows the user to get a discount when using the bridge"];
							name: "discount";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{
							docs: [
								"The account determines whether it is possible to take fix fee from sending tokens",
								"and the percentage of these tokens. Otherwise fix fee in SOL is taken",
							];
							name: "bridge_fee";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{
							docs: [
								"The account contains all the information about the operation of the bridge",
								"",
								"There are the address of the token with which the bridge works,",
								"the amount of liquidity stored, the collected fee amount and",
								"the settings for the operation of the bridge",
							];
							name: "bridge";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: ["The mint account of the token with which the bridge works"];
							name: "token_mint";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: ["The account stores the user's staking tokens and the fee collected by the bridge in tokens"];
							name: "staking_wallet";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: [
								"The PDA that is the authorization for the transfer of tokens to the user",
								"",
								"It's wrapper token mint authority account for mint bridge,",
								"staking token account owner for send bridge and changing",
								"balance in bridge_data",
							];
							name: "mint_authority";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{
							docs: ["The account that stores support and fee information for a specific chain"];
							name: "chain_support_info";
							optional: false;
							relations: [];
							signer: false;
							writable: false;
						},
						{ docs: ["Debridge settings  program"]; name: "settings_program"; optional: false; relations: []; signer: false; writable: false },
						{ docs: ["System spl token program"]; name: "spl_token_program"; optional: false; relations: []; signer: false; writable: false },
						{
							docs: [
								"State account with service information",
								"",
								"This account from settings program is also a unique state for debridge program.",
							];
							name: "state";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{
							docs: [
								"Beneficiary of the commission in the system",
								"",
								"The unique value of this account is stored in the state account",
								"Implied that this will be an account belonging to another program (FeeProxy),",
								"which will be responsible for the distribution of commissions",
							];
							name: "fee_beneficiary";
							optional: false;
							relations: [];
							signer: false;
							writable: true;
						},
						{ docs: []; name: "debridge_program"; optional: false; relations: []; signer: false; writable: false },
					];
					name: "sending";
				},
			];
			args: [{ name: "beneficiary"; type: "bytes" }, { name: "execution_fee"; type: "u64" }];
			discriminator: [44, 13, 156, 4, 235, 38, 183, 233];
			name: "send_batch_unlock";
		},
		{
			accounts: [
				{ docs: []; name: "take_order_state"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "unlocker"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "send_from"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "authorized_src_contract"; optional: false; relations: []; signer: false; writable: false },
				{
					docs: [
						"Storage for external call instructions",
						"",
						"The key is checked after calculating the Submission id",
						"The account that stores information about external call current state.",
					];
					name: "external_call_storage";
					optional: false;
					relations: [];
					signer: false;
					writable: true;
				},
				{ docs: []; name: "external_call_meta"; optional: false; relations: []; signer: false; writable: true },
				{ docs: []; name: "debridge_program"; optional: false; relations: []; signer: false; writable: false },
				{ docs: ["Solana system program"]; name: "system_program"; optional: false; relations: []; signer: false; writable: false },
			];
			args: [{ name: "order_id"; type: { array: ["u8", 32] } }];
			discriminator: [86, 133, 188, 0, 81, 191, 155, 134];
			name: "close_external_call_storage";
		},
	];
	metadata: { name: "dln_dst"; version: "3.0.0"; spec: "" };
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
		{ name: "EvmClaimInstruction"; type: { kind: "enum"; variants: [{ name: "ClaimOrderCancel" }, { name: "ClaimUnlock" }] } },
		{ name: "EvmClaimBatchInstruction"; type: { kind: "enum"; variants: [{ name: "ClaimBatchUnlock" }] } },
		{
			name: "OrderTakeStatus";
			type: {
				kind: "enum";
				variants: [
					{ fields: [{ name: "unlock_authority"; type: "pubkey" }]; name: "OldFulfilled" },
					{ fields: [{ name: "unlocker"; type: "pubkey" }]; name: "SentUnlock" },
					{
						fields: [{ name: "canceler"; type: "pubkey" }, { name: "allowed_cancel_beneficiary_src"; type: { option: "bytes" } }];
						name: "Cancelled";
					},
					{ fields: [{ name: "canceler"; type: "pubkey" }]; name: "SentCancel" },
					{ fields: [{ name: "unlock_authority"; type: "pubkey" }, { name: "order_id"; type: { array: ["u8", 32] } }]; name: "Fulfilled" },
				];
			};
		},
		{
			name: "takeOrderPatch";
			type: { fields: [{ name: "order_take_final_amount"; type: { option: "u64" } }, { name: "bump"; type: "u8" }]; kind: "struct" };
		},
		{
			name: "authorizedSrcContract";
			type: { fields: [{ name: "src_contract"; type: "bytes" }, { name: "bump"; type: "u8" }, { name: "is_working"; type: "bool" }]; kind: "struct" };
		},
		{
			name: "takeOrderState";
			type: {
				fields: [
					{ name: "order_state"; type: { defined: { generics: []; name: "OrderTakeStatus" } } },
					{ name: "source_chain_id"; type: { array: ["u8", 32] } },
					{ name: "bump"; type: "u8" },
				];
				kind: "struct";
			};
		},
		{
			name: "state";
			type: {
				fields: [{ name: "protocol_authority"; type: "pubkey" }, { name: "stop_tap"; type: "pubkey" }, { name: "bump"; type: "u8" }];
				kind: "struct";
			};
		},
		{ name: "StateInitialized"; type: { fields: [{ name: "protocol_authority"; type: "pubkey" }]; kind: "struct" } },
		{ name: "Fulfilled"; type: { fields: [{ name: "order_id"; type: { array: ["u8", 32] } }, { name: "taker"; type: "pubkey" }]; kind: "struct" } },
		{ name: "SentUnlock"; type: { fields: []; kind: "struct" } },
		{ name: "SentOrderCancel"; type: { fields: []; kind: "struct" } },
		{ name: "OrderCancelled"; type: { fields: []; kind: "struct" } },
		{
			name: "DecreaseTakeAmount";
			type: { fields: [{ name: "order_id"; type: { array: ["u8", 32] } }, { name: "order_take_final_amount"; type: "u64" }]; kind: "struct" };
		},
	];
};

export const IDL: DlnDst = {
	accounts: [
		{ discriminator: [138, 112, 38, 132, 187, 6, 169, 235], name: "takeOrderPatch" },
		{ discriminator: [53, 68, 38, 179, 142, 197, 150, 197], name: "authorizedSrcContract" },
		{ discriminator: [147, 214, 97, 159, 59, 67, 236, 166], name: "takeOrderState" },
		{ discriminator: [146, 10, 19, 112, 191, 43, 175, 106], name: "state" },
	],
	address: "dst5MGcFPoBeREFAA5E3tU5ij8m5uVYwkzkSAbsLbNo",
	constants: [],
	errors: [
		{ code: 6000, name: "WrongAmount" },
		{ code: 6001, name: "WrongBeneficiarySize" },
		{ code: 6002, name: "WrongChainId" },
		{ code: 6003, name: "WrongMint" },
		{ code: 6004, name: "WrongOrderId" },
		{ code: 6005, name: "WrongPrepareSendNextIxDiscriminator" },
		{ code: 6006, name: "WrongPrepareSendNextIxProgramId" },
		{ code: 6007, name: "WrongReceiverWalletOwner" },
		{ code: 6008, name: "WrongTakerAta" },
		{ code: 6009, name: "WrongReceiverAta" },
		{ code: 6010, name: "WrongTakeTokenAddress" },
		{ code: 6011, name: "WrongNativeTaker" },
		{ code: 6012, name: "WrongNativeDst" },
		{ code: 6013, name: "WrongTakeOrderPatch" },
		{ code: 6014, name: "WrongAuthorizedSrcContract" },
		{ code: 6015, name: "CalculationOrderIdError" },
		{ code: 6016, name: "UnlockNotAllowed" },
		{ code: 6017, name: "FixedFeeCalculationError" },
		{ code: 6018, name: "NotAllowedEmptyBatch" },
		{ code: 6019, name: "NotAllowedCancelBeneficiary" },
		{ code: 6020, name: "NotAllowedTaker" },
		{ code: 6021, name: "InvalidAllowedCancelBeneficiarySrcSize" },
		{ code: 6022, name: "InvalidMakerSrcSize" },
		{ code: 6023, name: "InvalidGivePatchAuthoritySrcSize" },
		{ code: 6024, name: "InvalidReceiverDstSize" },
		{ code: 6025, name: "InvalidOrderAuthorityDstSize" },
		{ code: 6026, name: "InvalidAllowedTakerDst" },
		{ code: 6027, name: "InvalidTakeOfferAmount" },
		{ code: 6028, name: "MatchOverflowWhileCalculateInputAmount" },
		{ code: 6029, name: "OverflowWhileApplyTakeOrderPatch" },
		{ code: 6030, name: "ChainPaused" },
		{ code: 6031, name: "WrongSigner" },
		{ code: 6032, name: "ReallocNotNeeded" },
		{ code: 6033, name: "OverflowError" },
		{ code: 6034, name: "WrongExtcall" },
		{ code: 6035, name: "WrongExtcallWallet" },
		{ code: 6036, name: "ExtcallWalletAlreadyUsed" },
		{ code: 6037, name: "WrongExtcallAuthOwner" },
		{ code: 6038, name: "WrongExtcallIdError" },
		{ code: 6039, name: "WrongExtcallStorage" },
	],
	events: [
		{ discriminator: [87, 122, 98, 236, 219, 55, 5, 98], name: "StateInitialized" },
		{ discriminator: [210, 174, 131, 213, 40, 182, 83, 110], name: "Fulfilled" },
		{ discriminator: [80, 95, 27, 102, 221, 162, 177, 24], name: "SentUnlock" },
		{ discriminator: [78, 205, 115, 248, 199, 138, 234, 42], name: "SentOrderCancel" },
		{ discriminator: [108, 56, 128, 68, 168, 113, 168, 239], name: "OrderCancelled" },
		{ discriminator: [7, 219, 41, 79, 233, 63, 20, 0], name: "DecreaseTakeAmount" },
	],
	instructions: [
		{
			accounts: [
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "authorized_dst_native_sender", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "authorized_dst_native_sender_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "native_token_mint", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "associated_spl_token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [],
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
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: true },
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
						{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: true },
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
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "authorized_src_contract", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "chain_id", type: { array: ["u8", 32] } },
				{ name: "src_contract", type: "bytes" },
			],
			discriminator: [136, 132, 246, 126, 114, 104, 229, 33],
			name: "initialize_src_contract_address",
		},
		{
			accounts: [
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "authorized_src_contract", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "chain_id", type: { array: ["u8", 32] } },
				{ name: "src_contract", type: "bytes" },
			],
			discriminator: [124, 255, 153, 114, 38, 94, 30, 185],
			name: "update_src_contract_address",
		},
		{
			accounts: [
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "authorized_src_contract", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "protocol_authority", optional: false, relations: [], signer: true, writable: false },
			],
			args: [{ name: "chain_id", type: { array: ["u8", 32] } }],
			discriminator: [213, 159, 152, 65, 153, 86, 184, 100],
			name: "unpause_src_contract_address",
		},
		{
			accounts: [
				{ docs: [], name: "state", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "authorized_src_contract", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "stop_tap", optional: false, relations: [], signer: true, writable: false },
			],
			args: [{ name: "chain_id", type: { array: ["u8", 32] } }],
			discriminator: [5, 188, 58, 214, 92, 59, 215, 172],
			name: "pause_src_contract_address",
		},
		{
			accounts: [
				{
					docs: [
						"Take Order State-Account",
						"Not exists at moment of call, will inititlize in `cancel_order`",
						'Seeds: `[b"TAKE_ORDER_STATE", &order_id]`',
					],
					name: "take_order_state",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{
					docs: [
						"Account with address of dln::src contract in [`Order::give.chain_id`] chain",
						"Using here for validate supporting of order give chain and size of addresses",
						'Seeds: `[b"AUTHORIZED_SRC_CONTRACT", order.give.chain_id]`',
					],
					name: "authorized_src_contract",
					optional: false,
					relations: [],
					signer: false,
					writable: false,
				},
				{
					docs: ["Must be equal to [`Order::order_authority_address_dst`]"],
					name: "canceler",
					optional: false,
					relations: [],
					signer: true,
					writable: true,
				},
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "unvalidated_order", type: { defined: { generics: [], name: "Order" } } },
				{ name: "order_id", type: { array: ["u8", 32] } },
			],
			discriminator: [95, 129, 237, 240, 8, 49, 223, 132],
			name: "cancel_order",
		},
		{
			accounts: [
				{ docs: [], name: "take_order_state", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["👤 User Authority"], name: "send_from", optional: false, relations: [], signer: false, writable: true },
				{
					docs: ["👤 User token account from which money is sent"],
					name: "send_from_wallet",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "payer", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "payer_wallet", optional: false, relations: [], signer: false, writable: true },
				{
					docs: ["The account that stores support and fee information for a specific chain"],
					name: "chain_support_info",
					optional: false,
					relations: [],
					signer: false,
					writable: false,
				},
				{ docs: [], name: "debridge_state", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["Solana system program"], name: "system_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["System spl token program"], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "instructions", optional: false, relations: [], signer: false, writable: false },
			],
			args: [],
			discriminator: [177, 100, 244, 195, 126, 99, 57, 43],
			name: "prepare_send",
		},
		{
			accounts: [
				{ docs: [], name: "take_order_state", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "taker", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "taker_wallet", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "receiver_dst", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "authorized_src_contract", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "take_order_patch", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "unvalidated_order", type: { defined: { generics: [], name: "Order" } } },
				{ name: "order_id", type: { array: ["u8", 32] } },
				{ name: "unlock_authority", type: { option: "pubkey" } },
			],
			discriminator: [61, 214, 39, 248, 65, 212, 153, 36],
			name: "fulfill_order",
		},
		{
			accounts: [
				{ docs: [], name: "take_order_patch", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "authorized_src_contract", optional: false, relations: [], signer: false, writable: false },
				{ docs: [], name: "patcher", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [
				{ name: "unvalidated_order", type: { defined: { generics: [], name: "Order" } } },
				{ name: "order_id", type: { array: ["u8", 32] } },
				{ name: "new_subtrahend", type: "u64" },
			],
			discriminator: [143, 123, 133, 249, 52, 97, 111, 114],
			name: "patch_take_order",
		},
		{
			accounts: [
				{ docs: [], name: "take_order_state", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "canceler", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "authorized_src_contract", optional: false, relations: [], signer: false, writable: false },
				{
					accounts: [
						{
							docs: [
								"The task of this account is to store the Nonce, which is necessary for the uniqueness of each Send",
								"Initialized on the fly, if needed",
							],
							name: "nonce_storage",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{ docs: ["👤 User Authority"], name: "send_from", optional: false, relations: [], signer: false, writable: true },
						{
							docs: ["👤 User token account from which money is sent"],
							name: "send_from_wallet",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{ docs: ["Solana system program"], name: "system_program", optional: false, relations: [], signer: false, writable: false },
						{
							docs: ["Storage for unlock\\cancel external call"],
							name: "external_call_storage",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: [
								"The account that stores information about external call current state.",
								"",
								"It has [`ExternalCallMeta'] structure and is initialized when `submission_params` is not None.",
								"If `submission_params` is None this account is ignored",
							],
							name: "external_call_meta",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: ["The account allows the user to get a discount when using the bridge"],
							name: "discount",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{
							docs: [
								"The account determines whether it is possible to take fix fee from sending tokens",
								"and the percentage of these tokens. Otherwise fix fee in SOL is taken",
							],
							name: "bridge_fee",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{
							docs: [
								"The account contains all the information about the operation of the bridge",
								"",
								"There are the address of the token with which the bridge works,",
								"the amount of liquidity stored, the collected fee amount and",
								"the settings for the operation of the bridge",
							],
							name: "bridge",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: ["The mint account of the token with which the bridge works"],
							name: "token_mint",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: ["The account stores the user's staking tokens and the fee collected by the bridge in tokens"],
							name: "staking_wallet",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: [
								"The PDA that is the authorization for the transfer of tokens to the user",
								"",
								"It's wrapper token mint authority account for mint bridge,",
								"staking token account owner for send bridge and changing",
								"balance in bridge_data",
							],
							name: "mint_authority",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{
							docs: ["The account that stores support and fee information for a specific chain"],
							name: "chain_support_info",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{ docs: ["Debridge settings  program"], name: "settings_program", optional: false, relations: [], signer: false, writable: false },
						{ docs: ["System spl token program"], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
						{
							docs: [
								"State account with service information",
								"",
								"This account from settings program is also a unique state for debridge program.",
							],
							name: "state",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: [
								"Beneficiary of the commission in the system",
								"",
								"The unique value of this account is stored in the state account",
								"Implied that this will be an account belonging to another program (FeeProxy),",
								"which will be responsible for the distribution of commissions",
							],
							name: "fee_beneficiary",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{ docs: [], name: "debridge_program", optional: false, relations: [], signer: false, writable: false },
					],
					name: "sending",
				},
			],
			args: [
				{ name: "order_id", type: { array: ["u8", 32] } },
				{ name: "cancel_beneficiary", type: "bytes" },
				{ name: "execution_fee", type: "u64" },
			],
			discriminator: [40, 200, 11, 68, 214, 45, 181, 172],
			name: "send_order_cancel",
		},
		{
			accounts: [
				{ docs: [], name: "take_order_state", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "unlocker", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "authorized_src_contract", optional: false, relations: [], signer: false, writable: false },
				{
					accounts: [
						{
							docs: [
								"The task of this account is to store the Nonce, which is necessary for the uniqueness of each Send",
								"Initialized on the fly, if needed",
							],
							name: "nonce_storage",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{ docs: ["👤 User Authority"], name: "send_from", optional: false, relations: [], signer: false, writable: true },
						{
							docs: ["👤 User token account from which money is sent"],
							name: "send_from_wallet",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{ docs: ["Solana system program"], name: "system_program", optional: false, relations: [], signer: false, writable: false },
						{
							docs: ["Storage for unlock\\cancel external call"],
							name: "external_call_storage",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: [
								"The account that stores information about external call current state.",
								"",
								"It has [`ExternalCallMeta'] structure and is initialized when `submission_params` is not None.",
								"If `submission_params` is None this account is ignored",
							],
							name: "external_call_meta",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: ["The account allows the user to get a discount when using the bridge"],
							name: "discount",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{
							docs: [
								"The account determines whether it is possible to take fix fee from sending tokens",
								"and the percentage of these tokens. Otherwise fix fee in SOL is taken",
							],
							name: "bridge_fee",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{
							docs: [
								"The account contains all the information about the operation of the bridge",
								"",
								"There are the address of the token with which the bridge works,",
								"the amount of liquidity stored, the collected fee amount and",
								"the settings for the operation of the bridge",
							],
							name: "bridge",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: ["The mint account of the token with which the bridge works"],
							name: "token_mint",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: ["The account stores the user's staking tokens and the fee collected by the bridge in tokens"],
							name: "staking_wallet",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: [
								"The PDA that is the authorization for the transfer of tokens to the user",
								"",
								"It's wrapper token mint authority account for mint bridge,",
								"staking token account owner for send bridge and changing",
								"balance in bridge_data",
							],
							name: "mint_authority",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{
							docs: ["The account that stores support and fee information for a specific chain"],
							name: "chain_support_info",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{ docs: ["Debridge settings  program"], name: "settings_program", optional: false, relations: [], signer: false, writable: false },
						{ docs: ["System spl token program"], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
						{
							docs: [
								"State account with service information",
								"",
								"This account from settings program is also a unique state for debridge program.",
							],
							name: "state",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: [
								"Beneficiary of the commission in the system",
								"",
								"The unique value of this account is stored in the state account",
								"Implied that this will be an account belonging to another program (FeeProxy),",
								"which will be responsible for the distribution of commissions",
							],
							name: "fee_beneficiary",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{ docs: [], name: "debridge_program", optional: false, relations: [], signer: false, writable: false },
					],
					name: "sending",
				},
			],
			args: [
				{ name: "order_id", type: { array: ["u8", 32] } },
				{ name: "beneficiary", type: "bytes" },
				{ name: "execution_fee", type: "u64" },
			],
			discriminator: [197, 114, 196, 249, 170, 75, 173, 204],
			name: "send_unlock",
		},
		{
			accounts: [
				{ docs: [], name: "unlocker", optional: false, relations: [], signer: true, writable: true },
				{ docs: [], name: "authorized_src_contract", optional: false, relations: [], signer: false, writable: false },
				{
					accounts: [
						{
							docs: [
								"The task of this account is to store the Nonce, which is necessary for the uniqueness of each Send",
								"Initialized on the fly, if needed",
							],
							name: "nonce_storage",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{ docs: ["👤 User Authority"], name: "send_from", optional: false, relations: [], signer: false, writable: true },
						{
							docs: ["👤 User token account from which money is sent"],
							name: "send_from_wallet",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{ docs: ["Solana system program"], name: "system_program", optional: false, relations: [], signer: false, writable: false },
						{
							docs: ["Storage for unlock\\cancel external call"],
							name: "external_call_storage",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: [
								"The account that stores information about external call current state.",
								"",
								"It has [`ExternalCallMeta'] structure and is initialized when `submission_params` is not None.",
								"If `submission_params` is None this account is ignored",
							],
							name: "external_call_meta",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: ["The account allows the user to get a discount when using the bridge"],
							name: "discount",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{
							docs: [
								"The account determines whether it is possible to take fix fee from sending tokens",
								"and the percentage of these tokens. Otherwise fix fee in SOL is taken",
							],
							name: "bridge_fee",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{
							docs: [
								"The account contains all the information about the operation of the bridge",
								"",
								"There are the address of the token with which the bridge works,",
								"the amount of liquidity stored, the collected fee amount and",
								"the settings for the operation of the bridge",
							],
							name: "bridge",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: ["The mint account of the token with which the bridge works"],
							name: "token_mint",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: ["The account stores the user's staking tokens and the fee collected by the bridge in tokens"],
							name: "staking_wallet",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: [
								"The PDA that is the authorization for the transfer of tokens to the user",
								"",
								"It's wrapper token mint authority account for mint bridge,",
								"staking token account owner for send bridge and changing",
								"balance in bridge_data",
							],
							name: "mint_authority",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{
							docs: ["The account that stores support and fee information for a specific chain"],
							name: "chain_support_info",
							optional: false,
							relations: [],
							signer: false,
							writable: false,
						},
						{ docs: ["Debridge settings  program"], name: "settings_program", optional: false, relations: [], signer: false, writable: false },
						{ docs: ["System spl token program"], name: "spl_token_program", optional: false, relations: [], signer: false, writable: false },
						{
							docs: [
								"State account with service information",
								"",
								"This account from settings program is also a unique state for debridge program.",
							],
							name: "state",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{
							docs: [
								"Beneficiary of the commission in the system",
								"",
								"The unique value of this account is stored in the state account",
								"Implied that this will be an account belonging to another program (FeeProxy),",
								"which will be responsible for the distribution of commissions",
							],
							name: "fee_beneficiary",
							optional: false,
							relations: [],
							signer: false,
							writable: true,
						},
						{ docs: [], name: "debridge_program", optional: false, relations: [], signer: false, writable: false },
					],
					name: "sending",
				},
			],
			args: [
				{ name: "beneficiary", type: "bytes" },
				{ name: "execution_fee", type: "u64" },
			],
			discriminator: [44, 13, 156, 4, 235, 38, 183, 233],
			name: "send_batch_unlock",
		},
		{
			accounts: [
				{ docs: [], name: "take_order_state", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "unlocker", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "send_from", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "authorized_src_contract", optional: false, relations: [], signer: false, writable: false },
				{
					docs: [
						"Storage for external call instructions",
						"",
						"The key is checked after calculating the Submission id",
						"The account that stores information about external call current state.",
					],
					name: "external_call_storage",
					optional: false,
					relations: [],
					signer: false,
					writable: true,
				},
				{ docs: [], name: "external_call_meta", optional: false, relations: [], signer: false, writable: true },
				{ docs: [], name: "debridge_program", optional: false, relations: [], signer: false, writable: false },
				{ docs: ["Solana system program"], name: "system_program", optional: false, relations: [], signer: false, writable: false },
			],
			args: [{ name: "order_id", type: { array: ["u8", 32] } }],
			discriminator: [86, 133, 188, 0, 81, 191, 155, 134],
			name: "close_external_call_storage",
		},
	],
	metadata: { name: "dln_dst", version: "3.0.0", spec: "" },
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
		{ name: "EvmClaimInstruction", type: { kind: "enum", variants: [{ name: "ClaimOrderCancel" }, { name: "ClaimUnlock" }] } },
		{ name: "EvmClaimBatchInstruction", type: { kind: "enum", variants: [{ name: "ClaimBatchUnlock" }] } },
		{
			name: "OrderTakeStatus",
			type: {
				kind: "enum",
				variants: [
					{ fields: [{ name: "unlock_authority", type: "pubkey" }], name: "OldFulfilled" },
					{ fields: [{ name: "unlocker", type: "pubkey" }], name: "SentUnlock" },
					{
						fields: [
							{ name: "canceler", type: "pubkey" },
							{ name: "allowed_cancel_beneficiary_src", type: { option: "bytes" } },
						],
						name: "Cancelled",
					},
					{ fields: [{ name: "canceler", type: "pubkey" }], name: "SentCancel" },
					{
						fields: [
							{ name: "unlock_authority", type: "pubkey" },
							{ name: "order_id", type: { array: ["u8", 32] } },
						],
						name: "Fulfilled",
					},
				],
			},
		},
		{
			name: "takeOrderPatch",
			type: {
				fields: [
					{ name: "order_take_final_amount", type: { option: "u64" } },
					{ name: "bump", type: "u8" },
				],
				kind: "struct",
			},
		},
		{
			name: "authorizedSrcContract",
			type: {
				fields: [
					{ name: "src_contract", type: "bytes" },
					{ name: "bump", type: "u8" },
					{ name: "is_working", type: "bool" },
				],
				kind: "struct",
			},
		},
		{
			name: "takeOrderState",
			type: {
				fields: [
					{ name: "order_state", type: { defined: { generics: [], name: "OrderTakeStatus" } } },
					{ name: "source_chain_id", type: { array: ["u8", 32] } },
					{ name: "bump", type: "u8" },
				],
				kind: "struct",
			},
		},
		{
			name: "state",
			type: {
				fields: [
					{ name: "protocol_authority", type: "pubkey" },
					{ name: "stop_tap", type: "pubkey" },
					{ name: "bump", type: "u8" },
				],
				kind: "struct",
			},
		},
		{ name: "StateInitialized", type: { fields: [{ name: "protocol_authority", type: "pubkey" }], kind: "struct" } },
		{
			name: "Fulfilled",
			type: {
				fields: [
					{ name: "order_id", type: { array: ["u8", 32] } },
					{ name: "taker", type: "pubkey" },
				],
				kind: "struct",
			},
		},
		{ name: "SentUnlock", type: { fields: [], kind: "struct" } },
		{ name: "SentOrderCancel", type: { fields: [], kind: "struct" } },
		{ name: "OrderCancelled", type: { fields: [], kind: "struct" } },
		{
			name: "DecreaseTakeAmount",
			type: {
				fields: [
					{ name: "order_id", type: { array: ["u8", 32] } },
					{ name: "order_take_final_amount", type: "u64" },
				],
				kind: "struct",
			},
		},
	],
};
