/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Weight } from "./berachef";

export const protobufPackage = "berachain.pol.berachef.v1";

/** Params defines the set of params for the berachef module. */
export interface Params {
  /** Default cutting board weights */
  defaultCuttingBoardWeights: Weight[];
}

function createBaseParams(): Params {
  return { defaultCuttingBoardWeights: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.defaultCuttingBoardWeights) {
      Weight.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.defaultCuttingBoardWeights.push(Weight.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      defaultCuttingBoardWeights: Array.isArray(object?.defaultCuttingBoardWeights)
        ? object.defaultCuttingBoardWeights.map((e: any) => Weight.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.defaultCuttingBoardWeights?.length) {
      obj.defaultCuttingBoardWeights = message.defaultCuttingBoardWeights.map((e) => Weight.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.defaultCuttingBoardWeights = object.defaultCuttingBoardWeights?.map((e) => Weight.fromPartial(e)) || [];
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
