/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.accounts.v1";

/** MsgInit defines the Create request type for the Msg/Create RPC method. */
export interface MsgInit {
  /** sender is the address of the sender of this message. */
  sender: string;
  /** account_type is the type of the account to be created. */
  accountType: string;
  /**
   * message is the message to be sent to the account, it's up to the account
   * implementation to decide what encoding format should be used to interpret
   * this message.
   */
  message: Uint8Array;
}

/** MsgInitResponse defines the Create response type for the Msg/Create RPC method. */
export interface MsgInitResponse {
  /** account_address is the address of the newly created account. */
  accountAddress: string;
  /** response is the response returned by the account implementation. */
  response: Uint8Array;
}

/** MsgExecute defines the Execute request type for the Msg/Execute RPC method. */
export interface MsgExecute {
  /** sender is the address of the sender of this message. */
  sender: string;
  /** target is the address of the account to be executed. */
  target: string;
  /** message is the message to be sent to the account, it's up to the account */
  message: Uint8Array;
}

/** MsgExecuteResponse defines the Execute response type for the Msg/Execute RPC method. */
export interface MsgExecuteResponse {
  /** response is the response returned by the account implementation. */
  response: Uint8Array;
}

function createBaseMsgInit(): MsgInit {
  return { sender: "", accountType: "", message: new Uint8Array(0) };
}

export const MsgInit = {
  encode(message: MsgInit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.accountType !== "") {
      writer.uint32(18).string(message.accountType);
    }
    if (message.message.length !== 0) {
      writer.uint32(26).bytes(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accountType = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgInit {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      accountType: isSet(object.accountType) ? String(object.accountType) : "",
      message: isSet(object.message) ? bytesFromBase64(object.message) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgInit): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.accountType !== "") {
      obj.accountType = message.accountType;
    }
    if (message.message.length !== 0) {
      obj.message = base64FromBytes(message.message);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgInit>, I>>(base?: I): MsgInit {
    return MsgInit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgInit>, I>>(object: I): MsgInit {
    const message = createBaseMsgInit();
    message.sender = object.sender ?? "";
    message.accountType = object.accountType ?? "";
    message.message = object.message ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgInitResponse(): MsgInitResponse {
  return { accountAddress: "", response: new Uint8Array(0) };
}

export const MsgInitResponse = {
  encode(message: MsgInitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    if (message.response.length !== 0) {
      writer.uint32(18).bytes(message.response);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accountAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): MsgInitResponse {
    return {
      accountAddress: isSet(object.accountAddress) ? String(object.accountAddress) : "",
      response: isSet(object.response) ? bytesFromBase64(object.response) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgInitResponse): unknown {
    const obj: any = {};
    if (message.accountAddress !== "") {
      obj.accountAddress = message.accountAddress;
    }
    if (message.response.length !== 0) {
      obj.response = base64FromBytes(message.response);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgInitResponse>, I>>(base?: I): MsgInitResponse {
    return MsgInitResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgInitResponse>, I>>(object: I): MsgInitResponse {
    const message = createBaseMsgInitResponse();
    message.accountAddress = object.accountAddress ?? "";
    message.response = object.response ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgExecute(): MsgExecute {
  return { sender: "", target: "", message: new Uint8Array(0) };
}

export const MsgExecute = {
  encode(message: MsgExecute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.target !== "") {
      writer.uint32(18).string(message.target);
    }
    if (message.message.length !== 0) {
      writer.uint32(26).bytes(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.target = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecute {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      target: isSet(object.target) ? String(object.target) : "",
      message: isSet(object.message) ? bytesFromBase64(object.message) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgExecute): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.target !== "") {
      obj.target = message.target;
    }
    if (message.message.length !== 0) {
      obj.message = base64FromBytes(message.message);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExecute>, I>>(base?: I): MsgExecute {
    return MsgExecute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExecute>, I>>(object: I): MsgExecute {
    const message = createBaseMsgExecute();
    message.sender = object.sender ?? "";
    message.target = object.target ?? "";
    message.message = object.message ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgExecuteResponse(): MsgExecuteResponse {
  return { response: new Uint8Array(0) };
}

export const MsgExecuteResponse = {
  encode(message: MsgExecuteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.response.length !== 0) {
      writer.uint32(10).bytes(message.response);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteResponse();
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

  fromJSON(object: any): MsgExecuteResponse {
    return { response: isSet(object.response) ? bytesFromBase64(object.response) : new Uint8Array(0) };
  },

  toJSON(message: MsgExecuteResponse): unknown {
    const obj: any = {};
    if (message.response.length !== 0) {
      obj.response = base64FromBytes(message.response);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExecuteResponse>, I>>(base?: I): MsgExecuteResponse {
    return MsgExecuteResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExecuteResponse>, I>>(object: I): MsgExecuteResponse {
    const message = createBaseMsgExecuteResponse();
    message.response = object.response ?? new Uint8Array(0);
    return message;
  },
};

/** Msg defines the Msg service for the x/accounts module. */
export interface Msg {
  /** Init creates a new account in the chain. */
  Init(request: MsgInit): Promise<MsgInitResponse>;
  /** Execute executes a message to the target account. */
  Execute(request: MsgExecute): Promise<MsgExecuteResponse>;
}

export const MsgServiceName = "cosmos.accounts.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.Init = this.Init.bind(this);
    this.Execute = this.Execute.bind(this);
  }
  Init(request: MsgInit): Promise<MsgInitResponse> {
    const data = MsgInit.encode(request).finish();
    const promise = this.rpc.request(this.service, "Init", data);
    return promise.then((data) => MsgInitResponse.decode(_m0.Reader.create(data)));
  }

  Execute(request: MsgExecute): Promise<MsgExecuteResponse> {
    const data = MsgExecute.encode(request).finish();
    const promise = this.rpc.request(this.service, "Execute", data);
    return promise.then((data) => MsgExecuteResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
