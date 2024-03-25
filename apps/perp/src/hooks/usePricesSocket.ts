import { perpsPriceFeed } from "@bera/config";
import useSWRSubscription from "swr/subscription";

export const usePricesSocket = () => {
  const QUERY_KEY = "pricefeed";
  const { data } = useSWRSubscription(QUERY_KEY, (_, { next }) => {
    const socket = new WebSocket(perpsPriceFeed);
    socket.addEventListener("message", (event: any) => next(null, event.data));
    socket.addEventListener("error", (event: any) => next(event.error));
    return () => socket.close();
  });

  const useMarketIndexPrice = (index: number) => {
    try {
      if (data) {
        const parsed = JSON.parse(data);
        return Number(parsed[index]);
      }
      return data;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };

  const usePriceFeed = () => {
    return data;
  };
  return {
    useMarketIndexPrice,
    usePriceFeed,
  };
};
