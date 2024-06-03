import { Address } from "viem";
import { useMemo } from "react";
import {
  CuttingBoardWeight,
  Token,
  Vault,
  usePollValidatorInfo,
} from "@bera/berajs";

export type AggregatedBribe = {
  bribeTotalAmountLeft: string;
  amountPerProposal: string;
  token: Token;
  sourceVaults: Vault[];
  sourceVaultMapping?: Record<
    string,
    {
      amount: string;
      incentiveRate: string;
    }
  >;
};

export const useAggregatedBribes = (validatorAddress: Address) => {
  const { validatorInfoDictionary } = usePollValidatorInfo();
  //@ts-ignore
  const validator = validatorInfoDictionary?.[validatorAddress];
  return useMemo<AggregatedBribe[] | undefined>(() => {
    if (!validator) return undefined;

    const cuttingBoards = validator.cuttingboard;
    return Object.values(aggregateIncentivesByToken(cuttingBoards));
  }, [validator]);
};

function aggregateIncentivesByToken(
  cuttingBoards: CuttingBoardWeight[],
): Record<string, AggregatedBribe> {
  const incentivesMap: Record<string, AggregatedBribe> = {};

  // Loop through each CuttingBoardWeight
  cuttingBoards.forEach((cuttingBoard) => {
    // Loop through each ActiveIncentive in the Vault's activeIncentives array
    cuttingBoard.receiver.activeIncentives.forEach((incentive: any) => {
      const tokenAddress = incentive.token.address;

      // If the token address is not already a key in the map, initialize it
      if (!incentivesMap[tokenAddress]) {
        incentivesMap[tokenAddress] = {
          bribeTotalAmountLeft: "0",
          amountPerProposal: "0", // Placeholder, calculate this based on some logic
          token: incentive.token,
          sourceVaults: [],
        };
      }

      const currentAmount = parseFloat(
        incentivesMap[tokenAddress].bribeTotalAmountLeft,
      );
      const additionalAmount = parseFloat(incentive.amountLeft);

      const currentAmountPerProposal = parseFloat(
        incentivesMap[tokenAddress].amountPerProposal,
      );
      const incentiveRate = parseFloat(incentive.incentiveRate);

      const amountPerProposal = incentiveRate * cuttingBoard.amount;

      // Update total amounts
      incentivesMap[tokenAddress].bribeTotalAmountLeft = (
        currentAmount + additionalAmount
      ).toString();
      incentivesMap[tokenAddress].amountPerProposal = (
        currentAmountPerProposal + amountPerProposal
      ).toString();

      incentivesMap[tokenAddress].sourceVaults.push(cuttingBoard.receiver);
    });
  });

  return incentivesMap;
}
