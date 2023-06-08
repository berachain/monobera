export interface ValidatorInfo {
  name: string;
  operator_address: string;
  consensus_pubkey: {
    "@type": "/cosmos.crypto.ed25519.PubKey";
    key: string;
  };
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: {
    moniker: string;
    identity: string;
    website: string;
    security_contact: string;
    details: string;
  };
  unbonding_height: string;
  unbonding_time: string;
  commission: {
    commission_rates: {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    };
    update_time: string;
  };
  min_self_delegation: string;
}

export const validator: ValidatorInfo = {
  name: "Test Validator",
  operator_address: "evmosvaloper1qgnmzn23ksnvg77z33clqqz6sjulw2m37kxtrh",
  consensus_pubkey: {
    "@type": "/cosmos.crypto.ed25519.PubKey",
    key: "GOe99sQtPLjmeQkscbhtwYsvVO+/Bd08XDOCuXzu7KQ=",
  },
  jailed: false,
  status: "BOND_STATUS_BONDED",
  tokens: "2111880372023123578949766",
  delegator_shares: "2358529456755133780353034.744970258604501543",
  description: {
    moniker: "rxpwnz ☄️",
    identity: "BEC2EF692D99E53E",
    website: "https://discordapp.com/users/424964920027774977",
    security_contact: "",
    details: "rxpwnz validator",
  },
  unbonding_height: "13828999",
  unbonding_time: "2023-05-03T02:41:02.421237124Z",
  commission: {
    commission_rates: {
      rate: "0.100000000000000000",
      max_rate: "0.200000000000000000",
      max_change_rate: "0.010000000000000000",
    },
    update_time: "2022-02-27T10:36:40.592361529Z",
  },
  min_self_delegation: "1000000",
};
