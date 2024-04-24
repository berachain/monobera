import { BeraConfig } from "../../types";
import { Token } from "../../types/dex";

export interface GetTokensRequest {
  externalList?: Token[];
  config: BeraConfig;
}

export interface GetTokens {
  tokenList?: Token[] | undefined;
  customTokenList?: Token[] | undefined;
  tokenDictionary?: { [key: string]: Token } | undefined;
  featuredTokenList?: Token[] | undefined;
}

/**
 * fetch and format the token list
 */
function tokenListToDict(list: Token[]): { [key: string]: Token } {
  return list.reduce((acc, item) => {
    // @ts-ignore
    acc[item.address] = item;
    return acc;
  }, {});
}

export const getTokens = async ({
  externalList,
  config,
}: GetTokensRequest): Promise<GetTokens> => {
  if (!config.endpoints?.tokenList) {
    return {
      tokenList: [],
      customTokenList: [...(externalList ?? [])],
      tokenDictionary: tokenListToDict(externalList ?? []),
      featuredTokenList: [],
    };
  }
  try {
    const tokenList = await fetch(config.endpoints?.tokenList);
    const temp = await tokenList.json();
    if (!temp.tokens)
      return {
        tokenList: externalList ?? [],
        customTokenList: externalList ?? [],
        featuredTokenList: [],
        tokenDictionary: {},
      };
    const defaultList = temp.tokens.map((token: any) => {
      return { ...token, default: true };
    });

    const defaultFeaturedList = temp.tokens
      .filter((token: any) => {
        const isFeatured = (tag: string) => tag === "featured";
        return token.tags.some(isFeatured);
      })
      .map((token: any) => {
        return { ...token, default: true };
      });

    const list = [...defaultList, ...(externalList ?? [])];

    const uniqueList = list.filter(
      (item, index) =>
        list.findIndex((i) => i.address === item.address) === index,
    );

    return {
      tokenList: uniqueList,
      customTokenList: [...(externalList ?? [])],
      tokenDictionary: tokenListToDict(list),
      featuredTokenList: defaultFeaturedList ?? [],
    };
  } catch (error) {
    console.error("Error fetching token list", error);
    return {
      tokenList: [...(externalList ?? [])],
      customTokenList: [...(externalList ?? [])],
      featuredTokenList: [],
      tokenDictionary: tokenListToDict(externalList ?? []),
    };
  }
};
