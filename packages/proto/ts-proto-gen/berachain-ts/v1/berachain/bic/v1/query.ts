/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Params } from "./params";

export const protobufPackage = "berachain.bic.v1";

/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequest {}

/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params;
}

/** InflaitonRequest is the request type for the Query/Inflation RPC method. */
export interface InflationRequest {}

/**
 * InflationResponse is the response type for the Query/Inflation RPC
 * method.
 */
export interface InflationResponse {
  /** inflation is the current minting inflation value. */
  inflation: Uint8Array;
}

/**
 * AnnualProvisionsRequest is the request type for the
 * Query/AnnualProvisions RPC method.
 */
export interface AnnualProvisionsRequest {}

/**
 * AnnualProvisionsResponse is the response type for the
 * Query/AnnualProvisions RPC method.
 */
export interface AnnualProvisionsResponse {
  /** annual_provisions is the current minting annual provisions value. */
  annualProvisions: Uint8Array;
}

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

function createBaseInflationRequest(): InflationRequest {
  return {};
}

export const InflationRequest = {
  encode(
    _: InflationRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InflationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInflationRequest();
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

  fromJSON(_: any): InflationRequest {
    return {};
  },

  toJSON(_: InflationRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<InflationRequest>, I>>(
    base?: I,
  ): InflationRequest {
    return InflationRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<InflationRequest>, I>>(
    _: I,
  ): InflationRequest {
    const message = createBaseInflationRequest();
    return message;
  },
};

function createBaseInflationResponse(): InflationResponse {
  return { inflation: new Uint8Array() };
}

export const InflationResponse = {
  encode(
    message: InflationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.inflation.length !== 0) {
      writer.uint32(10).bytes(message.inflation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InflationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInflationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inflation = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InflationResponse {
    return {
      inflation: isSet(object.inflation)
        ? bytesFromBase64(object.inflation)
        : new Uint8Array(),
    };
  },

  toJSON(message: InflationResponse): unknown {
    const obj: any = {};
    message.inflation !== undefined &&
      (obj.inflation = base64FromBytes(
        message.inflation !== undefined ? message.inflation : new Uint8Array(),
      ));
    return obj;
  },

  create<I extends Exact<DeepPartial<InflationResponse>, I>>(
    base?: I,
  ): InflationResponse {
    return InflationResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<InflationResponse>, I>>(
    object: I,
  ): InflationResponse {
    const message = createBaseInflationResponse();
    message.inflation = object.inflation ?? new Uint8Array();
    return message;
  },
};

function createBaseAnnualProvisionsRequest(): AnnualProvisionsRequest {
  return {};
}

export const AnnualProvisionsRequest = {
  encode(
    _: AnnualProvisionsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): AnnualProvisionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnnualProvisionsRequest();
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

  fromJSON(_: any): AnnualProvisionsRequest {
    return {};
  },

  toJSON(_: AnnualProvisionsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AnnualProvisionsRequest>, I>>(
    base?: I,
  ): AnnualProvisionsRequest {
    return AnnualProvisionsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AnnualProvisionsRequest>, I>>(
    _: I,
  ): AnnualProvisionsRequest {
    const message = createBaseAnnualProvisionsRequest();
    return message;
  },
};

function createBaseAnnualProvisionsResponse(): AnnualProvisionsResponse {
  return { annualProvisions: new Uint8Array() };
}

export const AnnualProvisionsResponse = {
  encode(
    message: AnnualProvisionsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.annualProvisions.length !== 0) {
      writer.uint32(10).bytes(message.annualProvisions);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): AnnualProvisionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnnualProvisionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.annualProvisions = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AnnualProvisionsResponse {
    return {
      annualProvisions: isSet(object.annualProvisions)
        ? bytesFromBase64(object.annualProvisions)
        : new Uint8Array(),
    };
  },

  toJSON(message: AnnualProvisionsResponse): unknown {
    const obj: any = {};
    message.annualProvisions !== undefined &&
      (obj.annualProvisions = base64FromBytes(
        message.annualProvisions !== undefined
          ? message.annualProvisions
          : new Uint8Array(),
      ));
    return obj;
  },

  create<I extends Exact<DeepPartial<AnnualProvisionsResponse>, I>>(
    base?: I,
  ): AnnualProvisionsResponse {
    return AnnualProvisionsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<AnnualProvisionsResponse>, I>>(
    object: I,
  ): AnnualProvisionsResponse {
    const message = createBaseAnnualProvisionsResponse();
    message.annualProvisions = object.annualProvisions ?? new Uint8Array();
    return message;
  },
};

/** Query defines the gRPC querier service for distribution module. */
export interface QueryService {
  /** Params queries params of the distribution module. */
  Params(request: ParamsRequest): Promise<ParamsResponse>;
  /** Inflation returns the current minting inflation value. */
  Inflation(request: InflationRequest): Promise<InflationResponse>;
  /** AnnualProvisions current minting annual provisions value. */
  AnnualProvisions(
    request: AnnualProvisionsRequest,
  ): Promise<AnnualProvisionsResponse>;
}

export class QueryServiceClientImpl implements QueryService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "berachain.bic.v1.QueryService";
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Inflation = this.Inflation.bind(this);
    this.AnnualProvisions = this.AnnualProvisions.bind(this);
  }
  Params(request: ParamsRequest): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => ParamsResponse.decode(new _m0.Reader(data)));
  }

  Inflation(request: InflationRequest): Promise<InflationResponse> {
    const data = InflationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Inflation", data);
    return promise.then((data) =>
      InflationResponse.decode(new _m0.Reader(data)),
    );
  }

  AnnualProvisions(
    request: AnnualProvisionsRequest,
  ): Promise<AnnualProvisionsResponse> {
    const data = AnnualProvisionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AnnualProvisions", data);
    return promise.then((data) =>
      AnnualProvisionsResponse.decode(new _m0.Reader(data)),
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

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
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
