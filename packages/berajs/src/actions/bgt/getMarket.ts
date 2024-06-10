import { BeraConfig, Market } from "~/types";

export interface GetMarkets {
  marketList: Market[];
  marketDictionary: { [key: string]: Market };
}

export const getMarkets = async (config: BeraConfig): Promise<GetMarkets> => {
  if (!config.endpoints?.marketList) {
    throw new Error("Missing market list endpoint in config");
  }
  try {
    const markets = await fetch(config.endpoints.marketList);
    const temp = await markets.json();
    return {
      marketList: temp.products,
      marketDictionary: temp.products.reduce(
        (acc: { [key: string]: Market }, item: Market) => {
          acc[item.name] = item;
          return acc;
        },
        {},
      ),
    };
  } catch (error) {
    console.error("Error fetching validator information", error);
    return { marketList: [], marketDictionary: {} };
  }
};
