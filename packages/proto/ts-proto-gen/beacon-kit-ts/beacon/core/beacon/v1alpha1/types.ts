/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "core.beacon.v1alpha1";

/** Validator is response type for the Query/Params RPC method. */
export interface Validator {
  index: Long;
  name: string;
  description: string;
  pubkey: string;
  consensus_power: Long;
  last_proposed_block: string;
}

/** PayloadBuilder represents. */
export interface PayloadBuilder {
  coinbase: string;
}

function createBaseValidator(): Validator {
  return {
    index: Long.UZERO,
    name: "",
    description: "",
    pubkey: "",
    consensus_power: Long.UZERO,
    last_proposed_block: "",
  };
}

export const Validator = {
  encode(message: Validator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.index.isZero()) {
      writer.uint32(8).uint64(message.index);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.pubkey !== "") {
      writer.uint32(34).string(message.pubkey);
    }
    if (!message.consensus_power.isZero()) {
      writer.uint32(40).uint64(message.consensus_power);
    }
    if (message.last_proposed_block !== "") {
      writer.uint32(50).string(message.last_proposed_block);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.index = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pubkey = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.consensus_power = reader.uint64() as Long;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.last_proposed_block = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Validator {
    return {
      index: isSet(object.index) ? Long.fromValue(object.index) : Long.UZERO,
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      pubkey: isSet(object.pubkey) ? String(object.pubkey) : "",
      consensus_power: isSet(object.consensus_power) ? Long.fromValue(object.consensus_power) : Long.UZERO,
      last_proposed_block: isSet(object.last_proposed_block) ? String(object.last_proposed_block) : "",
    };
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    if (!message.index.isZero()) {
      obj.index = (message.index || Long.UZERO).toString();
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.pubkey !== "") {
      obj.pubkey = message.pubkey;
    }
    if (!message.consensus_power.isZero()) {
      obj.consensus_power = (message.consensus_power || Long.UZERO).toString();
    }
    if (message.last_proposed_block !== "") {
      obj.last_proposed_block = message.last_proposed_block;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Validator>, I>>(base?: I): Validator {
    return Validator.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Validator>, I>>(object: I): Validator {
    const message = createBaseValidator();
    message.index = (object.index !== undefined && object.index !== null) ? Long.fromValue(object.index) : Long.UZERO;
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.pubkey = object.pubkey ?? "";
    message.consensus_power = (object.consensus_power !== undefined && object.consensus_power !== null)
      ? Long.fromValue(object.consensus_power)
      : Long.UZERO;
    message.last_proposed_block = object.last_proposed_block ?? "";
    return message;
  },
};

function createBasePayloadBuilder(): PayloadBuilder {
  return { coinbase: "" };
}

export const PayloadBuilder = {
  encode(message: PayloadBuilder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.coinbase !== "") {
      writer.uint32(10).string(message.coinbase);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PayloadBuilder {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayloadBuilder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.coinbase = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PayloadBuilder {
    return { coinbase: isSet(object.coinbase) ? String(object.coinbase) : "" };
  },

  toJSON(message: PayloadBuilder): unknown {
    const obj: any = {};
    if (message.coinbase !== "") {
      obj.coinbase = message.coinbase;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PayloadBuilder>, I>>(base?: I): PayloadBuilder {
    return PayloadBuilder.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PayloadBuilder>, I>>(object: I): PayloadBuilder {
    const message = createBasePayloadBuilder();
    message.coinbase = object.coinbase ?? "";
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
