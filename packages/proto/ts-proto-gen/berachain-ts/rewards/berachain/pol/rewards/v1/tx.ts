/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { Params } from "./distributions";

export const protobufPackage = "berachain.pol.rewards.v1";

/** UpdateParamsRequest defines a message for updating the rewards module parameters. */
export interface UpdateParamsRequest {
  /** authority is the address of the governance account. */
  authority: string;
  /** Params defines the parameters to be updated. */
  params?: Params | undefined;
}

/** UpdateParamsResponse defines a message for updating the rewards module parameters. */
export interface UpdateParamsResponse {}

/** WithdrawDepositorRewardRequest defines a message for withdrawing the rewards of a depositor. */
export interface WithdrawDepositorRewardRequest {
  /** depositor_address is the address of the account. */
  depositorAddress: string;
  /** receiver_address is the address for which the rewards were distributed to. */
  receiverAddress: string;
  /** withdraw_address is the address that the rewards will be sent to on withdraw. */
  withdrawAddress: string;
  /** amount is the amount to withdrawl */
  amount: string;
}

/** WithdrawDepositorRewardResponse defines a message for withdrawing the rewards of a depositor. */
export interface WithdrawDepositorRewardResponse {
  /** rewards is the sdk.Coins being withdrawn. */
  rewards: Coin[];
}

function createBaseUpdateParamsRequest(): UpdateParamsRequest {
  return { authority: "", params: undefined };
}

export const UpdateParamsRequest = {
  encode(
    message: UpdateParamsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateParamsRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateParamsRequest {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: UpdateParamsRequest): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateParamsRequest>, I>>(
    base?: I,
  ): UpdateParamsRequest {
    return UpdateParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateParamsRequest>, I>>(
    object: I,
  ): UpdateParamsRequest {
    const message = createBaseUpdateParamsRequest();
    message.authority = object.authority ?? "";
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseUpdateParamsResponse(): UpdateParamsResponse {
  return {};
}

export const UpdateParamsResponse = {
  encode(
    _: UpdateParamsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): UpdateParamsResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): UpdateParamsResponse {
    return {};
  },

  toJSON(_: UpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateParamsResponse>, I>>(
    base?: I,
  ): UpdateParamsResponse {
    return UpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateParamsResponse>, I>>(
    _: I,
  ): UpdateParamsResponse {
    const message = createBaseUpdateParamsResponse();
    return message;
  },
};

function createBaseWithdrawDepositorRewardRequest(): WithdrawDepositorRewardRequest {
  return {
    depositorAddress: "",
    receiverAddress: "",
    withdrawAddress: "",
    amount: "",
  };
}

export const WithdrawDepositorRewardRequest = {
  encode(
    message: WithdrawDepositorRewardRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.depositorAddress !== "") {
      writer.uint32(10).string(message.depositorAddress);
    }
    if (message.receiverAddress !== "") {
      writer.uint32(18).string(message.receiverAddress);
    }
    if (message.withdrawAddress !== "") {
      writer.uint32(26).string(message.withdrawAddress);
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): WithdrawDepositorRewardRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawDepositorRewardRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.depositorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.receiverAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.withdrawAddress = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.amount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WithdrawDepositorRewardRequest {
    return {
      depositorAddress: isSet(object.depositorAddress)
        ? String(object.depositorAddress)
        : "",
      receiverAddress: isSet(object.receiverAddress)
        ? String(object.receiverAddress)
        : "",
      withdrawAddress: isSet(object.withdrawAddress)
        ? String(object.withdrawAddress)
        : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
    };
  },

  toJSON(message: WithdrawDepositorRewardRequest): unknown {
    const obj: any = {};
    if (message.depositorAddress !== "") {
      obj.depositorAddress = message.depositorAddress;
    }
    if (message.receiverAddress !== "") {
      obj.receiverAddress = message.receiverAddress;
    }
    if (message.withdrawAddress !== "") {
      obj.withdrawAddress = message.withdrawAddress;
    }
    if (message.amount !== "") {
      obj.amount = message.amount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WithdrawDepositorRewardRequest>, I>>(
    base?: I,
  ): WithdrawDepositorRewardRequest {
    return WithdrawDepositorRewardRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WithdrawDepositorRewardRequest>, I>>(
    object: I,
  ): WithdrawDepositorRewardRequest {
    const message = createBaseWithdrawDepositorRewardRequest();
    message.depositorAddress = object.depositorAddress ?? "";
    message.receiverAddress = object.receiverAddress ?? "";
    message.withdrawAddress = object.withdrawAddress ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseWithdrawDepositorRewardResponse(): WithdrawDepositorRewardResponse {
  return { rewards: [] };
}

export const WithdrawDepositorRewardResponse = {
  encode(
    message: WithdrawDepositorRewardResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.rewards) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): WithdrawDepositorRewardResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawDepositorRewardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rewards.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WithdrawDepositorRewardResponse {
    return {
      rewards: Array.isArray(object?.rewards)
        ? object.rewards.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WithdrawDepositorRewardResponse): unknown {
    const obj: any = {};
    if (message.rewards?.length) {
      obj.rewards = message.rewards.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WithdrawDepositorRewardResponse>, I>>(
    base?: I,
  ): WithdrawDepositorRewardResponse {
    return WithdrawDepositorRewardResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WithdrawDepositorRewardResponse>, I>>(
    object: I,
  ): WithdrawDepositorRewardResponse {
    const message = createBaseWithdrawDepositorRewardResponse();
    message.rewards = object.rewards?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

/** MsgService defines the rewards Msg service. */
export interface MsgService {
  /** UpdateParams defines a method for updating the rewards module parameters. */
  UpdateParams(request: UpdateParamsRequest): Promise<UpdateParamsResponse>;
  /** WithdrawDepositorReward defines a method for withdrawing the rewards of a depositor. */
  WithdrawDepositorReward(
    request: WithdrawDepositorRewardRequest,
  ): Promise<WithdrawDepositorRewardResponse>;
}

export const MsgServiceServiceName = "berachain.pol.rewards.v1.MsgService";
export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceServiceName;
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.WithdrawDepositorReward = this.WithdrawDepositorReward.bind(this);
  }
  UpdateParams(request: UpdateParamsRequest): Promise<UpdateParamsResponse> {
    const data = UpdateParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) =>
      UpdateParamsResponse.decode(_m0.Reader.create(data)),
    );
  }

  WithdrawDepositorReward(
    request: WithdrawDepositorRewardRequest,
  ): Promise<WithdrawDepositorRewardResponse> {
    const data = WithdrawDepositorRewardRequest.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      "WithdrawDepositorReward",
      data,
    );
    return promise.then((data) =>
      WithdrawDepositorRewardResponse.decode(_m0.Reader.create(data)),
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
