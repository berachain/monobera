import axios from "axios";

import { type BaseAccount } from "./types";

const getBaseAccount = async (
  url: string,
  bech32Address: string | undefined,
): Promise<BaseAccount> => {
  const endpoint = axios.create({
    baseURL: url,
  });

  // TODO: replace with eth_getPendingNonce JSONRPC
  const accountInfo: BaseAccount = await endpoint
    .get(`/cosmos/auth/v1beta1/accounts/${bech32Address ?? ""}`)
    .then((response) => response.data.account);
  return accountInfo;
};

export default getBaseAccount;
