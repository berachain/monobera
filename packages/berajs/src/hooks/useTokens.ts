"use client";

import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";

import { type Token } from "~/api";
import POLLING from "~/config/constants/polling";

interface IUseTokens {
  tokenList: Token[] | undefined;
  addNewToken: (token: Token) => void;
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

      if (!temp.tokens) return localStorageTokenList;
      const defaultList = temp.tokens.map((token: any) => {
        return { ...token, default: true };
      });
      return [...defaultList, ...localStorageTokenList];
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
    if (
      localStorageTokenList.some((t) => t.address === acceptedToken.address)
    ) {
      return;
    }

    const updatedData = [...localStorageTokenList, acceptedToken];
    setLocalStorageTokenList(updatedData);
    // Update config data and store it in localStorage
  };

  return {
    tokenList: data,
    addNewToken,
  };
};

export default useTokens;
