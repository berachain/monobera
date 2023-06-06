"use client";

import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

import { getTokens, type Token } from "~/api";

interface IUseTokens {
  tokenList: Token[];
  addNewToken: (token: Token) => void;
}

const useTokens = (): IUseTokens => {
  const TOKEN_KEY = "tokens";
  const defaultTokens = useMemo(() => getTokens(), []);

  const [localStorageTokenList, setLocalStorageTokenList] = useLocalStorage<
    Token[]
  >(TOKEN_KEY, []);

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
    tokenList: [...defaultTokens, ...localStorageTokenList],
    addNewToken,
  };
};

export default useTokens;
