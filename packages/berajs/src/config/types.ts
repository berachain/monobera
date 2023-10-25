import { type Address, type Chain } from "wagmi";

interface PrecompileMapping {
  [key: string]: Address;
}

export interface NetworkConfig {
  isTestnet?: boolean;
  chain: Chain;
  precompileAddresses: PrecompileMapping;
}

export enum TransactionActionType {
  APPROVAL = "Approval",
  SWAP = "Swap",
  WRAP = "Wrap",
  UNWRAP = "Unwrap",

  CREATE_POOL = "Create Pool",
  ADD_LIQUIDITY = "Add Liquidity",
  WITHDRAW_LIQUIDITY = "Withdraw Liquidity",

  DELEGATE = "Delegate",
  REDELEGATE = "Redelegate",
  UNBONDING = "Unbonding",
  CANCEL_UNBONDING = "Cancel Unbonding",

  SUBMIT_PROPOSAL = "Submit Proposal",
  CANCEL_PROPOSAL = "Cancel Proposal",
  VOTE = "Vote",

  CREATE_BRIBE = "Create Bribe",
  CLAIMING_BRIBES = "Claiming Bribes", // claiming others
  CLAIMING_REWARDS = "Claiming BGT",

  REDEEM_BERA = "Redeem BERA",
  REDEEM_BGT = "Redeem BGT",

  MINT_HONEY = "Mint Honey",
  REDEEM_HONEY = "Redeem Honey",

  SUPPLY = "Supply",
  WITHDRAW = "Withdraw",
  BORROW = "Borrow",
  REPAY = "Repay",
}
