import { UpdateFriendsOfTheChefRequest } from "../ts-proto-gen/berachain-ts/berachef/berachain/pol/berachef/v1/governance";
import {
  Exchangeable,
  Params as HoneyParams,
  UpdateParamsRequest,
} from "../ts-proto-gen/berachain-ts/v1/berachain/honey/v1/tx";
import { Any } from "../ts-proto-gen/cosmos-ts/google/protobuf/any";

export * from "../ts-proto-gen/perps/v1/berachain/backend/v1/structs";

export { UpdateParamsRequest, HoneyParams, Exchangeable };
export { UpdateFriendsOfTheChefRequest };
export { Any };

export {Validator as ValidatorV2 } from "../ts-proto-gen/beacon-kit-ts/beacon/core/beacon/v1alpha1/types"