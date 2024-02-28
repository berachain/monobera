import { useBeraJs, usePollDenom } from "@bera/berajs";
import { governanceAuthority, stakingToken } from "@bera/config";
import {
  UpdateFriendsOfTheChefRequest,
  UpdateParamsRequest,
} from "@bera/proto/src";
import { parseUnits } from "viem";
import { toHex } from "viem";

interface VoteValues {
  description: string;
  expedite: boolean;
  initialDeposit: string;
  title: string;
  gaugeAddress?: string;
  enableOrDisableGauge?: boolean;
  collateralAddress?: string;
  mintRate?: `${number}`;
  redemptionRate?: `${number}`;
}

export const updateFriendsOfTheChefTypeUrl =
  "/berachain.pol.berachef.v1.UpdateFriendsOfTheChefRequest";

export const updateHoneyCollateralTypeUrl =
  "/berachain.honey.v1.UpdateParamsRequest";

export const updateLendMarkeyTypeUrl =
  "/berachain.honey.v1.UpdateParamsRequest";

export const useCreateProposal = () => {
  const { account } = useBeraJs();
  const { getDenom } = usePollDenom();

  const createPayload = async (value: VoteValues) => {
    const initalDepostAmount = parseUnits(
      value.initialDeposit === "" ? "0" : value.initialDeposit,
      18,
    );

    const msgPayload: {
      typeURL: string;
      value: any;
    }[] = [];

    if (value.gaugeAddress && value.enableOrDisableGauge) {
      const friendOfTheChef = {
        authority: governanceAuthority,
        receiverAddress: value.gaugeAddress,
        friendOfTheChef: value.enableOrDisableGauge,
      };
      const friendsOfTheChefMsg =
        UpdateFriendsOfTheChefRequest.encode(friendOfTheChef);
      const friendsOfTheChefAnyMsg = {
        typeURL: updateFriendsOfTheChefTypeUrl,
        value: toHex(friendsOfTheChefMsg.finish()),
      };
      msgPayload.push(friendsOfTheChefAnyMsg);
    } else if (value.collateralAddress) {
      const denom = await getDenom(value.collateralAddress as `0x${string}`);
      const honeyCollateral: UpdateParamsRequest = {
        authority: governanceAuthority,
        params: {
          psmDenoms: [
            {
              denom: (denom ?? "") as string,
              enabled: true,
              mintRate: (Number(value.mintRate) / 100).toString(),
              redemptionRate: (Number(value.redemptionRate) / 100).toString(),
            },
          ],
        },
      };
      const honeyCollateralMsg = UpdateParamsRequest.encode(honeyCollateral);
      const honeyCollateralAnyMsg = {
        typeURL: updateHoneyCollateralTypeUrl,
        value: toHex(honeyCollateralMsg.finish()),
      };
      msgPayload.push(honeyCollateralAnyMsg);
    }
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
    return payload as any[];
  };
  return {
    createPayload,
  };
};
