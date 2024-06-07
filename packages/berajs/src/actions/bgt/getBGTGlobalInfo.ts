import { Address } from "viem";

import { ActiveIncentive, BeraConfig, Validator } from "~/types";

export interface GlobalInfo {
  bgtInfo: {
    bgtInflation: number;
    bgtPerBlock: number;
    blockCountPerYear: number;
    totalStakeBgt: number;
  };
  incentiveCount: number;
  sumAllIncentivesInHoney: string;
  top3Incentives: { activeIncentives: ActiveIncentive[] };
  top3Vaults: { vaults: ActiveIncentive[]; total: number };
  top3EmittingValidators: {
    validators: { validator: Validator; stakedVotingPower: number }[];
  };
  validatorCount: number;
  vaultCount: number;
}

export const getBGTGlobalInfo = async (
  config: BeraConfig,
): Promise<GlobalInfo | undefined> => {
  if (!config.endpoints?.bgtEndpoint) {
    throw new Error("Missing backend endpoint in config");
  }
  try {
    const res = await fetch(`${config.endpoints.bgtEndpoint}/homepage`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
