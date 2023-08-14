/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "berachain.bic.v1";

/** Params defines the set of params for the bic module. */
export interface Params {
  /** expected blocks per year */
  blocksPerYear: Long;
  /** community_tax is the tax rate of the foundation tax pool */
  communityTax: string;
  /** foundation_bech32 address is the address where the foundation tax is sent */
  foundationBech32: string;
}

function createBaseParams(): Params {
  return { blocksPerYear: Long.UZERO, communityTax: "", foundationBech32: "" };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.blocksPerYear.isZero()) {
      writer.uint32(8).uint64(message.blocksPerYear);
    }
    if (message.communityTax !== "") {
      writer.uint32(18).string(message.communityTax);
    }
    if (message.foundationBech32 !== "") {
      writer.uint32(26).string(message.foundationBech32);
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
          message.blocksPerYear = reader.uint64() as Long;
          break;
        case 2:
          message.communityTax = reader.string();
          break;
        case 3:
          message.foundationBech32 = reader.string();
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
      blocksPerYear: isSet(object.blocksPerYear)
        ? Long.fromValue(object.blocksPerYear)
        : Long.UZERO,
      communityTax: isSet(object.communityTax)
        ? String(object.communityTax)
        : "",
      foundationBech32: isSet(object.foundationBech32)
        ? String(object.foundationBech32)
        : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.blocksPerYear !== undefined &&
      (obj.blocksPerYear = (message.blocksPerYear || Long.UZERO).toString());
    message.communityTax !== undefined &&
      (obj.communityTax = message.communityTax);
    message.foundationBech32 !== undefined &&
      (obj.foundationBech32 = message.foundationBech32);
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.blocksPerYear =
      object.blocksPerYear !== undefined && object.blocksPerYear !== null
        ? Long.fromValue(object.blocksPerYear)
        : Long.UZERO;
    message.communityTax = object.communityTax ?? "";
    message.foundationBech32 = object.foundationBech32 ?? "";
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
