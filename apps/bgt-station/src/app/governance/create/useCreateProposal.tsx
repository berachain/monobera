import { ethToBera, useBeraJs } from "@bera/berajs";
import { MsgSend } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/bank/v1beta1/tx";
import { MsgSubmitProposal } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/tx";
import { parseUnits } from "viem";
import { bytesToHex } from 'viem'

export const useCreateProposal = () => {
  const { account } = useBeraJs();

  const createPayload = (value: any) => {
    const type = value.type;
    const initalDepostAmount = parseUnits(value.initialDeposit, 18).toString();
    if (type === "community-pool-spend") {
      const msgSend = MsgSend.fromPartial({
        fromAddress: ethToBera(account ?? ""),
        toAddress: value.recipient,
        amount: [
          {
            denom: "abgt",
            amount: parseUnits(value.amount, 18).toString(),
          },
        ],
      });

      const msg = MsgSubmitProposal.fromPartial({
        title: value.title,
        summary: value.description,
        messages: [msgSend ?? {}],
        proposer: ethToBera(account ?? ""),
        metadata: JSON.stringify({
          forumLink: value.forumLink,
        }),
        initialDeposit: [
          {
            denom: "abgt",
            amount: initalDepostAmount,
          },
        ],
      });

      const msgSendBytes = MsgSend.encode(msgSend).finish();
      const msgBytes = MsgSubmitProposal.encode(msg).finish();
      const payload = [bytesToHex(msgBytes), bytesToHex(msgSendBytes)];
      console.log(payload)
      return payload as any[]
    }
  };
  return {
    createPayload
  };
};
