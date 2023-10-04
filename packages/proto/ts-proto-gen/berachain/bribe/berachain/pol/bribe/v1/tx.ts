/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Bribe } from "./bribe";
import { Params } from "./params";

export const protobufPackage = "berachain.pol.bribe.v1";

/** CreateBribeRequest defines the Msg/CreateBribe request type. */
export interface CreateBribeRequest {
  /** caller is the address of the creator of the bribe. */
  caller: string;
  /** operator is the address of the operator of the validator. */
  operator: string;
  /** bribe is the bribe to be created. */
  bribe?: Bribe | undefined;
}

/** CreateBribeResponse defines the Msg/CreateBribe response type. */
export interface CreateBribeResponse {
}

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

/** UpdateParamsResponse defines a Msg for updating the x/feemarket module parameters. */
export interface UpdateParamsResponse {
}

function createBaseCreateBribeRequest(): CreateBribeRequest {
  return { caller: "", operator: "", bribe: undefined };
}

export const CreateBribeRequest = {
  encode(message: CreateBribeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.caller !== "") {
      writer.uint32(10).string(message.caller);
    }
    if (message.operator !== "") {
      writer.uint32(18).string(message.operator);
    }
    if (message.bribe !== undefined) {
      Bribe.encode(message.bribe, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateBribeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateBribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.caller = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.operator = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bribe = Bribe.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateBribeRequest {
    return {
      caller: isSet(object.caller) ? String(object.caller) : "",
      operator: isSet(object.operator) ? String(object.operator) : "",
      bribe: isSet(object.bribe) ? Bribe.fromJSON(object.bribe) : undefined,
    };
  },

  toJSON(message: CreateBribeRequest): unknown {
    const obj: any = {};
    if (message.caller !== "") {
      obj.caller = message.caller;
    }
    if (message.operator !== "") {
      obj.operator = message.operator;
    }
    if (message.bribe !== undefined) {
      obj.bribe = Bribe.toJSON(message.bribe);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateBribeRequest>, I>>(base?: I): CreateBribeRequest {
    return CreateBribeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateBribeRequest>, I>>(object: I): CreateBribeRequest {
    const message = createBaseCreateBribeRequest();
    message.caller = object.caller ?? "";
    message.operator = object.operator ?? "";
    message.bribe = (object.bribe !== undefined && object.bribe !== null) ? Bribe.fromPartial(object.bribe) : undefined;
    return message;
  },
};

function createBaseCreateBribeResponse(): CreateBribeResponse {
  return {};
}

export const CreateBribeResponse = {
  encode(_: CreateBribeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateBribeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateBribeResponse();
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

  fromJSON(_: any): CreateBribeResponse {
    return {};
  },

  toJSON(_: CreateBribeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateBribeResponse>, I>>(base?: I): CreateBribeResponse {
    return CreateBribeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateBribeResponse>, I>>(_: I): CreateBribeResponse {
    const message = createBaseCreateBribeResponse();
    return message;
  },
};

function createBaseUpdateParamsRequest(): UpdateParamsRequest {
  return { authority: "", params: undefined };
}

export const UpdateParamsRequest = {
  encode(message: UpdateParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  create<I extends Exact<DeepPartial<UpdateParamsRequest>, I>>(base?: I): UpdateParamsRequest {
    return UpdateParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateParamsRequest>, I>>(object: I): UpdateParamsRequest {
    const message = createBaseUpdateParamsRequest();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseUpdateParamsResponse(): UpdateParamsResponse {
  return {};
}

export const UpdateParamsResponse = {
  encode(_: UpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  create<I extends Exact<DeepPartial<UpdateParamsResponse>, I>>(base?: I): UpdateParamsResponse {
    return UpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateParamsResponse>, I>>(_: I): UpdateParamsResponse {
    const message = createBaseUpdateParamsResponse();
    return message;
  },
};

/** MsgService defines the bribe Msg service. */
export interface MsgService {
  /** CreateBribe defines a method for creating a bribe. */
  CreateBribe(request: CreateBribeRequest): Promise<CreateBribeResponse>;
  /** UpdatesParams defines a method for updating the module params. */
  UpdateParams(request: UpdateParamsRequest): Promise<UpdateParamsResponse>;
}

export const MsgServiceServiceName = "berachain.pol.bribe.v1.MsgService";
export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceServiceName;
    this.rpc = rpc;
    this.CreateBribe = this.CreateBribe.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  CreateBribe(request: CreateBribeRequest): Promise<CreateBribeResponse> {
    const data = CreateBribeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateBribe", data);
    return promise.then((data) => CreateBribeResponse.decode(_m0.Reader.create(data)));
  }

  UpdateParams(request: UpdateParamsRequest): Promise<UpdateParamsResponse> {
    const data = UpdateParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => UpdateParamsResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
