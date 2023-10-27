import { useBeraJs } from "@bera/berajs";
import { stakingToken } from "@bera/config";
import { UpdateFriendsOfTheChefRequest } from "@bera/proto/src";
import { parseUnits, toHex } from "viem";

interface VoteValues {
  description: string;
  expedite: boolean;
  initialDeposit: string;
  title: string;
  gaugeAddress?: string;
  enableOrDisableGauge?: boolean;
}

export const updateFriendsOfTheChefTypeUrl =
  "/berachain.pol.berachef.v1.UpdateFriendsOfTheChefRequest";

export const updateHoneyCollateralTypeUrl =
  "/berachain.honey.v1.UpdateParamsRequest";

export const updateLendMarkeyTypeUrl =
  "/berachain.honey.v1.UpdateParamsRequest";

export const useCreateProposal = () => {
  const { account } = useBeraJs();

  const createPayload = (value: VoteValues) => {
    const initalDepostAmount = parseUnits(
      `${Number(value.initialDeposit)}`,
      18,
    ).toString();

    const msgPayload: {
      typeURL: string;
      value: any;
    }[] = [];

    if (value.gaugeAddress && value.enableOrDisableGauge) {
      const friendOfTheChef = {
        authority: "cosmos10d07y265gmmuvt4z0w9aw880jnsr700j6zn9kn",
        receiverAddress: value.gaugeAddress,
        friendOfTheChef: value.enableOrDisableGauge,
      };

      console.log(friendOfTheChef);
      const friendsOfTheChefMsg =
        UpdateFriendsOfTheChefRequest.encode(friendOfTheChef);

      const friendsOfTheChefAnyMsg = {
        typeURL: updateFriendsOfTheChefTypeUrl,
        value: toHex(friendsOfTheChefMsg.finish()),
      };
      msgPayload.push(friendsOfTheChefAnyMsg);
    }

    // const test = {
    //   authority: "cosmos10d07y265gmmuvt4z0w9aw880jnsr700j6zn9kn",
    //   params: {
    //     sendEnabled: [],
    //     defaultSendEnabled: true
    //   }
    // }

    // console.log(test)
    // const testMsg = MsgUpdateParams.encode(test).finish()

    // const testAnyMsg = {
    //   typeURL: '/cosmos.bank.v1beta1.MsgUpdateParams',
    //   value: toHex(testMsg)
    // }

    // msgPayload.push(testAnyMsg)

    console.log(msgPayload);
    const msg = {
      title: value.title,
      summary: value.description,
      messages: msgPayload,
      proposer: account,
      metadata: value.title,
      initialDeposit: [
        {
          denom: stakingToken,
          amount: initalDepostAmount,
        },
      ],
      expedited: value.expedite,
    };

    const payload = [msg];

    console.log(payload);
    return payload as any[];
  };
  return {
    createPayload,
  };
};
