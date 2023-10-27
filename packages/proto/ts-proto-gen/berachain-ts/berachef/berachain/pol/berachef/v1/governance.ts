/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Params } from "./params";

export const protobufPackage = "berachain.pol.berachef.v1";

/**
 * UpdateFriendsOfTheChefRequest defines the request structure for executing a
 * UpdateFriendsOfTheChef message.
 */
export interface UpdateFriendsOfTheChefRequest {
  /** authority is the address of the governance account. */
  authority: string;
  /** receiver_address is the hex address of the receiver. */
  receiverAddress: string;
  /** friendOfTheChef defines if the address is whitelisted. */
  friendOfTheChef: boolean;
}

/**
 * UpdateFriendsOfTheChefResponse defines the response structure for executing a
 * UpdateFriendsOfTheChefRequest message.
 */
export interface UpdateFriendsOfTheChefResponse {}

/** UpdateParamsRequest defines a Msg for updating the x/feemarket module parameters. */
export interface UpdateParamsRequest {
  /** authority is the address of the governance account. */
  authority: string;
  /**
   * params defines the x/feemarket parameters to update.
   * NOTE: All parameters must be supplied.
   */
  params?: Params | undefined;
}

/**
 * UpdateParamsResponse defines the response structure for executing a
 * UpdateParamsRequest message.
 */
export interface UpdateParamsResponse {}

function createBaseUpdateFriendsOfTheChefRequest(): UpdateFriendsOfTheChefRequest {
  return { authority: "", receiverAddress: "", friendOfTheChef: false };
}

export const UpdateFriendsOfTheChefRequest = {
  encode(
    message: UpdateFriendsOfTheChefRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.receiverAddress !== "") {
      writer.uint32(26).string(message.receiverAddress);
    }
    if (message.friendOfTheChef === true) {
      writer.uint32(32).bool(message.friendOfTheChef);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): UpdateFriendsOfTheChefRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateFriendsOfTheChefRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.receiverAddress = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.friendOfTheChef = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateFriendsOfTheChefRequest {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      receiverAddress: isSet(object.receiverAddress)
        ? String(object.receiverAddress)
        : "",
      friendOfTheChef: isSet(object.friendOfTheChef)
        ? Boolean(object.friendOfTheChef)
        : false,
    };
  },

  toJSON(message: UpdateFriendsOfTheChefRequest): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.receiverAddress !== "") {
      obj.receiverAddress = message.receiverAddress;
    }
    if (message.friendOfTheChef === true) {
      obj.friendOfTheChef = message.friendOfTheChef;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateFriendsOfTheChefRequest>, I>>(
    base?: I,
  ): UpdateFriendsOfTheChefRequest {
    return UpdateFriendsOfTheChefRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateFriendsOfTheChefRequest>, I>>(
    object: I,
  ): UpdateFriendsOfTheChefRequest {
    const message = createBaseUpdateFriendsOfTheChefRequest();
    message.authority = object.authority ?? "";
    message.receiverAddress = object.receiverAddress ?? "";
    message.friendOfTheChef = object.friendOfTheChef ?? false;
    return message;
  },
};

function createBaseUpdateFriendsOfTheChefResponse(): UpdateFriendsOfTheChefResponse {
  return {};
}

export const UpdateFriendsOfTheChefResponse = {
  encode(
    _: UpdateFriendsOfTheChefResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): UpdateFriendsOfTheChefResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateFriendsOfTheChefResponse();
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

  fromJSON(_: any): UpdateFriendsOfTheChefResponse {
    return {};
  },

  toJSON(_: UpdateFriendsOfTheChefResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateFriendsOfTheChefResponse>, I>>(
    base?: I,
  ): UpdateFriendsOfTheChefResponse {
    return UpdateFriendsOfTheChefResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateFriendsOfTheChefResponse>, I>>(
    _: I,
  ): UpdateFriendsOfTheChefResponse {
    const message = createBaseUpdateFriendsOfTheChefResponse();
    return message;
  },
};

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
