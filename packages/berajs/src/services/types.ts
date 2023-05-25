export interface BaseAccount {
  account_number: string;
  address: string;
  pubkey: {
    type: string;
    key: string;
  };
  sequence: string;
}

export interface IReDelegationResponse {
  redelegation: IReDelegation;
  entries: IEntries[];
}

export interface IReDelegation {
  delegator_address: string;
  validator_src_address: string;
  validator_dst_address: string;
  entries: IReDelegationEntry[];
}

export interface IEntries {
  redelegation_entry: IReDelegationEntry;
  balance: string;
}

export interface IReDelegationEntry {
  creation_height: string;
  completion_time: Date;
  initial_balance: string;
  shares_dst: string;
}

export interface IBicParams {
  blocks_per_year: string;
  community_tax: string;
  foundation_bech32: string;
}
