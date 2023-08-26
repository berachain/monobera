export interface Market {
  title: string;
  icon: string;
  totalSupply: number;
  dailyPercentChange: number;
  dailyBorrows: number;
  supplyBalance?: number;
  borrowBalance?: number;
}

const markets: Market[] = [
  {
    title: "Bitcoin",
    icon: "/honey.png",
    totalSupply: 21000000,
    dailyPercentChange: 5.2,
    dailyBorrows: 1200000,
    supplyBalance: 100000,
  },
  {
    title: "Ethereum",
    icon: "/honey.png",
    totalSupply: 118237548,
    dailyPercentChange: 3.8,
    dailyBorrows: 750000,
    supplyBalance: 100000,
  },
  {
    title: "Cardano",
    icon: "/honey.png",
    totalSupply: 45000000000,
    dailyPercentChange: 2.1,
    dailyBorrows: 24000,
    borrowBalance: 0,
  },
  {
    title: "Binance Coin",
    icon: "/honey.png",
    totalSupply: 168137036,
    dailyPercentChange: 4.5,
    dailyBorrows: 860000,
  },
  {
    title: "Solana",
    icon: "/honey.png",
    totalSupply: 300000000,
    dailyPercentChange: 7.2,
    dailyBorrows: 510000,
  },
  {
    title: "XRP",
    icon: "/honey.png",
    totalSupply: 100000000000,
    dailyPercentChange: 1.9,
    dailyBorrows: 175000,
  },
  {
    title: "Polkadot",
    icon: "/honey.png",
    totalSupply: 110552838,
    dailyPercentChange: 6.8,
    dailyBorrows: 69000,
  },
  {
    title: "Dogecoin",
    icon: "/honey.png",
    totalSupply: 130681439249,
    dailyPercentChange: 2.3,
    dailyBorrows: 42000,
  },
  {
    title: "Avalanche",
    icon: "/honey.png",
    totalSupply: 720000000,
    dailyPercentChange: 5.6,
    dailyBorrows: 95000,
  },
  {
    title: "Terra",
    icon: "/honey.png",
    totalSupply: 993612111,
    dailyPercentChange: 3.1,
    dailyBorrows: 89000,
  },
  {
    title: "Chainlink",
    icon: "/honey.png",
    totalSupply: 1000000000,
    dailyPercentChange: 4.9,
    dailyBorrows: 112000,
  },
  {
    title: "Crypto.com Coin",
    icon: "/honey.png",
    totalSupply: 30915631534,
    dailyPercentChange: 3.7,
    dailyBorrows: 61000,
  },
  {
    title: "Litecoin",
    icon: "/honey.png",
    totalSupply: 84000000,
    dailyPercentChange: 2.8,
    dailyBorrows: 98000,
  },
  {
    title: "Bitcoin Cash",
    icon: "/honey.png",
    totalSupply: 21000000,
    dailyPercentChange: 2.0,
    dailyBorrows: 115000,
  },
  {
    title: "Polygon",
    icon: "/honey.png",
    totalSupply: 10000000000,
    dailyPercentChange: 6.3,
    dailyBorrows: 82000,
  },
  {
    title: "Ethereum",
    icon: "/honey.png",
    totalSupply: 210700000,
    dailyPercentChange: 1.5,
    dailyBorrows: 32000,
  },
  {
    title: "THETA",
    icon: "/honey.png",
    totalSupply: 1000000000,
    dailyPercentChange: 5.8,
    dailyBorrows: 81000,
  },
  {
    title: "Bitcoin",
    icon: "/honey.png",
    totalSupply: 128478,
    dailyPercentChange: 4.2,
    dailyBorrows: 6900,
  },
  {
    title: "Filecoin",
    icon: "/honey.png",
    totalSupply: 200000000,
    dailyPercentChange: 4.7,
    dailyBorrows: 47000,
  },
  {
    title: "Stellar",
    icon: "/honey.png",
    totalSupply: 50001860567,
    dailyPercentChange: 2.6,
    dailyBorrows: 108000,
  },
  {
    title: "Tezos",
    icon: "/honey.png",
    totalSupply: 873869069,
    dailyPercentChange: 3.0,
    dailyBorrows: 56000,
  },
  {
    title: "Huobi Token",
    icon: "/honey.png",
    totalSupply: 500000000,
    dailyPercentChange: 1.8,
    dailyBorrows: 57000,
  },
  {
    title: "EOS",
    icon: "/honey.png",
    totalSupply: 1000000000,
    dailyPercentChange: 2.4,
    dailyBorrows: 79000,
  },
  {
    title: "Aave",
    icon: "/honey.png",
    totalSupply: 16000000,
    dailyPercentChange: -5.9,
    dailyBorrows: 62000,
  },
  {
    title: "Cosmos",
    icon: "/honey.png",
    totalSupply: 268409076,
    dailyPercentChange: -3.3,
    dailyBorrows: 58000,
  },
  {
    title: "Monero",
    icon: "/honey.png",
    totalSupply: 18400000,
    dailyPercentChange: 2.9,
    dailyBorrows: 34000,
  },
  {
    title: "Tron",
    icon: "/honey.png",
    totalSupply: 100850743812,
    dailyPercentChange: 1.7,
    dailyBorrows: 72000,
  },
  {
    title: "Algorand",
    icon: "/honey.png",
    totalSupply: 10000000000,
    dailyPercentChange: 4.1,
    dailyBorrows: 47000,
  },
  {
    title: "Compound",
    icon: "/honey.png",
    totalSupply: 10000000,
    dailyPercentChange: 4.6,
    dailyBorrows: 41000,
  },
  {
    title: "VeChain",
    icon: "/honey.png",
    totalSupply: 86712634466,
    dailyPercentChange: 3.5,
    dailyBorrows: 56000,
  },
  {
    title: "Maker",
    icon: "/honey.png",
    totalSupply: 1005577,
    dailyPercentChange: 5.4,
    dailyBorrows: 4600,
  },
];

export const useMarkets = () => {
  return markets;
};
