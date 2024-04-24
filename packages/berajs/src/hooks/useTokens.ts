import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";

import {
  DefaultHookOptions,
  DefaultHookReturnType,
  useBeraJs,
  type Token,
} from "..";
import { GetTokens, getTokens } from "../actions/dex";

export interface IUseTokens extends DefaultHookReturnType<GetTokens> {
  addNewToken: (token: Token | undefined) => void;
  removeToken: (token: Token) => void;
}

export const useTokens = (options?: DefaultHookOptions): IUseTokens => {
  const TOKEN_KEY = "tokens";

  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;

  const [localStorageTokenList, setLocalStorageTokenList] = useLocalStorage<
    Token[]
  >(TOKEN_KEY, []);
  const swrResponse = useSWRImmutable<GetTokens>(
    ["defaultTokenList", localStorageTokenList, config],
    async () => {
      return getTokens({ localStorageTokenList, config });
    },
    {
      ...options?.opts,
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
      swrResponse.data?.tokenList?.some(
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

  return {
    ...swrResponse,
    addNewToken,
    removeToken,
  };
};
