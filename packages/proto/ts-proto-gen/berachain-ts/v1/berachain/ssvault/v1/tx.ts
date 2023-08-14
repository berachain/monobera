/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "berachain.ssvault.v1";

/** CreateSSVaultRequest is the request type for the Msg/CreateSSVaultRequest RPC */
export interface CreateSSVaultRequest {
  /** creator is the address of the creator of the ssvault. */
  creator: string;
  /** name is the name of the ssvault. */
  name: string;
  /** denom is the denom of the ssvault. */
  denom: string;
  /** seed is the amount of coins the user is seeding the vault with. */
  seed: Coin[];
}

/** CreateSSVaultResponse is the response type for the Msg/CreateSSVaultRequest RPC */
export interface CreateSSVaultResponse {
  /** ssvault_addr is the address of the ssvault. */
  ssvaultAddr: string;
}

/** DepositRequest is the message type that containes a request to deposit funds into a ssvault. */
export interface DepositRequest {
  /** depositor is the address of the depositor. */
  depositor: string;
  /** receiver is the address that receives the shares. */
  receiver: string;
  /** token_container is the address of the token container. */
  tokenContainer: string;
  /** deposit is the amount of coins the user is depositing into the vault. */
  asset: Coin[];
}

/** DepositResponse is the message type that contains a response to a deposit request. */
export interface DepositResponse {
  /** shares is the share coins minted to the depositor. */
  shares: Coin[];
}

/** MintRequest is the message */
export interface MintRequest {
  /** minter is the address of the minter. */
  minter: string;
  /** receiver is the address of the minter. */
  receiver: string;
  /** token_container is the address of the token container. */
  tokenContainer: string;
  /** shares is the amount of shares to deposit. */
  shares: Coin[];
}

/** MintResponse is the message type that contains a response to a mint request. */
export interface MintResponse {
  /** asset is the amount of asset coins deposit. */
  asset: Coin[];
}

/** WithdrawRequest is the message type that contains a request to withdraw funds from a ssvault. */
export interface WithdrawRequest {
  /** withdrawer is the address of the withdrawer. */
  withdrawer: string;
  /** receiver is the address that receives the asset. */
  receiver: string;
  /** token_container is the address of the token container. */
  tokenContainer: string;
  /** asset is the amount of asset coins to withdraw. */
  asset: Coin[];
}

/** WithdrawResponse is the message type that contains a response to a withdraw request. */
export interface WithdrawResponse {
  /** shares is the share coins burned from the withdrawer. */
  shares: Coin[];
}

/** RedeemRequest is the message type that contains a request to redeem shares from a ssvault. */
export interface RedeemRequest {
  /** redeemer is the address of the redeemer. */
  redeemer: string;
  /** receiver is the address that receives the asset. */
  receiver: string;
  /** token_container is the address of the token container. */
  tokenContainer: string;
  /** shares is the amount of share coins to redeem. */
  shares: Coin[];
}

/** RedeemResponse is the message type that contains a response to a redeem request. */
export interface RedeemResponse {
  /** asset is the amount of asset coins redeemed. */
  asset: Coin[];
}

/** WithdrawRewardRequest is the message type that contains a request to withdraw rewards from a ssvault. */
export interface WithdrawRewardRequest {
  /** withdrawer is the address of the withdrawer. */
  withdrawer: string;
  /** withdrawer is the address of the withdrawer. */
  receiver: string;
  /** token_container is the address of the token container. */
  tokenContainer: string;
}

/** WithdrawRewardResponse is the message type that contains a response to a withdraw rewards request. */
export interface WithdrawRewardResponse {
  /** rewards is the amount of rewards coins withdrawn. */
  rewards: Coin[];
}

function createBaseCreateSSVaultRequest(): CreateSSVaultRequest {
  return { creator: "", name: "", denom: "", seed: [] };
}

export const CreateSSVaultRequest = {
  encode(
    message: CreateSSVaultRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    for (const v of message.seed) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): CreateSSVaultRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSSVaultRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.denom = reader.string();
          break;
        case 4:
          message.seed.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateSSVaultRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
      seed: Array.isArray(object?.seed)
        ? object.seed.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateSSVaultRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.denom !== undefined && (obj.denom = message.denom);
    if (message.seed) {
      obj.seed = message.seed.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.seed = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSSVaultRequest>, I>>(
    base?: I,
  ): CreateSSVaultRequest {
    return CreateSSVaultRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateSSVaultRequest>, I>>(
    object: I,
  ): CreateSSVaultRequest {
    const message = createBaseCreateSSVaultRequest();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.denom = object.denom ?? "";
    message.seed = object.seed?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateSSVaultResponse(): CreateSSVaultResponse {
  return { ssvaultAddr: "" };
}

export const CreateSSVaultResponse = {
  encode(
    message: CreateSSVaultResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.ssvaultAddr !== "") {
      writer.uint32(10).string(message.ssvaultAddr);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): CreateSSVaultResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateSSVaultResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ssvaultAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateSSVaultResponse {
    return {
      ssvaultAddr: isSet(object.ssvaultAddr) ? String(object.ssvaultAddr) : "",
    };
  },

  toJSON(message: CreateSSVaultResponse): unknown {
    const obj: any = {};
    message.ssvaultAddr !== undefined &&
      (obj.ssvaultAddr = message.ssvaultAddr);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateSSVaultResponse>, I>>(
    base?: I,
  ): CreateSSVaultResponse {
    return CreateSSVaultResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateSSVaultResponse>, I>>(
    object: I,
  ): CreateSSVaultResponse {
    const message = createBaseCreateSSVaultResponse();
    message.ssvaultAddr = object.ssvaultAddr ?? "";
    return message;
  },
};

function createBaseDepositRequest(): DepositRequest {
  return { depositor: "", receiver: "", tokenContainer: "", asset: [] };
}

export const DepositRequest = {
  encode(
    message: DepositRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.depositor !== "") {
      writer.uint32(10).string(message.depositor);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.tokenContainer !== "") {
      writer.uint32(26).string(message.tokenContainer);
    }
    for (const v of message.asset) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DepositRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositor = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.tokenContainer = reader.string();
          break;
        case 4:
          message.asset.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DepositRequest {
    return {
      depositor: isSet(object.depositor) ? String(object.depositor) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      tokenContainer: isSet(object.tokenContainer)
        ? String(object.tokenContainer)
        : "",
      asset: Array.isArray(object?.asset)
        ? object.asset.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DepositRequest): unknown {
    const obj: any = {};
    message.depositor !== undefined && (obj.depositor = message.depositor);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.tokenContainer !== undefined &&
      (obj.tokenContainer = message.tokenContainer);
    if (message.asset) {
      obj.asset = message.asset.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.asset = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DepositRequest>, I>>(
    base?: I,
  ): DepositRequest {
    return DepositRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DepositRequest>, I>>(
    object: I,
  ): DepositRequest {
    const message = createBaseDepositRequest();
    message.depositor = object.depositor ?? "";
    message.receiver = object.receiver ?? "";
    message.tokenContainer = object.tokenContainer ?? "";
    message.asset = object.asset?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDepositResponse(): DepositResponse {
  return { shares: [] };
}

export const DepositResponse = {
  encode(
    message: DepositResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.shares) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.shares.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DepositResponse {
    return {
      shares: Array.isArray(object?.shares)
        ? object.shares.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DepositResponse): unknown {
    const obj: any = {};
    if (message.shares) {
      obj.shares = message.shares.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.shares = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DepositResponse>, I>>(
    base?: I,
  ): DepositResponse {
    return DepositResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DepositResponse>, I>>(
    object: I,
  ): DepositResponse {
    const message = createBaseDepositResponse();
    message.shares = object.shares?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMintRequest(): MintRequest {
  return { minter: "", receiver: "", tokenContainer: "", shares: [] };
}

export const MintRequest = {
  encode(
    message: MintRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.minter !== "") {
      writer.uint32(10).string(message.minter);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.tokenContainer !== "") {
      writer.uint32(26).string(message.tokenContainer);
    }
    for (const v of message.shares) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MintRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMintRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minter = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.tokenContainer = reader.string();
          break;
        case 4:
          message.shares.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MintRequest {
    return {
      minter: isSet(object.minter) ? String(object.minter) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      tokenContainer: isSet(object.tokenContainer)
        ? String(object.tokenContainer)
        : "",
      shares: Array.isArray(object?.shares)
        ? object.shares.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MintRequest): unknown {
    const obj: any = {};
    message.minter !== undefined && (obj.minter = message.minter);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.tokenContainer !== undefined &&
      (obj.tokenContainer = message.tokenContainer);
    if (message.shares) {
      obj.shares = message.shares.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.shares = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MintRequest>, I>>(base?: I): MintRequest {
    return MintRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MintRequest>, I>>(
    object: I,
  ): MintRequest {
    const message = createBaseMintRequest();
    message.minter = object.minter ?? "";
    message.receiver = object.receiver ?? "";
    message.tokenContainer = object.tokenContainer ?? "";
    message.shares = object.shares?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMintResponse(): MintResponse {
  return { asset: [] };
}

export const MintResponse = {
  encode(
    message: MintResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.asset) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MintResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMintResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.asset.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MintResponse {
    return {
      asset: Array.isArray(object?.asset)
        ? object.asset.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MintResponse): unknown {
    const obj: any = {};
    if (message.asset) {
      obj.asset = message.asset.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.asset = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MintResponse>, I>>(
    base?: I,
  ): MintResponse {
    return MintResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MintResponse>, I>>(
    object: I,
  ): MintResponse {
    const message = createBaseMintResponse();
    message.asset = object.asset?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseWithdrawRequest(): WithdrawRequest {
  return { withdrawer: "", receiver: "", tokenContainer: "", asset: [] };
}

export const WithdrawRequest = {
  encode(
    message: WithdrawRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.withdrawer !== "") {
      writer.uint32(10).string(message.withdrawer);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.tokenContainer !== "") {
      writer.uint32(26).string(message.tokenContainer);
    }
    for (const v of message.asset) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.withdrawer = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.tokenContainer = reader.string();
          break;
        case 4:
          message.asset.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawRequest {
    return {
      withdrawer: isSet(object.withdrawer) ? String(object.withdrawer) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      tokenContainer: isSet(object.tokenContainer)
        ? String(object.tokenContainer)
        : "",
      asset: Array.isArray(object?.asset)
        ? object.asset.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WithdrawRequest): unknown {
    const obj: any = {};
    message.withdrawer !== undefined && (obj.withdrawer = message.withdrawer);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.tokenContainer !== undefined &&
      (obj.tokenContainer = message.tokenContainer);
    if (message.asset) {
      obj.asset = message.asset.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.asset = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WithdrawRequest>, I>>(
    base?: I,
  ): WithdrawRequest {
    return WithdrawRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<WithdrawRequest>, I>>(
    object: I,
  ): WithdrawRequest {
    const message = createBaseWithdrawRequest();
    message.withdrawer = object.withdrawer ?? "";
    message.receiver = object.receiver ?? "";
    message.tokenContainer = object.tokenContainer ?? "";
    message.asset = object.asset?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseWithdrawResponse(): WithdrawResponse {
  return { shares: [] };
}

export const WithdrawResponse = {
  encode(
    message: WithdrawResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.shares) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.shares.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawResponse {
    return {
      shares: Array.isArray(object?.shares)
        ? object.shares.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WithdrawResponse): unknown {
    const obj: any = {};
    if (message.shares) {
      obj.shares = message.shares.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.shares = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WithdrawResponse>, I>>(
    base?: I,
  ): WithdrawResponse {
    return WithdrawResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<WithdrawResponse>, I>>(
    object: I,
  ): WithdrawResponse {
    const message = createBaseWithdrawResponse();
    message.shares = object.shares?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRedeemRequest(): RedeemRequest {
  return { redeemer: "", receiver: "", tokenContainer: "", shares: [] };
}

export const RedeemRequest = {
  encode(
    message: RedeemRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.redeemer !== "") {
      writer.uint32(10).string(message.redeemer);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.tokenContainer !== "") {
      writer.uint32(26).string(message.tokenContainer);
    }
    for (const v of message.shares) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedeemRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedeemRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redeemer = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.tokenContainer = reader.string();
          break;
        case 4:
          message.shares.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RedeemRequest {
    return {
      redeemer: isSet(object.redeemer) ? String(object.redeemer) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      tokenContainer: isSet(object.tokenContainer)
        ? String(object.tokenContainer)
        : "",
      shares: Array.isArray(object?.shares)
        ? object.shares.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RedeemRequest): unknown {
    const obj: any = {};
    message.redeemer !== undefined && (obj.redeemer = message.redeemer);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.tokenContainer !== undefined &&
      (obj.tokenContainer = message.tokenContainer);
    if (message.shares) {
      obj.shares = message.shares.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.shares = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RedeemRequest>, I>>(
    base?: I,
  ): RedeemRequest {
    return RedeemRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RedeemRequest>, I>>(
    object: I,
  ): RedeemRequest {
    const message = createBaseRedeemRequest();
    message.redeemer = object.redeemer ?? "";
    message.receiver = object.receiver ?? "";
    message.tokenContainer = object.tokenContainer ?? "";
    message.shares = object.shares?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRedeemResponse(): RedeemResponse {
  return { asset: [] };
}

export const RedeemResponse = {
  encode(
    message: RedeemResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.asset) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedeemResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedeemResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.asset.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RedeemResponse {
    return {
      asset: Array.isArray(object?.asset)
        ? object.asset.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: RedeemResponse): unknown {
    const obj: any = {};
    if (message.asset) {
      obj.asset = message.asset.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.asset = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RedeemResponse>, I>>(
    base?: I,
  ): RedeemResponse {
    return RedeemResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RedeemResponse>, I>>(
    object: I,
  ): RedeemResponse {
    const message = createBaseRedeemResponse();
    message.asset = object.asset?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseWithdrawRewardRequest(): WithdrawRewardRequest {
  return { withdrawer: "", receiver: "", tokenContainer: "" };
}

export const WithdrawRewardRequest = {
  encode(
    message: WithdrawRewardRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.withdrawer !== "") {
      writer.uint32(10).string(message.withdrawer);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.tokenContainer !== "") {
      writer.uint32(26).string(message.tokenContainer);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): WithdrawRewardRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawRewardRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.withdrawer = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.tokenContainer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawRewardRequest {
    return {
      withdrawer: isSet(object.withdrawer) ? String(object.withdrawer) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      tokenContainer: isSet(object.tokenContainer)
        ? String(object.tokenContainer)
        : "",
    };
  },

  toJSON(message: WithdrawRewardRequest): unknown {
    const obj: any = {};
    message.withdrawer !== undefined && (obj.withdrawer = message.withdrawer);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.tokenContainer !== undefined &&
      (obj.tokenContainer = message.tokenContainer);
    return obj;
  },

  create<I extends Exact<DeepPartial<WithdrawRewardRequest>, I>>(
    base?: I,
  ): WithdrawRewardRequest {
    return WithdrawRewardRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<WithdrawRewardRequest>, I>>(
    object: I,
  ): WithdrawRewardRequest {
    const message = createBaseWithdrawRewardRequest();
    message.withdrawer = object.withdrawer ?? "";
    message.receiver = object.receiver ?? "";
    message.tokenContainer = object.tokenContainer ?? "";
    return message;
  },
};

function createBaseWithdrawRewardResponse(): WithdrawRewardResponse {
  return { rewards: [] };
}

export const WithdrawRewardResponse = {
  encode(
    message: WithdrawRewardResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.rewards) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): WithdrawRewardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawRewardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewards.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WithdrawRewardResponse {
    return {
      rewards: Array.isArray(object?.rewards)
        ? object.rewards.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: WithdrawRewardResponse): unknown {
    const obj: any = {};
    if (message.rewards) {
      obj.rewards = message.rewards.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.rewards = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WithdrawRewardResponse>, I>>(
    base?: I,
  ): WithdrawRewardResponse {
    return WithdrawRewardResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<WithdrawRewardResponse>, I>>(
    object: I,
  ): WithdrawRewardResponse {
    const message = createBaseWithdrawRewardResponse();
    message.rewards = object.rewards?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

/** Msg defines the ssvault Msg service. */
export interface MsgService {
  /** CreateSSVault defines a method for creating a new ssvault. */
  CreateSSVault(request: CreateSSVaultRequest): Promise<CreateSSVaultResponse>;
  /** Deposit defines a method for depositing funds into a ssvault. */
  Deposit(request: DepositRequest): Promise<DepositResponse>;
  /** Mint defines a method for minting shares into a ssvault. */
  Mint(request: MintRequest): Promise<MintResponse>;
  /** Withdraw defines a method for withdrawing funds from a ssvault. */
  Withdraw(request: WithdrawRequest): Promise<WithdrawResponse>;
  /** Redeem defines a method for redeeming shares from a ssvault. */
  Redeem(request: RedeemRequest): Promise<RedeemResponse>;
  /** WithdrawReward defines a method for withdrawing rewards from a ssvault. */
  WithdrawReward(
    request: WithdrawRewardRequest,
  ): Promise<WithdrawRewardResponse>;
}

export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "berachain.ssvault.v1.MsgService";
    this.rpc = rpc;
    this.CreateSSVault = this.CreateSSVault.bind(this);
    this.Deposit = this.Deposit.bind(this);
    this.Mint = this.Mint.bind(this);
    this.Withdraw = this.Withdraw.bind(this);
    this.Redeem = this.Redeem.bind(this);
    this.WithdrawReward = this.WithdrawReward.bind(this);
  }
  CreateSSVault(request: CreateSSVaultRequest): Promise<CreateSSVaultResponse> {
    const data = CreateSSVaultRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateSSVault", data);
    return promise.then((data) =>
      CreateSSVaultResponse.decode(new _m0.Reader(data)),
    );
  }

  Deposit(request: DepositRequest): Promise<DepositResponse> {
    const data = DepositRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Deposit", data);
    return promise.then((data) => DepositResponse.decode(new _m0.Reader(data)));
  }

  Mint(request: MintRequest): Promise<MintResponse> {
    const data = MintRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Mint", data);
    return promise.then((data) => MintResponse.decode(new _m0.Reader(data)));
  }

  Withdraw(request: WithdrawRequest): Promise<WithdrawResponse> {
    const data = WithdrawRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Withdraw", data);
    return promise.then((data) =>
      WithdrawResponse.decode(new _m0.Reader(data)),
    );
  }

  Redeem(request: RedeemRequest): Promise<RedeemResponse> {
    const data = RedeemRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Redeem", data);
    return promise.then((data) => RedeemResponse.decode(new _m0.Reader(data)));
  }

  WithdrawReward(
    request: WithdrawRewardRequest,
  ): Promise<WithdrawRewardResponse> {
    const data = WithdrawRewardRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "WithdrawReward", data);
    return promise.then((data) =>
      WithdrawRewardResponse.decode(new _m0.Reader(data)),
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
