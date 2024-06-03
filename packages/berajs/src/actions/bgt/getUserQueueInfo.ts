import { Address, PublicClient, formatUnits } from "viem";

import { BGT_ABI } from "~/abi";
import { BeraConfig } from "../../types";

export interface GetUserBoostedQueue {
  account: string | undefined;
  validatorAddressList: Address[];
  config: BeraConfig;
  publicClient: PublicClient | undefined;
}

export interface BoostedQueueInfo {
  blockNumberLast: number;
  bgtAmount: bigint;
  formattedBgtAmount: string;
}

interface Call {
  abi: any;
  address: Address;
  functionName: string;
  args: any[];
}

/**
 * Returns the amount of BGT queued up to be used by an account to boost with all validator.
 */

export const getUserBoostedQueue = async ({
  account,
  validatorAddressList,
  config,
  publicClient,
}: GetUserBoostedQueue): Promise<{
  [key: Address]: BoostedQueueInfo;
}> => {
  if (!publicClient) throw new Error("Missing public client");
  if (!account) throw new Error("Missing user account");
  if (!config.contracts?.bgtAddress)
    throw new Error("BGT address not found in config");
  if (!config.contracts?.multicallAddress)
    throw new Error("Multicall address not found in config");

  const calls: Call[] = validatorAddressList.map((validatorAddress) => ({
    address: config.contracts!.bgtAddress as Address,
    abi: BGT_ABI,
    functionName: "boostedQueue",
    args: [account, validatorAddress],
  }));

  try {
    const result = await publicClient.multicall({
      contracts: calls,
      multicallAddress: config.contracts?.multicallAddress,
    });
    const userQueue: { [key: string]: BoostedQueueInfo } = {};
    result.map((item: any, index: number) => {
      if (item.status === "success") {
        userQueue[validatorAddressList[index]] = {
          blockNumberLast: item.result[0],
          bgtAmount: item.result[1],
          formattedBgtAmount: formatUnits(item.result[1], 18),
        };
      } else {
        userQueue[validatorAddressList[index]] = {
          blockNumberLast: 0,
          bgtAmount: 0n,
          formattedBgtAmount: "0",
        };
      }
    });
    return userQueue;
  } catch (error) {
    console.log(error);
    return {};
  }
};
