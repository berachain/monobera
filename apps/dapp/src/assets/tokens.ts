export type Token = {
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
};

export const tokens: Token[] = [
  {
    address: "0x639A647fbe20b6c8ac19E48E2de44ea792c62123",
    chainId: 42220,
    decimals: 18,
    logoURI: "/icons/honeyIcon.jpg",
    name: "Honey",
    symbol: "HONEY",
  },
  {
    address: "0x639A647fbe20b6c8ac19E48E2de44ea792c62456",
    chainId: 42220,
    decimals: 18,
    logoURI: "/icons/beraIcon.jpg",
    name: "Bera",
    symbol: "BERA",
  },
  {
    address: "0x639A647fbe20b6c8ac19E48E2de44ea792c62789",
    chainId: 42220,
    decimals: 18,
    logoURI: "/icons/bgtIcon.jpg",
    name: "BGT",
    symbol: "IBGT",
  },
];
