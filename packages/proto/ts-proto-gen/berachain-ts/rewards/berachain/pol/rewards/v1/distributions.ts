/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { DecCoin } from "../../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "berachain.pol.rewards.v1";

/** Params defines the parameters for the rewards module. */
export interface Params {
  /** withdraw_address_enabled defines whether the withdraw address is enabled. */
  withdrawAddressEnabled: boolean;
}

/** HistoricalRewards defines the historical rewards for an address. */
export interface HistoricalRewards {
  /** cumulative_reward_ratio is the sum from the zeroeth period until this period. */
  cumulativeRewardRatio: DecCoin[];
  /** reference_count is the number of outstanding (un-withdrawn) rewards */
  referenceCount: number;
}

/**
 * CurrentRewards represents current rewards and current
 * period for an address kept as a running counter and incremented
 * each block as long as the containers tokens remain constant.
 */
export interface CurrentRewards {
  /** rewards is the current rewards for a Container. */
  rewards: DecCoin[];
  /** period is the current period for a Container reward. */
  period: Long;
}

/** OutstandingRewards represents the outstanding rewards for an address. */
export interface OutstandingRewards {
  /** rewards is the outstanding rewards for a Container. */
  rewards: DecCoin[];
}

/**
 * FeePool defines the fee pool for the rewards module, it contains the community pool,
 * where remainders of fees collected go to.
 */
export interface FeePool {
  /** community_pool is the pool of funds which are not currently allocated to any Container. */
  communityPool: DecCoin[];
}

/**
 * DepositorStartingInfo represents the starting info for a depositor reward
 * period. It tracks the previous Container period, the deposit amount  of
 * share token, and the creation height.
 */
export interface DepositorStartingInfo {
  /** previous_period is the period of the deposit start. */
  previousPeriod: Long;
  /** stake is the deposit amount of share token. */
  stake: string;
  /** height is the creation height. */
  height: Long;
}

/**
 * DepositDepositorReward represents the properties
 * of a depositors's deposit reward.
 */
export interface DepositDepositorReward {
  /** container_address is the address of the Container. */
  containerAddress: string;
  /** reward is the reward of the deposit. */
  reward: DecCoin[];
}

/** RewardReceiver represents the properties of a reward receiver. */
export interface RewardReceiver {
  /** receiver_address is the address of the receiver. */
  receiverAddress: string;
  /** denom is the denom of the reward receiver. */
  denom: string;
}

function createBaseParams(): Params {
  return { withdrawAddressEnabled: false };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.withdrawAddressEnabled === true) {
      writer.uint32(8).bool(message.withdrawAddressEnabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.withdrawAddressEnabled = reader.bool();
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
      withdrawAddressEnabled: isSet(object.withdrawAddressEnabled)
        ? Boolean(object.withdrawAddressEnabled)
        : false,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.withdrawAddressEnabled === true) {
      obj.withdrawAddressEnabled = message.withdrawAddressEnabled;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.withdrawAddressEnabled = object.withdrawAddressEnabled ?? false;
    return message;
  },
};

function createBaseHistoricalRewards(): HistoricalRewards {
  return { cumulativeRewardRatio: [], referenceCount: 0 };
}

export const HistoricalRewards = {
  encode(
    message: HistoricalRewards,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.cumulativeRewardRatio) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.referenceCount !== 0) {
      writer.uint32(16).uint32(message.referenceCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HistoricalRewards {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHistoricalRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cumulativeRewardRatio.push(
            DecCoin.decode(reader, reader.uint32()),
          );
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.referenceCount = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HistoricalRewards {
    return {
      cumulativeRewardRatio: Array.isArray(object?.cumulativeRewardRatio)
        ? object.cumulativeRewardRatio.map((e: any) => DecCoin.fromJSON(e))
        : [],
      referenceCount: isSet(object.referenceCount)
        ? Number(object.referenceCount)
        : 0,
    };
  },

  toJSON(message: HistoricalRewards): unknown {
    const obj: any = {};
    if (message.cumulativeRewardRatio?.length) {
      obj.cumulativeRewardRatio = message.cumulativeRewardRatio.map((e) =>
        DecCoin.toJSON(e),
      );
    }
    if (message.referenceCount !== 0) {
      obj.referenceCount = Math.round(message.referenceCount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HistoricalRewards>, I>>(
    base?: I,
  ): HistoricalRewards {
    return HistoricalRewards.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HistoricalRewards>, I>>(
    object: I,
  ): HistoricalRewards {
    const message = createBaseHistoricalRewards();
    message.cumulativeRewardRatio =
      object.cumulativeRewardRatio?.map((e) => DecCoin.fromPartial(e)) || [];
    message.referenceCount = object.referenceCount ?? 0;
    return message;
  },
};

function createBaseCurrentRewards(): CurrentRewards {
  return { rewards: [], period: Long.UZERO };
}

export const CurrentRewards = {
  encode(
    message: CurrentRewards,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.rewards) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (!message.period.isZero()) {
      writer.uint32(16).uint64(message.period);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CurrentRewards {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrentRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rewards.push(DecCoin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.period = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CurrentRewards {
    return {
      rewards: Array.isArray(object?.rewards)
        ? object.rewards.map((e: any) => DecCoin.fromJSON(e))
        : [],
      period: isSet(object.period) ? Long.fromValue(object.period) : Long.UZERO,
    };
  },

  toJSON(message: CurrentRewards): unknown {
    const obj: any = {};
    if (message.rewards?.length) {
      obj.rewards = message.rewards.map((e) => DecCoin.toJSON(e));
    }
    if (!message.period.isZero()) {
      obj.period = (message.period || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CurrentRewards>, I>>(
    base?: I,
  ): CurrentRewards {
    return CurrentRewards.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CurrentRewards>, I>>(
    object: I,
  ): CurrentRewards {
    const message = createBaseCurrentRewards();
    message.rewards = object.rewards?.map((e) => DecCoin.fromPartial(e)) || [];
    message.period =
      object.period !== undefined && object.period !== null
        ? Long.fromValue(object.period)
        : Long.UZERO;
    return message;
  },
};

function createBaseOutstandingRewards(): OutstandingRewards {
  return { rewards: [] };
}

export const OutstandingRewards = {
  encode(
    message: OutstandingRewards,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.rewards) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OutstandingRewards {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOutstandingRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rewards.push(DecCoin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OutstandingRewards {
    return {
      rewards: Array.isArray(object?.rewards)
        ? object.rewards.map((e: any) => DecCoin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: OutstandingRewards): unknown {
    const obj: any = {};
    if (message.rewards?.length) {
      obj.rewards = message.rewards.map((e) => DecCoin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OutstandingRewards>, I>>(
    base?: I,
  ): OutstandingRewards {
    return OutstandingRewards.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OutstandingRewards>, I>>(
    object: I,
  ): OutstandingRewards {
    const message = createBaseOutstandingRewards();
    message.rewards = object.rewards?.map((e) => DecCoin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFeePool(): FeePool {
  return { communityPool: [] };
}

export const FeePool = {
  encode(
    message: FeePool,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.communityPool) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeePool {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.communityPool.push(DecCoin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FeePool {
    return {
      communityPool: Array.isArray(object?.communityPool)
        ? object.communityPool.map((e: any) => DecCoin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FeePool): unknown {
    const obj: any = {};
    if (message.communityPool?.length) {
      obj.communityPool = message.communityPool.map((e) => DecCoin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FeePool>, I>>(base?: I): FeePool {
    return FeePool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FeePool>, I>>(object: I): FeePool {
    const message = createBaseFeePool();
    message.communityPool =
      object.communityPool?.map((e) => DecCoin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDepositorStartingInfo(): DepositorStartingInfo {
  return { previousPeriod: Long.UZERO, stake: "", height: Long.UZERO };
}

export const DepositorStartingInfo = {
  encode(
    message: DepositorStartingInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.previousPeriod.isZero()) {
      writer.uint32(8).uint64(message.previousPeriod);
    }
    if (message.stake !== "") {
      writer.uint32(18).string(message.stake);
    }
    if (!message.height.isZero()) {
      writer.uint32(24).uint64(message.height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): DepositorStartingInfo {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositorStartingInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.previousPeriod = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stake = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DepositorStartingInfo {
    return {
      previousPeriod: isSet(object.previousPeriod)
        ? Long.fromValue(object.previousPeriod)
        : Long.UZERO,
      stake: isSet(object.stake) ? String(object.stake) : "",
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
    };
  },

  toJSON(message: DepositorStartingInfo): unknown {
    const obj: any = {};
    if (!message.previousPeriod.isZero()) {
      obj.previousPeriod = (message.previousPeriod || Long.UZERO).toString();
    }
    if (message.stake !== "") {
      obj.stake = message.stake;
    }
    if (!message.height.isZero()) {
      obj.height = (message.height || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DepositorStartingInfo>, I>>(
    base?: I,
  ): DepositorStartingInfo {
    return DepositorStartingInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DepositorStartingInfo>, I>>(
    object: I,
  ): DepositorStartingInfo {
    const message = createBaseDepositorStartingInfo();
    message.previousPeriod =
      object.previousPeriod !== undefined && object.previousPeriod !== null
        ? Long.fromValue(object.previousPeriod)
        : Long.UZERO;
    message.stake = object.stake ?? "";
    message.height =
      object.height !== undefined && object.height !== null
        ? Long.fromValue(object.height)
        : Long.UZERO;
    return message;
  },
};

function createBaseDepositDepositorReward(): DepositDepositorReward {
  return { containerAddress: "", reward: [] };
}

export const DepositDepositorReward = {
  encode(
    message: DepositDepositorReward,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.containerAddress !== "") {
      writer.uint32(10).string(message.containerAddress);
    }
    for (const v of message.reward) {
      DecCoin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): DepositDepositorReward {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositDepositorReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.containerAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.reward.push(DecCoin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DepositDepositorReward {
    return {
      containerAddress: isSet(object.containerAddress)
        ? String(object.containerAddress)
        : "",
      reward: Array.isArray(object?.reward)
        ? object.reward.map((e: any) => DecCoin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DepositDepositorReward): unknown {
    const obj: any = {};
    if (message.containerAddress !== "") {
      obj.containerAddress = message.containerAddress;
    }
    if (message.reward?.length) {
      obj.reward = message.reward.map((e) => DecCoin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DepositDepositorReward>, I>>(
    base?: I,
  ): DepositDepositorReward {
    return DepositDepositorReward.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DepositDepositorReward>, I>>(
    object: I,
  ): DepositDepositorReward {
    const message = createBaseDepositDepositorReward();
    message.containerAddress = object.containerAddress ?? "";
    message.reward = object.reward?.map((e) => DecCoin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRewardReceiver(): RewardReceiver {
  return { receiverAddress: "", denom: "" };
}

export const RewardReceiver = {
  encode(
    message: RewardReceiver,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.receiverAddress !== "") {
      writer.uint32(10).string(message.receiverAddress);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardReceiver {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardReceiver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.receiverAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RewardReceiver {
    return {
      receiverAddress: isSet(object.receiverAddress)
        ? String(object.receiverAddress)
        : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
    };
  },

  toJSON(message: RewardReceiver): unknown {
    const obj: any = {};
    if (message.receiverAddress !== "") {
      obj.receiverAddress = message.receiverAddress;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RewardReceiver>, I>>(
    base?: I,
  ): RewardReceiver {
    return RewardReceiver.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RewardReceiver>, I>>(
    object: I,
  ): RewardReceiver {
    const message = createBaseRewardReceiver();
    message.receiverAddress = object.receiverAddress ?? "";
    message.denom = object.denom ?? "";
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
