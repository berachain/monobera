import { BeraConfig, Market } from "~/types";

export const getMarkets = async (config: BeraConfig): Promise<Market[]> => {
  if (!config.endpoints?.marketList) {
    throw new Error("Missing market list endpoint in config");
  }
  try {
    const markets = await fetch(config.endpoints.marketList);
    const temp = await markets.json();
    return temp.products;
  } catch (error) {
    console.error("Error fetching validator information", error);
    return [];
  }
};
