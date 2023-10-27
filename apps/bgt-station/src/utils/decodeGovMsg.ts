import { UpdateFriendsOfTheChefRequest } from "@bera/proto/src";
import { hexToBytes } from "viem";

import { updateFriendsOfTheChefTypeUrl } from "~/app/governance/create/useCreateProposal";

interface IMsg {
  typeURL: string;
  value: any;
}
export const decodeGovMsg = (messages: IMsg[]) => {
  const returnObj: any = [];
  messages.forEach((msg) => {
    if (msg.typeURL === updateFriendsOfTheChefTypeUrl) {
      const decoded = UpdateFriendsOfTheChefRequest.decode(
        hexToBytes(msg.value),
      );
      returnObj.push(decoded);
    }
  });

  return returnObj;
};
