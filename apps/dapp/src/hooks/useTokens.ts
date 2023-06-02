import { useEffect, useState } from "react";
import { getTokens, type Token } from "@bera/berajs";

interface IUseTokens {
  tokenList: Token[];
  addNewToken: (token: Token) => void;
  removeToken: (token: Token) => void;
}
const useTokens = (): IUseTokens => {
  const TOKEN_KEY = "tokens";
  const defaultTokens = getTokens() as Token[];
  const [tokenList, setTokenList] = useState<Token[]>(defaultTokens);
  useEffect(() => {
    const localStorageDataString = localStorage.getItem(TOKEN_KEY);
    const localStorageData: Token[] = localStorageDataString
      ? JSON.parse(localStorageDataString)
      : [];

    setTokenList((prevData) => prevData.concat(localStorageData));
  }, []);

  const addNewToken = (token: Token) => {
    // Update config data and store it in localStorage
    setTokenList((prevData) => {
      const updatedData = {
        ...prevData,
        ...token,
      };

      localStorage.setItem(TOKEN_KEY, JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const removeToken = (token: Token) => {
    const updatedData = [
      ...tokenList.filter((t) => t.address !== token.address),
    ];
    setTokenList(updatedData);
    localStorage.setItem(TOKEN_KEY, JSON.stringify(updatedData));
  };

  return {
    tokenList,
    addNewToken,
    removeToken,
  };
};

export default useTokens;
