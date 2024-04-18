import { BeraConfig } from "../../types";
import { Token } from "../../types/dex";

export interface IFetchTokensRequestArgs {
  localStorageTokenList: Token[];
  config: BeraConfig;
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
  localStorageTokenList,
  config,
}: IFetchTokensRequestArgs): Promise<any | undefined> => {
  if (!config.endpoints?.tokenList) {
    return {
      list: [],
      customList: [...localStorageTokenList],
      dictionary: tokenListToDict(localStorageTokenList),
      featured: [],
    };
  }
  try {
    const tokenList = await fetch(config.endpoints?.tokenList);
    const temp = await tokenList.json();
    if (!temp.tokens)
      return { list: localStorageTokenList, featured: [], dictionary: {} };
    const defaultList = temp.tokens.map((token: any) => {
      return { ...token, default: true };
    });

    const defaultFeaturedList = temp.tokens
      .filter((token: any) => {
        const isFeatured = (tag: string) => tag === "featured";
        return token.tags.some(isFeatured);
        // return { ...token, default: true };
      })
      .map((token: any) => {
        return { ...token, default: true };
      });
    const list = [...defaultList, ...localStorageTokenList];
    // Make it unique
    const uniqueList = list.filter(
      (item, index) =>
        list.findIndex((i) => i.address === item.address) === index,
    );

    return {
      list: uniqueList,
      customList: [...localStorageTokenList],
      dictionary: tokenListToDict(list),
      featured: defaultFeaturedList ?? [],
    };
  } catch (error) {
    console.error("Error fetching token list", error);
    return {
      list: localStorageTokenList,
      featured: [],
      dictionary: tokenListToDict(localStorageTokenList),
    };
  }
};
