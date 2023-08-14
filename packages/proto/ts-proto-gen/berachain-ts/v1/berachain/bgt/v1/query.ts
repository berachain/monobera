/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Bribe } from "./bribe";
import { Params } from "./params";

export const protobufPackage = "berachain.bgt.v1";

/** BribeForValidatorRequest is the request type for the Query/BribeForValidator gRPC method. */
export interface BribeForValidatorRequest {
  /** cons_addr is the validator's consensus address. */
  consAddr: string;
  /** start_epoch is the epoch at which the bribe starts. */
  startEpoch: Long;
}

/** BribeForValidatorResponse is the response type for the Query/BribeForValidator gRPC method. */
export interface BribeForValidatorResponse {
  /** bribe is the bribe for the validator. */
  bribe?: Bribe;
}

/** BribesForValidatorRequest is the request type for the Query/BribesForValidator gRPC method. */
export interface BribesForValidatorRequest {
  /** cons_addr is the validator's consensus address. */
  consAddr: string;
  /** start_epoch is the epoch at which the bribe starts. */
  startEpoch: Long;
}

/**
 * BribesForValidatorResponse is the response type for the Query/BribesForValidator
 * gRPC method.
 */
export interface BribesForValidatorResponse {
  /** bribes are the bribes for the validator. */
  bribes: Bribe[];
}

/**
 * ActiveBribesForValidatorRequest is the request type for the Query/ActiveBribesForValidator
 * gRPC method.
 */
export interface ActiveBribesForValidatorRequest {
  /** cons_addr is the validator's consensus address. */
  consAddr: string;
}

/**
 * ActiveBribesForValidatorResponse is the response type for the
 * Query/ActiveBribesForValidator gRPC method.
 */
export interface ActiveBribesForValidatorResponse {
  /** bribes are the active bribes for the validator. */
  bribes: Bribe[];
}

/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequest {}

/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params;
}

function createBaseBribeForValidatorRequest(): BribeForValidatorRequest {
  return { consAddr: "", startEpoch: Long.ZERO };
}

export const BribeForValidatorRequest = {
  encode(
    message: BribeForValidatorRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consAddr !== "") {
      writer.uint32(10).string(message.consAddr);
    }
    if (!message.startEpoch.isZero()) {
      writer.uint32(16).int64(message.startEpoch);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): BribeForValidatorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBribeForValidatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consAddr = reader.string();
          break;
        case 2:
          message.startEpoch = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BribeForValidatorRequest {
    return {
      consAddr: isSet(object.consAddr) ? String(object.consAddr) : "",
      startEpoch: isSet(object.startEpoch)
        ? Long.fromValue(object.startEpoch)
        : Long.ZERO,
    };
  },

  toJSON(message: BribeForValidatorRequest): unknown {
    const obj: any = {};
    message.consAddr !== undefined && (obj.consAddr = message.consAddr);
    message.startEpoch !== undefined &&
      (obj.startEpoch = (message.startEpoch || Long.ZERO).toString());
    return obj;
  },

  create<I extends Exact<DeepPartial<BribeForValidatorRequest>, I>>(
    base?: I,
  ): BribeForValidatorRequest {
    return BribeForValidatorRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BribeForValidatorRequest>, I>>(
    object: I,
  ): BribeForValidatorRequest {
    const message = createBaseBribeForValidatorRequest();
    message.consAddr = object.consAddr ?? "";
    message.startEpoch =
      object.startEpoch !== undefined && object.startEpoch !== null
        ? Long.fromValue(object.startEpoch)
        : Long.ZERO;
    return message;
  },
};

function createBaseBribeForValidatorResponse(): BribeForValidatorResponse {
  return { bribe: undefined };
}

export const BribeForValidatorResponse = {
  encode(
    message: BribeForValidatorResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.bribe !== undefined) {
      Bribe.encode(message.bribe, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): BribeForValidatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBribeForValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bribe = Bribe.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BribeForValidatorResponse {
    return {
      bribe: isSet(object.bribe) ? Bribe.fromJSON(object.bribe) : undefined,
    };
  },

  toJSON(message: BribeForValidatorResponse): unknown {
    const obj: any = {};
    message.bribe !== undefined &&
      (obj.bribe = message.bribe ? Bribe.toJSON(message.bribe) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<BribeForValidatorResponse>, I>>(
    base?: I,
  ): BribeForValidatorResponse {
    return BribeForValidatorResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BribeForValidatorResponse>, I>>(
    object: I,
  ): BribeForValidatorResponse {
    const message = createBaseBribeForValidatorResponse();
    message.bribe =
      object.bribe !== undefined && object.bribe !== null
        ? Bribe.fromPartial(object.bribe)
        : undefined;
    return message;
  },
};

function createBaseBribesForValidatorRequest(): BribesForValidatorRequest {
  return { consAddr: "", startEpoch: Long.ZERO };
}

export const BribesForValidatorRequest = {
  encode(
    message: BribesForValidatorRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consAddr !== "") {
      writer.uint32(10).string(message.consAddr);
    }
    if (!message.startEpoch.isZero()) {
      writer.uint32(16).int64(message.startEpoch);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): BribesForValidatorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBribesForValidatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consAddr = reader.string();
          break;
        case 2:
          message.startEpoch = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BribesForValidatorRequest {
    return {
      consAddr: isSet(object.consAddr) ? String(object.consAddr) : "",
      startEpoch: isSet(object.startEpoch)
        ? Long.fromValue(object.startEpoch)
        : Long.ZERO,
    };
  },

  toJSON(message: BribesForValidatorRequest): unknown {
    const obj: any = {};
    message.consAddr !== undefined && (obj.consAddr = message.consAddr);
    message.startEpoch !== undefined &&
      (obj.startEpoch = (message.startEpoch || Long.ZERO).toString());
    return obj;
  },

  create<I extends Exact<DeepPartial<BribesForValidatorRequest>, I>>(
    base?: I,
  ): BribesForValidatorRequest {
    return BribesForValidatorRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BribesForValidatorRequest>, I>>(
    object: I,
  ): BribesForValidatorRequest {
    const message = createBaseBribesForValidatorRequest();
    message.consAddr = object.consAddr ?? "";
    message.startEpoch =
      object.startEpoch !== undefined && object.startEpoch !== null
        ? Long.fromValue(object.startEpoch)
        : Long.ZERO;
    return message;
  },
};

function createBaseBribesForValidatorResponse(): BribesForValidatorResponse {
  return { bribes: [] };
}

export const BribesForValidatorResponse = {
  encode(
    message: BribesForValidatorResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.bribes) {
      Bribe.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): BribesForValidatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBribesForValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bribes.push(Bribe.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BribesForValidatorResponse {
    return {
      bribes: Array.isArray(object?.bribes)
        ? object.bribes.map((e: any) => Bribe.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BribesForValidatorResponse): unknown {
    const obj: any = {};
    if (message.bribes) {
      obj.bribes = message.bribes.map((e) => (e ? Bribe.toJSON(e) : undefined));
    } else {
      obj.bribes = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BribesForValidatorResponse>, I>>(
    base?: I,
  ): BribesForValidatorResponse {
    return BribesForValidatorResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BribesForValidatorResponse>, I>>(
    object: I,
  ): BribesForValidatorResponse {
    const message = createBaseBribesForValidatorResponse();
    message.bribes = object.bribes?.map((e) => Bribe.fromPartial(e)) || [];
    return message;
  },
};

function createBaseActiveBribesForValidatorRequest(): ActiveBribesForValidatorRequest {
  return { consAddr: "" };
}

export const ActiveBribesForValidatorRequest = {
  encode(
    message: ActiveBribesForValidatorRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consAddr !== "") {
      writer.uint32(10).string(message.consAddr);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ActiveBribesForValidatorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveBribesForValidatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActiveBribesForValidatorRequest {
    return { consAddr: isSet(object.consAddr) ? String(object.consAddr) : "" };
  },

  toJSON(message: ActiveBribesForValidatorRequest): unknown {
    const obj: any = {};
    message.consAddr !== undefined && (obj.consAddr = message.consAddr);
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveBribesForValidatorRequest>, I>>(
    base?: I,
  ): ActiveBribesForValidatorRequest {
    return ActiveBribesForValidatorRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ActiveBribesForValidatorRequest>, I>>(
    object: I,
  ): ActiveBribesForValidatorRequest {
    const message = createBaseActiveBribesForValidatorRequest();
    message.consAddr = object.consAddr ?? "";
    return message;
  },
};

function createBaseActiveBribesForValidatorResponse(): ActiveBribesForValidatorResponse {
  return { bribes: [] };
}

export const ActiveBribesForValidatorResponse = {
  encode(
    message: ActiveBribesForValidatorResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.bribes) {
      Bribe.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ActiveBribesForValidatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveBribesForValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bribes.push(Bribe.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActiveBribesForValidatorResponse {
    return {
      bribes: Array.isArray(object?.bribes)
        ? object.bribes.map((e: any) => Bribe.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ActiveBribesForValidatorResponse): unknown {
    const obj: any = {};
    if (message.bribes) {
      obj.bribes = message.bribes.map((e) => (e ? Bribe.toJSON(e) : undefined));
    } else {
      obj.bribes = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveBribesForValidatorResponse>, I>>(
    base?: I,
  ): ActiveBribesForValidatorResponse {
    return ActiveBribesForValidatorResponse.fromPartial(base ?? {});
  },

  fromPartial<
    I extends Exact<DeepPartial<ActiveBribesForValidatorResponse>, I>,
  >(object: I): ActiveBribesForValidatorResponse {
    const message = createBaseActiveBribesForValidatorResponse();
    message.bribes = object.bribes?.map((e) => Bribe.fromPartial(e)) || [];
    return message;
  },
};

function createBaseParamsRequest(): ParamsRequest {
  return {};
}

export const ParamsRequest = {
  encode(
    _: ParamsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ParamsRequest {
    return {};
  },

  toJSON(_: ParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ParamsRequest>, I>>(
    base?: I,
  ): ParamsRequest {
    return ParamsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ParamsRequest>, I>>(
    _: I,
  ): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
};

function createBaseParamsResponse(): ParamsResponse {
  return { params: undefined };
}

export const ParamsResponse = {
  encode(
    message: ParamsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: ParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ParamsResponse>, I>>(
    base?: I,
  ): ParamsResponse {
    return ParamsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ParamsResponse>, I>>(
    object: I,
  ): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

/** QueryService defines the gRPC querier service for distribution module. */
export interface QueryService {
  /** Params queries params of the module. */
  Params(request: ParamsRequest): Promise<ParamsResponse>;
  /** BribeForValidator queries a bribe for a validator. */
  BribeForValidator(
    request: BribeForValidatorRequest,
  ): Promise<BribeForValidatorResponse>;
  /** BribesForValidator queries bribes for a validator. */
  BribesForValidator(
    request: BribesForValidatorRequest,
  ): Promise<BribesForValidatorResponse>;
  /** ActiveBribesForValidator queries active bribes for a validator. */
  ActiveBribesForValidator(
    request: ActiveBribesForValidatorRequest,
  ): Promise<ActiveBribesForValidatorResponse>;
}

export class QueryServiceClientImpl implements QueryService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "berachain.bgt.v1.QueryService";
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.BribeForValidator = this.BribeForValidator.bind(this);
    this.BribesForValidator = this.BribesForValidator.bind(this);
    this.ActiveBribesForValidator = this.ActiveBribesForValidator.bind(this);
  }
  Params(request: ParamsRequest): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => ParamsResponse.decode(new _m0.Reader(data)));
  }

  BribeForValidator(
    request: BribeForValidatorRequest,
  ): Promise<BribeForValidatorResponse> {
    const data = BribeForValidatorRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BribeForValidator", data);
    return promise.then((data) =>
      BribeForValidatorResponse.decode(new _m0.Reader(data)),
    );
  }

  BribesForValidator(
    request: BribesForValidatorRequest,
  ): Promise<BribesForValidatorResponse> {
    const data = BribesForValidatorRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BribesForValidator", data);
    return promise.then((data) =>
      BribesForValidatorResponse.decode(new _m0.Reader(data)),
    );
  }

  ActiveBribesForValidator(
    request: ActiveBribesForValidatorRequest,
  ): Promise<ActiveBribesForValidatorResponse> {
    const data = ActiveBribesForValidatorRequest.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      "ActiveBribesForValidator",
      data,
    );
    return promise.then((data) =>
      ActiveBribesForValidatorResponse.decode(new _m0.Reader(data)),
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
