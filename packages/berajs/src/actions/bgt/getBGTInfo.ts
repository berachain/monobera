import { BeraConfig } from "~/types";

export interface GetBGTInfo {
  bgtPerBlock: number;
  blockCountPerYear: number;
  totalStakeBgt: number;
  bgtInflation: number;
}

export const getBGTInfo = async (
  config: BeraConfig,
): Promise<GetBGTInfo | undefined> => {
  // if (!config.endpoints?.bgtEndpoint) {
  //   throw new Error("Missing backend endpoint in config");
  // }
  try {
    // const res = await fetch(`${config.endpoints.bgtEndpoint}/bgt_info`);
    const res = await fetch(
      "http://localhost:3001/berachain/v1alpha1/beacon/bgt_info",
    );
    return await res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
