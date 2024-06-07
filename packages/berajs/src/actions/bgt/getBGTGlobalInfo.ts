import { Address } from "viem";

import { ActiveIncentive, BeraConfig, Validator } from "~/types";

export interface GlobalInfo {
  bgtInfo: {
    bgtInflation: number;
    bgtPerBlock: number;
    blockCountPerYear: number;
    totalStakeBgt: number;
  };
  honeyPrices: {
    incentiveHoneyPrices: {
      address: Address;
      price: string;
    }[];
    incentivesCount: number;
  };
  top3EmittingValidators: {
    validators: {
      stakedVotingPower: number;
      validator: Validator;
    }[];
  };
  top3Incentives: { activeIncentives: ActiveIncentive[] };
  validatorCount: number;
}

export const getBGTGlobalInfo = async (
  config: BeraConfig,
): Promise<GlobalInfo | undefined> => {
  // if (!config.endpoints?.bgtEndpoint) {
  //   throw new Error("Missing backend endpoint in config");
  // }
  try {
    // const res = await fetch(`${config.endpoints.bgtEndpoint}/bgt_info`);
    const res = await fetch(
      "http://localhost:3001/berachain/v1alpha1/beacon/homepage",
    );
    return await res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
