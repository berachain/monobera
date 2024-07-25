import { type ActiveIncentive } from "@bera/berajs";

export interface ActiveIncentiveWithVault extends ActiveIncentive {
  cuttingBoard: CuttingBoardWeight;
}
