/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { LightBlock, Vote } from "./types";
import { Validator } from "./validator";

export const protobufPackage = "tendermint.types";

export interface Evidence {
  duplicateVoteEvidence?: DuplicateVoteEvidence | undefined;
  lightClientAttackEvidence?: LightClientAttackEvidence | undefined;
}

/** DuplicateVoteEvidence contains evidence of a validator signed two conflicting votes. */
export interface DuplicateVoteEvidence {
  voteA?: Vote | undefined;
  voteB?: Vote | undefined;
  totalVotingPower: Long;
  validatorPower: Long;
  timestamp?: Date | undefined;
}

/** LightClientAttackEvidence contains evidence of a set of validators attempting to mislead a light client. */
export interface LightClientAttackEvidence {
  conflictingBlock?: LightBlock | undefined;
  commonHeight: Long;
  byzantineValidators: Validator[];
  totalVotingPower: Long;
  timestamp?: Date | undefined;
}

export interface EvidenceList {
  evidence: Evidence[];
}

function createBaseEvidence(): Evidence {
  return { duplicateVoteEvidence: undefined, lightClientAttackEvidence: undefined };
}

export const Evidence = {
  encode(message: Evidence, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.duplicateVoteEvidence !== undefined) {
      DuplicateVoteEvidence.encode(message.duplicateVoteEvidence, writer.uint32(10).fork()).ldelim();
    }
    if (message.lightClientAttackEvidence !== undefined) {
      LightClientAttackEvidence.encode(message.lightClientAttackEvidence, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Evidence {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvidence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.duplicateVoteEvidence = DuplicateVoteEvidence.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lightClientAttackEvidence = LightClientAttackEvidence.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Evidence {
    return {
      duplicateVoteEvidence: isSet(object.duplicateVoteEvidence)
        ? DuplicateVoteEvidence.fromJSON(object.duplicateVoteEvidence)
        : undefined,
      lightClientAttackEvidence: isSet(object.lightClientAttackEvidence)
        ? LightClientAttackEvidence.fromJSON(object.lightClientAttackEvidence)
        : undefined,
    };
  },

  toJSON(message: Evidence): unknown {
    const obj: any = {};
    if (message.duplicateVoteEvidence !== undefined) {
      obj.duplicateVoteEvidence = DuplicateVoteEvidence.toJSON(message.duplicateVoteEvidence);
    }
    if (message.lightClientAttackEvidence !== undefined) {
      obj.lightClientAttackEvidence = LightClientAttackEvidence.toJSON(message.lightClientAttackEvidence);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Evidence>, I>>(base?: I): Evidence {
    return Evidence.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Evidence>, I>>(object: I): Evidence {
    const message = createBaseEvidence();
    message.duplicateVoteEvidence =
      (object.duplicateVoteEvidence !== undefined && object.duplicateVoteEvidence !== null)
        ? DuplicateVoteEvidence.fromPartial(object.duplicateVoteEvidence)
        : undefined;
    message.lightClientAttackEvidence =
      (object.lightClientAttackEvidence !== undefined && object.lightClientAttackEvidence !== null)
        ? LightClientAttackEvidence.fromPartial(object.lightClientAttackEvidence)
        : undefined;
    return message;
  },
};

function createBaseDuplicateVoteEvidence(): DuplicateVoteEvidence {
  return {
    voteA: undefined,
    voteB: undefined,
    totalVotingPower: Long.ZERO,
    validatorPower: Long.ZERO,
    timestamp: undefined,
  };
}

export const DuplicateVoteEvidence = {
  encode(message: DuplicateVoteEvidence, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.voteA !== undefined) {
      Vote.encode(message.voteA, writer.uint32(10).fork()).ldelim();
    }
    if (message.voteB !== undefined) {
      Vote.encode(message.voteB, writer.uint32(18).fork()).ldelim();
    }
    if (!message.totalVotingPower.isZero()) {
      writer.uint32(24).int64(message.totalVotingPower);
    }
    if (!message.validatorPower.isZero()) {
      writer.uint32(32).int64(message.validatorPower);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DuplicateVoteEvidence {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDuplicateVoteEvidence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.voteA = Vote.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.voteB = Vote.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalVotingPower = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.validatorPower = reader.int64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DuplicateVoteEvidence {
    return {
      voteA: isSet(object.voteA) ? Vote.fromJSON(object.voteA) : undefined,
      voteB: isSet(object.voteB) ? Vote.fromJSON(object.voteB) : undefined,
      totalVotingPower: isSet(object.totalVotingPower) ? Long.fromValue(object.totalVotingPower) : Long.ZERO,
      validatorPower: isSet(object.validatorPower) ? Long.fromValue(object.validatorPower) : Long.ZERO,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: DuplicateVoteEvidence): unknown {
    const obj: any = {};
    if (message.voteA !== undefined) {
      obj.voteA = Vote.toJSON(message.voteA);
    }
    if (message.voteB !== undefined) {
      obj.voteB = Vote.toJSON(message.voteB);
    }
    if (!message.totalVotingPower.isZero()) {
      obj.totalVotingPower = (message.totalVotingPower || Long.ZERO).toString();
    }
    if (!message.validatorPower.isZero()) {
      obj.validatorPower = (message.validatorPower || Long.ZERO).toString();
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DuplicateVoteEvidence>, I>>(base?: I): DuplicateVoteEvidence {
    return DuplicateVoteEvidence.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DuplicateVoteEvidence>, I>>(object: I): DuplicateVoteEvidence {
    const message = createBaseDuplicateVoteEvidence();
    message.voteA = (object.voteA !== undefined && object.voteA !== null) ? Vote.fromPartial(object.voteA) : undefined;
    message.voteB = (object.voteB !== undefined && object.voteB !== null) ? Vote.fromPartial(object.voteB) : undefined;
    message.totalVotingPower = (object.totalVotingPower !== undefined && object.totalVotingPower !== null)
      ? Long.fromValue(object.totalVotingPower)
      : Long.ZERO;
    message.validatorPower = (object.validatorPower !== undefined && object.validatorPower !== null)
      ? Long.fromValue(object.validatorPower)
      : Long.ZERO;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseLightClientAttackEvidence(): LightClientAttackEvidence {
  return {
    conflictingBlock: undefined,
    commonHeight: Long.ZERO,
    byzantineValidators: [],
    totalVotingPower: Long.ZERO,
    timestamp: undefined,
  };
}

export const LightClientAttackEvidence = {
  encode(message: LightClientAttackEvidence, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.conflictingBlock !== undefined) {
      LightBlock.encode(message.conflictingBlock, writer.uint32(10).fork()).ldelim();
    }
    if (!message.commonHeight.isZero()) {
      writer.uint32(16).int64(message.commonHeight);
    }
    for (const v of message.byzantineValidators) {
      Validator.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (!message.totalVotingPower.isZero()) {
      writer.uint32(32).int64(message.totalVotingPower);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LightClientAttackEvidence {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLightClientAttackEvidence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.conflictingBlock = LightBlock.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.commonHeight = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.byzantineValidators.push(Validator.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.totalVotingPower = reader.int64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LightClientAttackEvidence {
    return {
      conflictingBlock: isSet(object.conflictingBlock) ? LightBlock.fromJSON(object.conflictingBlock) : undefined,
      commonHeight: isSet(object.commonHeight) ? Long.fromValue(object.commonHeight) : Long.ZERO,
      byzantineValidators: Array.isArray(object?.byzantineValidators)
        ? object.byzantineValidators.map((e: any) => Validator.fromJSON(e))
        : [],
      totalVotingPower: isSet(object.totalVotingPower) ? Long.fromValue(object.totalVotingPower) : Long.ZERO,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: LightClientAttackEvidence): unknown {
    const obj: any = {};
    if (message.conflictingBlock !== undefined) {
      obj.conflictingBlock = LightBlock.toJSON(message.conflictingBlock);
    }
    if (!message.commonHeight.isZero()) {
      obj.commonHeight = (message.commonHeight || Long.ZERO).toString();
    }
    if (message.byzantineValidators?.length) {
      obj.byzantineValidators = message.byzantineValidators.map((e) => Validator.toJSON(e));
    }
    if (!message.totalVotingPower.isZero()) {
      obj.totalVotingPower = (message.totalVotingPower || Long.ZERO).toString();
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LightClientAttackEvidence>, I>>(base?: I): LightClientAttackEvidence {
    return LightClientAttackEvidence.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LightClientAttackEvidence>, I>>(object: I): LightClientAttackEvidence {
    const message = createBaseLightClientAttackEvidence();
    message.conflictingBlock = (object.conflictingBlock !== undefined && object.conflictingBlock !== null)
      ? LightBlock.fromPartial(object.conflictingBlock)
      : undefined;
    message.commonHeight = (object.commonHeight !== undefined && object.commonHeight !== null)
      ? Long.fromValue(object.commonHeight)
      : Long.ZERO;
    message.byzantineValidators = object.byzantineValidators?.map((e) => Validator.fromPartial(e)) || [];
    message.totalVotingPower = (object.totalVotingPower !== undefined && object.totalVotingPower !== null)
      ? Long.fromValue(object.totalVotingPower)
      : Long.ZERO;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseEvidenceList(): EvidenceList {
  return { evidence: [] };
}

export const EvidenceList = {
  encode(message: EvidenceList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.evidence) {
      Evidence.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EvidenceList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvidenceList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.evidence.push(Evidence.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EvidenceList {
    return { evidence: Array.isArray(object?.evidence) ? object.evidence.map((e: any) => Evidence.fromJSON(e)) : [] };
  },

  toJSON(message: EvidenceList): unknown {
    const obj: any = {};
    if (message.evidence?.length) {
      obj.evidence = message.evidence.map((e) => Evidence.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EvidenceList>, I>>(base?: I): EvidenceList {
    return EvidenceList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EvidenceList>, I>>(object: I): EvidenceList {
    const message = createBaseEvidenceList();
    message.evidence = object.evidence?.map((e) => Evidence.fromPartial(e)) || [];
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
