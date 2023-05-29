import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { erc20ABI, usePublicClient } from "wagmi";

import { useBeraJs } from "../../contexts";
import { getContracts } from "../contracts";
import { getTokens, type Token } from "../currency/tokens";

const REFRESH_BLOCK_INTERVAL = 2000;

interface BalanceToken extends Token {
  balance: bigint;
}

interface Call {
  abi: typeof erc20ABI;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const usePollAssetWalletBalance = () => {
  const publicClient = usePublicClient();
  const { mutate } = useSWRConfig();
  const { account, error } = useBeraJs();
  useSWR(
    [account, "assetWalletBalances"],
    async () => {
      if (account && !error) {
        const assetList: Token[] = getTokens();

        const call: Call[] = assetList.map((item: Token) => ({
          address: item.address as `0x${string}`,
          abi: erc20ABI,
          functionName: "balanceOf(address)",
          args: [account],
        }));
        const contracts = getContracts();
        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: contracts.multicall as `0x${string}`,
        });
        const balances = await Promise.all(
          result.map(async (item: any, index: number) => {
            const token = assetList[index];
            if (item.error) {
              await mutate([account, token?.address, "assetWalletBalances"], {
                balance: 0,
                ...token,
              });
              return { balance: 0, ...token };
            }

            await mutate(
              [account, token?.address, "assetWalletBalances"],
              item.result,
            );
            return {
              ...token,
              balance: item.result,
            };
          }),
        );

        return balances;
      }

      return undefined;
    },
    {
      refreshInterval: REFRESH_BLOCK_INTERVAL,
    },
  );
};

export const useCurrentAssetWalletBalances = (): BalanceToken[] => {
  const { account } = useBeraJs();

  const { data: assetWalletBalances = undefined } = useSWRImmutable([
    account,
    "assetWalletBalances",
  ]);
  return assetWalletBalances;
};

export const useSelectedAssetWalletBalance = (
  address: string,
): BalanceToken => {
  const { account } = useBeraJs();

  const { data: assetWalletBalances = undefined } = useSWRImmutable([
    account,
    address,
    "assetWalletBalances",
  ]);
  return assetWalletBalances;
};
