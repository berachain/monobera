import useSWRSubscription from "swr/subscription";

export const usePricesSocket = () => {
  const QUERY_KEY = "pricefeed";
  const { data } = useSWRSubscription(QUERY_KEY, (_, { next }) => {
    const socket = new WebSocket(
      process.env.NEXT_PUBLIC_PERPS_PRICEFEED as string,
    );
    socket.addEventListener("message", (event: any) => next(null, event.data));
    socket.addEventListener("error", (event: any) => next(event.error));
    return () => socket.close();
  });

  const useMarketIndexPrice = (index: number) => {
    if (data) {
      const parsed = JSON.parse(data);
      return Number(parsed[index]);
    }
    return data;
  };

  const usePriceFeed = () => {
    return data;
  };
  return {
    useMarketIndexPrice,
    usePriceFeed,
  };
};
