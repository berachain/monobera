/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "berachain.bgt.v1";

/** Bribe is a bribe that is paid out to voters when a validator produces a block. */
export interface Bribe {
  /** ConsAddr is the consensus address of the validator. */
  consAddr: string;
  /**
   * StartEpoch is the Epoch in which this bribe starts paying out. If Epoch >
   * StartingEpoch Then all type Bribes are paid out in parallel.
   */
  startEpoch: Long;
  /**
   * NumBlockProposals is the number of blocks at which when the consensus
   * address is the proposer and voters will be paid out from their active
   * bribes.
   */
  numBlockProposals: Long;
  /**
   * RemainingBlockProposals is the number of blockproposals remaining to be
   * rewarded.
   */
  remainingBlockProposals: Long;
  /**
   * ReleasePerProposal is the total amount of coins that shall be released to
   * voters every time a block proposal is made from this validator.
   */
  releasePerProposal: Coin[];
}

function createBaseBribe(): Bribe {
  return {
    consAddr: "",
    startEpoch: Long.ZERO,
    numBlockProposals: Long.UZERO,
    remainingBlockProposals: Long.UZERO,
    releasePerProposal: [],
  };
}

export const Bribe = {
  encode(message: Bribe, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.consAddr !== "") {
      writer.uint32(10).string(message.consAddr);
    }
    if (!message.startEpoch.isZero()) {
      writer.uint32(16).int64(message.startEpoch);
    }
    if (!message.numBlockProposals.isZero()) {
      writer.uint32(24).uint64(message.numBlockProposals);
    }
    if (!message.remainingBlockProposals.isZero()) {
      writer.uint32(32).uint64(message.remainingBlockProposals);
    }
    for (const v of message.releasePerProposal) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Bribe {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBribe();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consAddr = reader.string();
          break;
        case 2:
          message.startEpoch = reader.int64() as Long;
          break;
        case 3:
          message.numBlockProposals = reader.uint64() as Long;
          break;
        case 4:
          message.remainingBlockProposals = reader.uint64() as Long;
          break;
        case 5:
          message.releasePerProposal.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bribe {
    return {
      consAddr: isSet(object.consAddr) ? String(object.consAddr) : "",
      startEpoch: isSet(object.startEpoch)
        ? Long.fromValue(object.startEpoch)
        : Long.ZERO,
      numBlockProposals: isSet(object.numBlockProposals)
        ? Long.fromValue(object.numBlockProposals)
        : Long.UZERO,
      remainingBlockProposals: isSet(object.remainingBlockProposals)
        ? Long.fromValue(object.remainingBlockProposals)
        : Long.UZERO,
      releasePerProposal: Array.isArray(object?.releasePerProposal)
        ? object.releasePerProposal.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Bribe): unknown {
    const obj: any = {};
    message.consAddr !== undefined && (obj.consAddr = message.consAddr);
    message.startEpoch !== undefined &&
      (obj.startEpoch = (message.startEpoch || Long.ZERO).toString());
    message.numBlockProposals !== undefined &&
      (obj.numBlockProposals = (
        message.numBlockProposals || Long.UZERO
      ).toString());
    message.remainingBlockProposals !== undefined &&
      (obj.remainingBlockProposals = (
        message.remainingBlockProposals || Long.UZERO
      ).toString());
    if (message.releasePerProposal) {
      obj.releasePerProposal = message.releasePerProposal.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.releasePerProposal = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Bribe>, I>>(base?: I): Bribe {
    return Bribe.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Bribe>, I>>(object: I): Bribe {
    const message = createBaseBribe();
    message.consAddr = object.consAddr ?? "";
    message.startEpoch =
      object.startEpoch !== undefined && object.startEpoch !== null
        ? Long.fromValue(object.startEpoch)
        : Long.ZERO;
    message.numBlockProposals =
      object.numBlockProposals !== undefined &&
      object.numBlockProposals !== null
        ? Long.fromValue(object.numBlockProposals)
        : Long.UZERO;
    message.remainingBlockProposals =
      object.remainingBlockProposals !== undefined &&
      object.remainingBlockProposals !== null
        ? Long.fromValue(object.remainingBlockProposals)
        : Long.UZERO;
    message.releasePerProposal =
      object.releasePerProposal?.map((e) => Coin.fromPartial(e)) || [];
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
