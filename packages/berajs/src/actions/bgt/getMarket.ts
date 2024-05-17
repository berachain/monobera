import { Market } from "~/types";

const mockMarkets: Market[] = [
  {
    id: "native",
    name: "Native",
    imageUri: "http://example.com/market1.png",
    website: "http://example.com/market1",
  },
  {
    id: "defi",
    name: "DeFi",
    imageUri: "http://example.com/market2.png",
    website: "http://example.com/market2",
  },
  {
    id: "rwa",
    name: "RWA",
    imageUri: "http://example.com/market2.png",
    website: "http://example.com/market2",
  },
  {
    id: "bridge",
    name: "Bridge",
    imageUri: "http://example.com/market2.png",
    website: "http://example.com/market2",
  },
  {
    id: "oracle",
    name: "Oracle",
    imageUri: "http://example.com/market2.png",
    website: "http://example.com/market2",
  },
  {
    id: "custody",
    name: "Custody",
    imageUri: "http://example.com/market2.png",
    website: "http://example.com/market2",
  },
  {
    id: "account",
    name: "Account Abstraction",
    imageUri: "http://example.com/market2.png",
    website: "http://example.com/market2",
  },
  {
    id: "security",
    name: "Security",
    imageUri: "http://example.com/market2.png",
    website: "http://example.com/market2",
  },
];

export const getMarkets = async (): Promise<Market[]> => {
  try {
    return mockMarkets;
  } catch (error) {
    console.error(error);
    return [];
  }
};
