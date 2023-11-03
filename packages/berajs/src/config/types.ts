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

  // PERPS

  MARKET_LONG = "Market Long",
  MARKET_SHORT = "Market Short",
  LIMIT_LONG = "Limit Long",
  LIMIT_SHORT = "Limit Short",
  CANCEL_ORDER = "Cancel Order",
  CANCEL_ALL_ORDERS = "Cancel All Orders",
  EDIT_PERPS_ORDER = "Edit Perps Order",
  DEPOSIT_HONEY = "Deposit Honey",
  START_WITHDRAW_REQUEST = "Start Withdraw Request",
  CANCEL_WITHDRAW_REQUEST = "Cancel Withdraw Request",
  WITHDRAW_HONEY = "Withdraw Honey",
  DELEGATE_OCT = "Delegate",
  REVOKE_OCT = "Revoke",
}
