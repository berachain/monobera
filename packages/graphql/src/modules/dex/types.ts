export interface LiquidityChanged {
  id: string;
  type: string;
  liquidity: {
    coin: {
      denom: string;
      address: string;
      symbol: string;
      name: string;
      decimals: number;
    };
    swapDirection: string;
    amount: number;
  };
}
