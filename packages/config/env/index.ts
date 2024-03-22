type Address = `0x${string}`;

// endpoints
export const indexerUrl = process.env.NEXT_PUBLIC_INDEXER_ENDPOINT as string;
export const tokenListUrl = process.env.NEXT_PUBLIC_TOKEN_LIST as string;
export const gaugeListUrl = process.env.NEXT_PUBLIC_GAUGE_LIST as string;
export const validatorList = process.env.NEXT_PUBLIC_VALIDATOR_LIST as string;
export const publicAnalyticsUrl = process.env.NEXT_PUBLIC_ANALYTICS as string;
export const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
export const blockExplorerUrl = process.env
  .NEXT_PUBLIC_BLOCK_EXPLORER as string;
export const blockExplorerName = process.env
  .NEXT_PUBLIC_BLOCK_EXPLORER_NAME as string;
export const lendEndpointUrl = process.env.NEXT_PUBLIC_LEND_ENDPOINT as string;
export const faucetEndpointUrl = process.env
  .NEXT_PUBLIC_FAUCET_ENDPOINT as string;
export const validatorEndpointUrl = process.env.NEXT_PUBLIC_VALIDATOR_ENDPOINT;
export const awsUrl = process.env.NEXT_PUBLIC_AWS_URL as string;

// Subgraphs
export const crocSubgraphEndpoint = process.env
  .NEXT_PUBLIC_RPC_CROC_SUBGRAPH as Address;
export const honeySubgraphUrl = process.env
  .NEXT_PUBLIC_HONEY_SUBGRAPH_URL as string;
export const lendSubgraphUrl = process.env
  .NEXT_PUBLIC_BEND_SUBGRAPH_URL as string;

//Dapps
export const homepageUrl = process.env.NEXT_PUBLIC_HOMEPAGE_URL as string;
export const homepageName = process.env.NEXT_PUBLIC_HOMEPAGE_NAME as string;
export const honeyUrl = process.env.NEXT_PUBLIC_HONEY_URL as string;
export const honeyName = process.env.NEXT_PUBLIC_HONEY_NAME as string;
export const bgtUrl = process.env.NEXT_PUBLIC_BGT_URL as string;
export const bgtName = process.env.NEXT_PUBLIC_BGT_NAME as string;
export const dexName = process.env.NEXT_PUBLIC_DEX_NAME as string;
export const dexUrl = process.env.NEXT_PUBLIC_DEX_URL as string;
export const lendName = process.env.NEXT_PUBLIC_LEND_NAME as string;
export const lendUrl = process.env.NEXT_PUBLIC_LEND_URL as string;
export const perpsName = process.env.NEXT_PUBLIC_PERPS_NAME as string;
export const perpsUrl = process.env.NEXT_PUBLIC_PERPS_URL as string;
export const faucetName = process.env.NEXT_PUBLIC_FAUCET_NAME as string;
export const faucetUrl = process.env.NEXT_PUBLIC_FAUCET_URL as string;

// External links
export const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL as string;
export const perpsDocsUrl = process.env.NEXT_PUBLIC_PERPS_DOCS_URL as string;
export const lendDocsUrl = process.env.NEXT_PUBLIC_LEND_DOCS_URL as string;
export const careersUrl = process.env.NEXT_PUBLIC_CAREERS_URL as string;
export const pressKit = process.env.NEXT_PUBLIC_PRESS_KIT as string;
export const blogUrl = process.env.NEXT_PUBLIC_BERAERA_BLOG_URL as string;
export const mediaKitUrl = process.env.NEXT_PUBLIC_MEDIA_KIT_URL as string;

//Socials
export const twitter = process.env.NEXT_PUBLIC_TWITTER as string;
export const telegram = process.env.NEXT_PUBLIC_TELEGRAM as string;
export const discord = process.env.NEXT_PUBLIC_DISCORD as string;
export const github = process.env.NEXT_PUBLIC_GITHUB as string;

// Chain information
export const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
export const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME as string;
export const networkName = process.env.NEXT_PUBLIC_NETWORK_NAME as string;
export const jsonRpcUrl = process.env.NEXT_PUBLIC_JSON_RPC_URL as string;
export const publicJsonRpcUrl = process.env
  .NEXT_PUBLIC_PUBLIC_JSON_RPC_URL as string;

// Bera token information
export const gasTokenIconUrl = process.env
  .NEXT_PUBLIC_NETWORK_ICON_URL as string;
export const gasTokenSymbol = process.env
  .NEXT_PUBLIC_NETWORK_CURRENCY as string;
export const gasTokenName = process.env
  .NEXT_PUBLIC_NETWORK_CURRENCY_NAME as string;
export const gasTokenDecimals = Number(
  process.env.NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS,
);
export const stakingToken = process.env.NEXT_PUBLIC_STAKING_TOKEN as string;
export const bech32Prefix = process.env.NEXT_PUBLIC_BECH32_PREFIX as string;
export const governanceMinDeposit = Number(
  process.env.NEXT_PUBLIC_GOVERNANCE_MIN_DEPOSIT,
);
export const blockTime = Number(process.env.NEXT_PUBLIC_BLOCKTIME);

// Precompiles & contracts
export const multicallAddress = process.env
  .NEXT_PUBLIC_MULTICALL_ADDRESS as Address;
export const erc20DexAddress = process.env
  .NEXT_PUBLIC_ERC20_DEX_ADDRESS as Address;
export const erc20ModuleAddress = process.env
  .NEXT_PUBLIC_ERC20_MODULE_ADDRESS as Address;
export const stakingAddress = process.env
  .NEXT_PUBLIC_STAKING_ADDRESS as Address;
export const governanceAddress = process.env
  .NEXT_PUBLIC_GOVERNANCE_ADDRESS as Address;
export const bankAddress = process.env.NEXT_PUBLIC_BANK_ADDRESS as Address;
export const epochsAddress = process.env.NEXT_PUBLIC_EPOCHS_ADDRESS as Address;
export const erc20BgtAddress = process.env
  .NEXT_PUBLIC_ERC20_BGT_ADDRESS as Address;
export const berachefAddress = process.env
  .NEXT_PUBLIC_BERACHEF_ADDRESS as Address;
export const honeyAddress = process.env.NEXT_PUBLIC_HONEY_ADDRESS as Address;
export const rewardsAddress = process.env
  .NEXT_PUBLIC_REWARDS_ADDRESS as Address;
export const honeyRouterAddress = process.env
  .NEXT_PUBLIC_HONEY_ROUTER_ADDRESS as Address;
export const erc20BribeModule = process.env
  .NEXT_PUBLIC_ERC20BRIBEMODULE_ADDRESS as Address;
export const erc20BribeAddress = process.env
  .NEXT_PUBLIC_ERC20_BRIBE_ADDRESS as Address;
export const erc20RewardsAddress = process.env
  .NEXT_PUBLIC_REWARDS_ADDRESS as Address;
export const lendPoolImplementationAddress = process.env
  .NEXT_PUBLIC_LEND_POOL_IMPLEMENTATION_ADDRESS as Address;
export const lendOracleAddress = process.env
  .NEXT_PUBLIC_LEND_ORACLE_ADDRESS as Address;
export const lendUIDataProviderAddress = process.env
  .NEXT_PUBLIC_LEND_UI_DATA_PROVIDER_ADDRESS as Address;
export const lendPoolAddressProviderAddress = process.env
  .NEXT_PUBLIC_LEND_POOL_ADDRESS_PROVIDER as Address;
export const lendRewardsAddress = process.env
  .NEXT_PUBLIC_LEND_REWARDS_ADDRESS as Address;
export const lendHoneyDebtTokenAddress = process.env
  .NEXT_PUBLIC_LEND_HONEY_DEBT_TOKEN_ADDRESS as Address;
export const perpsReferralsAddress = process.env
  .NEXT_PUBLIC_REFERRALS_CONTRACT_ADDRESS as Address;
export const tradingContractAddress = process.env
  .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address;
export const gTokenContractAddress = process.env
  .NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address;

// TOKENS
export const honeyTokenAddress = process.env
  .NEXT_PUBLIC_HONEY_ADDRESS as Address;
export const nativeTokenAddress = process.env
  .NEXT_PUBLIC_BERA_ADDRESS as Address;
export const beraTokenAddress = process.env
  .NEXT_PUBLIC_WBERA_ADDRESS as Address;
export const stgusdcTokenAddress = process.env
  .NEXT_PUBLIC_STGUSDC_ADDRESS as Address;
export const bgtTokenAddress = process.env.NEXT_PUBLIC_BGT_ADDRESS as Address;
export const wbtcTokenAddress = process.env.NEXT_PUBLIC_WBTC_ADDRESS as Address;
export const wethTokenAddress = process.env.NEXT_PUBLIC_WETH_ADDRESS as Address;

// PERPS
export const perpsEndpoint = process.env
  .NEXT_PUBLIC_PERPS_ENDPOINT_URL as string;
export const perpsCompetitionId = process.env
  .NEXT_PUBLIC_PERPS_COMPETITION_ID as string;
export const perpsPriceFeed = process.env.NEXT_PUBLIC_PERPS_PRICEFEED as string;
export const candleFeed = process.env.NEXT_PUBLIC_CANDLEFEED as string;

// Validator clue
export const validatorClueEndpoint = process.env
  .NEXT_PUBLIC_VILIDATOR_CLUE_ENDPOINT as string;

// gov authority
export const governanceAuthority = process.env
  .NEXT_PUBLIC_GOVERNANCE_AUTHORITY as string;

export const bannerEnabled = Boolean(
  process.env.NEXT_PUBLIC_BANNER_ENABLED,
) as boolean;

export const rpcBannerEnabled = Boolean(
  process.env.NEXT_PUBLIC_RPC_BANNER_ENABLED,
);

// Crocswap
export const crocDexAddress = process.env.NEXT_PUBLIC_RPC_CROC_DEX as Address;
export const crocQueryAddress = process.env
  .NEXT_PUBLIC_RPC_CROC_QUERY as Address;
export const crocImpactAddress = process.env
  .NEXT_PUBLIC_RPC_CROC_IMPACT as Address;
export const crocMultiPathAddress = process.env
  .NEXT_PUBLIC_RPC_CROC_MULTIPATH as Address;
export const crocMultiSwapAddress = process.env
  .NEXT_PUBLIC_RPC_CROC_MULTISWAP as Address;
export const crocIndexerEndpoint = process.env
  .NEXT_PUBLIC_RPC_CROC_INDEXER_ENDPOINT as Address;
export const crocRouterEndpoint = process.env
  .NEXT_PUBLIC_RPC_CROC_ROUTER_ENDPOINT as Address;

// Faucet
export const faucetDripAmount = process.env
  .NEXT_PUBLIC_FAUCET_DRIP_AMOUNT as string;
export const faucetDripTimeGap = process.env
  .NEXT_PUBLIC_FAUCET_DRIP_TIME_GAP as string;
export const recaptchaSiteKey = process.env
  .NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;
export const cloudflareKey = process.env.NEXT_PUBLIC_CLOUDFLARE_KEY as string;

// Sentry
export const developmentAnalytics = process.env
  .NEXT_PUBLIC_DEVELOPMENT_ANALYTICS as string;
export const mixpanelProjectToken = process.env
  .PUBLIC_MIXPANEL_PROJECT_TOKEN as string;
export const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME as string;
