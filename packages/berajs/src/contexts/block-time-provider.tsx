import { createContext, useContext } from "react";
import { useGetBlocksTimeStampQuery, blocksClient } from "@bera/graphql";
import { FALLBACK_BLOCK_TIME } from "@bera/config";

/**
 * Average berachain block time in seconds
 */
export const useBlockTime = (): number => {
  return useContext(BlockTimeContext);
};

export const BlockTimeContext = createContext<number>(FALLBACK_BLOCK_TIME);

export const BlockTimeProvider = ({
  defaultBlockTime = FALLBACK_BLOCK_TIME,
  children,
}: { children: React.ReactNode; defaultBlockTime?: number }) => {
  const SKIP = 40_000;

  // This could be cached server side
  const { data } = useGetBlocksTimeStampQuery({
    variables: {
      skip: SKIP,
    },
    client: blocksClient,
  });

  const blockTime = data
    ? (data?.newest[0]?.timestamp - data?.oldest[0]?.timestamp) /
      (data?.newest[0]?.number - data?.oldest[0]?.number)
    : defaultBlockTime;

  return (
    <BlockTimeContext.Provider value={blockTime}>
      {children}
    </BlockTimeContext.Provider>
  );
};
