/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "berachain.dex.v1";

/** `CreatePoolRequest` defines a message to create a new liquidity pool. */
export interface CreatePoolRequest {
  /** `name` is the name of the liquidity pool. */
  name: string;
  /** `denoms` is the list of denoms of the liquidity pool. (range : 2 ~ 8). */
  denoms: string[];
  /** `pool_type` is the type of the liquidity pool. */
  poolType: string;
  /** `options` is the pool specific options. This needs to be a proto.Message type. */
  options: Uint8Array;
  /** `liquidity` is the initial liquidity of the liquidity pool. */
  liquidity: Coin[];
  /** `creator` is the creator of the liquidity pool. */
  creator: string;
}

/** `CreatePoolResponse` defines a message to create a new liquidity pool. */
export interface CreatePoolResponse {
  /** `pool_address` is the address of the liquidity pool. */
  poolAddress: string;
}

/** SingleSwapParam is a single swap parameter. */
export interface SingleSwapParam {
  /** pool_address is the address of the liquidity pool. */
  poolAddress: string;
  /** Kind is an enum that defines the type of swap. */
  kind: number;
  /** asset_in is the asset to be swapped in. */
  assetIn?: Coin | undefined;
  /** asset_out is the asset to be swapped out. */
  assetOut?: Coin | undefined;
}

/** SingleSwapRequest is a single swap request message. */
export interface SingleSwapRequest {
  /** account is the account address of the swap route and has custody of the coins. */
  account: string;
  /** single_swap is the single swap message. */
  singleSwap?: SingleSwapParam | undefined;
  /** deadline_height is the deadline of the swap in block height. */
  deadlineHeight: Long;
}

/** SingleSwap Response is a single swap response message. */
export interface SingleSwapResponse {
  /** `execution` is the coins that are received from the swap route. */
  execution: Coin[];
}

/** BatchSwapStep is the batch swap step message. */
export interface BatchSwapStep {
  /** pool_address is the address of the liquidity pool. */
  poolAddress: string;
  /** asset_in_index is the index of the asset to be swapped in. */
  assetInIndex: Long;
  /** asset_out_index is the index of the asset to be swapped out. */
  assetOutIndex: Long;
}

/** BatchSwapRequest is a batch swap request message. */
export interface BatchSwapRequest {
  /** kind is an enum that defines the type of swap. */
  kind: number;
  /** account is the account address of the swap route and has custody of the coins. */
  account: string;
  /** swaps is the list of batch swap steps. */
  swaps: BatchSwapStep[];
  /** assets is the list of assets to be swapped in and out. */
  assets: Coin[];
  /** deadline_height is the deadline of the swap in block height. */
  deadlineHeight: Long;
}

/** BatchSwapResponse is a batch swap response message. */
export interface BatchSwapResponse {
  /** `execution` is the coins that are received from the swap route. */
  execution: Coin[];
}

/** `AddLiquidityRequest` defines a message to add liquidity to a liquidity pool. */
export interface AddLiquidityRequest {
  /** pool_address is the address of the liquidity pool. */
  poolAddress: string;
  /** `account` is the account address of the executor. */
  account: string;
  /** `account` is the account address of the receiver. */
  receiver: string;
  /** `liquidity` is the liquidity being added to the liquidity pool. */
  liquidity: Coin[];
}

/** `AddLiquidityResponse` defines a message response to add liquidity to a liquidity pool. */
export interface AddLiquidityResponse {
  /** `shares` is the amount of shares the user receives from adding liquidity. */
  shares: Coin[];
  /** `liquidity_added` is the amount of liquidity added to the liquidity pool. */
  liquidityAdded: Coin[];
}

/** `RemoveLiquidityBurningSharesRequest` defines a message to remove liquidity from a liquidity pool. */
export interface RemoveLiquidityBurningSharesRequest {
  /** `pool_address` is the address of the liquidity pool. */
  poolAddress: string;
  /** `account` is the account address of the executor. */
  account: string;
  /** `account` is the account address of the executor. */
  receiver: string;
  /** `shares` is the amount of shares being removed from the liquidity pool. */
  shares?: Coin | undefined;
}

/** `RemoveLiquidityBurningSharesResponse` defines a message response to remove liquidity from a liquidity pool. */
export interface RemoveLiquidityBurningSharesResponse {
  /** `liquidity` is the amount of liquidity removed from the liquidity pool. */
  liquidity: Coin[];
}

/** `RemoveLiquidityExactAmountRequest` defines a message to remove liquidity from a liquidity pool. */
export interface RemoveLiquidityExactAmountRequest {
  /** `pool_address` is the address of the liquidity pool. */
  poolAddress: string;
  /** `account` is the account address of the executor. */
  account: string;
  /** `receiver` is the account address of the receiver. */
  receiver: string;
  /** `asset` is the asset to be removed from the liquidity pool. */
  asset?: Coin | undefined;
  /** `max_shares` is the maximum amount of shares that can be burned. */
  maxShares?: Coin | undefined;
}

/** `RemoveLiquidityExactAmountResponse` defines a message response to remove liquidity from a liquidity pool. */
export interface RemoveLiquidityExactAmountResponse {
  /** `liquidity` is the amount of liquidity removed from the liquidity pool. */
  liquidity: Coin[];
  /** `shares` is the amount of shares burned from the liquidity pool. */
  shares: Coin[];
}

function createBaseCreatePoolRequest(): CreatePoolRequest {
  return {
    name: "",
    denoms: [],
    poolType: "",
    options: new Uint8Array(0),
    liquidity: [],
    creator: "",
  };
}

export const CreatePoolRequest = {
  encode(
    message: CreatePoolRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.denoms) {
      writer.uint32(18).string(v!);
    }
    if (message.poolType !== "") {
      writer.uint32(26).string(message.poolType);
    }
    if (message.options.length !== 0) {
      writer.uint32(34).bytes(message.options);
    }
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.creator !== "") {
      writer.uint32(50).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatePoolRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denoms.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.poolType = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.options = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.liquidity.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.creator = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreatePoolRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      denoms: Array.isArray(object?.denoms)
        ? object.denoms.map((e: any) => String(e))
        : [],
      poolType: isSet(object.poolType) ? String(object.poolType) : "",
      options: isSet(object.options)
        ? bytesFromBase64(object.options)
        : new Uint8Array(0),
      liquidity: Array.isArray(object?.liquidity)
        ? object.liquidity.map((e: any) => Coin.fromJSON(e))
        : [],
      creator: isSet(object.creator) ? String(object.creator) : "",
    };
  },

  toJSON(message: CreatePoolRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.denoms?.length) {
      obj.denoms = message.denoms;
    }
    if (message.poolType !== "") {
      obj.poolType = message.poolType;
    }
    if (message.options.length !== 0) {
      obj.options = base64FromBytes(message.options);
    }
    if (message.liquidity?.length) {
      obj.liquidity = message.liquidity.map((e) => Coin.toJSON(e));
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreatePoolRequest>, I>>(
    base?: I,
  ): CreatePoolRequest {
    return CreatePoolRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreatePoolRequest>, I>>(
    object: I,
  ): CreatePoolRequest {
    const message = createBaseCreatePoolRequest();
    message.name = object.name ?? "";
    message.denoms = object.denoms?.map((e) => e) || [];
    message.poolType = object.poolType ?? "";
    message.options = object.options ?? new Uint8Array(0);
    message.liquidity = object.liquidity?.map((e) => Coin.fromPartial(e)) || [];
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseCreatePoolResponse(): CreatePoolResponse {
  return { poolAddress: "" };
}

export const CreatePoolResponse = {
  encode(
    message: CreatePoolResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.poolAddress !== "") {
      writer.uint32(10).string(message.poolAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatePoolResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreatePoolResponse {
    return {
      poolAddress: isSet(object.poolAddress) ? String(object.poolAddress) : "",
    };
  },

  toJSON(message: CreatePoolResponse): unknown {
    const obj: any = {};
    if (message.poolAddress !== "") {
      obj.poolAddress = message.poolAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreatePoolResponse>, I>>(
    base?: I,
  ): CreatePoolResponse {
    return CreatePoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreatePoolResponse>, I>>(
    object: I,
  ): CreatePoolResponse {
    const message = createBaseCreatePoolResponse();
    message.poolAddress = object.poolAddress ?? "";
    return message;
  },
};

function createBaseSingleSwapParam(): SingleSwapParam {
  return { poolAddress: "", kind: 0, assetIn: undefined, assetOut: undefined };
}

export const SingleSwapParam = {
  encode(
    message: SingleSwapParam,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.poolAddress !== "") {
      writer.uint32(10).string(message.poolAddress);
    }
    if (message.kind !== 0) {
      writer.uint32(16).int32(message.kind);
    }
    if (message.assetIn !== undefined) {
      Coin.encode(message.assetIn, writer.uint32(26).fork()).ldelim();
    }
    if (message.assetOut !== undefined) {
      Coin.encode(message.assetOut, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SingleSwapParam {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleSwapParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.kind = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.assetIn = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.assetOut = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SingleSwapParam {
    return {
      poolAddress: isSet(object.poolAddress) ? String(object.poolAddress) : "",
      kind: isSet(object.kind) ? Number(object.kind) : 0,
      assetIn: isSet(object.assetIn)
        ? Coin.fromJSON(object.assetIn)
        : undefined,
      assetOut: isSet(object.assetOut)
        ? Coin.fromJSON(object.assetOut)
        : undefined,
    };
  },

  toJSON(message: SingleSwapParam): unknown {
    const obj: any = {};
    if (message.poolAddress !== "") {
      obj.poolAddress = message.poolAddress;
    }
    if (message.kind !== 0) {
      obj.kind = Math.round(message.kind);
    }
    if (message.assetIn !== undefined) {
      obj.assetIn = Coin.toJSON(message.assetIn);
    }
    if (message.assetOut !== undefined) {
      obj.assetOut = Coin.toJSON(message.assetOut);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SingleSwapParam>, I>>(
    base?: I,
  ): SingleSwapParam {
    return SingleSwapParam.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SingleSwapParam>, I>>(
    object: I,
  ): SingleSwapParam {
    const message = createBaseSingleSwapParam();
    message.poolAddress = object.poolAddress ?? "";
    message.kind = object.kind ?? 0;
    message.assetIn =
      object.assetIn !== undefined && object.assetIn !== null
        ? Coin.fromPartial(object.assetIn)
        : undefined;
    message.assetOut =
      object.assetOut !== undefined && object.assetOut !== null
        ? Coin.fromPartial(object.assetOut)
        : undefined;
    return message;
  },
};

function createBaseSingleSwapRequest(): SingleSwapRequest {
  return { account: "", singleSwap: undefined, deadlineHeight: Long.ZERO };
}

export const SingleSwapRequest = {
  encode(
    message: SingleSwapRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.singleSwap !== undefined) {
      SingleSwapParam.encode(
        message.singleSwap,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (!message.deadlineHeight.isZero()) {
      writer.uint32(24).int64(message.deadlineHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SingleSwapRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleSwapRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.singleSwap = SingleSwapParam.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.deadlineHeight = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SingleSwapRequest {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      singleSwap: isSet(object.singleSwap)
        ? SingleSwapParam.fromJSON(object.singleSwap)
        : undefined,
      deadlineHeight: isSet(object.deadlineHeight)
        ? Long.fromValue(object.deadlineHeight)
        : Long.ZERO,
    };
  },

  toJSON(message: SingleSwapRequest): unknown {
    const obj: any = {};
    if (message.account !== "") {
      obj.account = message.account;
    }
    if (message.singleSwap !== undefined) {
      obj.singleSwap = SingleSwapParam.toJSON(message.singleSwap);
    }
    if (!message.deadlineHeight.isZero()) {
      obj.deadlineHeight = (message.deadlineHeight || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SingleSwapRequest>, I>>(
    base?: I,
  ): SingleSwapRequest {
    return SingleSwapRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SingleSwapRequest>, I>>(
    object: I,
  ): SingleSwapRequest {
    const message = createBaseSingleSwapRequest();
    message.account = object.account ?? "";
    message.singleSwap =
      object.singleSwap !== undefined && object.singleSwap !== null
        ? SingleSwapParam.fromPartial(object.singleSwap)
        : undefined;
    message.deadlineHeight =
      object.deadlineHeight !== undefined && object.deadlineHeight !== null
        ? Long.fromValue(object.deadlineHeight)
        : Long.ZERO;
    return message;
  },
};

function createBaseSingleSwapResponse(): SingleSwapResponse {
  return { execution: [] };
}

export const SingleSwapResponse = {
  encode(
    message: SingleSwapResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.execution) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SingleSwapResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSingleSwapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.execution.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SingleSwapResponse {
    return {
      execution: Array.isArray(object?.execution)
        ? object.execution.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SingleSwapResponse): unknown {
    const obj: any = {};
    if (message.execution?.length) {
      obj.execution = message.execution.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SingleSwapResponse>, I>>(
    base?: I,
  ): SingleSwapResponse {
    return SingleSwapResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SingleSwapResponse>, I>>(
    object: I,
  ): SingleSwapResponse {
    const message = createBaseSingleSwapResponse();
    message.execution = object.execution?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBatchSwapStep(): BatchSwapStep {
  return {
    poolAddress: "",
    assetInIndex: Long.UZERO,
    assetOutIndex: Long.UZERO,
  };
}

export const BatchSwapStep = {
  encode(
    message: BatchSwapStep,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.poolAddress !== "") {
      writer.uint32(10).string(message.poolAddress);
    }
    if (!message.assetInIndex.isZero()) {
      writer.uint32(16).uint64(message.assetInIndex);
    }
    if (!message.assetOutIndex.isZero()) {
      writer.uint32(24).uint64(message.assetOutIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchSwapStep {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchSwapStep();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.assetInIndex = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.assetOutIndex = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchSwapStep {
    return {
      poolAddress: isSet(object.poolAddress) ? String(object.poolAddress) : "",
      assetInIndex: isSet(object.assetInIndex)
        ? Long.fromValue(object.assetInIndex)
        : Long.UZERO,
      assetOutIndex: isSet(object.assetOutIndex)
        ? Long.fromValue(object.assetOutIndex)
        : Long.UZERO,
    };
  },

  toJSON(message: BatchSwapStep): unknown {
    const obj: any = {};
    if (message.poolAddress !== "") {
      obj.poolAddress = message.poolAddress;
    }
    if (!message.assetInIndex.isZero()) {
      obj.assetInIndex = (message.assetInIndex || Long.UZERO).toString();
    }
    if (!message.assetOutIndex.isZero()) {
      obj.assetOutIndex = (message.assetOutIndex || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchSwapStep>, I>>(
    base?: I,
  ): BatchSwapStep {
    return BatchSwapStep.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BatchSwapStep>, I>>(
    object: I,
  ): BatchSwapStep {
    const message = createBaseBatchSwapStep();
    message.poolAddress = object.poolAddress ?? "";
    message.assetInIndex =
      object.assetInIndex !== undefined && object.assetInIndex !== null
        ? Long.fromValue(object.assetInIndex)
        : Long.UZERO;
    message.assetOutIndex =
      object.assetOutIndex !== undefined && object.assetOutIndex !== null
        ? Long.fromValue(object.assetOutIndex)
        : Long.UZERO;
    return message;
  },
};

function createBaseBatchSwapRequest(): BatchSwapRequest {
  return {
    kind: 0,
    account: "",
    swaps: [],
    assets: [],
    deadlineHeight: Long.ZERO,
  };
}

export const BatchSwapRequest = {
  encode(
    message: BatchSwapRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.kind !== 0) {
      writer.uint32(8).int32(message.kind);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    for (const v of message.swaps) {
      BatchSwapStep.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.assets) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (!message.deadlineHeight.isZero()) {
      writer.uint32(40).int64(message.deadlineHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchSwapRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchSwapRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.kind = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.account = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.swaps.push(BatchSwapStep.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.assets.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.deadlineHeight = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchSwapRequest {
    return {
      kind: isSet(object.kind) ? Number(object.kind) : 0,
      account: isSet(object.account) ? String(object.account) : "",
      swaps: Array.isArray(object?.swaps)
        ? object.swaps.map((e: any) => BatchSwapStep.fromJSON(e))
        : [],
      assets: Array.isArray(object?.assets)
        ? object.assets.map((e: any) => Coin.fromJSON(e))
        : [],
      deadlineHeight: isSet(object.deadlineHeight)
        ? Long.fromValue(object.deadlineHeight)
        : Long.ZERO,
    };
  },

  toJSON(message: BatchSwapRequest): unknown {
    const obj: any = {};
    if (message.kind !== 0) {
      obj.kind = Math.round(message.kind);
    }
    if (message.account !== "") {
      obj.account = message.account;
    }
    if (message.swaps?.length) {
      obj.swaps = message.swaps.map((e) => BatchSwapStep.toJSON(e));
    }
    if (message.assets?.length) {
      obj.assets = message.assets.map((e) => Coin.toJSON(e));
    }
    if (!message.deadlineHeight.isZero()) {
      obj.deadlineHeight = (message.deadlineHeight || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchSwapRequest>, I>>(
    base?: I,
  ): BatchSwapRequest {
    return BatchSwapRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BatchSwapRequest>, I>>(
    object: I,
  ): BatchSwapRequest {
    const message = createBaseBatchSwapRequest();
    message.kind = object.kind ?? 0;
    message.account = object.account ?? "";
    message.swaps =
      object.swaps?.map((e) => BatchSwapStep.fromPartial(e)) || [];
    message.assets = object.assets?.map((e) => Coin.fromPartial(e)) || [];
    message.deadlineHeight =
      object.deadlineHeight !== undefined && object.deadlineHeight !== null
        ? Long.fromValue(object.deadlineHeight)
        : Long.ZERO;
    return message;
  },
};

function createBaseBatchSwapResponse(): BatchSwapResponse {
  return { execution: [] };
}

export const BatchSwapResponse = {
  encode(
    message: BatchSwapResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.execution) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchSwapResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchSwapResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.execution.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchSwapResponse {
    return {
      execution: Array.isArray(object?.execution)
        ? object.execution.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BatchSwapResponse): unknown {
    const obj: any = {};
    if (message.execution?.length) {
      obj.execution = message.execution.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchSwapResponse>, I>>(
    base?: I,
  ): BatchSwapResponse {
    return BatchSwapResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BatchSwapResponse>, I>>(
    object: I,
  ): BatchSwapResponse {
    const message = createBaseBatchSwapResponse();
    message.execution = object.execution?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddLiquidityRequest(): AddLiquidityRequest {
  return { poolAddress: "", account: "", receiver: "", liquidity: [] };
}

export const AddLiquidityRequest = {
  encode(
    message: AddLiquidityRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.poolAddress !== "") {
      writer.uint32(10).string(message.poolAddress);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (message.receiver !== "") {
      writer.uint32(26).string(message.receiver);
    }
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddLiquidityRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddLiquidityRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.account = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.receiver = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.liquidity.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddLiquidityRequest {
    return {
      poolAddress: isSet(object.poolAddress) ? String(object.poolAddress) : "",
      account: isSet(object.account) ? String(object.account) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      liquidity: Array.isArray(object?.liquidity)
        ? object.liquidity.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AddLiquidityRequest): unknown {
    const obj: any = {};
    if (message.poolAddress !== "") {
      obj.poolAddress = message.poolAddress;
    }
    if (message.account !== "") {
      obj.account = message.account;
    }
    if (message.receiver !== "") {
      obj.receiver = message.receiver;
    }
    if (message.liquidity?.length) {
      obj.liquidity = message.liquidity.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddLiquidityRequest>, I>>(
    base?: I,
  ): AddLiquidityRequest {
    return AddLiquidityRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddLiquidityRequest>, I>>(
    object: I,
  ): AddLiquidityRequest {
    const message = createBaseAddLiquidityRequest();
    message.poolAddress = object.poolAddress ?? "";
    message.account = object.account ?? "";
    message.receiver = object.receiver ?? "";
    message.liquidity = object.liquidity?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddLiquidityResponse(): AddLiquidityResponse {
  return { shares: [], liquidityAdded: [] };
}

export const AddLiquidityResponse = {
  encode(
    message: AddLiquidityResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.shares) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.liquidityAdded) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): AddLiquidityResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddLiquidityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.shares.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.liquidityAdded.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddLiquidityResponse {
    return {
      shares: Array.isArray(object?.shares)
        ? object.shares.map((e: any) => Coin.fromJSON(e))
        : [],
      liquidityAdded: Array.isArray(object?.liquidityAdded)
        ? object.liquidityAdded.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AddLiquidityResponse): unknown {
    const obj: any = {};
    if (message.shares?.length) {
      obj.shares = message.shares.map((e) => Coin.toJSON(e));
    }
    if (message.liquidityAdded?.length) {
      obj.liquidityAdded = message.liquidityAdded.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddLiquidityResponse>, I>>(
    base?: I,
  ): AddLiquidityResponse {
    return AddLiquidityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddLiquidityResponse>, I>>(
    object: I,
  ): AddLiquidityResponse {
    const message = createBaseAddLiquidityResponse();
    message.shares = object.shares?.map((e) => Coin.fromPartial(e)) || [];
    message.liquidityAdded =
      object.liquidityAdded?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRemoveLiquidityBurningSharesRequest(): RemoveLiquidityBurningSharesRequest {
  return { poolAddress: "", account: "", receiver: "", shares: undefined };
}

export const RemoveLiquidityBurningSharesRequest = {
  encode(
    message: RemoveLiquidityBurningSharesRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.poolAddress !== "") {
      writer.uint32(10).string(message.poolAddress);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (message.receiver !== "") {
      writer.uint32(26).string(message.receiver);
    }
    if (message.shares !== undefined) {
      Coin.encode(message.shares, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RemoveLiquidityBurningSharesRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveLiquidityBurningSharesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.account = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.receiver = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.shares = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveLiquidityBurningSharesRequest {
    return {
      poolAddress: isSet(object.poolAddress) ? String(object.poolAddress) : "",
      account: isSet(object.account) ? String(object.account) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      shares: isSet(object.shares) ? Coin.fromJSON(object.shares) : undefined,
    };
  },

  toJSON(message: RemoveLiquidityBurningSharesRequest): unknown {
    const obj: any = {};
    if (message.poolAddress !== "") {
      obj.poolAddress = message.poolAddress;
    }
    if (message.account !== "") {
      obj.account = message.account;
    }
    if (message.receiver !== "") {
      obj.receiver = message.receiver;
    }
    if (message.shares !== undefined) {
      obj.shares = Coin.toJSON(message.shares);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveLiquidityBurningSharesRequest>, I>>(
    base?: I,
  ): RemoveLiquidityBurningSharesRequest {
    return RemoveLiquidityBurningSharesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<
    I extends Exact<DeepPartial<RemoveLiquidityBurningSharesRequest>, I>,
  >(object: I): RemoveLiquidityBurningSharesRequest {
    const message = createBaseRemoveLiquidityBurningSharesRequest();
    message.poolAddress = object.poolAddress ?? "";
    message.account = object.account ?? "";
    message.receiver = object.receiver ?? "";
    message.shares =
      object.shares !== undefined && object.shares !== null
        ? Coin.fromPartial(object.shares)
        : undefined;
    return message;
  },
};

function createBaseRemoveLiquidityBurningSharesResponse(): RemoveLiquidityBurningSharesResponse {
  return { liquidity: [] };
}

export const RemoveLiquidityBurningSharesResponse = {
  encode(
    message: RemoveLiquidityBurningSharesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RemoveLiquidityBurningSharesResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveLiquidityBurningSharesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.liquidity.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveLiquidityBurningSharesResponse {
    return {
      liquidity: Array.isArray(object?.liquidity)
        ? object.liquidity.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RemoveLiquidityBurningSharesResponse): unknown {
    const obj: any = {};
    if (message.liquidity?.length) {
      obj.liquidity = message.liquidity.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveLiquidityBurningSharesResponse>, I>>(
    base?: I,
  ): RemoveLiquidityBurningSharesResponse {
    return RemoveLiquidityBurningSharesResponse.fromPartial(
      base ?? ({} as any),
    );
  },
  fromPartial<
    I extends Exact<DeepPartial<RemoveLiquidityBurningSharesResponse>, I>,
  >(object: I): RemoveLiquidityBurningSharesResponse {
    const message = createBaseRemoveLiquidityBurningSharesResponse();
    message.liquidity = object.liquidity?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRemoveLiquidityExactAmountRequest(): RemoveLiquidityExactAmountRequest {
  return {
    poolAddress: "",
    account: "",
    receiver: "",
    asset: undefined,
    maxShares: undefined,
  };
}

export const RemoveLiquidityExactAmountRequest = {
  encode(
    message: RemoveLiquidityExactAmountRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.poolAddress !== "") {
      writer.uint32(10).string(message.poolAddress);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    if (message.receiver !== "") {
      writer.uint32(26).string(message.receiver);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(34).fork()).ldelim();
    }
    if (message.maxShares !== undefined) {
      Coin.encode(message.maxShares, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RemoveLiquidityExactAmountRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveLiquidityExactAmountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.account = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.receiver = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.asset = Coin.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.maxShares = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveLiquidityExactAmountRequest {
    return {
      poolAddress: isSet(object.poolAddress) ? String(object.poolAddress) : "",
      account: isSet(object.account) ? String(object.account) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      asset: isSet(object.asset) ? Coin.fromJSON(object.asset) : undefined,
      maxShares: isSet(object.maxShares)
        ? Coin.fromJSON(object.maxShares)
        : undefined,
    };
  },

  toJSON(message: RemoveLiquidityExactAmountRequest): unknown {
    const obj: any = {};
    if (message.poolAddress !== "") {
      obj.poolAddress = message.poolAddress;
    }
    if (message.account !== "") {
      obj.account = message.account;
    }
    if (message.receiver !== "") {
      obj.receiver = message.receiver;
    }
    if (message.asset !== undefined) {
      obj.asset = Coin.toJSON(message.asset);
    }
    if (message.maxShares !== undefined) {
      obj.maxShares = Coin.toJSON(message.maxShares);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveLiquidityExactAmountRequest>, I>>(
    base?: I,
  ): RemoveLiquidityExactAmountRequest {
    return RemoveLiquidityExactAmountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<
    I extends Exact<DeepPartial<RemoveLiquidityExactAmountRequest>, I>,
  >(object: I): RemoveLiquidityExactAmountRequest {
    const message = createBaseRemoveLiquidityExactAmountRequest();
    message.poolAddress = object.poolAddress ?? "";
    message.account = object.account ?? "";
    message.receiver = object.receiver ?? "";
    message.asset =
      object.asset !== undefined && object.asset !== null
        ? Coin.fromPartial(object.asset)
        : undefined;
    message.maxShares =
      object.maxShares !== undefined && object.maxShares !== null
        ? Coin.fromPartial(object.maxShares)
        : undefined;
    return message;
  },
};

function createBaseRemoveLiquidityExactAmountResponse(): RemoveLiquidityExactAmountResponse {
  return { liquidity: [], shares: [] };
}

export const RemoveLiquidityExactAmountResponse = {
  encode(
    message: RemoveLiquidityExactAmountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.shares) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RemoveLiquidityExactAmountResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveLiquidityExactAmountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.liquidity.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.shares.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RemoveLiquidityExactAmountResponse {
    return {
      liquidity: Array.isArray(object?.liquidity)
        ? object.liquidity.map((e: any) => Coin.fromJSON(e))
        : [],
      shares: Array.isArray(object?.shares)
        ? object.shares.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RemoveLiquidityExactAmountResponse): unknown {
    const obj: any = {};
    if (message.liquidity?.length) {
      obj.liquidity = message.liquidity.map((e) => Coin.toJSON(e));
    }
    if (message.shares?.length) {
      obj.shares = message.shares.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RemoveLiquidityExactAmountResponse>, I>>(
    base?: I,
  ): RemoveLiquidityExactAmountResponse {
    return RemoveLiquidityExactAmountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<
    I extends Exact<DeepPartial<RemoveLiquidityExactAmountResponse>, I>,
  >(object: I): RemoveLiquidityExactAmountResponse {
    const message = createBaseRemoveLiquidityExactAmountResponse();
    message.liquidity = object.liquidity?.map((e) => Coin.fromPartial(e)) || [];
    message.shares = object.shares?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

/** `MsgService` defines the gRPC service that handles the messages. */
export interface MsgService {
  /** `CreatePool` defines the service to create a new liquidity pool. */
  CreatePool(request: CreatePoolRequest): Promise<CreatePoolResponse>;
  /** `AddLiquidity` defines the service to add liquidity to a liquidity pool. */
  AddLiquidity(request: AddLiquidityRequest): Promise<AddLiquidityResponse>;
  /** `RemoveLiquidityBurningShares` defines the service to remove liquidity from a liquidity pool. */
  RemoveLiquidityBurningShares(
    request: RemoveLiquidityBurningSharesRequest,
  ): Promise<RemoveLiquidityBurningSharesResponse>;
  /** `RemoveLiquidityExactAmount` defines the service to remove liquidity from a liquidity pool. */
  RemoveLiquidityExactAmount(
    request: RemoveLiquidityExactAmountRequest,
  ): Promise<RemoveLiquidityExactAmountResponse>;
  /** SingleSwap defines the service to execute a single swap. */
  SingleSwap(request: SingleSwapRequest): Promise<SingleSwapResponse>;
  /** BatchSwap defines the service to execute a batch swap. */
  BatchSwap(request: BatchSwapRequest): Promise<BatchSwapResponse>;
}

export const MsgServiceServiceName = "berachain.dex.v1.MsgService";
export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceServiceName;
    this.rpc = rpc;
    this.CreatePool = this.CreatePool.bind(this);
    this.AddLiquidity = this.AddLiquidity.bind(this);
    this.RemoveLiquidityBurningShares =
      this.RemoveLiquidityBurningShares.bind(this);
    this.RemoveLiquidityExactAmount =
      this.RemoveLiquidityExactAmount.bind(this);
    this.SingleSwap = this.SingleSwap.bind(this);
    this.BatchSwap = this.BatchSwap.bind(this);
  }
  CreatePool(request: CreatePoolRequest): Promise<CreatePoolResponse> {
    const data = CreatePoolRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreatePool", data);
    return promise.then((data) =>
      CreatePoolResponse.decode(_m0.Reader.create(data)),
    );
  }

  AddLiquidity(request: AddLiquidityRequest): Promise<AddLiquidityResponse> {
    const data = AddLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddLiquidity", data);
    return promise.then((data) =>
      AddLiquidityResponse.decode(_m0.Reader.create(data)),
    );
  }

  RemoveLiquidityBurningShares(
    request: RemoveLiquidityBurningSharesRequest,
  ): Promise<RemoveLiquidityBurningSharesResponse> {
    const data = RemoveLiquidityBurningSharesRequest.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      "RemoveLiquidityBurningShares",
      data,
    );
    return promise.then((data) =>
      RemoveLiquidityBurningSharesResponse.decode(_m0.Reader.create(data)),
    );
  }

  RemoveLiquidityExactAmount(
    request: RemoveLiquidityExactAmountRequest,
  ): Promise<RemoveLiquidityExactAmountResponse> {
    const data = RemoveLiquidityExactAmountRequest.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      "RemoveLiquidityExactAmount",
      data,
    );
    return promise.then((data) =>
      RemoveLiquidityExactAmountResponse.decode(_m0.Reader.create(data)),
    );
  }

  SingleSwap(request: SingleSwapRequest): Promise<SingleSwapResponse> {
    const data = SingleSwapRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SingleSwap", data);
    return promise.then((data) =>
      SingleSwapResponse.decode(_m0.Reader.create(data)),
    );
  }

  BatchSwap(request: BatchSwapRequest): Promise<BatchSwapResponse> {
    const data = BatchSwapRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BatchSwap", data);
    return promise.then((data) =>
      BatchSwapResponse.decode(_m0.Reader.create(data)),
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

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
