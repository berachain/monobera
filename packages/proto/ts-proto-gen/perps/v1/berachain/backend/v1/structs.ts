/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "berachain.bts.backend.v1";

export interface Market {
  pairIndex: Long;
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
  pairIndex: Long;
  timestamp: Long;
  /** 1e18 DAI */
  oiLong: string;
  /** 1e18 DAI */
  oiShort: string;
  /** 1e18 DAI */
  oiMax: string;
}

export interface PairBorrowingFee {
  pairIndex: Long;
  bfLong: string;
  bfShort: string;
}

export interface PairFundingFee {
  pairIndex: Long;
  /** PRECISION (%) // funding fee per block (received/provided for long/short) */
  ffPerBlockP: string;
  /** 1e18 (DAI) // accrued funding fee per oi long */
  accPerOiLong: string;
  /** 1e18 (DAI) // accrued funding fee per oi short */
  accPerOiShort: string;
}

export interface PairRolloverFee {
  pairIndex: Long;
  /** PRECISION (%) // rolling over when position open (flat fee) */
  rolloverPerBlockP: string;
  /** 1e18 (DAI) */
  accPerCollateral: string;
}

export interface PairFixedFee {
  pairIndex: Long;
  /** PRECISION (% of leveraged pos) */
  openFeeP: string;
  /** PRECISION (% of leveraged pos) */
  closeFeeP: string;
  /** PRECISION (% of leveraged pos) */
  oracleFeeP: string;
  /** PRECISION (% of leveraged pos) */
  nftLimitOrderFeeP: string;
  /** PRECISION (% of leveraged pos) */
  referralFeeP: string;
  /** 1e18 (collateral x leverage, useful for min fee) */
  minLevPosDai: string;
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

function createBaseMarket(): Market {
  return {
    pairIndex: Long.UZERO,
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
    if (!message.pairIndex.isZero()) {
      writer.uint32(8).uint64(message.pairIndex);
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
          if (tag !== 8) {
            break;
          }

          message.pairIndex = reader.uint64() as Long;
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
      pairIndex: isSet(object.pairIndex)
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO,
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
    if (!message.pairIndex.isZero()) {
      obj.pairIndex = (message.pairIndex || Long.UZERO).toString();
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
    message.pairIndex =
      object.pairIndex !== undefined && object.pairIndex !== null
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO;
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
  return {
    pairIndex: Long.UZERO,
    timestamp: Long.UZERO,
    oiLong: "",
    oiShort: "",
    oiMax: "",
  };
}

export const OpenInterest = {
  encode(
    message: OpenInterest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.pairIndex.isZero()) {
      writer.uint32(8).uint64(message.pairIndex);
    }
    if (!message.timestamp.isZero()) {
      writer.uint32(16).uint64(message.timestamp);
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
          if (tag !== 8) {
            break;
          }

          message.pairIndex = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.timestamp = reader.uint64() as Long;
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
      pairIndex: isSet(object.pairIndex)
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO,
      timestamp: isSet(object.timestamp)
        ? Long.fromValue(object.timestamp)
        : Long.UZERO,
      oiLong: isSet(object.oiLong) ? String(object.oiLong) : "",
      oiShort: isSet(object.oiShort) ? String(object.oiShort) : "",
      oiMax: isSet(object.oiMax) ? String(object.oiMax) : "",
    };
  },

  toJSON(message: OpenInterest): unknown {
    const obj: any = {};
    if (!message.pairIndex.isZero()) {
      obj.pairIndex = (message.pairIndex || Long.UZERO).toString();
    }
    if (!message.timestamp.isZero()) {
      obj.timestamp = (message.timestamp || Long.UZERO).toString();
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
    message.pairIndex =
      object.pairIndex !== undefined && object.pairIndex !== null
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO;
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Long.fromValue(object.timestamp)
        : Long.UZERO;
    message.oiLong = object.oiLong ?? "";
    message.oiShort = object.oiShort ?? "";
    message.oiMax = object.oiMax ?? "";
    return message;
  },
};

function createBasePairBorrowingFee(): PairBorrowingFee {
  return { pairIndex: Long.UZERO, bfLong: "", bfShort: "" };
}

export const PairBorrowingFee = {
  encode(
    message: PairBorrowingFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.pairIndex.isZero()) {
      writer.uint32(8).uint64(message.pairIndex);
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
          if (tag !== 8) {
            break;
          }

          message.pairIndex = reader.uint64() as Long;
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
      pairIndex: isSet(object.pairIndex)
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO,
      bfLong: isSet(object.bfLong) ? String(object.bfLong) : "",
      bfShort: isSet(object.bfShort) ? String(object.bfShort) : "",
    };
  },

  toJSON(message: PairBorrowingFee): unknown {
    const obj: any = {};
    if (!message.pairIndex.isZero()) {
      obj.pairIndex = (message.pairIndex || Long.UZERO).toString();
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
    message.pairIndex =
      object.pairIndex !== undefined && object.pairIndex !== null
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO;
    message.bfLong = object.bfLong ?? "";
    message.bfShort = object.bfShort ?? "";
    return message;
  },
};

function createBasePairFundingFee(): PairFundingFee {
  return {
    pairIndex: Long.UZERO,
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
    if (!message.pairIndex.isZero()) {
      writer.uint32(8).uint64(message.pairIndex);
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
          if (tag !== 8) {
            break;
          }

          message.pairIndex = reader.uint64() as Long;
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
      pairIndex: isSet(object.pairIndex)
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO,
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
    if (!message.pairIndex.isZero()) {
      obj.pairIndex = (message.pairIndex || Long.UZERO).toString();
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
    message.pairIndex =
      object.pairIndex !== undefined && object.pairIndex !== null
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO;
    message.ffPerBlockP = object.ffPerBlockP ?? "";
    message.accPerOiLong = object.accPerOiLong ?? "";
    message.accPerOiShort = object.accPerOiShort ?? "";
    return message;
  },
};

function createBasePairRolloverFee(): PairRolloverFee {
  return { pairIndex: Long.UZERO, rolloverPerBlockP: "", accPerCollateral: "" };
}

export const PairRolloverFee = {
  encode(
    message: PairRolloverFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.pairIndex.isZero()) {
      writer.uint32(8).uint64(message.pairIndex);
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
          if (tag !== 8) {
            break;
          }

          message.pairIndex = reader.uint64() as Long;
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
      pairIndex: isSet(object.pairIndex)
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO,
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
    if (!message.pairIndex.isZero()) {
      obj.pairIndex = (message.pairIndex || Long.UZERO).toString();
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
    message.pairIndex =
      object.pairIndex !== undefined && object.pairIndex !== null
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO;
    message.rolloverPerBlockP = object.rolloverPerBlockP ?? "";
    message.accPerCollateral = object.accPerCollateral ?? "";
    return message;
  },
};

function createBasePairFixedFee(): PairFixedFee {
  return {
    pairIndex: Long.UZERO,
    openFeeP: "",
    closeFeeP: "",
    oracleFeeP: "",
    nftLimitOrderFeeP: "",
    referralFeeP: "",
    minLevPosDai: "",
  };
}

export const PairFixedFee = {
  encode(
    message: PairFixedFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.pairIndex.isZero()) {
      writer.uint32(8).uint64(message.pairIndex);
    }
    if (message.openFeeP !== "") {
      writer.uint32(18).string(message.openFeeP);
    }
    if (message.closeFeeP !== "") {
      writer.uint32(26).string(message.closeFeeP);
    }
    if (message.oracleFeeP !== "") {
      writer.uint32(34).string(message.oracleFeeP);
    }
    if (message.nftLimitOrderFeeP !== "") {
      writer.uint32(42).string(message.nftLimitOrderFeeP);
    }
    if (message.referralFeeP !== "") {
      writer.uint32(50).string(message.referralFeeP);
    }
    if (message.minLevPosDai !== "") {
      writer.uint32(58).string(message.minLevPosDai);
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
          if (tag !== 8) {
            break;
          }

          message.pairIndex = reader.uint64() as Long;
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

          message.oracleFeeP = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.nftLimitOrderFeeP = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.referralFeeP = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
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
      pairIndex: isSet(object.pairIndex)
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO,
      openFeeP: isSet(object.openFeeP) ? String(object.openFeeP) : "",
      closeFeeP: isSet(object.closeFeeP) ? String(object.closeFeeP) : "",
      oracleFeeP: isSet(object.oracleFeeP) ? String(object.oracleFeeP) : "",
      nftLimitOrderFeeP: isSet(object.nftLimitOrderFeeP)
        ? String(object.nftLimitOrderFeeP)
        : "",
      referralFeeP: isSet(object.referralFeeP)
        ? String(object.referralFeeP)
        : "",
      minLevPosDai: isSet(object.minLevPosDai)
        ? String(object.minLevPosDai)
        : "",
    };
  },

  toJSON(message: PairFixedFee): unknown {
    const obj: any = {};
    if (!message.pairIndex.isZero()) {
      obj.pairIndex = (message.pairIndex || Long.UZERO).toString();
    }
    if (message.openFeeP !== "") {
      obj.openFeeP = message.openFeeP;
    }
    if (message.closeFeeP !== "") {
      obj.closeFeeP = message.closeFeeP;
    }
    if (message.oracleFeeP !== "") {
      obj.oracleFeeP = message.oracleFeeP;
    }
    if (message.nftLimitOrderFeeP !== "") {
      obj.nftLimitOrderFeeP = message.nftLimitOrderFeeP;
    }
    if (message.referralFeeP !== "") {
      obj.referralFeeP = message.referralFeeP;
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
    message.pairIndex =
      object.pairIndex !== undefined && object.pairIndex !== null
        ? Long.fromValue(object.pairIndex)
        : Long.UZERO;
    message.openFeeP = object.openFeeP ?? "";
    message.closeFeeP = object.closeFeeP ?? "";
    message.oracleFeeP = object.oracleFeeP ?? "";
    message.nftLimitOrderFeeP = object.nftLimitOrderFeeP ?? "";
    message.referralFeeP = object.referralFeeP ?? "";
    message.minLevPosDai = object.minLevPosDai ?? "";
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
