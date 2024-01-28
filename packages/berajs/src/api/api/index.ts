import axios from "axios";

import { isProduction } from "~/api/utils/isProduction";

export const MAINNET_RPC_URLS = [
  "https://bsc-dataseed1.ninicoin.io",
  "https://bsc-dataseed1.defibit.io",
  "https://bsc-dataseed.binance.org",
];

export const TESTNET_RPC_URLS = ["https://rpc.flashbots.net"];

export const TESTNET_AXIOS = axios.create({
  baseURL: "http://localhost:26654/",
  timeout: 1000,
});

export const MAINNET_AXIOS = axios.create({
  baseURL: "http://localhost:26654/",
  timeout: 1000,
});

export const TESTNET_TRPC = "http://localhost:26657";

export const MAINNET_TRPC = "http://localhost:26657";

export const getRpc = () => {
  const rpcUrls = isProduction() ? MAINNET_RPC_URLS : TESTNET_RPC_URLS;
  return getHealthyRpc(rpcUrls, 0)
    .then((result: any) => {
      return result;
    })
    .catch(() => {
      return rpcUrls[0];
    });
};

const getHealthyRpc: any = async (rpcUrls: string[], depth: number) => {
  try {
    const response = await fetch(rpcUrls[depth] as RequestInfo | URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "net_version",
        params: [],
        id: 67,
      }),
    });

    const { result } = await response.json();

    if (result) {
      return rpcUrls[depth];
    }
    return "";
  } catch (err) {
    if (depth < rpcUrls.length) {
      return getHealthyRpc(rpcUrls, depth + 1);
    }
  }

  return "";
};

export const getAxiosInstance = () => {
  if (isProduction()) return MAINNET_AXIOS;
  return TESTNET_AXIOS;
};

export const getTrpc = () => {
  if (isProduction()) return MAINNET_TRPC;
  return TESTNET_TRPC;
};

export async function fetchBlockNumber(nodeUrl: string): Promise<number> {
  const blockNum = await fetch(nodeUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_blockNumber",
      params: [],
      id: "app-blockNum-sub", // Arbitary string (see JSON-RPC spec)
    }),
  })
    .then(async (response) => {
      return response?.json();
    })
    .then((json) => json?.result)
    .then(parseInt)
    .catch(console.error);
  if (!blockNum || isNaN(blockNum)) {
    return -1;
  }
  return blockNum;
}
