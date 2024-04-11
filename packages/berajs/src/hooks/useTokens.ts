"use client";

import { useMemo } from "react";
import {
  beraTokenAddress,
  nativeTokenAddress,
  tokenListUrl,
} from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";

import { type Token } from "~/api";
import { DefaultHookTypes } from "..";

interface IUseTokens {
  tokenList?: Token[] | undefined;
  customTokenList?: Token[] | undefined;
  tokenDictionary?: { [key: string]: Token } | undefined;
  featuredTokenList?: Token[] | undefined;
  beraToken?: Token | undefined;
  wBeraToken?: Token | undefined;
  addNewToken: (token: Token | undefined) => void;
  removeToken: (token: Token) => void;
}

function tokenListToDict(list: Token[]): { [key: string]: Token } {
  return list.reduce((acc, item) => {
    // @ts-ignore
    acc[item.address] = item;
    return acc;
  }, {});
}

const useTokens = ({ config, opts }: DefaultHookTypes): IUseTokens => {
  const TOKEN_KEY = "tokens";

  const [localStorageTokenList, setLocalStorageTokenList] = useLocalStorage<
    Token[]
  >(TOKEN_KEY, []);
  const { data } = useSWRImmutable(
    ["defaultTokenList", localStorageTokenList, config],
    async () => {
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
    },
    {
      ...opts,
    },
  );

  const addNewToken = (token: Token | undefined) => {
    // Indicate that this token is now accepted into the default list of tokens
    const acceptedToken = {
      ...token,
      default: true,
    };

    // Check if the token already exists in tokenList
    if (
      data?.list.some(
        (t) =>
          t.address.toLowerCase() === acceptedToken?.address?.toLowerCase(),
      )
    ) {
      return;
    }

    const updatedData = !token
      ? [...localStorageTokenList]
      : [...localStorageTokenList, acceptedToken as Token];
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

  const beraToken: Token | undefined = useMemo(() => {
    if (!data?.dictionary) return undefined;
    return (data?.dictionary as { [key: string]: Token })[nativeTokenAddress];
  }, [data?.dictionary]);

  const wBeraToken: Token | undefined = useMemo(() => {
    if (!data?.dictionary) return undefined;
    return (data?.dictionary as { [key: string]: Token })[beraTokenAddress];
  }, [data?.dictionary]);

  return {
    tokenList: data?.list ?? [],
    customTokenList: data?.customList ?? [],
    tokenDictionary: data?.dictionary ?? {},
    featuredTokenList: data?.featured ?? [],
    beraToken,
    wBeraToken,
    addNewToken,
    removeToken,
  };
};

export default useTokens;
