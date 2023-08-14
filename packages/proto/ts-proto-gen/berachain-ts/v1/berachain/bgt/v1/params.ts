/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "berachain.bgt.v1";

/** Params defines the set of parameters for the bgt module. */
export interface Params {
  /**
   * BribeCommissionRate is the rate at which the operator will receive a commission for accepting bribes.
   * The rate is expressed as a decimal, for example 0.1% = 0.001.
   */
  bribeCommissionRate: string;
  /**
   * BribeFee is the fee that must be paid by a validator when creating a bribe request.
   * The fee is expressed as an array of coins.
   */
  bribeFee: Coin[];
}

function createBaseParams(): Params {
  return { bribeCommissionRate: "", bribeFee: [] };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.bribeCommissionRate !== "") {
      writer.uint32(10).string(message.bribeCommissionRate);
    }
    for (const v of message.bribeFee) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bribeCommissionRate = reader.string();
          break;
        case 5:
          message.bribeFee.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      bribeCommissionRate: isSet(object.bribeCommissionRate)
        ? String(object.bribeCommissionRate)
        : "",
      bribeFee: Array.isArray(object?.bribeFee)
        ? object.bribeFee.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.bribeCommissionRate !== undefined &&
      (obj.bribeCommissionRate = message.bribeCommissionRate);
    if (message.bribeFee) {
      obj.bribeFee = message.bribeFee.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.bribeFee = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.bribeCommissionRate = object.bribeCommissionRate ?? "";
    message.bribeFee = object.bribeFee?.map((e) => Coin.fromPartial(e)) || [];
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
