export interface InflationRate {
  id: string;
  currentBlockSupply: number;
  lastBlockSupply: number;
  lastBlock: number;
  currentBlock: number;
  difference: number;
  inflationRate: number;
  bgtPerYear: number;
}

export interface CuttingBoard {
  startEpoch: number;
  valConsAddr: string;
  id: string;
  epoch: number;
  weights: Weight[];
}

export interface Weight {
  id: string;
  receiver: string;
  weight: number;
  amount: number;
  epoch: number;
}

export interface GlobalCuttingBoardData {
  startEpoch: number;
  valConsAddr: string;
  id: string;
  epoch: number;
  weights: Weight[];
}
