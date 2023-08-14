/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { EpochInfo } from "./genesis";

export const protobufPackage = "berachain.epochs.v1";

/** EpochInfosRequest is request for QueryEpochInfos */
export interface EpochInfosRequest {}

/** EpochInfosResponse is response for QueryEpochInfos */
export interface EpochInfosResponse {
  /** epochs is the list of epochInfos */
  epochs: EpochInfo[];
}

/** CurrentEpochRequest is request for QueryCurrentEpoch */
export interface CurrentEpochRequest {
  /** identifier is the identifier of the epoch */
  identifier: string;
}

/** CurrentEpochResponse is response for QueryCurrentEpoch */
export interface CurrentEpochResponse {
  /** current_epoch is the current epoch of the specified identifier */
  currentEpoch: Long;
}

function createBaseEpochInfosRequest(): EpochInfosRequest {
  return {};
}

export const EpochInfosRequest = {
  encode(
    _: EpochInfosRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EpochInfosRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEpochInfosRequest();
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

  fromJSON(_: any): EpochInfosRequest {
    return {};
  },

  toJSON(_: EpochInfosRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<EpochInfosRequest>, I>>(
    base?: I,
  ): EpochInfosRequest {
    return EpochInfosRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EpochInfosRequest>, I>>(
    _: I,
  ): EpochInfosRequest {
    const message = createBaseEpochInfosRequest();
    return message;
  },
};

function createBaseEpochInfosResponse(): EpochInfosResponse {
  return { epochs: [] };
}

export const EpochInfosResponse = {
  encode(
    message: EpochInfosResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.epochs) {
      EpochInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EpochInfosResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEpochInfosResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochs.push(EpochInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EpochInfosResponse {
    return {
      epochs: Array.isArray(object?.epochs)
        ? object.epochs.map((e: any) => EpochInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EpochInfosResponse): unknown {
    const obj: any = {};
    if (message.epochs) {
      obj.epochs = message.epochs.map((e) =>
        e ? EpochInfo.toJSON(e) : undefined,
      );
    } else {
      obj.epochs = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EpochInfosResponse>, I>>(
    base?: I,
  ): EpochInfosResponse {
    return EpochInfosResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EpochInfosResponse>, I>>(
    object: I,
  ): EpochInfosResponse {
    const message = createBaseEpochInfosResponse();
    message.epochs = object.epochs?.map((e) => EpochInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCurrentEpochRequest(): CurrentEpochRequest {
  return { identifier: "" };
}

export const CurrentEpochRequest = {
  encode(
    message: CurrentEpochRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CurrentEpochRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrentEpochRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CurrentEpochRequest {
    return {
      identifier: isSet(object.identifier) ? String(object.identifier) : "",
    };
  },

  toJSON(message: CurrentEpochRequest): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    return obj;
  },

  create<I extends Exact<DeepPartial<CurrentEpochRequest>, I>>(
    base?: I,
  ): CurrentEpochRequest {
    return CurrentEpochRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CurrentEpochRequest>, I>>(
    object: I,
  ): CurrentEpochRequest {
    const message = createBaseCurrentEpochRequest();
    message.identifier = object.identifier ?? "";
    return message;
  },
};

function createBaseCurrentEpochResponse(): CurrentEpochResponse {
  return { currentEpoch: Long.ZERO };
}

export const CurrentEpochResponse = {
  encode(
    message: CurrentEpochResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.currentEpoch.isZero()) {
      writer.uint32(8).int64(message.currentEpoch);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): CurrentEpochResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrentEpochResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentEpoch = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CurrentEpochResponse {
    return {
      currentEpoch: isSet(object.currentEpoch)
        ? Long.fromValue(object.currentEpoch)
        : Long.ZERO,
    };
  },

  toJSON(message: CurrentEpochResponse): unknown {
    const obj: any = {};
    message.currentEpoch !== undefined &&
      (obj.currentEpoch = (message.currentEpoch || Long.ZERO).toString());
    return obj;
  },

  create<I extends Exact<DeepPartial<CurrentEpochResponse>, I>>(
    base?: I,
  ): CurrentEpochResponse {
    return CurrentEpochResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CurrentEpochResponse>, I>>(
    object: I,
  ): CurrentEpochResponse {
    const message = createBaseCurrentEpochResponse();
    message.currentEpoch =
      object.currentEpoch !== undefined && object.currentEpoch !== null
        ? Long.fromValue(object.currentEpoch)
        : Long.ZERO;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface QueryService {
  /** EpochInfos provide running epochInfos */
  EpochInfos(request: EpochInfosRequest): Promise<EpochInfosResponse>;
  /** CurrentEpoch provide current epoch of specified identifier */
  CurrentEpoch(request: CurrentEpochRequest): Promise<CurrentEpochResponse>;
}

export class QueryServiceClientImpl implements QueryService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "berachain.epochs.v1.QueryService";
    this.rpc = rpc;
    this.EpochInfos = this.EpochInfos.bind(this);
    this.CurrentEpoch = this.CurrentEpoch.bind(this);
  }
  EpochInfos(request: EpochInfosRequest): Promise<EpochInfosResponse> {
    const data = EpochInfosRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EpochInfos", data);
    return promise.then((data) =>
      EpochInfosResponse.decode(new _m0.Reader(data)),
    );
  }

  CurrentEpoch(request: CurrentEpochRequest): Promise<CurrentEpochResponse> {
    const data = CurrentEpochRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CurrentEpoch", data);
    return promise.then((data) =>
      CurrentEpochResponse.decode(new _m0.Reader(data)),
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
