import { jsonRpcUrl, nativeTokenAddress } from "@bera/config";
import useSWR from "swr";
import { formatUnits, getAddress, parseUnits, toHex, type Address } from "viem";

import POLLING from "~/config/constants/polling";
import { laggy } from "~/hooks/laggy";


export interface MappedTokens {
  [key: string]: number;
}

const handleNativeBera = (token: Address) => {
  if (token === getAddress(process.env.NEXT_PUBLIC_BERA_ADDRESS as string)) {
    return getAddress(process.env.NEXT_PUBLIC_WBERA_ADDRESS as string);
  }
  return token;
};

export const getSwap = async (
  tokenIn: Address,
  tokenOut: Address,
  tokenInDecimals: number,
  tokenOutDecimals: number,
  swapType: number,
  amount: string,
) => {
  if (amount === "0") {
    return {
      batchSwapSteps: [],
      formattedSwapAmount: amount.toString(),
      formattedAmountIn: "0",
      formattedReturnAmount: "0",
      returnAmount: 0n,
      tokenIn,
      tokenOut,
    };
  }
  try {
    const type = "given_in";
    // const parsedAmount = parseUnits(
    //   amount,
    //   type === "given_in" ? tokenInDecimals ?? 18 : tokenOutDecimals ?? 18,
    // );

    const rpcRequest = {
      jsonrpc: "2.0",
      method: "eth_routeDexSwap",
      params: [
        handleNativeBera(tokenIn), //wbera
        handleNativeBera(tokenOut), //usdc
        toHex(parseUnits(`${amount}`, tokenInDecimals)),
        type,
        "latest",
      ],
      id: 1, // You can set this to any unique value to correlate with the response.
    };

    console.log(rpcRequest);
    // Fetch options for the POST request
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rpcRequest),
    };
    // const response = await fetch(
    //   `${
    //     process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
    //   }/dex/route?quote_asset=${tokenOut}&base_asset=${tokenIn}&amount=${parseUnits(
    //     `${amount}`,
    //     18,
    //   )}&swap_type=${type}`,
    // );


    const response = await fetch(jsonRpcUrl, fetchOptions);

    let result = await response.json();
    result = result.result;
    if (!result.steps)
      return {
        batchSwapSteps: [],
        formattedSwapAmount: amount.toString(),
        formattedAmountIn: "0",
        formattedReturnAmount: "0",
        returnAmount: 0n,
        tokenIn,
        tokenOut,
      };

    const batchSwapSteps: BatchSwapStep[] = result.steps.map((step: any) => {
      return {
        poolId: step.pool,
        assetIn: step.asset_in,
        amountIn: BigInt(step.amount_in),
        assetOut: step.asset_out,
        amountOut: BigInt(step.amount_out),
        userData: "",
      };
    });

    // console.log(batchSwapSteps);
    if (getAddress(tokenIn) === getAddress(nativeTokenAddress)) {
      if (batchSwapSteps[0]) {
        batchSwapSteps[0].assetIn = nativeTokenAddress as Address;
        batchSwapSteps[0].value = batchSwapSteps[0].amountIn;
      }
    }

    // if (
    //   tokenOut === getAddress(process.env.NEXT_PUBLIC_WBERA_ADDRESS as string)
    // ) {
    //   const lastStep = batchSwapSteps.length - 1;
    //   if (
    //     batchSwapSteps !== undefined &&
    //     batchSwapSteps[lastStep] !== undefined
    //   ) {
    //     // @ts-ignore
    //     batchSwapSteps[lastStep].assetOut = process.env
    //       .NEXT_PUBLIC_BERA_ADDRESS as Address;
    //     // batchSwapSteps[0].value = batchSwapSteps[0].amountIn;
    //   }
    // }
    const swapInfo = {
      batchSwapSteps: batchSwapSteps,
      formattedSwapAmount: amount.toString(),
      formattedAmountIn: formatUnits(
        BigInt(result.steps[0].amount_in),
        tokenInDecimals ?? 18,
      ),
      formattedReturnAmount: formatUnits(
        BigInt(result.steps[result.steps.length - 1].amount_out),
        tokenOutDecimals ?? 18,
      ),
      returnAmount: BigInt(result.steps[result.steps.length - 1].amount_out),
      tokenIn,
      tokenOut,
    };

    return swapInfo;
  } catch (e) {
    console.error(e);
    return {
      batchSwapSteps: [],
      formattedSwapAmount: amount.toString(),
      formattedAmountIn: "0",
      formattedReturnAmount: "0",
      returnAmount: 0n,
      tokenIn,
      tokenOut,
    };
  }
};

interface IUsePollSwaps {
  tokenIn: Address;
  tokenOut: Address;
  tokenInDecimals: number;
  tokenOutDecimals: number;
  swapKind: number;
  amount: string;
}

export interface SwapInfoV2 {
  batchSwapSteps: BatchSwapStep[];
  formattedSwapAmount: string;
  formattedReturnAmount: string;
  formattedAmountIn: string;
  returnAmount: bigint;
  tokenIn: string;
  tokenOut: string;
}

export const usePollSwaps = ({
  tokenIn,
  tokenOut,
  tokenInDecimals,
  tokenOutDecimals,
  swapKind,
  amount,
}: IUsePollSwaps) => {
  const QUERY_KEY = [tokenIn, tokenOut, swapKind, amount];
  return useSWR<SwapInfoV2 | undefined>(
    QUERY_KEY,
    async () => {
      try {
        const result = await getSwap(
          tokenIn,
          tokenOut,
          tokenInDecimals,
          tokenOutDecimals,
          swapKind,
          amount,
        );
        return result;
      } catch (e) {
        // console.log(e);
        // TODO: throws so many errors but this is good 4 debug
        console.error(e);
        return {
          batchSwapSteps: [],
          formattedSwapAmount: amount.toString(),
          formattedAmountIn: "0",
          formattedReturnAmount: "0",
          returnAmount: 0n,
          tokenIn,
          tokenOut,
        };
      }
    },
    {
      refreshInterval: POLLING.FAST,
      use: [laggy],
    },
  );
};

interface BatchSwapStep {
  poolId: Address;
  assetIn: Address;
  amountIn: bigint;
  assetOut: Address;
  amountOut: bigint;
  userData: string;
  value?: bigint;
}
// export const getSwap = async (
//   tokenIn: Address,
//   tokenOut: Address,
//   swapType: number,
//   amount: number,
// ) => {
//   try {
//     const type = swapType === 0 ? "given_in" : "given_out";

//     const rpcRequest = {
//       jsonrpc: "2.0",
//       method: "eth_routeDexSwap",
//       params: [
//         tokenOut,
//         tokenIn,
//         parseUnits(
//           `${amount}`,
//           18,
//         ).toString(),
//         type
//       ],
//       id: 1 // You can set this to any unique value to correlate with the response.
//     };

//     // Fetch options for the POST request
//     const fetchOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(rpcRequest)
//     };
//     // const response = await fetch(
//     //   `${
//     //     process.env.NEXT_PUBLIC_INDEXER_ENDPOINT
//     //   }/dex/route?quote_asset=${tokenOut}&base_asset=${tokenIn}&amount=${parseUnits(
//     //     `${amount}`,
//     //     18,
//     //   )}&swap_type=${type}`,
//     // );

//     const response = await fetch(jsonRpcUrl, fetchOptions);

//     const result = await response.json();
//     console.log(result)
//     if (!result.steps)
//       return {
//         batchSwapSteps: [],
//         formattedSwapAmount: amount.toString(),
//         formattedReturnAmount: "0",
//         tokenIn,
//         tokenOut,
//       };

//     const batchSwapSteps: BatchSwapStep[] = result.steps.map((step: any) => {
//       return {
//         poolId: step.pool,
//         assetIn: step.assetIn,
//         amountIn: BigInt(step.amountIn),
//         assetOut: step.assetOut,
//         amountOut: step.amountOut,
//         userData: "",
//       };
//     });
//     const swapInfo = {
//       batchSwapSteps: batchSwapSteps,
//       formattedSwapAmount: amount.toString(),
//       formattedReturnAmount: formatUnits(
//         BigInt(result.steps[result.steps.length - 1].amountOut),
//         18,
//       ),
//       tokenIn,
//       tokenOut,
//     };
//     return swapInfo;
//   } catch (e) {
//     return {
//       batchSwapSteps: [],
//       formattedSwapAmount: amount.toString(),
//       formattedReturnAmount: "0",
//       tokenIn,
//       tokenOut,
//     };
//   }
// };
