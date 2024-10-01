import { createContext, useContext } from "react";
import { useGetBlocksTimeStampQuery, blocksClient } from "@bera/graphql";

export const useBlockTime = () => {
  return useContext(BlockTimeContext);
};

export const BlockTimeContext = createContext<number>(2);

export const BlockTimeProvider = ({
  defaultBlockTime = 2,
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
