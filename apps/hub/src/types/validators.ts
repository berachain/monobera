import { type ActiveIncentive, type CuttingBoardWeight } from "@bera/berajs";

export interface ActiveIncentiveWithVault extends ActiveIncentive {
  cuttingBoard: CuttingBoardWeight;
}
