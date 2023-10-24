/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "berachain.common.v1";

export enum ServingStatus {
  UNKNOWN = 0,
  SERVING = 1,
  NOT_SERVING = 2,
  /** SERVICE_UNKNOWN - Used only by the Watch method. */
  SERVICE_UNKNOWN = 3,
  UNRECOGNIZED = -1,
}

export function servingStatusFromJSON(object: any): ServingStatus {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ServingStatus.UNKNOWN;
    case 1:
    case "SERVING":
      return ServingStatus.SERVING;
    case 2:
    case "NOT_SERVING":
      return ServingStatus.NOT_SERVING;
    case 3:
    case "SERVICE_UNKNOWN":
      return ServingStatus.SERVICE_UNKNOWN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ServingStatus.UNRECOGNIZED;
  }
}

export function servingStatusToJSON(object: ServingStatus): string {
  switch (object) {
    case ServingStatus.UNKNOWN:
      return "UNKNOWN";
    case ServingStatus.SERVING:
      return "SERVING";
    case ServingStatus.NOT_SERVING:
      return "NOT_SERVING";
    case ServingStatus.SERVICE_UNKNOWN:
      return "SERVICE_UNKNOWN";
    case ServingStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface HealthServiceCheckRequest {
  service: string;
}

export interface HealthServiceCheckResponse {
  status: ServingStatus;
}

function createBaseHealthServiceCheckRequest(): HealthServiceCheckRequest {
  return { service: "" };
}

export const HealthServiceCheckRequest = {
  encode(message: HealthServiceCheckRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.service !== "") {
      writer.uint32(10).string(message.service);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HealthServiceCheckRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHealthServiceCheckRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.service = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HealthServiceCheckRequest {
    return { service: isSet(object.service) ? String(object.service) : "" };
  },

  toJSON(message: HealthServiceCheckRequest): unknown {
    const obj: any = {};
    if (message.service !== "") {
      obj.service = message.service;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HealthServiceCheckRequest>, I>>(base?: I): HealthServiceCheckRequest {
    return HealthServiceCheckRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HealthServiceCheckRequest>, I>>(object: I): HealthServiceCheckRequest {
    const message = createBaseHealthServiceCheckRequest();
    message.service = object.service ?? "";
    return message;
  },
};

function createBaseHealthServiceCheckResponse(): HealthServiceCheckResponse {
  return { status: 0 };
}

export const HealthServiceCheckResponse = {
  encode(message: HealthServiceCheckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HealthServiceCheckResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHealthServiceCheckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HealthServiceCheckResponse {
    return { status: isSet(object.status) ? servingStatusFromJSON(object.status) : 0 };
  },

  toJSON(message: HealthServiceCheckResponse): unknown {
    const obj: any = {};
    if (message.status !== 0) {
      obj.status = servingStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HealthServiceCheckResponse>, I>>(base?: I): HealthServiceCheckResponse {
    return HealthServiceCheckResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HealthServiceCheckResponse>, I>>(object: I): HealthServiceCheckResponse {
    const message = createBaseHealthServiceCheckResponse();
    message.status = object.status ?? 0;
    return message;
  },
};

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
