import { ethToBera, useBeraJs } from "@bera/berajs";
import { MsgSubmitProposal } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/tx";
import { bytesToHex, parseUnits } from "viem";

import { stakingToken } from "~/config";

export const useCreateProposal = () => {
  const { account } = useBeraJs();

  const createPayload = (value: any) => {
    const initalDepostAmount = parseUnits(value.initialDeposit, 18).toString();

    const msg = MsgSubmitProposal.fromPartial({
      title: value.title,
      summary: value.description,
      messages: [],
      proposer: ethToBera(account ?? ""),
      metadata: value.title,
      initialDeposit: [
        {
          denom: stakingToken,
          amount: initalDepostAmount,
        },
      ],
    });

    const msgBytes = MsgSubmitProposal.encode(msg).finish();
    const payload = [bytesToHex(msgBytes)];
    return payload as any[];
  };
  return {
    createPayload,
  };
};
