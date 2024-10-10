import { FALLBACK_BLOCK_TIME } from "@bera/config";
import { useBlock, useBlockNumber } from "wagmi";

import { useBlockTime } from "..";

/**
 *
 * @returns Timestamp in seconds
 */
export const useBlockToTimestamp = (
  inputBlock: number | bigint | string,
): number | undefined => {
  const { data: currentBlock, isLoading } = useBlockNumber({
    cacheTime: FALLBACK_BLOCK_TIME * 1000,
  });
  const { data: block } = useBlock({
    blockNumber: BigInt(inputBlock),
    includeTransactions: false,
    watch: false,
  });
  const blockDuration = useBlockTime();

  if (block) {
    return Number(block.timestamp);
  }

  if (isLoading || !currentBlock) return undefined;

  return (
    Date.now() / 1000 +
    blockDuration * (Number(inputBlock) - Number(currentBlock))
  );
};
