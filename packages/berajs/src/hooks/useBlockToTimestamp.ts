import { useBlock } from "wagmi";

import { useBlockTime } from "..";

/**
 *
 * @returns Timestamp in seconds
 */
export const useBlockToTimestamp = (
  inputBlock: number | bigint | string,
): number | undefined => {
  const { data: currentBlock, isLoading } = useBlock();
  const { data: block } = useBlock({ blockNumber: BigInt(inputBlock) });
  const blockDuration = useBlockTime();

  if (block) {
    return Number(block.timestamp);
  }

  if (isLoading || !currentBlock) return undefined;

  return (
    Number(currentBlock.timestamp) +
    Number(blockDuration) * (Number(inputBlock) - Number(currentBlock.number))
  );
};
