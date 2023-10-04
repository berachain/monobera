import { ethToBera, useBeraJs } from "@bera/berajs";
import { stakingToken } from "@bera/config";
import { MsgSubmitProposal } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/tx";
import { bytesToHex, parseUnits } from "viem";
import { ProposalTypeEnum } from "../types";
import {UpdateFriendsOfTheChefRequest, MsgSend} from "@bera/proto/src"
import { Any } from "@bera/proto/ts-proto-gen/cosmos-ts/google/protobuf/any";

const gaugeProposalTypeUrl = "berachain.pol.berachef.v1"

export const useCreateProposal = () => {
  const { account } = useBeraJs();

  const createPayload = (value: any, type: ProposalTypeEnum) => {
    console.log(value)
    const initalDepostAmount = parseUnits(value.initialDeposit, 18).toString();


    let messages = []
    if(type === ProposalTypeEnum.GAUGE_PROPOSAL) {
      // const gaugeMsg = UpdateFriendsOfTheChefRequest.encode({
      //   // authority: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS as string,
      //   authority: '',
      //   receiverAddress: value.gaugeAddress,
      //   friendOfTheChef: value.enableOrDisable
      // })
      // console.log(gaugeMsg)



      // const gaugeMsgAny = Any.fromPartial({
      //   typeUrl: gaugeProposalTypeUrl,
      //   value: gaugeMsg.finish()
      // })

      const gaugeMsg = MsgSend.encode({
      fromAddress: 'polar1yrene6g2zwjttemf0c65fscg8w8c55w5vhc9hd',
      toAddress: 'polar1yrene6g2zwjttemf0c65fscg8w8c55w5vhc9hd',
      amount: [{
        amount: '1000000',
        denom: 'abgt'
      }]})
      

      const gaugeMsgAny = Any.fromPartial({
        typeUrl: 'cosmos.bank.v1beta1',
        value: gaugeMsg.finish()
      })

      messages.push(gaugeMsgAny)
    }

    console.log(messages)

    const msg = MsgSubmitProposal.fromPartial({
      title: value.title,
      summary: value.description,
      messages: messages,
      proposer: ethToBera(account ?? ""),
      metadata: value.title,
      initialDeposit: [
        {
          denom: stakingToken,
          amount: initalDepostAmount,
        },
      ],
      expedited: value.expedite
    });

    const msgBytes = MsgSubmitProposal.encode(msg).finish();
    const payload = [bytesToHex(msgBytes)];
    return payload as any[];
  };
  return {
    createPayload,
  };
};
