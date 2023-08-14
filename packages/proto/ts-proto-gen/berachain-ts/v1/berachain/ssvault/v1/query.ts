/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "./params";

export const protobufPackage = "berachain.ssvault.v1";

/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequest {}

/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params;
}

/** VaultRequest is the request type for the Query/Vault RPC method. */
export interface VaultRequest {
  /** denom defines the denom of the vault. */
  denom: string;
}

/** VaultRespose returns a vault object. */
export interface VaultResponse {
  /** metadata defines the metadata of the vault. */
  vault?: Vault;
}

/** VaultsRequest is the request type for the Query/Vaults RPC method. */
export interface VaultsRequest {}

/** VaultsRespose returns a list of vault objects. */
export interface VaultsResponse {
  /** vaults defines the list of vaults. */
  vaults: Vault[];
}

/** TotalAssetsRequest is the request type for the Query/TotalAssets RPC method. */
export interface TotalAssetsRequest {
  /** denom defines the denom of the vault. */
  denom: string;
}

/** TotalAssetsRespose returns the total assets of the vault. */
export interface TotalAssetsResponse {
  /** total_assets defines the total assets of the vault. */
  totalAssets: Coin[];
}

/** TotalSharesRequest is the request type for the Query/TotalShares RPC method. */
export interface TotalSharesRequest {
  /** denom defines the denom of the vault. */
  denom: string;
}

/** TotalSharesRespose returns the total shares of the vault. */
export interface TotalSharesResponse {
  /** total_shares defines the total shares of the vault. */
  totalShares: Coin[];
}

/** PreviewDepositRequest is the request type for the Query/PreviewDeposit RPC method. */
export interface PreviewDepositRequest {
  /** denom defines the denom of the vault. */
  denom: string;
  /** amount defines the amount of the deposit. */
  assets: Coin[];
}

/** PreviewDepositRespose returns the total shares of the vault. */
export interface PreviewDepositResponse {
  /** total_shares defines the total shares of the vault. */
  shares: Coin[];
}

/** PreviewMintRequest is the request type for the Query/PreviewMint RPC method. */
export interface PreviewMintRequest {
  /** denom defines the denom of the vault. */
  denom: string;
  /** shares defines the amount of shares to mint. */
  shares: Coin[];
}

/** PreviewMintRespose returns the total shares of the vault. */
export interface PreviewMintResponse {
  /** total_shares defines the total shares of the vault. */
  assets: Coin[];
}

/** PreviewWithdrawRequest is the request type for the Query/PreviewWithdraw RPC method. */
export interface PreviewWithdrawRequest {
  /** denom defines the denom of the vault. */
  denom: string;
  /** shares defines the amount of the shares to withdraw. */
  assets: Coin[];
}

/** PreviewWithdrawRespose returns the total shares of the vault. */
export interface PreviewWithdrawResponse {
  /** assets defines amount of assets that are withdrawable. */
  shares: Coin[];
}

/** PreviewRedeemRequest is the request type for the Query/PreviewRedeem RPC method. */
export interface PreviewRedeemRequest {
  /** denom defines the denom of the vault. */
  denom: string;
  /** assets defines the amount of the assets to redeem. */
  shares: Coin[];
}

/** PreviewRedeemRespose returns the total assets that can be withdrawn for the shares. */
export interface PreviewRedeemResponse {
  /** assets defines amount of assets that are redeemable. */
  assets: Coin[];
}

/** Metadata defines the base metadata for a token container. */
export interface Metadata {
  /** nonce specifies index of the token container */
  nonce: Long;
  /** name specifies the name for the token container */
  name: string;
  /**
   * token container specifies the type of the token container. The string will map to a vault
   * type.
   */
  tokenContainerType: string;
  /** vault_address defines the bech32-encoded address of the vault */
  tokenContainerAddress: string;
  /** Asset specifies the asset for the vault. Its the denom. */
  denoms: string[];
  /** owner_module_name defines the module name of the owner. */
  ownerModuleName: string;
}

/** Vault defines a vault object, with metadata and coin information. */
export interface Vault {
  /** metadata defines the base metadata for a token container. */
  metadata?: Metadata;
  /** total_assets defines the total assets of the vault. */
  totalAssets: Coin[];
  /** shares_total_supply defines the total supply of the shares. */
  sharesTotalSupply: Coin[];
}

function createBaseParamsRequest(): ParamsRequest {
  return {};
}

export const ParamsRequest = {
  encode(
    _: ParamsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ParamsRequest {
    return {};
  },

  toJSON(_: ParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ParamsRequest>, I>>(
    base?: I,
  ): ParamsRequest {
    return ParamsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ParamsRequest>, I>>(
    _: I,
  ): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
};

function createBaseParamsResponse(): ParamsResponse {
  return { params: undefined };
}

export const ParamsResponse = {
  encode(
    message: ParamsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: ParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ParamsResponse>, I>>(
    base?: I,
  ): ParamsResponse {
    return ParamsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ParamsResponse>, I>>(
    object: I,
  ): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseVaultRequest(): VaultRequest {
  return { denom: "" };
}

export const VaultRequest = {
  encode(
    message: VaultRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VaultRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVaultRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VaultRequest {
    return { denom: isSet(object.denom) ? String(object.denom) : "" };
  },

  toJSON(message: VaultRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  create<I extends Exact<DeepPartial<VaultRequest>, I>>(
    base?: I,
  ): VaultRequest {
    return VaultRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VaultRequest>, I>>(
    object: I,
  ): VaultRequest {
    const message = createBaseVaultRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseVaultResponse(): VaultResponse {
  return { vault: undefined };
}

export const VaultResponse = {
  encode(
    message: VaultResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.vault !== undefined) {
      Vault.encode(message.vault, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VaultResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVaultResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vault = Vault.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VaultResponse {
    return {
      vault: isSet(object.vault) ? Vault.fromJSON(object.vault) : undefined,
    };
  },

  toJSON(message: VaultResponse): unknown {
    const obj: any = {};
    message.vault !== undefined &&
      (obj.vault = message.vault ? Vault.toJSON(message.vault) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<VaultResponse>, I>>(
    base?: I,
  ): VaultResponse {
    return VaultResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VaultResponse>, I>>(
    object: I,
  ): VaultResponse {
    const message = createBaseVaultResponse();
    message.vault =
      object.vault !== undefined && object.vault !== null
        ? Vault.fromPartial(object.vault)
        : undefined;
    return message;
  },
};

function createBaseVaultsRequest(): VaultsRequest {
  return {};
}

export const VaultsRequest = {
  encode(
    _: VaultsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VaultsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVaultsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): VaultsRequest {
    return {};
  },

  toJSON(_: VaultsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<VaultsRequest>, I>>(
    base?: I,
  ): VaultsRequest {
    return VaultsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VaultsRequest>, I>>(
    _: I,
  ): VaultsRequest {
    const message = createBaseVaultsRequest();
    return message;
  },
};

function createBaseVaultsResponse(): VaultsResponse {
  return { vaults: [] };
}

export const VaultsResponse = {
  encode(
    message: VaultsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.vaults) {
      Vault.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VaultsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVaultsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vaults.push(Vault.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VaultsResponse {
    return {
      vaults: Array.isArray(object?.vaults)
        ? object.vaults.map((e: any) => Vault.fromJSON(e))
        : [],
    };
  },

  toJSON(message: VaultsResponse): unknown {
    const obj: any = {};
    if (message.vaults) {
      obj.vaults = message.vaults.map((e) => (e ? Vault.toJSON(e) : undefined));
    } else {
      obj.vaults = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VaultsResponse>, I>>(
    base?: I,
  ): VaultsResponse {
    return VaultsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<VaultsResponse>, I>>(
    object: I,
  ): VaultsResponse {
    const message = createBaseVaultsResponse();
    message.vaults = object.vaults?.map((e) => Vault.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTotalAssetsRequest(): TotalAssetsRequest {
  return { denom: "" };
}

export const TotalAssetsRequest = {
  encode(
    message: TotalAssetsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalAssetsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalAssetsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TotalAssetsRequest {
    return { denom: isSet(object.denom) ? String(object.denom) : "" };
  },

  toJSON(message: TotalAssetsRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalAssetsRequest>, I>>(
    base?: I,
  ): TotalAssetsRequest {
    return TotalAssetsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TotalAssetsRequest>, I>>(
    object: I,
  ): TotalAssetsRequest {
    const message = createBaseTotalAssetsRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseTotalAssetsResponse(): TotalAssetsResponse {
  return { totalAssets: [] };
}

export const TotalAssetsResponse = {
  encode(
    message: TotalAssetsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.totalAssets) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalAssetsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalAssetsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalAssets.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TotalAssetsResponse {
    return {
      totalAssets: Array.isArray(object?.totalAssets)
        ? object.totalAssets.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TotalAssetsResponse): unknown {
    const obj: any = {};
    if (message.totalAssets) {
      obj.totalAssets = message.totalAssets.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.totalAssets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalAssetsResponse>, I>>(
    base?: I,
  ): TotalAssetsResponse {
    return TotalAssetsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TotalAssetsResponse>, I>>(
    object: I,
  ): TotalAssetsResponse {
    const message = createBaseTotalAssetsResponse();
    message.totalAssets =
      object.totalAssets?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTotalSharesRequest(): TotalSharesRequest {
  return { denom: "" };
}

export const TotalSharesRequest = {
  encode(
    message: TotalSharesRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalSharesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalSharesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TotalSharesRequest {
    return { denom: isSet(object.denom) ? String(object.denom) : "" };
  },

  toJSON(message: TotalSharesRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalSharesRequest>, I>>(
    base?: I,
  ): TotalSharesRequest {
    return TotalSharesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TotalSharesRequest>, I>>(
    object: I,
  ): TotalSharesRequest {
    const message = createBaseTotalSharesRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseTotalSharesResponse(): TotalSharesResponse {
  return { totalShares: [] };
}

export const TotalSharesResponse = {
  encode(
    message: TotalSharesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.totalShares) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalSharesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalSharesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalShares.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TotalSharesResponse {
    return {
      totalShares: Array.isArray(object?.totalShares)
        ? object.totalShares.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TotalSharesResponse): unknown {
    const obj: any = {};
    if (message.totalShares) {
      obj.totalShares = message.totalShares.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.totalShares = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalSharesResponse>, I>>(
    base?: I,
  ): TotalSharesResponse {
    return TotalSharesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TotalSharesResponse>, I>>(
    object: I,
  ): TotalSharesResponse {
    const message = createBaseTotalSharesResponse();
    message.totalShares =
      object.totalShares?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePreviewDepositRequest(): PreviewDepositRequest {
  return { denom: "", assets: [] };
}

export const PreviewDepositRequest = {
  encode(
    message: PreviewDepositRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    for (const v of message.assets) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): PreviewDepositRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewDepositRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.assets.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PreviewDepositRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      assets: Array.isArray(object?.assets)
        ? object.assets.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PreviewDepositRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    if (message.assets) {
      obj.assets = message.assets.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.assets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PreviewDepositRequest>, I>>(
    base?: I,
  ): PreviewDepositRequest {
    return PreviewDepositRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PreviewDepositRequest>, I>>(
    object: I,
  ): PreviewDepositRequest {
    const message = createBasePreviewDepositRequest();
    message.denom = object.denom ?? "";
    message.assets = object.assets?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePreviewDepositResponse(): PreviewDepositResponse {
  return { shares: [] };
}

export const PreviewDepositResponse = {
  encode(
    message: PreviewDepositResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.shares) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): PreviewDepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewDepositResponse();
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

  fromJSON(object: any): PreviewDepositResponse {
    return {
      shares: Array.isArray(object?.shares)
        ? object.shares.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PreviewDepositResponse): unknown {
    const obj: any = {};
    if (message.shares) {
      obj.shares = message.shares.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.shares = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PreviewDepositResponse>, I>>(
    base?: I,
  ): PreviewDepositResponse {
    return PreviewDepositResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PreviewDepositResponse>, I>>(
    object: I,
  ): PreviewDepositResponse {
    const message = createBasePreviewDepositResponse();
    message.shares = object.shares?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePreviewMintRequest(): PreviewMintRequest {
  return { denom: "", shares: [] };
}

export const PreviewMintRequest = {
  encode(
    message: PreviewMintRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    for (const v of message.shares) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PreviewMintRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewMintRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.shares.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PreviewMintRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      shares: Array.isArray(object?.shares)
        ? object.shares.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PreviewMintRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    if (message.shares) {
      obj.shares = message.shares.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.shares = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PreviewMintRequest>, I>>(
    base?: I,
  ): PreviewMintRequest {
    return PreviewMintRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PreviewMintRequest>, I>>(
    object: I,
  ): PreviewMintRequest {
    const message = createBasePreviewMintRequest();
    message.denom = object.denom ?? "";
    message.shares = object.shares?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePreviewMintResponse(): PreviewMintResponse {
  return { assets: [] };
}

export const PreviewMintResponse = {
  encode(
    message: PreviewMintResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.assets) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PreviewMintResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewMintResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assets.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PreviewMintResponse {
    return {
      assets: Array.isArray(object?.assets)
        ? object.assets.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PreviewMintResponse): unknown {
    const obj: any = {};
    if (message.assets) {
      obj.assets = message.assets.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.assets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PreviewMintResponse>, I>>(
    base?: I,
  ): PreviewMintResponse {
    return PreviewMintResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PreviewMintResponse>, I>>(
    object: I,
  ): PreviewMintResponse {
    const message = createBasePreviewMintResponse();
    message.assets = object.assets?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePreviewWithdrawRequest(): PreviewWithdrawRequest {
  return { denom: "", assets: [] };
}

export const PreviewWithdrawRequest = {
  encode(
    message: PreviewWithdrawRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    for (const v of message.assets) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): PreviewWithdrawRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewWithdrawRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.assets.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PreviewWithdrawRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      assets: Array.isArray(object?.assets)
        ? object.assets.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PreviewWithdrawRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    if (message.assets) {
      obj.assets = message.assets.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.assets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PreviewWithdrawRequest>, I>>(
    base?: I,
  ): PreviewWithdrawRequest {
    return PreviewWithdrawRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PreviewWithdrawRequest>, I>>(
    object: I,
  ): PreviewWithdrawRequest {
    const message = createBasePreviewWithdrawRequest();
    message.denom = object.denom ?? "";
    message.assets = object.assets?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePreviewWithdrawResponse(): PreviewWithdrawResponse {
  return { shares: [] };
}

export const PreviewWithdrawResponse = {
  encode(
    message: PreviewWithdrawResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.shares) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): PreviewWithdrawResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewWithdrawResponse();
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

  fromJSON(object: any): PreviewWithdrawResponse {
    return {
      shares: Array.isArray(object?.shares)
        ? object.shares.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PreviewWithdrawResponse): unknown {
    const obj: any = {};
    if (message.shares) {
      obj.shares = message.shares.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.shares = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PreviewWithdrawResponse>, I>>(
    base?: I,
  ): PreviewWithdrawResponse {
    return PreviewWithdrawResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PreviewWithdrawResponse>, I>>(
    object: I,
  ): PreviewWithdrawResponse {
    const message = createBasePreviewWithdrawResponse();
    message.shares = object.shares?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePreviewRedeemRequest(): PreviewRedeemRequest {
  return { denom: "", shares: [] };
}

export const PreviewRedeemRequest = {
  encode(
    message: PreviewRedeemRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    for (const v of message.shares) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): PreviewRedeemRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewRedeemRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.shares.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PreviewRedeemRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      shares: Array.isArray(object?.shares)
        ? object.shares.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PreviewRedeemRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    if (message.shares) {
      obj.shares = message.shares.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.shares = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PreviewRedeemRequest>, I>>(
    base?: I,
  ): PreviewRedeemRequest {
    return PreviewRedeemRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PreviewRedeemRequest>, I>>(
    object: I,
  ): PreviewRedeemRequest {
    const message = createBasePreviewRedeemRequest();
    message.denom = object.denom ?? "";
    message.shares = object.shares?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePreviewRedeemResponse(): PreviewRedeemResponse {
  return { assets: [] };
}

export const PreviewRedeemResponse = {
  encode(
    message: PreviewRedeemResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.assets) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): PreviewRedeemResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewRedeemResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assets.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PreviewRedeemResponse {
    return {
      assets: Array.isArray(object?.assets)
        ? object.assets.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PreviewRedeemResponse): unknown {
    const obj: any = {};
    if (message.assets) {
      obj.assets = message.assets.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.assets = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PreviewRedeemResponse>, I>>(
    base?: I,
  ): PreviewRedeemResponse {
    return PreviewRedeemResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PreviewRedeemResponse>, I>>(
    object: I,
  ): PreviewRedeemResponse {
    const message = createBasePreviewRedeemResponse();
    message.assets = object.assets?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMetadata(): Metadata {
  return {
    nonce: Long.UZERO,
    name: "",
    tokenContainerType: "",
    tokenContainerAddress: "",
    denoms: [],
    ownerModuleName: "",
  };
}

export const Metadata = {
  encode(
    message: Metadata,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.nonce.isZero()) {
      writer.uint32(8).uint64(message.nonce);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.tokenContainerType !== "") {
      writer.uint32(26).string(message.tokenContainerType);
    }
    if (message.tokenContainerAddress !== "") {
      writer.uint32(34).string(message.tokenContainerAddress);
    }
    for (const v of message.denoms) {
      writer.uint32(42).string(v!);
    }
    if (message.ownerModuleName !== "") {
      writer.uint32(50).string(message.ownerModuleName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64() as Long;
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.tokenContainerType = reader.string();
          break;
        case 4:
          message.tokenContainerAddress = reader.string();
          break;
        case 5:
          message.denoms.push(reader.string());
          break;
        case 6:
          message.ownerModuleName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    return {
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
      name: isSet(object.name) ? String(object.name) : "",
      tokenContainerType: isSet(object.tokenContainerType)
        ? String(object.tokenContainerType)
        : "",
      tokenContainerAddress: isSet(object.tokenContainerAddress)
        ? String(object.tokenContainerAddress)
        : "",
      denoms: Array.isArray(object?.denoms)
        ? object.denoms.map((e: any) => String(e))
        : [],
      ownerModuleName: isSet(object.ownerModuleName)
        ? String(object.ownerModuleName)
        : "",
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.nonce !== undefined &&
      (obj.nonce = (message.nonce || Long.UZERO).toString());
    message.name !== undefined && (obj.name = message.name);
    message.tokenContainerType !== undefined &&
      (obj.tokenContainerType = message.tokenContainerType);
    message.tokenContainerAddress !== undefined &&
      (obj.tokenContainerAddress = message.tokenContainerAddress);
    if (message.denoms) {
      obj.denoms = message.denoms.map((e) => e);
    } else {
      obj.denoms = [];
    }
    message.ownerModuleName !== undefined &&
      (obj.ownerModuleName = message.ownerModuleName);
    return obj;
  },

  create<I extends Exact<DeepPartial<Metadata>, I>>(base?: I): Metadata {
    return Metadata.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.nonce =
      object.nonce !== undefined && object.nonce !== null
        ? Long.fromValue(object.nonce)
        : Long.UZERO;
    message.name = object.name ?? "";
    message.tokenContainerType = object.tokenContainerType ?? "";
    message.tokenContainerAddress = object.tokenContainerAddress ?? "";
    message.denoms = object.denoms?.map((e) => e) || [];
    message.ownerModuleName = object.ownerModuleName ?? "";
    return message;
  },
};

function createBaseVault(): Vault {
  return { metadata: undefined, totalAssets: [], sharesTotalSupply: [] };
}

export const Vault = {
  encode(message: Vault, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.totalAssets) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.sharesTotalSupply) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vault {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVault();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.totalAssets.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.sharesTotalSupply.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vault {
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      totalAssets: Array.isArray(object?.totalAssets)
        ? object.totalAssets.map((e: any) => Coin.fromJSON(e))
        : [],
      sharesTotalSupply: Array.isArray(object?.sharesTotalSupply)
        ? object.sharesTotalSupply.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Vault): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    if (message.totalAssets) {
      obj.totalAssets = message.totalAssets.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.totalAssets = [];
    }
    if (message.sharesTotalSupply) {
      obj.sharesTotalSupply = message.sharesTotalSupply.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.sharesTotalSupply = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Vault>, I>>(base?: I): Vault {
    return Vault.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Vault>, I>>(object: I): Vault {
    const message = createBaseVault();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.totalAssets =
      object.totalAssets?.map((e) => Coin.fromPartial(e)) || [];
    message.sharesTotalSupply =
      object.sharesTotalSupply?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

/** QueryService defines the gRPC querier service for ssvault module. */
export interface QueryService {
  /** Params queries params of the module. */
  Params(request: ParamsRequest): Promise<ParamsResponse>;
  /** Vault queries metadata of the vault. */
  Vault(request: VaultRequest): Promise<VaultResponse>;
  /** Vaults queries metadata of all vaults. */
  Vaults(request: VaultsRequest): Promise<VaultsResponse>;
  /** TotalAssets queries total assets of the vault. */
  TotalAssets(request: TotalAssetsRequest): Promise<TotalAssetsResponse>;
  /** TotalShares queries total shares of the vault. */
  TotalShares(request: TotalSharesRequest): Promise<TotalSharesResponse>;
  /** PreviewDeposit queries the preview of deposit request. */
  PreviewDeposit(
    request: PreviewDepositRequest,
  ): Promise<PreviewDepositResponse>;
  /** PreviewMint queries the preview of mint request. */
  PreviewMint(request: PreviewMintRequest): Promise<PreviewMintResponse>;
  /** PreviewWithdraw queries the preview of withdraw request. */
  PreviewWithdraw(
    request: PreviewWithdrawRequest,
  ): Promise<PreviewWithdrawResponse>;
  /** PreviewRedeem queries the preview of redeem request. */
  PreviewRedeem(request: PreviewRedeemRequest): Promise<PreviewRedeemResponse>;
}

export class QueryServiceClientImpl implements QueryService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "berachain.ssvault.v1.QueryService";
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Vault = this.Vault.bind(this);
    this.Vaults = this.Vaults.bind(this);
    this.TotalAssets = this.TotalAssets.bind(this);
    this.TotalShares = this.TotalShares.bind(this);
    this.PreviewDeposit = this.PreviewDeposit.bind(this);
    this.PreviewMint = this.PreviewMint.bind(this);
    this.PreviewWithdraw = this.PreviewWithdraw.bind(this);
    this.PreviewRedeem = this.PreviewRedeem.bind(this);
  }
  Params(request: ParamsRequest): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => ParamsResponse.decode(new _m0.Reader(data)));
  }

  Vault(request: VaultRequest): Promise<VaultResponse> {
    const data = VaultRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Vault", data);
    return promise.then((data) => VaultResponse.decode(new _m0.Reader(data)));
  }

  Vaults(request: VaultsRequest): Promise<VaultsResponse> {
    const data = VaultsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Vaults", data);
    return promise.then((data) => VaultsResponse.decode(new _m0.Reader(data)));
  }

  TotalAssets(request: TotalAssetsRequest): Promise<TotalAssetsResponse> {
    const data = TotalAssetsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalAssets", data);
    return promise.then((data) =>
      TotalAssetsResponse.decode(new _m0.Reader(data)),
    );
  }

  TotalShares(request: TotalSharesRequest): Promise<TotalSharesResponse> {
    const data = TotalSharesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalShares", data);
    return promise.then((data) =>
      TotalSharesResponse.decode(new _m0.Reader(data)),
    );
  }

  PreviewDeposit(
    request: PreviewDepositRequest,
  ): Promise<PreviewDepositResponse> {
    const data = PreviewDepositRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PreviewDeposit", data);
    return promise.then((data) =>
      PreviewDepositResponse.decode(new _m0.Reader(data)),
    );
  }

  PreviewMint(request: PreviewMintRequest): Promise<PreviewMintResponse> {
    const data = PreviewMintRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PreviewMint", data);
    return promise.then((data) =>
      PreviewMintResponse.decode(new _m0.Reader(data)),
    );
  }

  PreviewWithdraw(
    request: PreviewWithdrawRequest,
  ): Promise<PreviewWithdrawResponse> {
    const data = PreviewWithdrawRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PreviewWithdraw", data);
    return promise.then((data) =>
      PreviewWithdrawResponse.decode(new _m0.Reader(data)),
    );
  }

  PreviewRedeem(request: PreviewRedeemRequest): Promise<PreviewRedeemResponse> {
    const data = PreviewRedeemRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PreviewRedeem", data);
    return promise.then((data) =>
      PreviewRedeemResponse.decode(new _m0.Reader(data)),
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
