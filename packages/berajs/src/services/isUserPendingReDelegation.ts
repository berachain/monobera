import axios from "axios";

import { type IReDelegationResponse } from "./types";

const isUserPendingReDelegation = async (
  url: string,
  bech32Address: string,
  validatorSrcAddress: string,
): Promise<boolean> => {
  const endpoint = axios.create({
    baseURL: url,
  });

  const response: IReDelegationResponse[] = await endpoint
    .get(`/cosmos/staking/v1beta1/delegators/${bech32Address}/redelegations`)
    .then((res) => res.data.redelegation_responses);
  const exist = response.find(
    (x: IReDelegationResponse) =>
      x.redelegation.validator_dst_address === validatorSrcAddress,
  );
  return !!exist;
};

export default isUserPendingReDelegation;
