import { type Address } from "wagmi";

// endpoints & websites
export const indexerUrl = process.env.NEXT_PUBLIC_INDEXER_ENDPOINT as string;
export const tokenListUrl = process.env.NEXT_PUBLIC_TOKEN_LIST_URL as string;
export const homePageUrl = process.env.NEXT_PUBLIC_HOMEPAGE_URL as string;
export const honeyDappUrl = process.env.NEXT_PUBLIC_HONEY_URL as string;
export const honeyDappName = process.env.NEXT_PUBLIC_HONEY_NAME as string;
export const bgtDappUrl = process.env.NEXT_PUBLIC_BGT_URL as string;
export const bgtDappName = process.env.NEXT_PUBLIC_BGT_NAME as string;
export const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;

// Block Explorer
export const blockExplorerUrl = process.env
  .NEXT_PUBLIC_BLOCK_EXPLORER as string;
export const blockExplorerName = process.env
  .NEXT_PUBLIC_BLOCK_EXPLORER_NAME as string;

// Chain information
export const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
export const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME as string;
export const networkName = process.env.NEXT_PUBLIC_NETWORK_NAME as string;
export const jsonRpcUrl = process.env.NEXT_PUBLIC_JSON_RPC_URL as string;

// Bera token information
export const gasTokenSymbol = process.env
  .NEXT_PUBLIC_NETWORK_CURRENCY as string;
export const gasTokenName = process.env
  .NEXT_PUBLIC_NETWORK_CURRENCY_NAME as string;
export const gasTokenDecimals = Number(
  process.env.NEXT_PUBLIC_NETWORK_CURRENCY_DECIMALS as string,
);

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
export const honeyAddress = process.env
  .NEXT_PUBLIC_HONEY_PRECOMPILE_ADDRESS as Address;
export const rewardsAddress = process.env
  .NEXT_PUBLIC_REWARDS_ADDRESS as Address;
export const erc20HoneyAddress = process.env
  .NEXT_PUBLIC_ERC20_HONEY_ADDRESS as Address;
