/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Coin } from "../../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "berachain.pol.bribe.v1";

/** Bribe is a message that is used to incentivise validators to propose blocks. */
export interface Bribe {
  /** consensus_address is the address of the validator that is being incentivised. */
  consensusAddress: string;
  /** start_epoch is the epoch at which the bribe starts to be valid. */
  startEpoch: Long;
  /** num_block_proposals is the number of block proposals that the bribe is valid for. */
  numBlockProposals: Long;
  /** num_block_proposals_bribed is the counter of block proposals that have been bribed. */
  numBlockProposalsBribed: Long;
  /** bribe_per_proposal is the amount that will be paid to delegators for each block proposal. */
  bribePerProposal: Coin[];
}

function createBaseBribe(): Bribe {
  return {
    consensusAddress: "",
    startEpoch: Long.UZERO,
    numBlockProposals: Long.UZERO,
    numBlockProposalsBribed: Long.UZERO,
    bribePerProposal: [],
  };
}

export const Bribe = {
  encode(message: Bribe, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.consensusAddress !== "") {
      writer.uint32(10).string(message.consensusAddress);
    }
    if (!message.startEpoch.isZero()) {
      writer.uint32(16).uint64(message.startEpoch);
    }
    if (!message.numBlockProposals.isZero()) {
      writer.uint32(24).uint64(message.numBlockProposals);
    }
    if (!message.numBlockProposalsBribed.isZero()) {
      writer.uint32(32).uint64(message.numBlockProposalsBribed);
    }
    for (const v of message.bribePerProposal) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Bribe {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBribe();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.consensusAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.startEpoch = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.numBlockProposals = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.numBlockProposalsBribed = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.bribePerProposal.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Bribe {
    return {
      consensusAddress: isSet(object.consensusAddress)
        ? String(object.consensusAddress)
        : "",
      startEpoch: isSet(object.startEpoch)
        ? Long.fromValue(object.startEpoch)
        : Long.UZERO,
      numBlockProposals: isSet(object.numBlockProposals)
        ? Long.fromValue(object.numBlockProposals)
        : Long.UZERO,
      numBlockProposalsBribed: isSet(object.numBlockProposalsBribed)
        ? Long.fromValue(object.numBlockProposalsBribed)
        : Long.UZERO,
      bribePerProposal: Array.isArray(object?.bribePerProposal)
        ? object.bribePerProposal.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Bribe): unknown {
    const obj: any = {};
    if (message.consensusAddress !== "") {
      obj.consensusAddress = message.consensusAddress;
    }
    if (!message.startEpoch.isZero()) {
      obj.startEpoch = (message.startEpoch || Long.UZERO).toString();
    }
    if (!message.numBlockProposals.isZero()) {
      obj.numBlockProposals = (
        message.numBlockProposals || Long.UZERO
      ).toString();
    }
    if (!message.numBlockProposalsBribed.isZero()) {
      obj.numBlockProposalsBribed = (
        message.numBlockProposalsBribed || Long.UZERO
      ).toString();
    }
    if (message.bribePerProposal?.length) {
      obj.bribePerProposal = message.bribePerProposal.map((e) =>
        Coin.toJSON(e),
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Bribe>, I>>(base?: I): Bribe {
    return Bribe.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Bribe>, I>>(object: I): Bribe {
    const message = createBaseBribe();
    message.consensusAddress = object.consensusAddress ?? "";
    message.startEpoch =
      object.startEpoch !== undefined && object.startEpoch !== null
        ? Long.fromValue(object.startEpoch)
        : Long.UZERO;
    message.numBlockProposals =
      object.numBlockProposals !== undefined &&
      object.numBlockProposals !== null
        ? Long.fromValue(object.numBlockProposals)
        : Long.UZERO;
    message.numBlockProposalsBribed =
      object.numBlockProposalsBribed !== undefined &&
      object.numBlockProposalsBribed !== null
        ? Long.fromValue(object.numBlockProposalsBribed)
        : Long.UZERO;
    message.bribePerProposal =
      object.bribePerProposal?.map((e) => Coin.fromPartial(e)) || [];
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
