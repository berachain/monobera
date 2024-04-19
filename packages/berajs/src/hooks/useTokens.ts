import { useMemo } from "react";
import { beraTokenAddress, nativeTokenAddress } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";

import { DefaultHookTypes, type Token } from "..";
import { getTokens } from "../actions/dex";

interface IUseTokens {
  isLoading: boolean;
  tokenList?: Token[] | undefined;
  customTokenList?: Token[] | undefined;
  tokenDictionary?: { [key: string]: Token } | undefined;
  featuredTokenList?: Token[] | undefined;
  beraToken?: Token | undefined;
  wBeraToken?: Token | undefined;
  addNewToken: (token: Token | undefined) => void;
  removeToken: (token: Token) => void;
}

const useTokens = ({ config, opts }: DefaultHookTypes): IUseTokens => {
  const TOKEN_KEY = "tokens";

  const [localStorageTokenList, setLocalStorageTokenList] = useLocalStorage<
    Token[]
  >(TOKEN_KEY, []);
  const { data, isLoading } = useSWRImmutable(
    ["defaultTokenList", localStorageTokenList, config],
    async () => {
      return getTokens({ localStorageTokenList, config });
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
        (t: { address: string }) =>
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
    isLoading: isLoading,
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
