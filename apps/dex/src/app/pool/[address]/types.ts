export interface SwapData {
  metadata: {
    blockNum: string;
    txHash: string;
    blockHash: string;
    blockTime: string;
  };
  pool: string;
  swapIn: {
    denom: string;
    amount: string;
  };
  swapOut: {
    denom: string;
    amount: string;
  };
  sender: string;
}

export interface MappedTokens {
  [key: string]: number;
}

export interface AddLiquidityData {
  metadata: {
    blockNum: string;
    txHash: string;
    blockHash: string;
    blockTime: string;
  };
  pool: string;
  liquidityIn: {
    denom: string;
    amount: string;
  }[];
  sharesOut: {
    denom: string;
    amount: string;
  };
  sender: string;
}

export interface WithdrawLiquidityData {
  metadata: {
    blockNum: string;
    txHash: string;
    blockHash: string;
    blockTime: string;
  };
  pool: string;
  liquidityOut: {
    denom: string;
    amount: string;
  }[];
  sharesIn: {
    denom: string;
    amount: string;
  };
  sender: string;
}
