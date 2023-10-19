/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "berachain.bts.backend.v1";

export interface GlobalParams {
  groupIndex: string;
  groupName: string;
  maxLeverage: string;
  minLeverage: string;
  /** 1e18 */
  maxCollateralP: string;
  /** 1e18 */
  maxPosHoney: string;
  honeyVaultFeeP: string;
  honeySssFeeP: string;
  currentEpoch: string;
}

export interface Market {
  pairIndex: string;
  name: string;
  /** PRECISION */
  fixedSpreadP: string;
  /** 1e18 DAI */
  onePercentDepthAbove: string;
  /** 1e18 DAI */
  onePercentDepthBelow: string;
  openInterest?: OpenInterest | undefined;
  pairBorrowingFee?: PairBorrowingFee | undefined;
  pairFundingFee?: PairFundingFee | undefined;
  pairRolloverFee?: PairRolloverFee | undefined;
  pairFixedFee?: PairFixedFee | undefined;
}

export interface OpenInterest {
  pairIndex: string;
  /** 1e18 DAI */
  oiLong: string;
  /** 1e18 DAI */
  oiShort: string;
  /** 1e18 DAI */
  oiMax: string;
}

export interface PairBorrowingFee {
  pairIndex: string;
  bfLong: string;
  bfShort: string;
}

export interface PairFundingFee {
  pairIndex: string;
  /** PRECISION (%) // funding fee per block (received/provided for long/short) */
  ffPerBlockP: string;
  /** 1e18 (DAI) // accrued funding fee per oi long */
  accPerOiLong: string;
  /** 1e18 (DAI) // accrued funding fee per oi short */
  accPerOiShort: string;
}

export interface PairRolloverFee {
  pairIndex: string;
  /** PRECISION (%) // rolling over when position open (flat fee) */
  rolloverPerBlockP: string;
  /** 1e18 (DAI) */
  accPerCollateral: string;
}

export interface PairFixedFee {
  pairIndex: string;
  /** PRECISION (% of leveraged pos) */
  openFeeP: string;
  /** PRECISION (% of leveraged pos) */
  closeFeeP: string;
  /** PRECISION (% of leveraged pos) */
  nftLimitOrderFeeP: string;
  /** 1e18 (collateral x leverage, useful for min fee) */
  minLevPosDai: string;
}

export interface HoneyWithdrawalRequest {
  createdBy: string;
  owner: string;
  shares: string;
  epochCreated: string;
  unlockEpoch: string;
}

export interface HoneyWithdrawalCancel {
  createdBy: string;
  owner: string;
  shares: string;
  epochCreated: string;
  unlockEpoch: string;
}

/** AccountFees is fees paid by the trader. */
export interface AccountFees {
  trader: string;
  fees: string;
}

/** AccountPnL is the PnL total PnL for the trader. */
export interface AccountPnL {
  trader: string;
  pnl: string;
}

function createBaseGlobalParams(): GlobalParams {
  return {
    groupIndex: "",
    groupName: "",
    maxLeverage: "",
    minLeverage: "",
    maxCollateralP: "",
    maxPosHoney: "",
    honeyVaultFeeP: "",
    honeySssFeeP: "",
    currentEpoch: "",
  };
}

export const GlobalParams = {
  encode(
    message: GlobalParams,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.groupIndex !== "") {
      writer.uint32(10).string(message.groupIndex);
    }
    if (message.groupName !== "") {
      writer.uint32(18).string(message.groupName);
    }
    if (message.maxLeverage !== "") {
      writer.uint32(26).string(message.maxLeverage);
    }
    if (message.minLeverage !== "") {
      writer.uint32(34).string(message.minLeverage);
    }
    if (message.maxCollateralP !== "") {
      writer.uint32(42).string(message.maxCollateralP);
    }
    if (message.maxPosHoney !== "") {
      writer.uint32(50).string(message.maxPosHoney);
    }
    if (message.honeyVaultFeeP !== "") {
      writer.uint32(58).string(message.honeyVaultFeeP);
    }
    if (message.honeySssFeeP !== "") {
      writer.uint32(66).string(message.honeySssFeeP);
    }
    if (message.currentEpoch !== "") {
      writer.uint32(74).string(message.currentEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GlobalParams {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGlobalParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupIndex = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.groupName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.maxLeverage = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.minLeverage = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.maxCollateralP = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.maxPosHoney = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.honeyVaultFeeP = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.honeySssFeeP = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.currentEpoch = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GlobalParams {
    return {
      groupIndex: isSet(object.groupIndex) ? String(object.groupIndex) : "",
      groupName: isSet(object.groupName) ? String(object.groupName) : "",
      maxLeverage: isSet(object.maxLeverage) ? String(object.maxLeverage) : "",
      minLeverage: isSet(object.minLeverage) ? String(object.minLeverage) : "",
      maxCollateralP: isSet(object.maxCollateralP)
        ? String(object.maxCollateralP)
        : "",
      maxPosHoney: isSet(object.maxPosHoney) ? String(object.maxPosHoney) : "",
      honeyVaultFeeP: isSet(object.honeyVaultFeeP)
        ? String(object.honeyVaultFeeP)
        : "",
      honeySssFeeP: isSet(object.honeySssFeeP)
        ? String(object.honeySssFeeP)
        : "",
      currentEpoch: isSet(object.currentEpoch)
        ? String(object.currentEpoch)
        : "",
    };
  },

  toJSON(message: GlobalParams): unknown {
    const obj: any = {};
    if (message.groupIndex !== "") {
      obj.groupIndex = message.groupIndex;
    }
    if (message.groupName !== "") {
      obj.groupName = message.groupName;
    }
    if (message.maxLeverage !== "") {
      obj.maxLeverage = message.maxLeverage;
    }
    if (message.minLeverage !== "") {
      obj.minLeverage = message.minLeverage;
    }
    if (message.maxCollateralP !== "") {
      obj.maxCollateralP = message.maxCollateralP;
    }
    if (message.maxPosHoney !== "") {
      obj.maxPosHoney = message.maxPosHoney;
    }
    if (message.honeyVaultFeeP !== "") {
      obj.honeyVaultFeeP = message.honeyVaultFeeP;
    }
    if (message.honeySssFeeP !== "") {
      obj.honeySssFeeP = message.honeySssFeeP;
    }
    if (message.currentEpoch !== "") {
      obj.currentEpoch = message.currentEpoch;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GlobalParams>, I>>(
    base?: I,
  ): GlobalParams {
    return GlobalParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GlobalParams>, I>>(
    object: I,
  ): GlobalParams {
    const message = createBaseGlobalParams();
    message.groupIndex = object.groupIndex ?? "";
    message.groupName = object.groupName ?? "";
    message.maxLeverage = object.maxLeverage ?? "";
    message.minLeverage = object.minLeverage ?? "";
    message.maxCollateralP = object.maxCollateralP ?? "";
    message.maxPosHoney = object.maxPosHoney ?? "";
    message.honeyVaultFeeP = object.honeyVaultFeeP ?? "";
    message.honeySssFeeP = object.honeySssFeeP ?? "";
    message.currentEpoch = object.currentEpoch ?? "";
    return message;
  },
};

function createBaseMarket(): Market {
  return {
    pairIndex: "",
    name: "",
    fixedSpreadP: "",
    onePercentDepthAbove: "",
    onePercentDepthBelow: "",
    openInterest: undefined,
    pairBorrowingFee: undefined,
    pairFundingFee: undefined,
    pairRolloverFee: undefined,
    pairFixedFee: undefined,
  };
}

export const Market = {
  encode(
    message: Market,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pairIndex !== "") {
      writer.uint32(10).string(message.pairIndex);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.fixedSpreadP !== "") {
      writer.uint32(26).string(message.fixedSpreadP);
    }
    if (message.onePercentDepthAbove !== "") {
      writer.uint32(34).string(message.onePercentDepthAbove);
    }
    if (message.onePercentDepthBelow !== "") {
      writer.uint32(42).string(message.onePercentDepthBelow);
    }
    if (message.openInterest !== undefined) {
      OpenInterest.encode(
        message.openInterest,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.pairBorrowingFee !== undefined) {
      PairBorrowingFee.encode(
        message.pairBorrowingFee,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    if (message.pairFundingFee !== undefined) {
      PairFundingFee.encode(
        message.pairFundingFee,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.pairRolloverFee !== undefined) {
      PairRolloverFee.encode(
        message.pairRolloverFee,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    if (message.pairFixedFee !== undefined) {
      PairFixedFee.encode(
        message.pairFixedFee,
        writer.uint32(82).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Market {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pairIndex = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fixedSpreadP = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.onePercentDepthAbove = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.onePercentDepthBelow = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.openInterest = OpenInterest.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.pairBorrowingFee = PairBorrowingFee.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.pairFundingFee = PairFundingFee.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.pairRolloverFee = PairRolloverFee.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.pairFixedFee = PairFixedFee.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Market {
    return {
      pairIndex: isSet(object.pairIndex) ? String(object.pairIndex) : "",
      name: isSet(object.name) ? String(object.name) : "",
      fixedSpreadP: isSet(object.fixedSpreadP)
        ? String(object.fixedSpreadP)
        : "",
      onePercentDepthAbove: isSet(object.onePercentDepthAbove)
        ? String(object.onePercentDepthAbove)
        : "",
      onePercentDepthBelow: isSet(object.onePercentDepthBelow)
        ? String(object.onePercentDepthBelow)
        : "",
      openInterest: isSet(object.openInterest)
        ? OpenInterest.fromJSON(object.openInterest)
        : undefined,
      pairBorrowingFee: isSet(object.pairBorrowingFee)
        ? PairBorrowingFee.fromJSON(object.pairBorrowingFee)
        : undefined,
      pairFundingFee: isSet(object.pairFundingFee)
        ? PairFundingFee.fromJSON(object.pairFundingFee)
        : undefined,
      pairRolloverFee: isSet(object.pairRolloverFee)
        ? PairRolloverFee.fromJSON(object.pairRolloverFee)
        : undefined,
      pairFixedFee: isSet(object.pairFixedFee)
        ? PairFixedFee.fromJSON(object.pairFixedFee)
        : undefined,
    };
  },

  toJSON(message: Market): unknown {
    const obj: any = {};
    if (message.pairIndex !== "") {
      obj.pairIndex = message.pairIndex;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.fixedSpreadP !== "") {
      obj.fixedSpreadP = message.fixedSpreadP;
    }
    if (message.onePercentDepthAbove !== "") {
      obj.onePercentDepthAbove = message.onePercentDepthAbove;
    }
    if (message.onePercentDepthBelow !== "") {
      obj.onePercentDepthBelow = message.onePercentDepthBelow;
    }
    if (message.openInterest !== undefined) {
      obj.openInterest = OpenInterest.toJSON(message.openInterest);
    }
    if (message.pairBorrowingFee !== undefined) {
      obj.pairBorrowingFee = PairBorrowingFee.toJSON(message.pairBorrowingFee);
    }
    if (message.pairFundingFee !== undefined) {
      obj.pairFundingFee = PairFundingFee.toJSON(message.pairFundingFee);
    }
    if (message.pairRolloverFee !== undefined) {
      obj.pairRolloverFee = PairRolloverFee.toJSON(message.pairRolloverFee);
    }
    if (message.pairFixedFee !== undefined) {
      obj.pairFixedFee = PairFixedFee.toJSON(message.pairFixedFee);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Market>, I>>(base?: I): Market {
    return Market.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Market>, I>>(object: I): Market {
    const message = createBaseMarket();
    message.pairIndex = object.pairIndex ?? "";
    message.name = object.name ?? "";
    message.fixedSpreadP = object.fixedSpreadP ?? "";
    message.onePercentDepthAbove = object.onePercentDepthAbove ?? "";
    message.onePercentDepthBelow = object.onePercentDepthBelow ?? "";
    message.openInterest =
      object.openInterest !== undefined && object.openInterest !== null
        ? OpenInterest.fromPartial(object.openInterest)
        : undefined;
    message.pairBorrowingFee =
      object.pairBorrowingFee !== undefined && object.pairBorrowingFee !== null
        ? PairBorrowingFee.fromPartial(object.pairBorrowingFee)
        : undefined;
    message.pairFundingFee =
      object.pairFundingFee !== undefined && object.pairFundingFee !== null
        ? PairFundingFee.fromPartial(object.pairFundingFee)
        : undefined;
    message.pairRolloverFee =
      object.pairRolloverFee !== undefined && object.pairRolloverFee !== null
        ? PairRolloverFee.fromPartial(object.pairRolloverFee)
        : undefined;
    message.pairFixedFee =
      object.pairFixedFee !== undefined && object.pairFixedFee !== null
        ? PairFixedFee.fromPartial(object.pairFixedFee)
        : undefined;
    return message;
  },
};

function createBaseOpenInterest(): OpenInterest {
  return { pairIndex: "", oiLong: "", oiShort: "", oiMax: "" };
}

export const OpenInterest = {
  encode(
    message: OpenInterest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pairIndex !== "") {
      writer.uint32(10).string(message.pairIndex);
    }
    if (message.oiLong !== "") {
      writer.uint32(26).string(message.oiLong);
    }
    if (message.oiShort !== "") {
      writer.uint32(34).string(message.oiShort);
    }
    if (message.oiMax !== "") {
      writer.uint32(42).string(message.oiMax);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenInterest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenInterest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pairIndex = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.oiLong = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.oiShort = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.oiMax = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenInterest {
    return {
      pairIndex: isSet(object.pairIndex) ? String(object.pairIndex) : "",
      oiLong: isSet(object.oiLong) ? String(object.oiLong) : "",
      oiShort: isSet(object.oiShort) ? String(object.oiShort) : "",
      oiMax: isSet(object.oiMax) ? String(object.oiMax) : "",
    };
  },

  toJSON(message: OpenInterest): unknown {
    const obj: any = {};
    if (message.pairIndex !== "") {
      obj.pairIndex = message.pairIndex;
    }
    if (message.oiLong !== "") {
      obj.oiLong = message.oiLong;
    }
    if (message.oiShort !== "") {
      obj.oiShort = message.oiShort;
    }
    if (message.oiMax !== "") {
      obj.oiMax = message.oiMax;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OpenInterest>, I>>(
    base?: I,
  ): OpenInterest {
    return OpenInterest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OpenInterest>, I>>(
    object: I,
  ): OpenInterest {
    const message = createBaseOpenInterest();
    message.pairIndex = object.pairIndex ?? "";
    message.oiLong = object.oiLong ?? "";
    message.oiShort = object.oiShort ?? "";
    message.oiMax = object.oiMax ?? "";
    return message;
  },
};

function createBasePairBorrowingFee(): PairBorrowingFee {
  return { pairIndex: "", bfLong: "", bfShort: "" };
}

export const PairBorrowingFee = {
  encode(
    message: PairBorrowingFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pairIndex !== "") {
      writer.uint32(10).string(message.pairIndex);
    }
    if (message.bfLong !== "") {
      writer.uint32(18).string(message.bfLong);
    }
    if (message.bfShort !== "") {
      writer.uint32(26).string(message.bfShort);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PairBorrowingFee {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePairBorrowingFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pairIndex = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bfLong = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bfShort = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PairBorrowingFee {
    return {
      pairIndex: isSet(object.pairIndex) ? String(object.pairIndex) : "",
      bfLong: isSet(object.bfLong) ? String(object.bfLong) : "",
      bfShort: isSet(object.bfShort) ? String(object.bfShort) : "",
    };
  },

  toJSON(message: PairBorrowingFee): unknown {
    const obj: any = {};
    if (message.pairIndex !== "") {
      obj.pairIndex = message.pairIndex;
    }
    if (message.bfLong !== "") {
      obj.bfLong = message.bfLong;
    }
    if (message.bfShort !== "") {
      obj.bfShort = message.bfShort;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PairBorrowingFee>, I>>(
    base?: I,
  ): PairBorrowingFee {
    return PairBorrowingFee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PairBorrowingFee>, I>>(
    object: I,
  ): PairBorrowingFee {
    const message = createBasePairBorrowingFee();
    message.pairIndex = object.pairIndex ?? "";
    message.bfLong = object.bfLong ?? "";
    message.bfShort = object.bfShort ?? "";
    return message;
  },
};

function createBasePairFundingFee(): PairFundingFee {
  return {
    pairIndex: "",
    ffPerBlockP: "",
    accPerOiLong: "",
    accPerOiShort: "",
  };
}

export const PairFundingFee = {
  encode(
    message: PairFundingFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pairIndex !== "") {
      writer.uint32(10).string(message.pairIndex);
    }
    if (message.ffPerBlockP !== "") {
      writer.uint32(18).string(message.ffPerBlockP);
    }
    if (message.accPerOiLong !== "") {
      writer.uint32(26).string(message.accPerOiLong);
    }
    if (message.accPerOiShort !== "") {
      writer.uint32(34).string(message.accPerOiShort);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PairFundingFee {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePairFundingFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pairIndex = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ffPerBlockP = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.accPerOiLong = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.accPerOiShort = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PairFundingFee {
    return {
      pairIndex: isSet(object.pairIndex) ? String(object.pairIndex) : "",
      ffPerBlockP: isSet(object.ffPerBlockP) ? String(object.ffPerBlockP) : "",
      accPerOiLong: isSet(object.accPerOiLong)
        ? String(object.accPerOiLong)
        : "",
      accPerOiShort: isSet(object.accPerOiShort)
        ? String(object.accPerOiShort)
        : "",
    };
  },

  toJSON(message: PairFundingFee): unknown {
    const obj: any = {};
    if (message.pairIndex !== "") {
      obj.pairIndex = message.pairIndex;
    }
    if (message.ffPerBlockP !== "") {
      obj.ffPerBlockP = message.ffPerBlockP;
    }
    if (message.accPerOiLong !== "") {
      obj.accPerOiLong = message.accPerOiLong;
    }
    if (message.accPerOiShort !== "") {
      obj.accPerOiShort = message.accPerOiShort;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PairFundingFee>, I>>(
    base?: I,
  ): PairFundingFee {
    return PairFundingFee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PairFundingFee>, I>>(
    object: I,
  ): PairFundingFee {
    const message = createBasePairFundingFee();
    message.pairIndex = object.pairIndex ?? "";
    message.ffPerBlockP = object.ffPerBlockP ?? "";
    message.accPerOiLong = object.accPerOiLong ?? "";
    message.accPerOiShort = object.accPerOiShort ?? "";
    return message;
  },
};

function createBasePairRolloverFee(): PairRolloverFee {
  return { pairIndex: "", rolloverPerBlockP: "", accPerCollateral: "" };
}

export const PairRolloverFee = {
  encode(
    message: PairRolloverFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pairIndex !== "") {
      writer.uint32(10).string(message.pairIndex);
    }
    if (message.rolloverPerBlockP !== "") {
      writer.uint32(18).string(message.rolloverPerBlockP);
    }
    if (message.accPerCollateral !== "") {
      writer.uint32(26).string(message.accPerCollateral);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PairRolloverFee {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePairRolloverFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pairIndex = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rolloverPerBlockP = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.accPerCollateral = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PairRolloverFee {
    return {
      pairIndex: isSet(object.pairIndex) ? String(object.pairIndex) : "",
      rolloverPerBlockP: isSet(object.rolloverPerBlockP)
        ? String(object.rolloverPerBlockP)
        : "",
      accPerCollateral: isSet(object.accPerCollateral)
        ? String(object.accPerCollateral)
        : "",
    };
  },

  toJSON(message: PairRolloverFee): unknown {
    const obj: any = {};
    if (message.pairIndex !== "") {
      obj.pairIndex = message.pairIndex;
    }
    if (message.rolloverPerBlockP !== "") {
      obj.rolloverPerBlockP = message.rolloverPerBlockP;
    }
    if (message.accPerCollateral !== "") {
      obj.accPerCollateral = message.accPerCollateral;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PairRolloverFee>, I>>(
    base?: I,
  ): PairRolloverFee {
    return PairRolloverFee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PairRolloverFee>, I>>(
    object: I,
  ): PairRolloverFee {
    const message = createBasePairRolloverFee();
    message.pairIndex = object.pairIndex ?? "";
    message.rolloverPerBlockP = object.rolloverPerBlockP ?? "";
    message.accPerCollateral = object.accPerCollateral ?? "";
    return message;
  },
};

function createBasePairFixedFee(): PairFixedFee {
  return {
    pairIndex: "",
    openFeeP: "",
    closeFeeP: "",
    nftLimitOrderFeeP: "",
    minLevPosDai: "",
  };
}

export const PairFixedFee = {
  encode(
    message: PairFixedFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pairIndex !== "") {
      writer.uint32(10).string(message.pairIndex);
    }
    if (message.openFeeP !== "") {
      writer.uint32(18).string(message.openFeeP);
    }
    if (message.closeFeeP !== "") {
      writer.uint32(26).string(message.closeFeeP);
    }
    if (message.nftLimitOrderFeeP !== "") {
      writer.uint32(34).string(message.nftLimitOrderFeeP);
    }
    if (message.minLevPosDai !== "") {
      writer.uint32(42).string(message.minLevPosDai);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PairFixedFee {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePairFixedFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pairIndex = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.openFeeP = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.closeFeeP = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.nftLimitOrderFeeP = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.minLevPosDai = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PairFixedFee {
    return {
      pairIndex: isSet(object.pairIndex) ? String(object.pairIndex) : "",
      openFeeP: isSet(object.openFeeP) ? String(object.openFeeP) : "",
      closeFeeP: isSet(object.closeFeeP) ? String(object.closeFeeP) : "",
      nftLimitOrderFeeP: isSet(object.nftLimitOrderFeeP)
        ? String(object.nftLimitOrderFeeP)
        : "",
      minLevPosDai: isSet(object.minLevPosDai)
        ? String(object.minLevPosDai)
        : "",
    };
  },

  toJSON(message: PairFixedFee): unknown {
    const obj: any = {};
    if (message.pairIndex !== "") {
      obj.pairIndex = message.pairIndex;
    }
    if (message.openFeeP !== "") {
      obj.openFeeP = message.openFeeP;
    }
    if (message.closeFeeP !== "") {
      obj.closeFeeP = message.closeFeeP;
    }
    if (message.nftLimitOrderFeeP !== "") {
      obj.nftLimitOrderFeeP = message.nftLimitOrderFeeP;
    }
    if (message.minLevPosDai !== "") {
      obj.minLevPosDai = message.minLevPosDai;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PairFixedFee>, I>>(
    base?: I,
  ): PairFixedFee {
    return PairFixedFee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PairFixedFee>, I>>(
    object: I,
  ): PairFixedFee {
    const message = createBasePairFixedFee();
    message.pairIndex = object.pairIndex ?? "";
    message.openFeeP = object.openFeeP ?? "";
    message.closeFeeP = object.closeFeeP ?? "";
    message.nftLimitOrderFeeP = object.nftLimitOrderFeeP ?? "";
    message.minLevPosDai = object.minLevPosDai ?? "";
    return message;
  },
};

function createBaseHoneyWithdrawalRequest(): HoneyWithdrawalRequest {
  return {
    createdBy: "",
    owner: "",
    shares: "",
    epochCreated: "",
    unlockEpoch: "",
  };
}

export const HoneyWithdrawalRequest = {
  encode(
    message: HoneyWithdrawalRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.createdBy !== "") {
      writer.uint32(10).string(message.createdBy);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.shares !== "") {
      writer.uint32(26).string(message.shares);
    }
    if (message.epochCreated !== "") {
      writer.uint32(34).string(message.epochCreated);
    }
    if (message.unlockEpoch !== "") {
      writer.uint32(42).string(message.unlockEpoch);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HoneyWithdrawalRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHoneyWithdrawalRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.createdBy = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.shares = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.epochCreated = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.unlockEpoch = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HoneyWithdrawalRequest {
    return {
      createdBy: isSet(object.createdBy) ? String(object.createdBy) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      shares: isSet(object.shares) ? String(object.shares) : "",
      epochCreated: isSet(object.epochCreated)
        ? String(object.epochCreated)
        : "",
      unlockEpoch: isSet(object.unlockEpoch) ? String(object.unlockEpoch) : "",
    };
  },

  toJSON(message: HoneyWithdrawalRequest): unknown {
    const obj: any = {};
    if (message.createdBy !== "") {
      obj.createdBy = message.createdBy;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.shares !== "") {
      obj.shares = message.shares;
    }
    if (message.epochCreated !== "") {
      obj.epochCreated = message.epochCreated;
    }
    if (message.unlockEpoch !== "") {
      obj.unlockEpoch = message.unlockEpoch;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HoneyWithdrawalRequest>, I>>(
    base?: I,
  ): HoneyWithdrawalRequest {
    return HoneyWithdrawalRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HoneyWithdrawalRequest>, I>>(
    object: I,
  ): HoneyWithdrawalRequest {
    const message = createBaseHoneyWithdrawalRequest();
    message.createdBy = object.createdBy ?? "";
    message.owner = object.owner ?? "";
    message.shares = object.shares ?? "";
    message.epochCreated = object.epochCreated ?? "";
    message.unlockEpoch = object.unlockEpoch ?? "";
    return message;
  },
};

function createBaseHoneyWithdrawalCancel(): HoneyWithdrawalCancel {
  return {
    createdBy: "",
    owner: "",
    shares: "",
    epochCreated: "",
    unlockEpoch: "",
  };
}

export const HoneyWithdrawalCancel = {
  encode(
    message: HoneyWithdrawalCancel,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.createdBy !== "") {
      writer.uint32(10).string(message.createdBy);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.shares !== "") {
      writer.uint32(26).string(message.shares);
    }
    if (message.epochCreated !== "") {
      writer.uint32(34).string(message.epochCreated);
    }
    if (message.unlockEpoch !== "") {
      writer.uint32(42).string(message.unlockEpoch);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HoneyWithdrawalCancel {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHoneyWithdrawalCancel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.createdBy = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.shares = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.epochCreated = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.unlockEpoch = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HoneyWithdrawalCancel {
    return {
      createdBy: isSet(object.createdBy) ? String(object.createdBy) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      shares: isSet(object.shares) ? String(object.shares) : "",
      epochCreated: isSet(object.epochCreated)
        ? String(object.epochCreated)
        : "",
      unlockEpoch: isSet(object.unlockEpoch) ? String(object.unlockEpoch) : "",
    };
  },

  toJSON(message: HoneyWithdrawalCancel): unknown {
    const obj: any = {};
    if (message.createdBy !== "") {
      obj.createdBy = message.createdBy;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.shares !== "") {
      obj.shares = message.shares;
    }
    if (message.epochCreated !== "") {
      obj.epochCreated = message.epochCreated;
    }
    if (message.unlockEpoch !== "") {
      obj.unlockEpoch = message.unlockEpoch;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HoneyWithdrawalCancel>, I>>(
    base?: I,
  ): HoneyWithdrawalCancel {
    return HoneyWithdrawalCancel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HoneyWithdrawalCancel>, I>>(
    object: I,
  ): HoneyWithdrawalCancel {
    const message = createBaseHoneyWithdrawalCancel();
    message.createdBy = object.createdBy ?? "";
    message.owner = object.owner ?? "";
    message.shares = object.shares ?? "";
    message.epochCreated = object.epochCreated ?? "";
    message.unlockEpoch = object.unlockEpoch ?? "";
    return message;
  },
};

function createBaseAccountFees(): AccountFees {
  return { trader: "", fees: "" };
}

export const AccountFees = {
  encode(
    message: AccountFees,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.trader !== "") {
      writer.uint32(10).string(message.trader);
    }
    if (message.fees !== "") {
      writer.uint32(18).string(message.fees);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountFees {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trader = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fees = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountFees {
    return {
      trader: isSet(object.trader) ? String(object.trader) : "",
      fees: isSet(object.fees) ? String(object.fees) : "",
    };
  },

  toJSON(message: AccountFees): unknown {
    const obj: any = {};
    if (message.trader !== "") {
      obj.trader = message.trader;
    }
    if (message.fees !== "") {
      obj.fees = message.fees;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountFees>, I>>(base?: I): AccountFees {
    return AccountFees.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountFees>, I>>(
    object: I,
  ): AccountFees {
    const message = createBaseAccountFees();
    message.trader = object.trader ?? "";
    message.fees = object.fees ?? "";
    return message;
  },
};

function createBaseAccountPnL(): AccountPnL {
  return { trader: "", pnl: "" };
}

export const AccountPnL = {
  encode(
    message: AccountPnL,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.trader !== "") {
      writer.uint32(10).string(message.trader);
    }
    if (message.pnl !== "") {
      writer.uint32(18).string(message.pnl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountPnL {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountPnL();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trader = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pnl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountPnL {
    return {
      trader: isSet(object.trader) ? String(object.trader) : "",
      pnl: isSet(object.pnl) ? String(object.pnl) : "",
    };
  },

  toJSON(message: AccountPnL): unknown {
    const obj: any = {};
    if (message.trader !== "") {
      obj.trader = message.trader;
    }
    if (message.pnl !== "") {
      obj.pnl = message.pnl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountPnL>, I>>(base?: I): AccountPnL {
    return AccountPnL.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountPnL>, I>>(
    object: I,
  ): AccountPnL {
    const message = createBaseAccountPnL();
    message.trader = object.trader ?? "";
    message.pnl = object.pnl ?? "";
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
