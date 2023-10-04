/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "berachain.honey.v1";

/** `Exchangeable` defines the configuration of a collateral asset. */
export interface Exchangeable {
  /** The denom we are receiving in exchange for honey. */
  denom: string;
  /** enabled defines if the denom is enabled for exchange. */
  enabled: boolean;
  /** mint_rate defines the amount of honey given for one unit of the denom (assuming 1 denom == 1 USD). */
  mintRate: string;
  /** redemption_rate defines the amount of denom given for one honey (assuming 1 denom == 1 USD). */
  redemptionRate: string;
}

/** `Params` defines the set of parameters for the honey module. */
export interface Params {
  /** psm_denoms defines the configs for each of the underlying collateral assets. */
  psmDenoms: Exchangeable[];
}

/** `UpdateParamsRequest` defines a message to update params. */
export interface UpdateParamsRequest {
  /** authority is the address of the governance account. */
  authority: string;
  /**
   * params defines the x/feemarket parameters to update.
   * NOTE: All parameters must be supplied.
   */
  params?: Params | undefined;
}

/** `UpdateParamsResponse` defines an empty message response to update params. */
export interface UpdateParamsResponse {
}

/** `MintHoneyRequest` defines a message to mint honey. */
export interface MintHoneyRequest {
  /** from is the address of the account to mint honey from. */
  from: string;
  /** to is the address of the account to mint honey from. */
  to: string;
  /** collateral is the amount of collateral to mint honey with in sdk.Coin. */
  collateral?: Coin | undefined;
}

/** `MintHoneyResponse` defines a message response to mint honey. */
export interface MintHoneyResponse {
  /** minted is the amount of honey minted in sdk.Coin. */
  minted?: Coin | undefined;
}

/** `RedeemHoneyRequest` defines a message to redeem honey. */
export interface RedeemHoneyRequest {
  /** acc is the address of the account to redeem honey from. */
  acc: string;
  /** amt is the amount of honey to redeem. */
  amt: string;
  /** out_denom is the denom of the collateral to redeem in string. */
  outDenom: string;
}

/** `RedeemHoneyResponse` defines an empty message response to redeem honey. */
export interface RedeemHoneyResponse {
}

/** `IncreaseLimitRequest` defines a message to increase limit. */
export interface IncreaseLimitRequest {
  /** amo_type is the type of the amo. */
  amoType: string;
  /** acc is the address of the account to increase limit. */
  acc: string;
  /** limit is the amount of limit to increase. */
  limit: string;
  /** authority is the address of the governance account. */
  authority: string;
}

/** `IncreaseLimitResponse` defines an empty message response to increase limit. */
export interface IncreaseLimitResponse {
}

/** `DecreaseLimitRequest` defines a message to decrease limit. */
export interface DecreaseLimitRequest {
  /** amo_type is the type of the amo. */
  amoType: string;
  /** acc is the address of the account to decrease limit. */
  acc: string;
  /** limit is the amount of limit to decrease. */
  limit: string;
  /** authority is the address of the governance account. */
  authority: string;
}

/** `DecreaseLimitResponse` defines an empty message response to decrease limit. */
export interface DecreaseLimitResponse {
}

/** `RequestHoneyRequest` defines a message to request honey. */
export interface RequestHoneyRequest {
  /** amo_type is the type of the amo. */
  amoType: string;
  /** acc is the address of the account to request honey. */
  acc: string;
  /** amount is the amount of honey to request. */
  amount: string;
}

/** `RequestHoneyResponse` defines an empty message response to request honey. */
export interface RequestHoneyResponse {
}

/** `PauseRequest` defines a message for pausing the honey module. */
export interface PauseRequest {
  /** authority is the address of the governance account or the emergency address. */
  authority: string;
}

/** `PauseResponse` defines an empty message response to pause. */
export interface PauseResponse {
}

/** `ChangeEmergencyAddressRequest` defines a message for changing the emergency withdraw address. */
export interface ChangeEmergencyAddressRequest {
  /** authority is the address of the governance account or the emergency address. */
  authority: string;
  /** new_address is the new address to change to. */
  newAddress: string;
}

/** `ChangeEmergencyAddressResponse` defines an empty message response to change emergency address. */
export interface ChangeEmergencyAddressResponse {
}

function createBaseExchangeable(): Exchangeable {
  return { denom: "", enabled: false, mintRate: "", redemptionRate: "" };
}

export const Exchangeable = {
  encode(message: Exchangeable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.enabled === true) {
      writer.uint32(16).bool(message.enabled);
    }
    if (message.mintRate !== "") {
      writer.uint32(26).string(message.mintRate);
    }
    if (message.redemptionRate !== "") {
      writer.uint32(34).string(message.redemptionRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Exchangeable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExchangeable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.enabled = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.mintRate = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.redemptionRate = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Exchangeable {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : false,
      mintRate: isSet(object.mintRate) ? String(object.mintRate) : "",
      redemptionRate: isSet(object.redemptionRate) ? String(object.redemptionRate) : "",
    };
  },

  toJSON(message: Exchangeable): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.enabled === true) {
      obj.enabled = message.enabled;
    }
    if (message.mintRate !== "") {
      obj.mintRate = message.mintRate;
    }
    if (message.redemptionRate !== "") {
      obj.redemptionRate = message.redemptionRate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Exchangeable>, I>>(base?: I): Exchangeable {
    return Exchangeable.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Exchangeable>, I>>(object: I): Exchangeable {
    const message = createBaseExchangeable();
    message.denom = object.denom ?? "";
    message.enabled = object.enabled ?? false;
    message.mintRate = object.mintRate ?? "";
    message.redemptionRate = object.redemptionRate ?? "";
    return message;
  },
};

function createBaseParams(): Params {
  return { psmDenoms: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.psmDenoms) {
      Exchangeable.encode(v!, writer.uint32(10).fork()).ldelim();
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

          message.psmDenoms.push(Exchangeable.decode(reader, reader.uint32()));
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
      psmDenoms: Array.isArray(object?.psmDenoms) ? object.psmDenoms.map((e: any) => Exchangeable.fromJSON(e)) : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.psmDenoms?.length) {
      obj.psmDenoms = message.psmDenoms.map((e) => Exchangeable.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.psmDenoms = object.psmDenoms?.map((e) => Exchangeable.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdateParamsRequest(): UpdateParamsRequest {
  return { authority: "", params: undefined };
}

export const UpdateParamsRequest = {
  encode(message: UpdateParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateParamsRequest {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: UpdateParamsRequest): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateParamsRequest>, I>>(base?: I): UpdateParamsRequest {
    return UpdateParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateParamsRequest>, I>>(object: I): UpdateParamsRequest {
    const message = createBaseUpdateParamsRequest();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseUpdateParamsResponse(): UpdateParamsResponse {
  return {};
}

export const UpdateParamsResponse = {
  encode(_: UpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): UpdateParamsResponse {
    return {};
  },

  toJSON(_: UpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateParamsResponse>, I>>(base?: I): UpdateParamsResponse {
    return UpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateParamsResponse>, I>>(_: I): UpdateParamsResponse {
    const message = createBaseUpdateParamsResponse();
    return message;
  },
};

function createBaseMintHoneyRequest(): MintHoneyRequest {
  return { from: "", to: "", collateral: undefined };
}

export const MintHoneyRequest = {
  encode(message: MintHoneyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.to !== "") {
      writer.uint32(18).string(message.to);
    }
    if (message.collateral !== undefined) {
      Coin.encode(message.collateral, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MintHoneyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMintHoneyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.from = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.to = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.collateral = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MintHoneyRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      to: isSet(object.to) ? String(object.to) : "",
      collateral: isSet(object.collateral) ? Coin.fromJSON(object.collateral) : undefined,
    };
  },

  toJSON(message: MintHoneyRequest): unknown {
    const obj: any = {};
    if (message.from !== "") {
      obj.from = message.from;
    }
    if (message.to !== "") {
      obj.to = message.to;
    }
    if (message.collateral !== undefined) {
      obj.collateral = Coin.toJSON(message.collateral);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MintHoneyRequest>, I>>(base?: I): MintHoneyRequest {
    return MintHoneyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MintHoneyRequest>, I>>(object: I): MintHoneyRequest {
    const message = createBaseMintHoneyRequest();
    message.from = object.from ?? "";
    message.to = object.to ?? "";
    message.collateral = (object.collateral !== undefined && object.collateral !== null)
      ? Coin.fromPartial(object.collateral)
      : undefined;
    return message;
  },
};

function createBaseMintHoneyResponse(): MintHoneyResponse {
  return { minted: undefined };
}

export const MintHoneyResponse = {
  encode(message: MintHoneyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minted !== undefined) {
      Coin.encode(message.minted, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MintHoneyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMintHoneyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.minted = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MintHoneyResponse {
    return { minted: isSet(object.minted) ? Coin.fromJSON(object.minted) : undefined };
  },

  toJSON(message: MintHoneyResponse): unknown {
    const obj: any = {};
    if (message.minted !== undefined) {
      obj.minted = Coin.toJSON(message.minted);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MintHoneyResponse>, I>>(base?: I): MintHoneyResponse {
    return MintHoneyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MintHoneyResponse>, I>>(object: I): MintHoneyResponse {
    const message = createBaseMintHoneyResponse();
    message.minted = (object.minted !== undefined && object.minted !== null)
      ? Coin.fromPartial(object.minted)
      : undefined;
    return message;
  },
};

function createBaseRedeemHoneyRequest(): RedeemHoneyRequest {
  return { acc: "", amt: "", outDenom: "" };
}

export const RedeemHoneyRequest = {
  encode(message: RedeemHoneyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.acc !== "") {
      writer.uint32(10).string(message.acc);
    }
    if (message.amt !== "") {
      writer.uint32(18).string(message.amt);
    }
    if (message.outDenom !== "") {
      writer.uint32(26).string(message.outDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedeemHoneyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedeemHoneyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.acc = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amt = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.outDenom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RedeemHoneyRequest {
    return {
      acc: isSet(object.acc) ? String(object.acc) : "",
      amt: isSet(object.amt) ? String(object.amt) : "",
      outDenom: isSet(object.outDenom) ? String(object.outDenom) : "",
    };
  },

  toJSON(message: RedeemHoneyRequest): unknown {
    const obj: any = {};
    if (message.acc !== "") {
      obj.acc = message.acc;
    }
    if (message.amt !== "") {
      obj.amt = message.amt;
    }
    if (message.outDenom !== "") {
      obj.outDenom = message.outDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RedeemHoneyRequest>, I>>(base?: I): RedeemHoneyRequest {
    return RedeemHoneyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RedeemHoneyRequest>, I>>(object: I): RedeemHoneyRequest {
    const message = createBaseRedeemHoneyRequest();
    message.acc = object.acc ?? "";
    message.amt = object.amt ?? "";
    message.outDenom = object.outDenom ?? "";
    return message;
  },
};

function createBaseRedeemHoneyResponse(): RedeemHoneyResponse {
  return {};
}

export const RedeemHoneyResponse = {
  encode(_: RedeemHoneyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedeemHoneyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedeemHoneyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RedeemHoneyResponse {
    return {};
  },

  toJSON(_: RedeemHoneyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RedeemHoneyResponse>, I>>(base?: I): RedeemHoneyResponse {
    return RedeemHoneyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RedeemHoneyResponse>, I>>(_: I): RedeemHoneyResponse {
    const message = createBaseRedeemHoneyResponse();
    return message;
  },
};

function createBaseIncreaseLimitRequest(): IncreaseLimitRequest {
  return { amoType: "", acc: "", limit: "", authority: "" };
}

export const IncreaseLimitRequest = {
  encode(message: IncreaseLimitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amoType !== "") {
      writer.uint32(10).string(message.amoType);
    }
    if (message.acc !== "") {
      writer.uint32(18).string(message.acc);
    }
    if (message.limit !== "") {
      writer.uint32(26).string(message.limit);
    }
    if (message.authority !== "") {
      writer.uint32(34).string(message.authority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IncreaseLimitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncreaseLimitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amoType = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.acc = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.limit = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.authority = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IncreaseLimitRequest {
    return {
      amoType: isSet(object.amoType) ? String(object.amoType) : "",
      acc: isSet(object.acc) ? String(object.acc) : "",
      limit: isSet(object.limit) ? String(object.limit) : "",
      authority: isSet(object.authority) ? String(object.authority) : "",
    };
  },

  toJSON(message: IncreaseLimitRequest): unknown {
    const obj: any = {};
    if (message.amoType !== "") {
      obj.amoType = message.amoType;
    }
    if (message.acc !== "") {
      obj.acc = message.acc;
    }
    if (message.limit !== "") {
      obj.limit = message.limit;
    }
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IncreaseLimitRequest>, I>>(base?: I): IncreaseLimitRequest {
    return IncreaseLimitRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IncreaseLimitRequest>, I>>(object: I): IncreaseLimitRequest {
    const message = createBaseIncreaseLimitRequest();
    message.amoType = object.amoType ?? "";
    message.acc = object.acc ?? "";
    message.limit = object.limit ?? "";
    message.authority = object.authority ?? "";
    return message;
  },
};

function createBaseIncreaseLimitResponse(): IncreaseLimitResponse {
  return {};
}

export const IncreaseLimitResponse = {
  encode(_: IncreaseLimitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IncreaseLimitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncreaseLimitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): IncreaseLimitResponse {
    return {};
  },

  toJSON(_: IncreaseLimitResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<IncreaseLimitResponse>, I>>(base?: I): IncreaseLimitResponse {
    return IncreaseLimitResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IncreaseLimitResponse>, I>>(_: I): IncreaseLimitResponse {
    const message = createBaseIncreaseLimitResponse();
    return message;
  },
};

function createBaseDecreaseLimitRequest(): DecreaseLimitRequest {
  return { amoType: "", acc: "", limit: "", authority: "" };
}

export const DecreaseLimitRequest = {
  encode(message: DecreaseLimitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amoType !== "") {
      writer.uint32(10).string(message.amoType);
    }
    if (message.acc !== "") {
      writer.uint32(18).string(message.acc);
    }
    if (message.limit !== "") {
      writer.uint32(26).string(message.limit);
    }
    if (message.authority !== "") {
      writer.uint32(34).string(message.authority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecreaseLimitRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecreaseLimitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amoType = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.acc = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.limit = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.authority = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DecreaseLimitRequest {
    return {
      amoType: isSet(object.amoType) ? String(object.amoType) : "",
      acc: isSet(object.acc) ? String(object.acc) : "",
      limit: isSet(object.limit) ? String(object.limit) : "",
      authority: isSet(object.authority) ? String(object.authority) : "",
    };
  },

  toJSON(message: DecreaseLimitRequest): unknown {
    const obj: any = {};
    if (message.amoType !== "") {
      obj.amoType = message.amoType;
    }
    if (message.acc !== "") {
      obj.acc = message.acc;
    }
    if (message.limit !== "") {
      obj.limit = message.limit;
    }
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DecreaseLimitRequest>, I>>(base?: I): DecreaseLimitRequest {
    return DecreaseLimitRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DecreaseLimitRequest>, I>>(object: I): DecreaseLimitRequest {
    const message = createBaseDecreaseLimitRequest();
    message.amoType = object.amoType ?? "";
    message.acc = object.acc ?? "";
    message.limit = object.limit ?? "";
    message.authority = object.authority ?? "";
    return message;
  },
};

function createBaseDecreaseLimitResponse(): DecreaseLimitResponse {
  return {};
}

export const DecreaseLimitResponse = {
  encode(_: DecreaseLimitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DecreaseLimitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecreaseLimitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): DecreaseLimitResponse {
    return {};
  },

  toJSON(_: DecreaseLimitResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<DecreaseLimitResponse>, I>>(base?: I): DecreaseLimitResponse {
    return DecreaseLimitResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DecreaseLimitResponse>, I>>(_: I): DecreaseLimitResponse {
    const message = createBaseDecreaseLimitResponse();
    return message;
  },
};

function createBaseRequestHoneyRequest(): RequestHoneyRequest {
  return { amoType: "", acc: "", amount: "" };
}

export const RequestHoneyRequest = {
  encode(message: RequestHoneyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amoType !== "") {
      writer.uint32(10).string(message.amoType);
    }
    if (message.acc !== "") {
      writer.uint32(18).string(message.acc);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestHoneyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestHoneyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amoType = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.acc = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestHoneyRequest {
    return {
      amoType: isSet(object.amoType) ? String(object.amoType) : "",
      acc: isSet(object.acc) ? String(object.acc) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
    };
  },

  toJSON(message: RequestHoneyRequest): unknown {
    const obj: any = {};
    if (message.amoType !== "") {
      obj.amoType = message.amoType;
    }
    if (message.acc !== "") {
      obj.acc = message.acc;
    }
    if (message.amount !== "") {
      obj.amount = message.amount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestHoneyRequest>, I>>(base?: I): RequestHoneyRequest {
    return RequestHoneyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestHoneyRequest>, I>>(object: I): RequestHoneyRequest {
    const message = createBaseRequestHoneyRequest();
    message.amoType = object.amoType ?? "";
    message.acc = object.acc ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseRequestHoneyResponse(): RequestHoneyResponse {
  return {};
}

export const RequestHoneyResponse = {
  encode(_: RequestHoneyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestHoneyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestHoneyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): RequestHoneyResponse {
    return {};
  },

  toJSON(_: RequestHoneyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestHoneyResponse>, I>>(base?: I): RequestHoneyResponse {
    return RequestHoneyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestHoneyResponse>, I>>(_: I): RequestHoneyResponse {
    const message = createBaseRequestHoneyResponse();
    return message;
  },
};

function createBasePauseRequest(): PauseRequest {
  return { authority: "" };
}

export const PauseRequest = {
  encode(message: PauseRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PauseRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePauseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PauseRequest {
    return { authority: isSet(object.authority) ? String(object.authority) : "" };
  },

  toJSON(message: PauseRequest): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PauseRequest>, I>>(base?: I): PauseRequest {
    return PauseRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PauseRequest>, I>>(object: I): PauseRequest {
    const message = createBasePauseRequest();
    message.authority = object.authority ?? "";
    return message;
  },
};

function createBasePauseResponse(): PauseResponse {
  return {};
}

export const PauseResponse = {
  encode(_: PauseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PauseResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePauseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): PauseResponse {
    return {};
  },

  toJSON(_: PauseResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<PauseResponse>, I>>(base?: I): PauseResponse {
    return PauseResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PauseResponse>, I>>(_: I): PauseResponse {
    const message = createBasePauseResponse();
    return message;
  },
};

function createBaseChangeEmergencyAddressRequest(): ChangeEmergencyAddressRequest {
  return { authority: "", newAddress: "" };
}

export const ChangeEmergencyAddressRequest = {
  encode(message: ChangeEmergencyAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.newAddress !== "") {
      writer.uint32(18).string(message.newAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeEmergencyAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeEmergencyAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.newAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangeEmergencyAddressRequest {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      newAddress: isSet(object.newAddress) ? String(object.newAddress) : "",
    };
  },

  toJSON(message: ChangeEmergencyAddressRequest): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.newAddress !== "") {
      obj.newAddress = message.newAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangeEmergencyAddressRequest>, I>>(base?: I): ChangeEmergencyAddressRequest {
    return ChangeEmergencyAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChangeEmergencyAddressRequest>, I>>(
    object: I,
  ): ChangeEmergencyAddressRequest {
    const message = createBaseChangeEmergencyAddressRequest();
    message.authority = object.authority ?? "";
    message.newAddress = object.newAddress ?? "";
    return message;
  },
};

function createBaseChangeEmergencyAddressResponse(): ChangeEmergencyAddressResponse {
  return {};
}

export const ChangeEmergencyAddressResponse = {
  encode(_: ChangeEmergencyAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeEmergencyAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeEmergencyAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ChangeEmergencyAddressResponse {
    return {};
  },

  toJSON(_: ChangeEmergencyAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangeEmergencyAddressResponse>, I>>(base?: I): ChangeEmergencyAddressResponse {
    return ChangeEmergencyAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChangeEmergencyAddressResponse>, I>>(_: I): ChangeEmergencyAddressResponse {
    const message = createBaseChangeEmergencyAddressResponse();
    return message;
  },
};

/** `MsgService` defines the gRPC service that handles the messages. */
export interface MsgService {
  /** `UpdateParams` defines the service to update the params. */
  UpdateParams(request: UpdateParamsRequest): Promise<UpdateParamsResponse>;
  /** `MintHoney` defines the service to mint honey. */
  MintHoney(request: MintHoneyRequest): Promise<MintHoneyResponse>;
  /** `RedeemHoney` defines the service to redeem honey. */
  RedeemHoney(request: RedeemHoneyRequest): Promise<RedeemHoneyResponse>;
  /** `IncreaseLimit` defines the service to increase the limit. */
  IncreaseLimit(request: IncreaseLimitRequest): Promise<IncreaseLimitResponse>;
  /** `DecreaseLimit` defines the service to decrease the limit. */
  DecreaseLimit(request: DecreaseLimitRequest): Promise<DecreaseLimitResponse>;
  /** `RequestHoney` defines the service to request honey. */
  RequestHoney(request: RequestHoneyRequest): Promise<RequestHoneyResponse>;
  /** `Pause` defines the service to pause the service. */
  Pause(request: PauseRequest): Promise<PauseResponse>;
  /** `ChangeEmergencyAddress` defines the service to change the emergency address. */
  ChangeEmergencyAddress(request: ChangeEmergencyAddressRequest): Promise<ChangeEmergencyAddressResponse>;
}

export const MsgServiceServiceName = "berachain.honey.v1.MsgService";
export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceServiceName;
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.MintHoney = this.MintHoney.bind(this);
    this.RedeemHoney = this.RedeemHoney.bind(this);
    this.IncreaseLimit = this.IncreaseLimit.bind(this);
    this.DecreaseLimit = this.DecreaseLimit.bind(this);
    this.RequestHoney = this.RequestHoney.bind(this);
    this.Pause = this.Pause.bind(this);
    this.ChangeEmergencyAddress = this.ChangeEmergencyAddress.bind(this);
  }
  UpdateParams(request: UpdateParamsRequest): Promise<UpdateParamsResponse> {
    const data = UpdateParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => UpdateParamsResponse.decode(_m0.Reader.create(data)));
  }

  MintHoney(request: MintHoneyRequest): Promise<MintHoneyResponse> {
    const data = MintHoneyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "MintHoney", data);
    return promise.then((data) => MintHoneyResponse.decode(_m0.Reader.create(data)));
  }

  RedeemHoney(request: RedeemHoneyRequest): Promise<RedeemHoneyResponse> {
    const data = RedeemHoneyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RedeemHoney", data);
    return promise.then((data) => RedeemHoneyResponse.decode(_m0.Reader.create(data)));
  }

  IncreaseLimit(request: IncreaseLimitRequest): Promise<IncreaseLimitResponse> {
    const data = IncreaseLimitRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "IncreaseLimit", data);
    return promise.then((data) => IncreaseLimitResponse.decode(_m0.Reader.create(data)));
  }

  DecreaseLimit(request: DecreaseLimitRequest): Promise<DecreaseLimitResponse> {
    const data = DecreaseLimitRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DecreaseLimit", data);
    return promise.then((data) => DecreaseLimitResponse.decode(_m0.Reader.create(data)));
  }

  RequestHoney(request: RequestHoneyRequest): Promise<RequestHoneyResponse> {
    const data = RequestHoneyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RequestHoney", data);
    return promise.then((data) => RequestHoneyResponse.decode(_m0.Reader.create(data)));
  }

  Pause(request: PauseRequest): Promise<PauseResponse> {
    const data = PauseRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Pause", data);
    return promise.then((data) => PauseResponse.decode(_m0.Reader.create(data)));
  }

  ChangeEmergencyAddress(request: ChangeEmergencyAddressRequest): Promise<ChangeEmergencyAddressResponse> {
    const data = ChangeEmergencyAddressRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChangeEmergencyAddress", data);
    return promise.then((data) => ChangeEmergencyAddressResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
