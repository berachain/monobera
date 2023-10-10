/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.accounts.v1";

/** AccountQueryRequest is the request type for the Query/AccountQuery RPC */
export interface AccountQueryRequest {
  /** target defines the account to be queried. */
  target: string;
  /** request defines the query message being sent to the account. */
  request: Uint8Array;
}

/** AccountQueryResponse is the response type for the Query/AccountQuery RPC method. */
export interface AccountQueryResponse {
  /** response defines the query response of the account. */
  response: Uint8Array;
}

function createBaseAccountQueryRequest(): AccountQueryRequest {
  return { target: "", request: new Uint8Array(0) };
}

export const AccountQueryRequest = {
  encode(
    message: AccountQueryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.target !== "") {
      writer.uint32(10).string(message.target);
    }
    if (message.request.length !== 0) {
      writer.uint32(18).bytes(message.request);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountQueryRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.target = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.request = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountQueryRequest {
    return {
      target: isSet(object.target) ? String(object.target) : "",
      request: isSet(object.request)
        ? bytesFromBase64(object.request)
        : new Uint8Array(0),
    };
  },

  toJSON(message: AccountQueryRequest): unknown {
    const obj: any = {};
    if (message.target !== "") {
      obj.target = message.target;
    }
    if (message.request.length !== 0) {
      obj.request = base64FromBytes(message.request);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountQueryRequest>, I>>(
    base?: I,
  ): AccountQueryRequest {
    return AccountQueryRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountQueryRequest>, I>>(
    object: I,
  ): AccountQueryRequest {
    const message = createBaseAccountQueryRequest();
    message.target = object.target ?? "";
    message.request = object.request ?? new Uint8Array(0);
    return message;
  },
};

function createBaseAccountQueryResponse(): AccountQueryResponse {
  return { response: new Uint8Array(0) };
}

export const AccountQueryResponse = {
  encode(
    message: AccountQueryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.response.length !== 0) {
      writer.uint32(10).bytes(message.response);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): AccountQueryResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.response = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountQueryResponse {
    return {
      response: isSet(object.response)
        ? bytesFromBase64(object.response)
        : new Uint8Array(0),
    };
  },

  toJSON(message: AccountQueryResponse): unknown {
    const obj: any = {};
    if (message.response.length !== 0) {
      obj.response = base64FromBytes(message.response);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountQueryResponse>, I>>(
    base?: I,
  ): AccountQueryResponse {
    return AccountQueryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountQueryResponse>, I>>(
    object: I,
  ): AccountQueryResponse {
    const message = createBaseAccountQueryResponse();
    message.response = object.response ?? new Uint8Array(0);
    return message;
  },
};

/** Query defines the Query service for the x/accounts module. */
export interface Query {
  /** AccountQuery runs an account query. */
  AccountQuery(request: AccountQueryRequest): Promise<AccountQueryResponse>;
}

export const QueryServiceName = "cosmos.accounts.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.AccountQuery = this.AccountQuery.bind(this);
  }
  AccountQuery(request: AccountQueryRequest): Promise<AccountQueryResponse> {
    const data = AccountQueryRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AccountQuery", data);
    return promise.then((data) =>
      AccountQueryResponse.decode(_m0.Reader.create(data)),
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

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
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
