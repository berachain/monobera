import { renderHook } from "@testing-library/react";
import fetchMock from "fetch-mock";

import "@testing-library/jest-dom";
import useTokens, { tokenListToDict } from "../useTokens";

const mockTokenList = [
  {
    chainId: 2061,
    address: "0x5806E416dA447b267cEA759358cF22Cc41FAE80F",
    symbol: "WBERA",
    name: "Wrapped Berachain Token",
    decimals: 18,
    logoURI:
      "https://artio-static-asset-public.s3.ap-southeast-1.amazonaws.com/assets/wbera.png",
    tags: ["featured"],
  },
  {
    chainId: 2061,
    address: "0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5",
    symbol: "STGUSDC",
    name: "Stable Collateral USD Coin",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
    tags: ["stablecoin", "collateral", "featured", "defaultCollateral"],
  },
];

const mockTokenDictionary = {
  "0x5806E416dA447b267cEA759358cF22Cc41FAE80F": {
    chainId: 2061,
    address: "0x5806E416dA447b267cEA759358cF22Cc41FAE80F",
    symbol: "WBERA",
    name: "Wrapped Berachain Token",
    decimals: 18,
    logoURI:
      "https://artio-static-asset-public.s3.ap-southeast-1.amazonaws.com/assets/wbera.png",
    tags: ["featured"],
  },
  "0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5": {
    chainId: 2061,
    address: "0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5",
    symbol: "STGUSDC",
    name: "Stable Collateral USD Coin",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
    tags: ["stablecoin", "collateral", "featured", "defaultCollateral"],
  },
};

// Mocking modules
jest.mock("swr/immutable", () => ({
  __esModule: true, // This property is needed when mocking ES modules
  default: jest.fn(() => ({
    data: {
      list: mockTokenList,
      customList: [],
      dictionary: tokenListToDict(mockTokenList),
      gaugeDictionary: undefined,
      featured: [],
      error: null,
      isValidating: false,
    },
  })),
}));

describe("useTokens", () => {
  beforeAll(() => {
    fetchMock.restore();
  });

  it("token dictionary is safely created based on the list", async () => {
    fetchMock.get("*", { tokens: [] });

    const { result } = renderHook(() => useTokens());

    expect(result.current.tokenList).toEqual(mockTokenList);
    expect(result.current.tokenDictionary).toEqual(mockTokenDictionary);
  });
});
