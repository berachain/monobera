export interface HoneyMint {
  id: string;
  timestamp: bigint | number;
  from: `0x${string}`;
  to: `0x${string}`;
  collateralCoin: {
    id: string;
    denom: string;
    address: `0x${string}`;
    symbol: string;
    name: string;
    decimals: number;
    origin: any | null;
  };
  collateralAmount: bigint;
  mintAmount: bigint;
  totalHoneySupply: bigint;
}

export interface HoneyRedemption {
  id: string;
  timestamp: bigint | number;
  from: `0x${string}`;
  collateralCoin: {
    id: string;
    denom: string;
    address: `0x${string}`;
    symbol: string;
    name: string;
    decimals: number;
    origin: any | null;
  };
  collateralAmount: bigint;
  totalHoneySupply: bigint;
}

export interface HoneyTxn {
  id: string;
  timestamp: number;
  from: string;
  to: string;
  collateral: string;
  collateralAmount: string;
  honeyAmount: string;
  txnType: string;
}
