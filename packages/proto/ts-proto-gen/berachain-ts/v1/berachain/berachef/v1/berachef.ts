/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "berachain.berachef.v1";

/** CuttingBoard defines the cutting board of a validator. */
export interface CuttingBoard {
  /** The consensus address corresponding to the validator of this cutting board. */
  consAddr: string;
  /** The weights of the cutting board. */
  weights: Weight[];
  /** The epoch this cutting board begins at. */
  startEpoch: Long;
}

/** Weight defines the weight of a receiver. */
export interface Weight {
  /** The address of the receiver that this weight is for. */
  receiverAddress: string;
  /** The fraction of rewards going to this receiver. */
  percentage: string;
}

function createBaseCuttingBoard(): CuttingBoard {
  return { consAddr: "", weights: [], startEpoch: Long.ZERO };
}

export const CuttingBoard = {
  encode(
    message: CuttingBoard,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consAddr !== "") {
      writer.uint32(10).string(message.consAddr);
    }
    for (const v of message.weights) {
      Weight.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (!message.startEpoch.isZero()) {
      writer.uint32(24).int64(message.startEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CuttingBoard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCuttingBoard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consAddr = reader.string();
          break;
        case 2:
          message.weights.push(Weight.decode(reader, reader.uint32()));
          break;
        case 3:
          message.startEpoch = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CuttingBoard {
    return {
      consAddr: isSet(object.consAddr) ? String(object.consAddr) : "",
      weights: Array.isArray(object?.weights)
        ? object.weights.map((e: any) => Weight.fromJSON(e))
        : [],
      startEpoch: isSet(object.startEpoch)
        ? Long.fromValue(object.startEpoch)
        : Long.ZERO,
    };
  },

  toJSON(message: CuttingBoard): unknown {
    const obj: any = {};
    message.consAddr !== undefined && (obj.consAddr = message.consAddr);
    if (message.weights) {
      obj.weights = message.weights.map((e) =>
        e ? Weight.toJSON(e) : undefined,
      );
    } else {
      obj.weights = [];
    }
    message.startEpoch !== undefined &&
      (obj.startEpoch = (message.startEpoch || Long.ZERO).toString());
    return obj;
  },

  create<I extends Exact<DeepPartial<CuttingBoard>, I>>(
    base?: I,
  ): CuttingBoard {
    return CuttingBoard.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CuttingBoard>, I>>(
    object: I,
  ): CuttingBoard {
    const message = createBaseCuttingBoard();
    message.consAddr = object.consAddr ?? "";
    message.weights = object.weights?.map((e) => Weight.fromPartial(e)) || [];
    message.startEpoch =
      object.startEpoch !== undefined && object.startEpoch !== null
        ? Long.fromValue(object.startEpoch)
        : Long.ZERO;
    return message;
  },
};

function createBaseWeight(): Weight {
  return { receiverAddress: "", percentage: "" };
}

export const Weight = {
  encode(
    message: Weight,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.receiverAddress !== "") {
      writer.uint32(10).string(message.receiverAddress);
    }
    if (message.percentage !== "") {
      writer.uint32(18).string(message.percentage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Weight {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.receiverAddress = reader.string();
          break;
        case 2:
          message.percentage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Weight {
    return {
      receiverAddress: isSet(object.receiverAddress)
        ? String(object.receiverAddress)
        : "",
      percentage: isSet(object.percentage) ? String(object.percentage) : "",
    };
  },

  toJSON(message: Weight): unknown {
    const obj: any = {};
    message.receiverAddress !== undefined &&
      (obj.receiverAddress = message.receiverAddress);
    message.percentage !== undefined && (obj.percentage = message.percentage);
    return obj;
  },

  create<I extends Exact<DeepPartial<Weight>, I>>(base?: I): Weight {
    return Weight.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Weight>, I>>(object: I): Weight {
    const message = createBaseWeight();
    message.receiverAddress = object.receiverAddress ?? "";
    message.percentage = object.percentage ?? "";
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
