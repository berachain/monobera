import { useEffect, useState } from "react";
import { toDisplayQty, type CrocEnv } from "@bera/beracrocswap-sdk";

import { type TokenIF } from "~/types";

interface PoolPricingPropsIF {
  tokenA: TokenIF;
  tokenB: TokenIF;
  crocEnv?: CrocEnv;
  userAddress: `0x${string}` | undefined;
  lastBlockNumber: number;
}

export function useTokenPairAllowance(props: PoolPricingPropsIF) {
  const { tokenA, tokenB, crocEnv } = props;
  const [tokenAAllowance, setTokenAAllowance] = useState<string>("");
  const [tokenBAllowance, setTokenBAllowance] = useState<string>("");

  const [recheckTokenAApproval, setRecheckTokenAApproval] =
    useState<boolean>(false);
  const [recheckTokenBApproval, setRecheckTokenBApproval] =
    useState<boolean>(false);

  // useEffect to check if user has approved CrocSwap to sell the token A
  useEffect(() => {
    (async () => {
      if (crocEnv && props.userAddress && tokenA.address) {
        try {
          const allowance = await crocEnv
            .token(tokenA.address)
            .allowance(props.userAddress);
          const newTokenAllowance = toDisplayQty(allowance, tokenA.decimals);
          if (tokenAAllowance !== newTokenAllowance) {
            setTokenAAllowance(newTokenAllowance);
          }
        } catch (err) {
          console.warn(err);
        }
        if (recheckTokenAApproval) setRecheckTokenAApproval(false);
      }
    })();
  }, [
    crocEnv,
    tokenA.address,
    tokenA.chainId,
    props.lastBlockNumber,
    props.userAddress,
    recheckTokenAApproval,
  ]);

  // useEffect to check if user has approved CrocSwap to sell the token B
  useEffect(() => {
    (async () => {
      if (crocEnv && props.userAddress && tokenB.address) {
        try {
          const allowance = await crocEnv
            .token(tokenB.address)
            .allowance(props.userAddress);
          const newTokenAllowance = toDisplayQty(allowance, tokenB.decimals);
          if (tokenBAllowance !== newTokenAllowance) {
            setTokenBAllowance(newTokenAllowance);
          }
        } catch (err) {
          console.warn(err);
        }
        if (recheckTokenBApproval) setRecheckTokenBApproval(false);
      }
    })();
  }, [
    crocEnv,
    tokenB.address,
    tokenB.chainId,
    props.lastBlockNumber,
    props.userAddress,
    recheckTokenBApproval,
  ]);

  return {
    tokenAAllowance,
    tokenBAllowance,
    setRecheckTokenAApproval,
    setRecheckTokenBApproval,
  };
}
