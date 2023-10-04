/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "berachain.pol.bgt.v1";

/** RedeemBgtRequest defines a Msg for redeeming BGT for Bera. */
export interface RedeemBgtRequest {
  /** from is the account address that will burn the BGT. */
  from: string;
  /** receiver is the account address that will get the Bera. */
  receiver: string;
  /** bgt_burned is the amount that will be paid to delegators for each block proposal. */
  bgtBurned: Coin[];
}

/** RedeemBgtResponse defines the message response for a RedeemBgtRequest. */
export interface RedeemBgtResponse {
  /** recieved_bera is the amount that will be paid to delegators for each block proposal. */
  recievedBera: Coin[];
}

function createBaseRedeemBgtRequest(): RedeemBgtRequest {
  return { from: "", receiver: "", bgtBurned: [] };
}

export const RedeemBgtRequest = {
  encode(message: RedeemBgtRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    for (const v of message.bgtBurned) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedeemBgtRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedeemBgtRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.from = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.receiver = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bgtBurned.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RedeemBgtRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      bgtBurned: Array.isArray(object?.bgtBurned) ? object.bgtBurned.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: RedeemBgtRequest): unknown {
    const obj: any = {};
    if (message.from !== "") {
      obj.from = message.from;
    }
    if (message.receiver !== "") {
      obj.receiver = message.receiver;
    }
    if (message.bgtBurned?.length) {
      obj.bgtBurned = message.bgtBurned.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RedeemBgtRequest>, I>>(base?: I): RedeemBgtRequest {
    return RedeemBgtRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RedeemBgtRequest>, I>>(object: I): RedeemBgtRequest {
    const message = createBaseRedeemBgtRequest();
    message.from = object.from ?? "";
    message.receiver = object.receiver ?? "";
    message.bgtBurned = object.bgtBurned?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRedeemBgtResponse(): RedeemBgtResponse {
  return { recievedBera: [] };
}

export const RedeemBgtResponse = {
  encode(message: RedeemBgtResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.recievedBera) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedeemBgtResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedeemBgtResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.recievedBera.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RedeemBgtResponse {
    return {
      recievedBera: Array.isArray(object?.recievedBera) ? object.recievedBera.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: RedeemBgtResponse): unknown {
    const obj: any = {};
    if (message.recievedBera?.length) {
      obj.recievedBera = message.recievedBera.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RedeemBgtResponse>, I>>(base?: I): RedeemBgtResponse {
    return RedeemBgtResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RedeemBgtResponse>, I>>(object: I): RedeemBgtResponse {
    const message = createBaseRedeemBgtResponse();
    message.recievedBera = object.recievedBera?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

/** Msg defines the bgt Msg service. */
export interface MsgService {
  /** RedeemBgtForBera defines a method for redeeming BGT for Bera */
  RedeemBgt(request: RedeemBgtRequest): Promise<RedeemBgtResponse>;
}

export const MsgServiceServiceName = "berachain.pol.bgt.v1.MsgService";
export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceServiceName;
    this.rpc = rpc;
    this.RedeemBgt = this.RedeemBgt.bind(this);
  }
  RedeemBgt(request: RedeemBgtRequest): Promise<RedeemBgtResponse> {
    const data = RedeemBgtRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RedeemBgt", data);
    return promise.then((data) => RedeemBgtResponse.decode(_m0.Reader.create(data)));
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
