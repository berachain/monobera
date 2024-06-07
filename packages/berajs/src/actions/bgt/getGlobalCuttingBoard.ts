import { BeraConfig, CuttingBoardWeight } from "~/types";

export interface GetGlobalCuttingBoard {
  globalCBWs: CuttingBoardWeight[];
}

export const getGlobalCuttingBoard = async (
  threshold: number,
  config: BeraConfig,
): Promise<GetGlobalCuttingBoard> => {
  // if (!config.endpoints?.bgtEndpoint) {
  //   throw new Error("Missing backend endpoint in config");
  // }
  try {
    // const res = await fetch(`${config.endpoints.bgtEndpoint}/bgt_info`);
    const res = await fetch(
      `http://localhost:3001/berachain/v1alpha1/beacon/global_cutting_boards?threshold=${threshold}`,
    );
    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      globalCBWs: [],
    };
  }
};
