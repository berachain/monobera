"use client";

import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";

import { type Token } from "~/api";
import POLLING from "~/config/constants/polling";

interface IUseTokens {
  tokenList: Token[] | undefined;
  customTokenList: Token[] | undefined;
  tokenDictionary: { [key: string]: Token } | undefined;
  featuredTokenList: Token[] | undefined;
  addNewToken: (token: Token) => void;
  removeToken: (token: Token) => void;
}

function tokenListToDict(list: Token[]): { [key: string]: Token } {
  return list.reduce((acc, item) => {
    // @ts-ignore
    acc[item["address"]] = item;
    return acc;
  }, {});
}

const useTokens = (): IUseTokens => {
  const TOKEN_KEY = "tokens";

  const [localStorageTokenList, setLocalStorageTokenList] = useLocalStorage<
    Token[]
  >(TOKEN_KEY, []);

  const { data } = useSWRImmutable(
    ["defaultTokenList", localStorageTokenList],
    async () => {
      const tokenList = await fetch(
        process.env.NEXT_PUBLIC_TOKEN_LIST as string,
      );
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
      return {
        list: list,
        customList: [...localStorageTokenList],
        dictionary: temp.tokenMap ?? tokenListToDict(list),
        featured: defaultFeaturedList ?? [],
      };
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const addNewToken = (token: Token) => {
    // Indicate that this token is now accepted into the default list of tokens
    const acceptedToken = {
      ...token,
      default: true,
    };

    // Check if the token already exists in tokenList
    if (data?.list.some((t) => t.address === acceptedToken.address)) {
      return;
    }

    const updatedData = [...localStorageTokenList, acceptedToken];
    setLocalStorageTokenList(updatedData);
    // Update config data and store it in localStorage
  };

  const removeToken = (token: Token) => {
    const filteredList = localStorageTokenList.filter(
      (t) => t.address !== token.address,
    );

    const updatedData = [...filteredList];
    setLocalStorageTokenList(updatedData);
  };

  return {
    tokenList: data?.list ?? [],
    customTokenList: data?.customList ?? [],
    tokenDictionary: data?.dictionary ?? {},
    featuredTokenList: data?.featured ?? [],
    addNewToken,
    removeToken,
  };
};

export default useTokens;
