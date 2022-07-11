export declare type Jupiter = {
	version: "0.1.0";
	name: "jupiter";
	instructions: [
		{
			name: "mercurialExchange";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "swapState";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "poolAuthority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "userTransferAuthority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "sourceTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "destinationTokenAccount";
					isMut: true;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "saberExchange";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "swap";
					isMut: false;
					isSigner: false;
				},
				{
					name: "swapAuthority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "userAuthority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "clock";
					isMut: false;
					isSigner: false;
				},
				{
					name: "inputUserAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "inputTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "outputUserAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "outputTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "feesTokenAccount";
					isMut: true;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "saberSwap";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "swap";
					isMut: false;
					isSigner: false;
				},
				{
					name: "swapAuthority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "userAuthority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "inputUserAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "inputTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "outputUserAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "outputTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "feesTokenAccount";
					isMut: true;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "saberAddDecimalsDeposit";
			accounts: [
				{
					name: "addDecimalsProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "wrapper";
					isMut: false;
					isSigner: false;
				},
				{
					name: "wrapperMint";
					isMut: true;
					isSigner: false;
				},
				{
					name: "wrapperUnderlyingTokens";
					isMut: true;
					isSigner: false;
				},
				{
					name: "owner";
					isMut: false;
					isSigner: true;
				},
				{
					name: "userUnderlyingTokens";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userWrappedTokens";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "saberAddDecimalsWithdraw";
			accounts: [
				{
					name: "addDecimalsProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "wrapper";
					isMut: false;
					isSigner: false;
				},
				{
					name: "wrapperMint";
					isMut: true;
					isSigner: false;
				},
				{
					name: "wrapperUnderlyingTokens";
					isMut: true;
					isSigner: false;
				},
				{
					name: "owner";
					isMut: false;
					isSigner: true;
				},
				{
					name: "userUnderlyingTokens";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userWrappedTokens";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "senchaExchange";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "swap";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userAuthority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "inputUserAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "inputTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "inputFeesAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "outputUserAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "outputTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "outputFeesAccount";
					isMut: true;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "serumSwap";
			accounts: [
				{
					name: "market";
					accounts: [
						{
							name: "market";
							isMut: true;
							isSigner: false;
						},
						{
							name: "openOrders";
							isMut: true;
							isSigner: false;
						},
						{
							name: "requestQueue";
							isMut: true;
							isSigner: false;
						},
						{
							name: "eventQueue";
							isMut: true;
							isSigner: false;
						},
						{
							name: "bids";
							isMut: true;
							isSigner: false;
						},
						{
							name: "asks";
							isMut: true;
							isSigner: false;
						},
						{
							name: "coinVault";
							isMut: true;
							isSigner: false;
						},
						{
							name: "pcVault";
							isMut: true;
							isSigner: false;
						},
						{
							name: "vaultSigner";
							isMut: false;
							isSigner: false;
						},
					];
				},
				{
					name: "authority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "orderPayerTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "coinWallet";
					isMut: true;
					isSigner: false;
				},
				{
					name: "pcWallet";
					isMut: true;
					isSigner: false;
				},
				{
					name: "dexProgram";
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
			args: [
				{
					name: "side";
					type: {
						defined: "Side";
					};
				},
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "tokenSwap";
			accounts: [
				{
					name: "tokenSwapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "swap";
					isMut: false;
					isSigner: false;
				},
				{
					name: "authority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "userTransferAuthority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "source";
					isMut: true;
					isSigner: false;
				},
				{
					name: "swapSource";
					isMut: true;
					isSigner: false;
				},
				{
					name: "swapDestination";
					isMut: true;
					isSigner: false;
				},
				{
					name: "destination";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolMint";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolFee";
					isMut: true;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "stepTokenSwap";
			accounts: [
				{
					name: "tokenSwapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "swap";
					isMut: false;
					isSigner: false;
				},
				{
					name: "authority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "userTransferAuthority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "source";
					isMut: true;
					isSigner: false;
				},
				{
					name: "swapSource";
					isMut: true;
					isSigner: false;
				},
				{
					name: "swapDestination";
					isMut: true;
					isSigner: false;
				},
				{
					name: "destination";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolMint";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolFee";
					isMut: true;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "cropperTokenSwap";
			accounts: [
				{
					name: "tokenSwapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "swap";
					isMut: false;
					isSigner: false;
				},
				{
					name: "swapState";
					isMut: false;
					isSigner: false;
				},
				{
					name: "authority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "userTransferAuthority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "source";
					isMut: true;
					isSigner: false;
				},
				{
					name: "swapSource";
					isMut: true;
					isSigner: false;
				},
				{
					name: "swapDestination";
					isMut: true;
					isSigner: false;
				},
				{
					name: "destination";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolMint";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolFee";
					isMut: true;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "raydiumSwap";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "ammId";
					isMut: true;
					isSigner: false;
				},
				{
					name: "ammAuthority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "ammOpenOrders";
					isMut: true;
					isSigner: false;
				},
				{
					name: "ammTargetOrders";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolCoinTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolPcTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumProgramId";
					isMut: false;
					isSigner: false;
				},
				{
					name: "serumMarket";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumBids";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumAsks";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumEventQueue";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumCoinVaultAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumPcVaultAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumVaultSigner";
					isMut: false;
					isSigner: false;
				},
				{
					name: "userSourceTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userDestinationTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userSourceOwner";
					isMut: false;
					isSigner: true;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "raydiumSwapV2";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "ammId";
					isMut: true;
					isSigner: false;
				},
				{
					name: "ammAuthority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "ammOpenOrders";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolCoinTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolPcTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumProgramId";
					isMut: false;
					isSigner: false;
				},
				{
					name: "serumMarket";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumBids";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumAsks";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumEventQueue";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumCoinVaultAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumPcVaultAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "serumVaultSigner";
					isMut: false;
					isSigner: false;
				},
				{
					name: "userSourceTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userDestinationTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userSourceOwner";
					isMut: false;
					isSigner: true;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "aldrinSwap";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "pool";
					isMut: false;
					isSigner: false;
				},
				{
					name: "poolSigner";
					isMut: false;
					isSigner: false;
				},
				{
					name: "poolMint";
					isMut: true;
					isSigner: false;
				},
				{
					name: "baseTokenVault";
					isMut: true;
					isSigner: false;
				},
				{
					name: "quoteTokenVault";
					isMut: true;
					isSigner: false;
				},
				{
					name: "feePoolTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "walletAuthority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "userBaseTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userQuoteTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "side";
					type: {
						defined: "Side";
					};
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "aldrinV2Swap";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "pool";
					isMut: false;
					isSigner: false;
				},
				{
					name: "poolSigner";
					isMut: false;
					isSigner: false;
				},
				{
					name: "poolMint";
					isMut: true;
					isSigner: false;
				},
				{
					name: "baseTokenVault";
					isMut: true;
					isSigner: false;
				},
				{
					name: "quoteTokenVault";
					isMut: true;
					isSigner: false;
				},
				{
					name: "feePoolTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "walletAuthority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "userBaseTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userQuoteTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "curve";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "side";
					type: {
						defined: "Side";
					};
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "cremaTokenSwap";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "pool";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolSigner";
					isMut: false;
					isSigner: false;
				},
				{
					name: "userSourceTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userDestinationTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolSourceTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolDestinationTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolTicksAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "walletAuthority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "lifinityTokenSwap";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "authority";
					isMut: false;
					isSigner: false;
				},
				{
					name: "amm";
					isMut: false;
					isSigner: false;
				},
				{
					name: "userTransferAuthority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "sourceInfo";
					isMut: true;
					isSigner: false;
				},
				{
					name: "destinationInfo";
					isMut: true;
					isSigner: false;
				},
				{
					name: "swapSource";
					isMut: true;
					isSigner: false;
				},
				{
					name: "swapDestination";
					isMut: true;
					isSigner: false;
				},
				{
					name: "poolMint";
					isMut: true;
					isSigner: false;
				},
				{
					name: "feeAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "pythAccount";
					isMut: false;
					isSigner: false;
				},
				{
					name: "pythPcAccount";
					isMut: false;
					isSigner: false;
				},
				{
					name: "configAccount";
					isMut: true;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "cykuraSwap";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "signer";
					isMut: false;
					isSigner: true;
				},
				{
					name: "factoryState";
					isMut: false;
					isSigner: false;
				},
				{
					name: "poolState";
					isMut: true;
					isSigner: false;
				},
				{
					name: "inputTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "outputTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "inputVault";
					isMut: true;
					isSigner: false;
				},
				{
					name: "outputVault";
					isMut: true;
					isSigner: false;
				},
				{
					name: "lastObservationState";
					isMut: true;
					isSigner: false;
				},
				{
					name: "coreProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "whirlpoolSwap";
			accounts: [
				{
					name: "swapProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "tokenAuthority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "whirlpool";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tokenOwnerAccountA";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tokenVaultA";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tokenOwnerAccountB";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tokenVaultB";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tickArray0";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tickArray1";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tickArray2";
					isMut: true;
					isSigner: false;
				},
				{
					name: "oracle";
					isMut: false;
					isSigner: false;
				},
			];
			args: [
				{
					name: "inAmount";
					type: {
						option: "u64";
					};
				},
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "aToB";
					type: "bool";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "riskCheckAndFee";
			accounts: [
				{
					name: "tokenLedger";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userDestinationTokenAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "userTransferAuthority";
					isMut: false;
					isSigner: true;
				},
				{
					name: "tokenProgram";
					isMut: false;
					isSigner: false;
				},
			];
			args: [
				{
					name: "minimumOutAmount";
					type: "u64";
				},
				{
					name: "platformFeeBps";
					type: "u8";
				},
			];
		},
		{
			name: "initializeTokenLedger";
			accounts: [
				{
					name: "tokenLedger";
					isMut: true;
					isSigner: true;
				},
				{
					name: "payer";
					isMut: true;
					isSigner: true;
				},
				{
					name: "systemProgram";
					isMut: false;
					isSigner: false;
				},
			];
			args: [];
		},
		{
			name: "setTokenLedger";
			accounts: [
				{
					name: "tokenLedger";
					isMut: true;
					isSigner: false;
				},
				{
					name: "tokenAccount";
					isMut: false;
					isSigner: false;
				},
			];
			args: [];
		},
		{
			name: "createOpenOrders";
			accounts: [
				{
					name: "openOrders";
					isMut: true;
					isSigner: false;
				},
				{
					name: "payer";
					isMut: true;
					isSigner: true;
				},
				{
					name: "dexProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "systemProgram";
					isMut: false;
					isSigner: false;
				},
				{
					name: "rent";
					isMut: false;
					isSigner: false;
				},
				{
					name: "market";
					isMut: false;
					isSigner: false;
				},
			];
			args: [];
		},
	];
	accounts: [
		{
			name: "tokenLedger";
			type: {
				kind: "struct";
				fields: [
					{
						name: "tokenAccount";
						type: "publicKey";
					},
					{
						name: "amount";
						type: "u64";
					},
				];
			};
		},
	];
	types: [
		{
			name: "Swap";
			type: {
				kind: "struct";
				fields: [
					{
						name: "tokens";
						type: "u64";
					},
					{
						name: "minTokens";
						type: "u64";
					},
					{
						name: "side";
						type: {
							defined: "Side";
						};
					},
				];
			};
		},
		{
			name: "Swap";
			type: {
				kind: "struct";
				fields: [
					{
						name: "tokens";
						type: "u64";
					},
					{
						name: "minTokens";
						type: "u64";
					},
					{
						name: "side";
						type: {
							defined: "Side";
						};
					},
				];
			};
		},
		{
			name: "Swap";
			type: {
				kind: "struct";
				fields: [
					{
						name: "amountIn";
						type: "u64";
					},
					{
						name: "minimumAmountOut";
						type: "u64";
					},
				];
			};
		},
		{
			name: "Swap";
			type: {
				kind: "struct";
				fields: [
					{
						name: "amount";
						type: "u64";
					},
					{
						name: "otherAmountThreshold";
						type: "u64";
					},
					{
						name: "sqrtPriceLimit";
						type: "u128";
					},
					{
						name: "amountSpecifiedIsInput";
						type: "bool";
					},
					{
						name: "aToB";
						type: "bool";
					},
				];
			};
		},
		{
			name: "SwapInstrution";
			type: {
				kind: "enum";
				variants: [
					{
						name: "Swap";
						fields: [
							{
								defined: "Swap";
							},
						];
					},
				];
			};
		},
		{
			name: "Side";
			type: {
				kind: "enum";
				variants: [
					{
						name: "Bid";
					},
					{
						name: "Ask";
					},
				];
			};
		},
		{
			name: "Direction";
			type: {
				kind: "enum";
				variants: [
					{
						name: "LeftToRight";
					},
					{
						name: "RightToLeft";
					},
				];
			};
		},
	];
	errors: [
		{
			code: 6000;
			name: "SlippageToleranceExceeded";
			msg: "Slippage tolerance exceeded";
		},
		{
			code: 6001;
			name: "InvalidTokenLedger";
			msg: "Invalid token ledger";
		},
		{
			code: 6002;
			name: "MissingTokenLedger";
			msg: "Missing token ledger";
		},
		{
			code: 6003;
			name: "MissingMercurialExchangeTokenAccount";
			msg: "Missing mercurial exchange token account";
		},
		{
			code: 6004;
			name: "LedgerTokenAccountDoesNotMatch";
			msg: "Ledger token account does not match";
		},
		{
			code: 6005;
			name: "MissingPlatformFeeAccount";
			msg: "Missing platform fee account";
		},
		{
			code: 6006;
			name: "InvalidCalculation";
			msg: "Invalid calculation";
		},
	];
};
export const IDL = {
	version: "0.1.0",
	name: "jupiter",
	instructions: [
		{
			name: "mercurialExchange",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "swapState",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "poolAuthority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "userTransferAuthority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "sourceTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "destinationTokenAccount",
					isMut: true,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "saberExchange",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "swap",
					isMut: false,
					isSigner: false,
				},
				{
					name: "swapAuthority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "userAuthority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "clock",
					isMut: false,
					isSigner: false,
				},
				{
					name: "inputUserAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "inputTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "outputUserAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "outputTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "feesTokenAccount",
					isMut: true,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "saberSwap",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "swap",
					isMut: false,
					isSigner: false,
				},
				{
					name: "swapAuthority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "userAuthority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "inputUserAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "inputTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "outputUserAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "outputTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "feesTokenAccount",
					isMut: true,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "saberAddDecimalsDeposit",
			accounts: [
				{
					name: "addDecimalsProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "wrapper",
					isMut: false,
					isSigner: false,
				},
				{
					name: "wrapperMint",
					isMut: true,
					isSigner: false,
				},
				{
					name: "wrapperUnderlyingTokens",
					isMut: true,
					isSigner: false,
				},
				{
					name: "owner",
					isMut: false,
					isSigner: true,
				},
				{
					name: "userUnderlyingTokens",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userWrappedTokens",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "saberAddDecimalsWithdraw",
			accounts: [
				{
					name: "addDecimalsProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "wrapper",
					isMut: false,
					isSigner: false,
				},
				{
					name: "wrapperMint",
					isMut: true,
					isSigner: false,
				},
				{
					name: "wrapperUnderlyingTokens",
					isMut: true,
					isSigner: false,
				},
				{
					name: "owner",
					isMut: false,
					isSigner: true,
				},
				{
					name: "userUnderlyingTokens",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userWrappedTokens",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "senchaExchange",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "swap",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userAuthority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "inputUserAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "inputTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "inputFeesAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "outputUserAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "outputTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "outputFeesAccount",
					isMut: true,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "serumSwap",
			accounts: [
				{
					name: "market",
					accounts: [
						{
							name: "market",
							isMut: true,
							isSigner: false,
						},
						{
							name: "openOrders",
							isMut: true,
							isSigner: false,
						},
						{
							name: "requestQueue",
							isMut: true,
							isSigner: false,
						},
						{
							name: "eventQueue",
							isMut: true,
							isSigner: false,
						},
						{
							name: "bids",
							isMut: true,
							isSigner: false,
						},
						{
							name: "asks",
							isMut: true,
							isSigner: false,
						},
						{
							name: "coinVault",
							isMut: true,
							isSigner: false,
						},
						{
							name: "pcVault",
							isMut: true,
							isSigner: false,
						},
						{
							name: "vaultSigner",
							isMut: false,
							isSigner: false,
						},
					],
				},
				{
					name: "authority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "orderPayerTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "coinWallet",
					isMut: true,
					isSigner: false,
				},
				{
					name: "pcWallet",
					isMut: true,
					isSigner: false,
				},
				{
					name: "dexProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "rent",
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: "side",
					type: {
						defined: "Side",
					},
				},
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "tokenSwap",
			accounts: [
				{
					name: "tokenSwapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "swap",
					isMut: false,
					isSigner: false,
				},
				{
					name: "authority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "userTransferAuthority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "source",
					isMut: true,
					isSigner: false,
				},
				{
					name: "swapSource",
					isMut: true,
					isSigner: false,
				},
				{
					name: "swapDestination",
					isMut: true,
					isSigner: false,
				},
				{
					name: "destination",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolMint",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolFee",
					isMut: true,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "stepTokenSwap",
			accounts: [
				{
					name: "tokenSwapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "swap",
					isMut: false,
					isSigner: false,
				},
				{
					name: "authority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "userTransferAuthority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "source",
					isMut: true,
					isSigner: false,
				},
				{
					name: "swapSource",
					isMut: true,
					isSigner: false,
				},
				{
					name: "swapDestination",
					isMut: true,
					isSigner: false,
				},
				{
					name: "destination",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolMint",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolFee",
					isMut: true,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "cropperTokenSwap",
			accounts: [
				{
					name: "tokenSwapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "swap",
					isMut: false,
					isSigner: false,
				},
				{
					name: "swapState",
					isMut: false,
					isSigner: false,
				},
				{
					name: "authority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "userTransferAuthority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "source",
					isMut: true,
					isSigner: false,
				},
				{
					name: "swapSource",
					isMut: true,
					isSigner: false,
				},
				{
					name: "swapDestination",
					isMut: true,
					isSigner: false,
				},
				{
					name: "destination",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolMint",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolFee",
					isMut: true,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "raydiumSwap",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "ammId",
					isMut: true,
					isSigner: false,
				},
				{
					name: "ammAuthority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "ammOpenOrders",
					isMut: true,
					isSigner: false,
				},
				{
					name: "ammTargetOrders",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolCoinTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolPcTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumProgramId",
					isMut: false,
					isSigner: false,
				},
				{
					name: "serumMarket",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumBids",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumAsks",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumEventQueue",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumCoinVaultAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumPcVaultAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumVaultSigner",
					isMut: false,
					isSigner: false,
				},
				{
					name: "userSourceTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userDestinationTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userSourceOwner",
					isMut: false,
					isSigner: true,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "raydiumSwapV2",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "ammId",
					isMut: true,
					isSigner: false,
				},
				{
					name: "ammAuthority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "ammOpenOrders",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolCoinTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolPcTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumProgramId",
					isMut: false,
					isSigner: false,
				},
				{
					name: "serumMarket",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumBids",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumAsks",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumEventQueue",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumCoinVaultAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumPcVaultAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "serumVaultSigner",
					isMut: false,
					isSigner: false,
				},
				{
					name: "userSourceTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userDestinationTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userSourceOwner",
					isMut: false,
					isSigner: true,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "aldrinSwap",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "pool",
					isMut: false,
					isSigner: false,
				},
				{
					name: "poolSigner",
					isMut: false,
					isSigner: false,
				},
				{
					name: "poolMint",
					isMut: true,
					isSigner: false,
				},
				{
					name: "baseTokenVault",
					isMut: true,
					isSigner: false,
				},
				{
					name: "quoteTokenVault",
					isMut: true,
					isSigner: false,
				},
				{
					name: "feePoolTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "walletAuthority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "userBaseTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userQuoteTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "side",
					type: {
						defined: "Side",
					},
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "aldrinV2Swap",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "pool",
					isMut: false,
					isSigner: false,
				},
				{
					name: "poolSigner",
					isMut: false,
					isSigner: false,
				},
				{
					name: "poolMint",
					isMut: true,
					isSigner: false,
				},
				{
					name: "baseTokenVault",
					isMut: true,
					isSigner: false,
				},
				{
					name: "quoteTokenVault",
					isMut: true,
					isSigner: false,
				},
				{
					name: "feePoolTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "walletAuthority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "userBaseTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userQuoteTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "curve",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "side",
					type: {
						defined: "Side",
					},
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "cremaTokenSwap",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "pool",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolSigner",
					isMut: false,
					isSigner: false,
				},
				{
					name: "userSourceTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userDestinationTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolSourceTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolDestinationTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolTicksAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "walletAuthority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "lifinityTokenSwap",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "authority",
					isMut: false,
					isSigner: false,
				},
				{
					name: "amm",
					isMut: false,
					isSigner: false,
				},
				{
					name: "userTransferAuthority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "sourceInfo",
					isMut: true,
					isSigner: false,
				},
				{
					name: "destinationInfo",
					isMut: true,
					isSigner: false,
				},
				{
					name: "swapSource",
					isMut: true,
					isSigner: false,
				},
				{
					name: "swapDestination",
					isMut: true,
					isSigner: false,
				},
				{
					name: "poolMint",
					isMut: true,
					isSigner: false,
				},
				{
					name: "feeAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "pythAccount",
					isMut: false,
					isSigner: false,
				},
				{
					name: "pythPcAccount",
					isMut: false,
					isSigner: false,
				},
				{
					name: "configAccount",
					isMut: true,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "cykuraSwap",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "signer",
					isMut: false,
					isSigner: true,
				},
				{
					name: "factoryState",
					isMut: false,
					isSigner: false,
				},
				{
					name: "poolState",
					isMut: true,
					isSigner: false,
				},
				{
					name: "inputTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "outputTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "inputVault",
					isMut: true,
					isSigner: false,
				},
				{
					name: "outputVault",
					isMut: true,
					isSigner: false,
				},
				{
					name: "lastObservationState",
					isMut: true,
					isSigner: false,
				},
				{
					name: "coreProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "whirlpoolSwap",
			accounts: [
				{
					name: "swapProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "tokenAuthority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "whirlpool",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tokenOwnerAccountA",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tokenVaultA",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tokenOwnerAccountB",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tokenVaultB",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tickArray0",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tickArray1",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tickArray2",
					isMut: true,
					isSigner: false,
				},
				{
					name: "oracle",
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: "inAmount",
					type: {
						option: "u64",
					},
				},
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "aToB",
					type: "bool",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "riskCheckAndFee",
			accounts: [
				{
					name: "tokenLedger",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userDestinationTokenAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "userTransferAuthority",
					isMut: false,
					isSigner: true,
				},
				{
					name: "tokenProgram",
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: "minimumOutAmount",
					type: "u64",
				},
				{
					name: "platformFeeBps",
					type: "u8",
				},
			],
		},
		{
			name: "initializeTokenLedger",
			accounts: [
				{
					name: "tokenLedger",
					isMut: true,
					isSigner: true,
				},
				{
					name: "payer",
					isMut: true,
					isSigner: true,
				},
				{
					name: "systemProgram",
					isMut: false,
					isSigner: false,
				},
			],
			args: [],
		},
		{
			name: "setTokenLedger",
			accounts: [
				{
					name: "tokenLedger",
					isMut: true,
					isSigner: false,
				},
				{
					name: "tokenAccount",
					isMut: false,
					isSigner: false,
				},
			],
			args: [],
		},
		{
			name: "createOpenOrders",
			accounts: [
				{
					name: "openOrders",
					isMut: true,
					isSigner: false,
				},
				{
					name: "payer",
					isMut: true,
					isSigner: true,
				},
				{
					name: "dexProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "systemProgram",
					isMut: false,
					isSigner: false,
				},
				{
					name: "rent",
					isMut: false,
					isSigner: false,
				},
				{
					name: "market",
					isMut: false,
					isSigner: false,
				},
			],
			args: [],
		},
	],
	accounts: [
		{
			name: "tokenLedger",
			type: {
				kind: "struct",
				fields: [
					{
						name: "tokenAccount",
						type: "publicKey",
					},
					{
						name: "amount",
						type: "u64",
					},
				],
			},
		},
	],
	types: [
		{
			name: "Swap",
			type: {
				kind: "struct",
				fields: [
					{
						name: "tokens",
						type: "u64",
					},
					{
						name: "minTokens",
						type: "u64",
					},
					{
						name: "side",
						type: {
							defined: "Side",
						},
					},
				],
			},
		},
		{
			name: "Swap",
			type: {
				kind: "struct",
				fields: [
					{
						name: "tokens",
						type: "u64",
					},
					{
						name: "minTokens",
						type: "u64",
					},
					{
						name: "side",
						type: {
							defined: "Side",
						},
					},
				],
			},
		},
		{
			name: "Swap",
			type: {
				kind: "struct",
				fields: [
					{
						name: "amountIn",
						type: "u64",
					},
					{
						name: "minimumAmountOut",
						type: "u64",
					},
				],
			},
		},
		{
			name: "Swap",
			type: {
				kind: "struct",
				fields: [
					{
						name: "amount",
						type: "u64",
					},
					{
						name: "otherAmountThreshold",
						type: "u64",
					},
					{
						name: "sqrtPriceLimit",
						type: "u128",
					},
					{
						name: "amountSpecifiedIsInput",
						type: "bool",
					},
					{
						name: "aToB",
						type: "bool",
					},
				],
			},
		},
		{
			name: "SwapInstrution",
			type: {
				kind: "enum",
				variants: [
					{
						name: "Swap",
						fields: [
							{
								defined: "Swap",
							},
						],
					},
				],
			},
		},
		{
			name: "Side",
			type: {
				kind: "enum",
				variants: [
					{
						name: "Bid",
					},
					{
						name: "Ask",
					},
				],
			},
		},
		{
			name: "Direction",
			type: {
				kind: "enum",
				variants: [
					{
						name: "LeftToRight",
					},
					{
						name: "RightToLeft",
					},
				],
			},
		},
	],
	errors: [
		{
			code: 6000,
			name: "SlippageToleranceExceeded",
			msg: "Slippage tolerance exceeded",
		},
		{
			code: 6001,
			name: "InvalidTokenLedger",
			msg: "Invalid token ledger",
		},
		{
			code: 6002,
			name: "MissingTokenLedger",
			msg: "Missing token ledger",
		},
		{
			code: 6003,
			name: "MissingMercurialExchangeTokenAccount",
			msg: "Missing mercurial exchange token account",
		},
		{
			code: 6004,
			name: "LedgerTokenAccountDoesNotMatch",
			msg: "Ledger token account does not match",
		},
		{
			code: 6005,
			name: "MissingPlatformFeeAccount",
			msg: "Missing platform fee account",
		},
		{
			code: 6006,
			name: "InvalidCalculation",
			msg: "Invalid calculation",
		},
	],
};
