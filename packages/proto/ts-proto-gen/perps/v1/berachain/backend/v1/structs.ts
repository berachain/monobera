/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "berachain.backend.v1";

export interface GlobalParams {
  group_index: string;
  group_name: string;
  max_leverage: string;
  min_leverage: string;
  /** % of current honey vault that can be used as collateral */
  max_collateral_p: string;
  /** global maximum collateral possible (1e18) */
  max_pos_honey: string;
  current_epoch: string;
  max_pending_market_orders: string;
  /** # of blocks */
  market_orders_timeout: string;
  max_trades_per_pair: string;
  global_oi_long: string;
  global_oi_short: string;
}

export interface Market {
  pair_index: string;
  name: string;
  /** PRECISION */
  fixed_spread_p: string;
  /** 1e18 HONEY */
  one_percent_depth_above: string;
  /** 1e18 HONEY */
  one_percent_depth_below: string;
  open_interest?: OpenInterest | undefined;
  pair_borrowing_fee?: PairBorrowingFee | undefined;
  pair_funding_fee?: PairFundingFee | undefined;
  pair_rollover_fee?: PairRolloverFee | undefined;
  pair_fixed_fee?: PairFixedFee | undefined;
}

export interface OpenInterest {
  pair_index: string;
  /** 1e18 HONEY */
  oi_long: string;
  /** 1e18 HONEY */
  oi_short: string;
  /** 1e18 HONEY */
  oi_max: string;
}

export interface PairBorrowingFee {
  pair_index: string;
  /** 1e10 (%) */
  bf_long: string;
  /** 1e10 (%) */
  bf_short: string;
}

export interface PairFundingFee {
  pair_index: string;
  /** PRECISION (%) // funding fee per block (received/provided for long/short) */
  ff_per_block_p: string;
  /** 1e18 (HONEY) // accrued funding fee per oi long */
  acc_per_oi_long: string;
  /** 1e18 (HONEY) // accrued funding fee per oi short */
  acc_per_oi_short: string;
}

export interface PairRolloverFee {
  pair_index: string;
  /** PRECISION (%) // rolling over when position open (flat fee) */
  rollover_per_block_p: string;
  /** 1e18 (HONEY) */
  acc_per_collateral: string;
}

export interface PairFixedFee {
  pair_index: string;
  /** PRECISION (% of leveraged pos) */
  open_fee_p: string;
  /** PRECISION (% of leveraged pos) */
  close_fee_p: string;
  /** PRECISION (% of leveraged pos) */
  nft_limit_order_fee_p: string;
  /** 1e18 (collateral x leverage, useful for min fee) */
  min_lev_pos_honey: string;
}

export interface HoneyWithdrawalRequest {
  created_by: string;
  owner: string;
  shares: string;
  epoch_created: string;
  unlock_epoch: string;
}

export interface HoneyWithdrawalCancel {
  created_by: string;
  owner: string;
  shares: string;
  epoch_created: string;
  unlock_epoch: string;
}

export interface OpenTrade {
  trader: string;
  pair_index: string;
  index: string;
  position_size: string;
  open_price: string;
  /** true for long, false for short */
  buy: boolean;
  leverage: string;
  tp: string;
  sl: string;
  /** (1e18) */
  borrowing_fee: string;
  /** (1e18) */
  rollover_fee: string;
  /** negative => trader earns fee, positive => trader pays fee (1e18) */
  funding_rate: string;
  /** (1e18) */
  closing_fee: string;
  /** (1e18) */
  open_fee: string;
  timestamp_open: string;
  /** (1e18) */
  liq_price: string;
}

export interface OpenLimitOrder {
  trader: string;
  pair_index: string;
  index: string;
  position_size: string;
  spread_reduction_p: string;
  /** true for long, false for short */
  buy: boolean;
  leverage: string;
  tp: string;
  sl: string;
  price: string;
  timestamp_placed: string;
}

export interface ClosedTrade {
  close_time: string;
  open_time: string;
  trader: string;
  pair_index: string;
  index: string;
  /** leveraged position size */
  volume: string;
  pnl: string;
  /** only nonzero if order was liquidated */
  liquidation: string;
  close_price: string;
  open_price: string;
  leverage: string;
  /** true for long, false for short */
  buy: boolean;
  tp: string;
  sl: string;
  close_type: string;
  rollover_fee: string;
  /** negative => trader earns fee, positive => trader pays fee */
  funding_rate: string;
  closing_fee: string;
  borrowing_fee: string;
  vault_fee: string;
  open_fee: string;
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

/**
 * SymbolInfo is the information of a symbol.
 * Same as TradingView API
 * https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.LibrarySymbolInfo
 */
export interface SymbolInfo {
  ticker: string;
  name: string;
  description: string;
  type: string;
  session: string;
  timezone: string;
  exchange: string;
  minmov: Long;
  pricescale: Long;
  visible_plots_set: string;
  supported_resolutions: string[];
  has_intraday: boolean;
  intraday_multipliers: string[];
}

/**
 * Same as TradingView API
 * https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.SearchSymbolResultItem
 */
export interface SearchSymbolResultItem {
  description: string;
  exchange: string;
  full_name: string;
  symbol: string;
  ticker: string;
  type: string;
}

export interface TradingSummary {
  time: number;
  volume: number;
  pnl: number;
  num_trades: Long;
  liquidation: number;
  fees_earned: number;
  fees_paid: number;
}

export interface Pagination {
  page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
}

export interface TradingLeaderboardItem {
  trader: string;
  value: number;
}

export interface PairHistoricalSummary {
  pair_index: Long;
  volume: number;
  pnl: number;
  num_trades: Long;
  liquidation: number;
  fees_earned: number;
  fees_paid: number;
}

export interface HoneyReward {
  fees_to_honey: string;
  fees_to_bgt: string;
  combined_fees: string;
  apr: string;
}

export interface ReferrerTraderDetails {
  referrer: string;
  trader: string;
  /** HONEY */
  volume_trader: string;
  /** HONEY */
  rewards: string;
}

function createBaseGlobalParams(): GlobalParams {
  return {
    group_index: "",
    group_name: "",
    max_leverage: "",
    min_leverage: "",
    max_collateral_p: "",
    max_pos_honey: "",
    current_epoch: "",
    max_pending_market_orders: "",
    market_orders_timeout: "",
    max_trades_per_pair: "",
    global_oi_long: "",
    global_oi_short: "",
  };
}

export const GlobalParams = {
  encode(
    message: GlobalParams,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.group_index !== "") {
      writer.uint32(10).string(message.group_index);
    }
    if (message.group_name !== "") {
      writer.uint32(18).string(message.group_name);
    }
    if (message.max_leverage !== "") {
      writer.uint32(26).string(message.max_leverage);
    }
    if (message.min_leverage !== "") {
      writer.uint32(34).string(message.min_leverage);
    }
    if (message.max_collateral_p !== "") {
      writer.uint32(42).string(message.max_collateral_p);
    }
    if (message.max_pos_honey !== "") {
      writer.uint32(50).string(message.max_pos_honey);
    }
    if (message.current_epoch !== "") {
      writer.uint32(74).string(message.current_epoch);
    }
    if (message.max_pending_market_orders !== "") {
      writer.uint32(82).string(message.max_pending_market_orders);
    }
    if (message.market_orders_timeout !== "") {
      writer.uint32(90).string(message.market_orders_timeout);
    }
    if (message.max_trades_per_pair !== "") {
      writer.uint32(98).string(message.max_trades_per_pair);
    }
    if (message.global_oi_long !== "") {
      writer.uint32(106).string(message.global_oi_long);
    }
    if (message.global_oi_short !== "") {
      writer.uint32(114).string(message.global_oi_short);
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

          message.group_index = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.group_name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.max_leverage = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.min_leverage = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.max_collateral_p = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.max_pos_honey = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.current_epoch = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.max_pending_market_orders = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.market_orders_timeout = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.max_trades_per_pair = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.global_oi_long = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.global_oi_short = reader.string();
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
      group_index: isSet(object.group_index) ? String(object.group_index) : "",
      group_name: isSet(object.group_name) ? String(object.group_name) : "",
      max_leverage: isSet(object.max_leverage)
        ? String(object.max_leverage)
        : "",
      min_leverage: isSet(object.min_leverage)
        ? String(object.min_leverage)
        : "",
      max_collateral_p: isSet(object.max_collateral_p)
        ? String(object.max_collateral_p)
        : "",
      max_pos_honey: isSet(object.max_pos_honey)
        ? String(object.max_pos_honey)
        : "",
      current_epoch: isSet(object.current_epoch)
        ? String(object.current_epoch)
        : "",
      max_pending_market_orders: isSet(object.max_pending_market_orders)
        ? String(object.max_pending_market_orders)
        : "",
      market_orders_timeout: isSet(object.market_orders_timeout)
        ? String(object.market_orders_timeout)
        : "",
      max_trades_per_pair: isSet(object.max_trades_per_pair)
        ? String(object.max_trades_per_pair)
        : "",
      global_oi_long: isSet(object.global_oi_long)
        ? String(object.global_oi_long)
        : "",
      global_oi_short: isSet(object.global_oi_short)
        ? String(object.global_oi_short)
        : "",
    };
  },

  toJSON(message: GlobalParams): unknown {
    const obj: any = {};
    if (message.group_index !== "") {
      obj.group_index = message.group_index;
    }
    if (message.group_name !== "") {
      obj.group_name = message.group_name;
    }
    if (message.max_leverage !== "") {
      obj.max_leverage = message.max_leverage;
    }
    if (message.min_leverage !== "") {
      obj.min_leverage = message.min_leverage;
    }
    if (message.max_collateral_p !== "") {
      obj.max_collateral_p = message.max_collateral_p;
    }
    if (message.max_pos_honey !== "") {
      obj.max_pos_honey = message.max_pos_honey;
    }
    if (message.current_epoch !== "") {
      obj.current_epoch = message.current_epoch;
    }
    if (message.max_pending_market_orders !== "") {
      obj.max_pending_market_orders = message.max_pending_market_orders;
    }
    if (message.market_orders_timeout !== "") {
      obj.market_orders_timeout = message.market_orders_timeout;
    }
    if (message.max_trades_per_pair !== "") {
      obj.max_trades_per_pair = message.max_trades_per_pair;
    }
    if (message.global_oi_long !== "") {
      obj.global_oi_long = message.global_oi_long;
    }
    if (message.global_oi_short !== "") {
      obj.global_oi_short = message.global_oi_short;
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
    message.group_index = object.group_index ?? "";
    message.group_name = object.group_name ?? "";
    message.max_leverage = object.max_leverage ?? "";
    message.min_leverage = object.min_leverage ?? "";
    message.max_collateral_p = object.max_collateral_p ?? "";
    message.max_pos_honey = object.max_pos_honey ?? "";
    message.current_epoch = object.current_epoch ?? "";
    message.max_pending_market_orders = object.max_pending_market_orders ?? "";
    message.market_orders_timeout = object.market_orders_timeout ?? "";
    message.max_trades_per_pair = object.max_trades_per_pair ?? "";
    message.global_oi_long = object.global_oi_long ?? "";
    message.global_oi_short = object.global_oi_short ?? "";
    return message;
  },
};

function createBaseMarket(): Market {
  return {
    pair_index: "",
    name: "",
    fixed_spread_p: "",
    one_percent_depth_above: "",
    one_percent_depth_below: "",
    open_interest: undefined,
    pair_borrowing_fee: undefined,
    pair_funding_fee: undefined,
    pair_rollover_fee: undefined,
    pair_fixed_fee: undefined,
  };
}

export const Market = {
  encode(
    message: Market,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pair_index !== "") {
      writer.uint32(10).string(message.pair_index);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.fixed_spread_p !== "") {
      writer.uint32(26).string(message.fixed_spread_p);
    }
    if (message.one_percent_depth_above !== "") {
      writer.uint32(34).string(message.one_percent_depth_above);
    }
    if (message.one_percent_depth_below !== "") {
      writer.uint32(42).string(message.one_percent_depth_below);
    }
    if (message.open_interest !== undefined) {
      OpenInterest.encode(
        message.open_interest,
        writer.uint32(50).fork(),
      ).ldelim();
    }
    if (message.pair_borrowing_fee !== undefined) {
      PairBorrowingFee.encode(
        message.pair_borrowing_fee,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    if (message.pair_funding_fee !== undefined) {
      PairFundingFee.encode(
        message.pair_funding_fee,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.pair_rollover_fee !== undefined) {
      PairRolloverFee.encode(
        message.pair_rollover_fee,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    if (message.pair_fixed_fee !== undefined) {
      PairFixedFee.encode(
        message.pair_fixed_fee,
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

          message.pair_index = reader.string();
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

          message.fixed_spread_p = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.one_percent_depth_above = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.one_percent_depth_below = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.open_interest = OpenInterest.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.pair_borrowing_fee = PairBorrowingFee.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.pair_funding_fee = PairFundingFee.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.pair_rollover_fee = PairRolloverFee.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.pair_fixed_fee = PairFixedFee.decode(reader, reader.uint32());
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
      pair_index: isSet(object.pair_index) ? String(object.pair_index) : "",
      name: isSet(object.name) ? String(object.name) : "",
      fixed_spread_p: isSet(object.fixed_spread_p)
        ? String(object.fixed_spread_p)
        : "",
      one_percent_depth_above: isSet(object.one_percent_depth_above)
        ? String(object.one_percent_depth_above)
        : "",
      one_percent_depth_below: isSet(object.one_percent_depth_below)
        ? String(object.one_percent_depth_below)
        : "",
      open_interest: isSet(object.open_interest)
        ? OpenInterest.fromJSON(object.open_interest)
        : undefined,
      pair_borrowing_fee: isSet(object.pair_borrowing_fee)
        ? PairBorrowingFee.fromJSON(object.pair_borrowing_fee)
        : undefined,
      pair_funding_fee: isSet(object.pair_funding_fee)
        ? PairFundingFee.fromJSON(object.pair_funding_fee)
        : undefined,
      pair_rollover_fee: isSet(object.pair_rollover_fee)
        ? PairRolloverFee.fromJSON(object.pair_rollover_fee)
        : undefined,
      pair_fixed_fee: isSet(object.pair_fixed_fee)
        ? PairFixedFee.fromJSON(object.pair_fixed_fee)
        : undefined,
    };
  },

  toJSON(message: Market): unknown {
    const obj: any = {};
    if (message.pair_index !== "") {
      obj.pair_index = message.pair_index;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.fixed_spread_p !== "") {
      obj.fixed_spread_p = message.fixed_spread_p;
    }
    if (message.one_percent_depth_above !== "") {
      obj.one_percent_depth_above = message.one_percent_depth_above;
    }
    if (message.one_percent_depth_below !== "") {
      obj.one_percent_depth_below = message.one_percent_depth_below;
    }
    if (message.open_interest !== undefined) {
      obj.open_interest = OpenInterest.toJSON(message.open_interest);
    }
    if (message.pair_borrowing_fee !== undefined) {
      obj.pair_borrowing_fee = PairBorrowingFee.toJSON(
        message.pair_borrowing_fee,
      );
    }
    if (message.pair_funding_fee !== undefined) {
      obj.pair_funding_fee = PairFundingFee.toJSON(message.pair_funding_fee);
    }
    if (message.pair_rollover_fee !== undefined) {
      obj.pair_rollover_fee = PairRolloverFee.toJSON(message.pair_rollover_fee);
    }
    if (message.pair_fixed_fee !== undefined) {
      obj.pair_fixed_fee = PairFixedFee.toJSON(message.pair_fixed_fee);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Market>, I>>(base?: I): Market {
    return Market.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Market>, I>>(object: I): Market {
    const message = createBaseMarket();
    message.pair_index = object.pair_index ?? "";
    message.name = object.name ?? "";
    message.fixed_spread_p = object.fixed_spread_p ?? "";
    message.one_percent_depth_above = object.one_percent_depth_above ?? "";
    message.one_percent_depth_below = object.one_percent_depth_below ?? "";
    message.open_interest =
      object.open_interest !== undefined && object.open_interest !== null
        ? OpenInterest.fromPartial(object.open_interest)
        : undefined;
    message.pair_borrowing_fee =
      object.pair_borrowing_fee !== undefined &&
      object.pair_borrowing_fee !== null
        ? PairBorrowingFee.fromPartial(object.pair_borrowing_fee)
        : undefined;
    message.pair_funding_fee =
      object.pair_funding_fee !== undefined && object.pair_funding_fee !== null
        ? PairFundingFee.fromPartial(object.pair_funding_fee)
        : undefined;
    message.pair_rollover_fee =
      object.pair_rollover_fee !== undefined &&
      object.pair_rollover_fee !== null
        ? PairRolloverFee.fromPartial(object.pair_rollover_fee)
        : undefined;
    message.pair_fixed_fee =
      object.pair_fixed_fee !== undefined && object.pair_fixed_fee !== null
        ? PairFixedFee.fromPartial(object.pair_fixed_fee)
        : undefined;
    return message;
  },
};

function createBaseOpenInterest(): OpenInterest {
  return { pair_index: "", oi_long: "", oi_short: "", oi_max: "" };
}

export const OpenInterest = {
  encode(
    message: OpenInterest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pair_index !== "") {
      writer.uint32(10).string(message.pair_index);
    }
    if (message.oi_long !== "") {
      writer.uint32(26).string(message.oi_long);
    }
    if (message.oi_short !== "") {
      writer.uint32(34).string(message.oi_short);
    }
    if (message.oi_max !== "") {
      writer.uint32(42).string(message.oi_max);
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

          message.pair_index = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.oi_long = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.oi_short = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.oi_max = reader.string();
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
      pair_index: isSet(object.pair_index) ? String(object.pair_index) : "",
      oi_long: isSet(object.oi_long) ? String(object.oi_long) : "",
      oi_short: isSet(object.oi_short) ? String(object.oi_short) : "",
      oi_max: isSet(object.oi_max) ? String(object.oi_max) : "",
    };
  },

  toJSON(message: OpenInterest): unknown {
    const obj: any = {};
    if (message.pair_index !== "") {
      obj.pair_index = message.pair_index;
    }
    if (message.oi_long !== "") {
      obj.oi_long = message.oi_long;
    }
    if (message.oi_short !== "") {
      obj.oi_short = message.oi_short;
    }
    if (message.oi_max !== "") {
      obj.oi_max = message.oi_max;
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
    message.pair_index = object.pair_index ?? "";
    message.oi_long = object.oi_long ?? "";
    message.oi_short = object.oi_short ?? "";
    message.oi_max = object.oi_max ?? "";
    return message;
  },
};

function createBasePairBorrowingFee(): PairBorrowingFee {
  return { pair_index: "", bf_long: "", bf_short: "" };
}

export const PairBorrowingFee = {
  encode(
    message: PairBorrowingFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pair_index !== "") {
      writer.uint32(10).string(message.pair_index);
    }
    if (message.bf_long !== "") {
      writer.uint32(18).string(message.bf_long);
    }
    if (message.bf_short !== "") {
      writer.uint32(26).string(message.bf_short);
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

          message.pair_index = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bf_long = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bf_short = reader.string();
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
      pair_index: isSet(object.pair_index) ? String(object.pair_index) : "",
      bf_long: isSet(object.bf_long) ? String(object.bf_long) : "",
      bf_short: isSet(object.bf_short) ? String(object.bf_short) : "",
    };
  },

  toJSON(message: PairBorrowingFee): unknown {
    const obj: any = {};
    if (message.pair_index !== "") {
      obj.pair_index = message.pair_index;
    }
    if (message.bf_long !== "") {
      obj.bf_long = message.bf_long;
    }
    if (message.bf_short !== "") {
      obj.bf_short = message.bf_short;
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
    message.pair_index = object.pair_index ?? "";
    message.bf_long = object.bf_long ?? "";
    message.bf_short = object.bf_short ?? "";
    return message;
  },
};

function createBasePairFundingFee(): PairFundingFee {
  return {
    pair_index: "",
    ff_per_block_p: "",
    acc_per_oi_long: "",
    acc_per_oi_short: "",
  };
}

export const PairFundingFee = {
  encode(
    message: PairFundingFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pair_index !== "") {
      writer.uint32(10).string(message.pair_index);
    }
    if (message.ff_per_block_p !== "") {
      writer.uint32(18).string(message.ff_per_block_p);
    }
    if (message.acc_per_oi_long !== "") {
      writer.uint32(26).string(message.acc_per_oi_long);
    }
    if (message.acc_per_oi_short !== "") {
      writer.uint32(34).string(message.acc_per_oi_short);
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

          message.pair_index = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ff_per_block_p = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.acc_per_oi_long = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.acc_per_oi_short = reader.string();
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
      pair_index: isSet(object.pair_index) ? String(object.pair_index) : "",
      ff_per_block_p: isSet(object.ff_per_block_p)
        ? String(object.ff_per_block_p)
        : "",
      acc_per_oi_long: isSet(object.acc_per_oi_long)
        ? String(object.acc_per_oi_long)
        : "",
      acc_per_oi_short: isSet(object.acc_per_oi_short)
        ? String(object.acc_per_oi_short)
        : "",
    };
  },

  toJSON(message: PairFundingFee): unknown {
    const obj: any = {};
    if (message.pair_index !== "") {
      obj.pair_index = message.pair_index;
    }
    if (message.ff_per_block_p !== "") {
      obj.ff_per_block_p = message.ff_per_block_p;
    }
    if (message.acc_per_oi_long !== "") {
      obj.acc_per_oi_long = message.acc_per_oi_long;
    }
    if (message.acc_per_oi_short !== "") {
      obj.acc_per_oi_short = message.acc_per_oi_short;
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
    message.pair_index = object.pair_index ?? "";
    message.ff_per_block_p = object.ff_per_block_p ?? "";
    message.acc_per_oi_long = object.acc_per_oi_long ?? "";
    message.acc_per_oi_short = object.acc_per_oi_short ?? "";
    return message;
  },
};

function createBasePairRolloverFee(): PairRolloverFee {
  return { pair_index: "", rollover_per_block_p: "", acc_per_collateral: "" };
}

export const PairRolloverFee = {
  encode(
    message: PairRolloverFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pair_index !== "") {
      writer.uint32(10).string(message.pair_index);
    }
    if (message.rollover_per_block_p !== "") {
      writer.uint32(18).string(message.rollover_per_block_p);
    }
    if (message.acc_per_collateral !== "") {
      writer.uint32(26).string(message.acc_per_collateral);
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

          message.pair_index = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rollover_per_block_p = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.acc_per_collateral = reader.string();
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
      pair_index: isSet(object.pair_index) ? String(object.pair_index) : "",
      rollover_per_block_p: isSet(object.rollover_per_block_p)
        ? String(object.rollover_per_block_p)
        : "",
      acc_per_collateral: isSet(object.acc_per_collateral)
        ? String(object.acc_per_collateral)
        : "",
    };
  },

  toJSON(message: PairRolloverFee): unknown {
    const obj: any = {};
    if (message.pair_index !== "") {
      obj.pair_index = message.pair_index;
    }
    if (message.rollover_per_block_p !== "") {
      obj.rollover_per_block_p = message.rollover_per_block_p;
    }
    if (message.acc_per_collateral !== "") {
      obj.acc_per_collateral = message.acc_per_collateral;
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
    message.pair_index = object.pair_index ?? "";
    message.rollover_per_block_p = object.rollover_per_block_p ?? "";
    message.acc_per_collateral = object.acc_per_collateral ?? "";
    return message;
  },
};

function createBasePairFixedFee(): PairFixedFee {
  return {
    pair_index: "",
    open_fee_p: "",
    close_fee_p: "",
    nft_limit_order_fee_p: "",
    min_lev_pos_honey: "",
  };
}

export const PairFixedFee = {
  encode(
    message: PairFixedFee,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pair_index !== "") {
      writer.uint32(10).string(message.pair_index);
    }
    if (message.open_fee_p !== "") {
      writer.uint32(18).string(message.open_fee_p);
    }
    if (message.close_fee_p !== "") {
      writer.uint32(26).string(message.close_fee_p);
    }
    if (message.nft_limit_order_fee_p !== "") {
      writer.uint32(34).string(message.nft_limit_order_fee_p);
    }
    if (message.min_lev_pos_honey !== "") {
      writer.uint32(42).string(message.min_lev_pos_honey);
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

          message.pair_index = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.open_fee_p = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.close_fee_p = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.nft_limit_order_fee_p = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.min_lev_pos_honey = reader.string();
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
      pair_index: isSet(object.pair_index) ? String(object.pair_index) : "",
      open_fee_p: isSet(object.open_fee_p) ? String(object.open_fee_p) : "",
      close_fee_p: isSet(object.close_fee_p) ? String(object.close_fee_p) : "",
      nft_limit_order_fee_p: isSet(object.nft_limit_order_fee_p)
        ? String(object.nft_limit_order_fee_p)
        : "",
      min_lev_pos_honey: isSet(object.min_lev_pos_honey)
        ? String(object.min_lev_pos_honey)
        : "",
    };
  },

  toJSON(message: PairFixedFee): unknown {
    const obj: any = {};
    if (message.pair_index !== "") {
      obj.pair_index = message.pair_index;
    }
    if (message.open_fee_p !== "") {
      obj.open_fee_p = message.open_fee_p;
    }
    if (message.close_fee_p !== "") {
      obj.close_fee_p = message.close_fee_p;
    }
    if (message.nft_limit_order_fee_p !== "") {
      obj.nft_limit_order_fee_p = message.nft_limit_order_fee_p;
    }
    if (message.min_lev_pos_honey !== "") {
      obj.min_lev_pos_honey = message.min_lev_pos_honey;
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
    message.pair_index = object.pair_index ?? "";
    message.open_fee_p = object.open_fee_p ?? "";
    message.close_fee_p = object.close_fee_p ?? "";
    message.nft_limit_order_fee_p = object.nft_limit_order_fee_p ?? "";
    message.min_lev_pos_honey = object.min_lev_pos_honey ?? "";
    return message;
  },
};

function createBaseHoneyWithdrawalRequest(): HoneyWithdrawalRequest {
  return {
    created_by: "",
    owner: "",
    shares: "",
    epoch_created: "",
    unlock_epoch: "",
  };
}

export const HoneyWithdrawalRequest = {
  encode(
    message: HoneyWithdrawalRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.created_by !== "") {
      writer.uint32(10).string(message.created_by);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.shares !== "") {
      writer.uint32(26).string(message.shares);
    }
    if (message.epoch_created !== "") {
      writer.uint32(34).string(message.epoch_created);
    }
    if (message.unlock_epoch !== "") {
      writer.uint32(42).string(message.unlock_epoch);
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

          message.created_by = reader.string();
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

          message.epoch_created = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.unlock_epoch = reader.string();
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
      created_by: isSet(object.created_by) ? String(object.created_by) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      shares: isSet(object.shares) ? String(object.shares) : "",
      epoch_created: isSet(object.epoch_created)
        ? String(object.epoch_created)
        : "",
      unlock_epoch: isSet(object.unlock_epoch)
        ? String(object.unlock_epoch)
        : "",
    };
  },

  toJSON(message: HoneyWithdrawalRequest): unknown {
    const obj: any = {};
    if (message.created_by !== "") {
      obj.created_by = message.created_by;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.shares !== "") {
      obj.shares = message.shares;
    }
    if (message.epoch_created !== "") {
      obj.epoch_created = message.epoch_created;
    }
    if (message.unlock_epoch !== "") {
      obj.unlock_epoch = message.unlock_epoch;
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
    message.created_by = object.created_by ?? "";
    message.owner = object.owner ?? "";
    message.shares = object.shares ?? "";
    message.epoch_created = object.epoch_created ?? "";
    message.unlock_epoch = object.unlock_epoch ?? "";
    return message;
  },
};

function createBaseHoneyWithdrawalCancel(): HoneyWithdrawalCancel {
  return {
    created_by: "",
    owner: "",
    shares: "",
    epoch_created: "",
    unlock_epoch: "",
  };
}

export const HoneyWithdrawalCancel = {
  encode(
    message: HoneyWithdrawalCancel,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.created_by !== "") {
      writer.uint32(10).string(message.created_by);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.shares !== "") {
      writer.uint32(26).string(message.shares);
    }
    if (message.epoch_created !== "") {
      writer.uint32(34).string(message.epoch_created);
    }
    if (message.unlock_epoch !== "") {
      writer.uint32(42).string(message.unlock_epoch);
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

          message.created_by = reader.string();
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

          message.epoch_created = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.unlock_epoch = reader.string();
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
      created_by: isSet(object.created_by) ? String(object.created_by) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      shares: isSet(object.shares) ? String(object.shares) : "",
      epoch_created: isSet(object.epoch_created)
        ? String(object.epoch_created)
        : "",
      unlock_epoch: isSet(object.unlock_epoch)
        ? String(object.unlock_epoch)
        : "",
    };
  },

  toJSON(message: HoneyWithdrawalCancel): unknown {
    const obj: any = {};
    if (message.created_by !== "") {
      obj.created_by = message.created_by;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.shares !== "") {
      obj.shares = message.shares;
    }
    if (message.epoch_created !== "") {
      obj.epoch_created = message.epoch_created;
    }
    if (message.unlock_epoch !== "") {
      obj.unlock_epoch = message.unlock_epoch;
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
    message.created_by = object.created_by ?? "";
    message.owner = object.owner ?? "";
    message.shares = object.shares ?? "";
    message.epoch_created = object.epoch_created ?? "";
    message.unlock_epoch = object.unlock_epoch ?? "";
    return message;
  },
};

function createBaseOpenTrade(): OpenTrade {
  return {
    trader: "",
    pair_index: "",
    index: "",
    position_size: "",
    open_price: "",
    buy: false,
    leverage: "",
    tp: "",
    sl: "",
    borrowing_fee: "",
    rollover_fee: "",
    funding_rate: "",
    closing_fee: "",
    open_fee: "",
    timestamp_open: "",
    liq_price: "",
  };
}

export const OpenTrade = {
  encode(
    message: OpenTrade,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.trader !== "") {
      writer.uint32(10).string(message.trader);
    }
    if (message.pair_index !== "") {
      writer.uint32(18).string(message.pair_index);
    }
    if (message.index !== "") {
      writer.uint32(26).string(message.index);
    }
    if (message.position_size !== "") {
      writer.uint32(34).string(message.position_size);
    }
    if (message.open_price !== "") {
      writer.uint32(42).string(message.open_price);
    }
    if (message.buy === true) {
      writer.uint32(48).bool(message.buy);
    }
    if (message.leverage !== "") {
      writer.uint32(58).string(message.leverage);
    }
    if (message.tp !== "") {
      writer.uint32(66).string(message.tp);
    }
    if (message.sl !== "") {
      writer.uint32(74).string(message.sl);
    }
    if (message.borrowing_fee !== "") {
      writer.uint32(82).string(message.borrowing_fee);
    }
    if (message.rollover_fee !== "") {
      writer.uint32(90).string(message.rollover_fee);
    }
    if (message.funding_rate !== "") {
      writer.uint32(98).string(message.funding_rate);
    }
    if (message.closing_fee !== "") {
      writer.uint32(106).string(message.closing_fee);
    }
    if (message.open_fee !== "") {
      writer.uint32(114).string(message.open_fee);
    }
    if (message.timestamp_open !== "") {
      writer.uint32(122).string(message.timestamp_open);
    }
    if (message.liq_price !== "") {
      writer.uint32(130).string(message.liq_price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenTrade {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenTrade();
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

          message.pair_index = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.index = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.position_size = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.open_price = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.buy = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.leverage = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.tp = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.sl = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.borrowing_fee = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.rollover_fee = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.funding_rate = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.closing_fee = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.open_fee = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.timestamp_open = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.liq_price = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenTrade {
    return {
      trader: isSet(object.trader) ? String(object.trader) : "",
      pair_index: isSet(object.pair_index) ? String(object.pair_index) : "",
      index: isSet(object.index) ? String(object.index) : "",
      position_size: isSet(object.position_size)
        ? String(object.position_size)
        : "",
      open_price: isSet(object.open_price) ? String(object.open_price) : "",
      buy: isSet(object.buy) ? Boolean(object.buy) : false,
      leverage: isSet(object.leverage) ? String(object.leverage) : "",
      tp: isSet(object.tp) ? String(object.tp) : "",
      sl: isSet(object.sl) ? String(object.sl) : "",
      borrowing_fee: isSet(object.borrowing_fee)
        ? String(object.borrowing_fee)
        : "",
      rollover_fee: isSet(object.rollover_fee)
        ? String(object.rollover_fee)
        : "",
      funding_rate: isSet(object.funding_rate)
        ? String(object.funding_rate)
        : "",
      closing_fee: isSet(object.closing_fee) ? String(object.closing_fee) : "",
      open_fee: isSet(object.open_fee) ? String(object.open_fee) : "",
      timestamp_open: isSet(object.timestamp_open)
        ? String(object.timestamp_open)
        : "",
      liq_price: isSet(object.liq_price) ? String(object.liq_price) : "",
    };
  },

  toJSON(message: OpenTrade): unknown {
    const obj: any = {};
    if (message.trader !== "") {
      obj.trader = message.trader;
    }
    if (message.pair_index !== "") {
      obj.pair_index = message.pair_index;
    }
    if (message.index !== "") {
      obj.index = message.index;
    }
    if (message.position_size !== "") {
      obj.position_size = message.position_size;
    }
    if (message.open_price !== "") {
      obj.open_price = message.open_price;
    }
    if (message.buy === true) {
      obj.buy = message.buy;
    }
    if (message.leverage !== "") {
      obj.leverage = message.leverage;
    }
    if (message.tp !== "") {
      obj.tp = message.tp;
    }
    if (message.sl !== "") {
      obj.sl = message.sl;
    }
    if (message.borrowing_fee !== "") {
      obj.borrowing_fee = message.borrowing_fee;
    }
    if (message.rollover_fee !== "") {
      obj.rollover_fee = message.rollover_fee;
    }
    if (message.funding_rate !== "") {
      obj.funding_rate = message.funding_rate;
    }
    if (message.closing_fee !== "") {
      obj.closing_fee = message.closing_fee;
    }
    if (message.open_fee !== "") {
      obj.open_fee = message.open_fee;
    }
    if (message.timestamp_open !== "") {
      obj.timestamp_open = message.timestamp_open;
    }
    if (message.liq_price !== "") {
      obj.liq_price = message.liq_price;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OpenTrade>, I>>(base?: I): OpenTrade {
    return OpenTrade.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OpenTrade>, I>>(
    object: I,
  ): OpenTrade {
    const message = createBaseOpenTrade();
    message.trader = object.trader ?? "";
    message.pair_index = object.pair_index ?? "";
    message.index = object.index ?? "";
    message.position_size = object.position_size ?? "";
    message.open_price = object.open_price ?? "";
    message.buy = object.buy ?? false;
    message.leverage = object.leverage ?? "";
    message.tp = object.tp ?? "";
    message.sl = object.sl ?? "";
    message.borrowing_fee = object.borrowing_fee ?? "";
    message.rollover_fee = object.rollover_fee ?? "";
    message.funding_rate = object.funding_rate ?? "";
    message.closing_fee = object.closing_fee ?? "";
    message.open_fee = object.open_fee ?? "";
    message.timestamp_open = object.timestamp_open ?? "";
    message.liq_price = object.liq_price ?? "";
    return message;
  },
};

function createBaseOpenLimitOrder(): OpenLimitOrder {
  return {
    trader: "",
    pair_index: "",
    index: "",
    position_size: "",
    spread_reduction_p: "",
    buy: false,
    leverage: "",
    tp: "",
    sl: "",
    price: "",
    timestamp_placed: "",
  };
}

export const OpenLimitOrder = {
  encode(
    message: OpenLimitOrder,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.trader !== "") {
      writer.uint32(10).string(message.trader);
    }
    if (message.pair_index !== "") {
      writer.uint32(18).string(message.pair_index);
    }
    if (message.index !== "") {
      writer.uint32(26).string(message.index);
    }
    if (message.position_size !== "") {
      writer.uint32(34).string(message.position_size);
    }
    if (message.spread_reduction_p !== "") {
      writer.uint32(42).string(message.spread_reduction_p);
    }
    if (message.buy === true) {
      writer.uint32(48).bool(message.buy);
    }
    if (message.leverage !== "") {
      writer.uint32(58).string(message.leverage);
    }
    if (message.tp !== "") {
      writer.uint32(66).string(message.tp);
    }
    if (message.sl !== "") {
      writer.uint32(74).string(message.sl);
    }
    if (message.price !== "") {
      writer.uint32(82).string(message.price);
    }
    if (message.timestamp_placed !== "") {
      writer.uint32(90).string(message.timestamp_placed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenLimitOrder {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenLimitOrder();
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

          message.pair_index = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.index = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.position_size = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.spread_reduction_p = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.buy = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.leverage = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.tp = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.sl = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.price = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.timestamp_placed = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenLimitOrder {
    return {
      trader: isSet(object.trader) ? String(object.trader) : "",
      pair_index: isSet(object.pair_index) ? String(object.pair_index) : "",
      index: isSet(object.index) ? String(object.index) : "",
      position_size: isSet(object.position_size)
        ? String(object.position_size)
        : "",
      spread_reduction_p: isSet(object.spread_reduction_p)
        ? String(object.spread_reduction_p)
        : "",
      buy: isSet(object.buy) ? Boolean(object.buy) : false,
      leverage: isSet(object.leverage) ? String(object.leverage) : "",
      tp: isSet(object.tp) ? String(object.tp) : "",
      sl: isSet(object.sl) ? String(object.sl) : "",
      price: isSet(object.price) ? String(object.price) : "",
      timestamp_placed: isSet(object.timestamp_placed)
        ? String(object.timestamp_placed)
        : "",
    };
  },

  toJSON(message: OpenLimitOrder): unknown {
    const obj: any = {};
    if (message.trader !== "") {
      obj.trader = message.trader;
    }
    if (message.pair_index !== "") {
      obj.pair_index = message.pair_index;
    }
    if (message.index !== "") {
      obj.index = message.index;
    }
    if (message.position_size !== "") {
      obj.position_size = message.position_size;
    }
    if (message.spread_reduction_p !== "") {
      obj.spread_reduction_p = message.spread_reduction_p;
    }
    if (message.buy === true) {
      obj.buy = message.buy;
    }
    if (message.leverage !== "") {
      obj.leverage = message.leverage;
    }
    if (message.tp !== "") {
      obj.tp = message.tp;
    }
    if (message.sl !== "") {
      obj.sl = message.sl;
    }
    if (message.price !== "") {
      obj.price = message.price;
    }
    if (message.timestamp_placed !== "") {
      obj.timestamp_placed = message.timestamp_placed;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OpenLimitOrder>, I>>(
    base?: I,
  ): OpenLimitOrder {
    return OpenLimitOrder.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OpenLimitOrder>, I>>(
    object: I,
  ): OpenLimitOrder {
    const message = createBaseOpenLimitOrder();
    message.trader = object.trader ?? "";
    message.pair_index = object.pair_index ?? "";
    message.index = object.index ?? "";
    message.position_size = object.position_size ?? "";
    message.spread_reduction_p = object.spread_reduction_p ?? "";
    message.buy = object.buy ?? false;
    message.leverage = object.leverage ?? "";
    message.tp = object.tp ?? "";
    message.sl = object.sl ?? "";
    message.price = object.price ?? "";
    message.timestamp_placed = object.timestamp_placed ?? "";
    return message;
  },
};

function createBaseClosedTrade(): ClosedTrade {
  return {
    close_time: "",
    open_time: "",
    trader: "",
    pair_index: "",
    index: "",
    volume: "",
    pnl: "",
    liquidation: "",
    close_price: "",
    open_price: "",
    leverage: "",
    buy: false,
    tp: "",
    sl: "",
    close_type: "",
    rollover_fee: "",
    funding_rate: "",
    closing_fee: "",
    borrowing_fee: "",
    vault_fee: "",
    open_fee: "",
  };
}

export const ClosedTrade = {
  encode(
    message: ClosedTrade,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.close_time !== "") {
      writer.uint32(10).string(message.close_time);
    }
    if (message.open_time !== "") {
      writer.uint32(18).string(message.open_time);
    }
    if (message.trader !== "") {
      writer.uint32(26).string(message.trader);
    }
    if (message.pair_index !== "") {
      writer.uint32(34).string(message.pair_index);
    }
    if (message.index !== "") {
      writer.uint32(42).string(message.index);
    }
    if (message.volume !== "") {
      writer.uint32(50).string(message.volume);
    }
    if (message.pnl !== "") {
      writer.uint32(58).string(message.pnl);
    }
    if (message.liquidation !== "") {
      writer.uint32(66).string(message.liquidation);
    }
    if (message.close_price !== "") {
      writer.uint32(74).string(message.close_price);
    }
    if (message.open_price !== "") {
      writer.uint32(82).string(message.open_price);
    }
    if (message.leverage !== "") {
      writer.uint32(90).string(message.leverage);
    }
    if (message.buy === true) {
      writer.uint32(96).bool(message.buy);
    }
    if (message.tp !== "") {
      writer.uint32(106).string(message.tp);
    }
    if (message.sl !== "") {
      writer.uint32(114).string(message.sl);
    }
    if (message.close_type !== "") {
      writer.uint32(122).string(message.close_type);
    }
    if (message.rollover_fee !== "") {
      writer.uint32(130).string(message.rollover_fee);
    }
    if (message.funding_rate !== "") {
      writer.uint32(138).string(message.funding_rate);
    }
    if (message.closing_fee !== "") {
      writer.uint32(146).string(message.closing_fee);
    }
    if (message.borrowing_fee !== "") {
      writer.uint32(154).string(message.borrowing_fee);
    }
    if (message.vault_fee !== "") {
      writer.uint32(162).string(message.vault_fee);
    }
    if (message.open_fee !== "") {
      writer.uint32(178).string(message.open_fee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClosedTrade {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClosedTrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.close_time = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.open_time = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.trader = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pair_index = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.index = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.volume = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.pnl = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.liquidation = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.close_price = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.open_price = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.leverage = reader.string();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.buy = reader.bool();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.tp = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.sl = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.close_type = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.rollover_fee = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.funding_rate = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.closing_fee = reader.string();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.borrowing_fee = reader.string();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.vault_fee = reader.string();
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.open_fee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClosedTrade {
    return {
      close_time: isSet(object.close_time) ? String(object.close_time) : "",
      open_time: isSet(object.open_time) ? String(object.open_time) : "",
      trader: isSet(object.trader) ? String(object.trader) : "",
      pair_index: isSet(object.pair_index) ? String(object.pair_index) : "",
      index: isSet(object.index) ? String(object.index) : "",
      volume: isSet(object.volume) ? String(object.volume) : "",
      pnl: isSet(object.pnl) ? String(object.pnl) : "",
      liquidation: isSet(object.liquidation) ? String(object.liquidation) : "",
      close_price: isSet(object.close_price) ? String(object.close_price) : "",
      open_price: isSet(object.open_price) ? String(object.open_price) : "",
      leverage: isSet(object.leverage) ? String(object.leverage) : "",
      buy: isSet(object.buy) ? Boolean(object.buy) : false,
      tp: isSet(object.tp) ? String(object.tp) : "",
      sl: isSet(object.sl) ? String(object.sl) : "",
      close_type: isSet(object.close_type) ? String(object.close_type) : "",
      rollover_fee: isSet(object.rollover_fee)
        ? String(object.rollover_fee)
        : "",
      funding_rate: isSet(object.funding_rate)
        ? String(object.funding_rate)
        : "",
      closing_fee: isSet(object.closing_fee) ? String(object.closing_fee) : "",
      borrowing_fee: isSet(object.borrowing_fee)
        ? String(object.borrowing_fee)
        : "",
      vault_fee: isSet(object.vault_fee) ? String(object.vault_fee) : "",
      open_fee: isSet(object.open_fee) ? String(object.open_fee) : "",
    };
  },

  toJSON(message: ClosedTrade): unknown {
    const obj: any = {};
    if (message.close_time !== "") {
      obj.close_time = message.close_time;
    }
    if (message.open_time !== "") {
      obj.open_time = message.open_time;
    }
    if (message.trader !== "") {
      obj.trader = message.trader;
    }
    if (message.pair_index !== "") {
      obj.pair_index = message.pair_index;
    }
    if (message.index !== "") {
      obj.index = message.index;
    }
    if (message.volume !== "") {
      obj.volume = message.volume;
    }
    if (message.pnl !== "") {
      obj.pnl = message.pnl;
    }
    if (message.liquidation !== "") {
      obj.liquidation = message.liquidation;
    }
    if (message.close_price !== "") {
      obj.close_price = message.close_price;
    }
    if (message.open_price !== "") {
      obj.open_price = message.open_price;
    }
    if (message.leverage !== "") {
      obj.leverage = message.leverage;
    }
    if (message.buy === true) {
      obj.buy = message.buy;
    }
    if (message.tp !== "") {
      obj.tp = message.tp;
    }
    if (message.sl !== "") {
      obj.sl = message.sl;
    }
    if (message.close_type !== "") {
      obj.close_type = message.close_type;
    }
    if (message.rollover_fee !== "") {
      obj.rollover_fee = message.rollover_fee;
    }
    if (message.funding_rate !== "") {
      obj.funding_rate = message.funding_rate;
    }
    if (message.closing_fee !== "") {
      obj.closing_fee = message.closing_fee;
    }
    if (message.borrowing_fee !== "") {
      obj.borrowing_fee = message.borrowing_fee;
    }
    if (message.vault_fee !== "") {
      obj.vault_fee = message.vault_fee;
    }
    if (message.open_fee !== "") {
      obj.open_fee = message.open_fee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClosedTrade>, I>>(base?: I): ClosedTrade {
    return ClosedTrade.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClosedTrade>, I>>(
    object: I,
  ): ClosedTrade {
    const message = createBaseClosedTrade();
    message.close_time = object.close_time ?? "";
    message.open_time = object.open_time ?? "";
    message.trader = object.trader ?? "";
    message.pair_index = object.pair_index ?? "";
    message.index = object.index ?? "";
    message.volume = object.volume ?? "";
    message.pnl = object.pnl ?? "";
    message.liquidation = object.liquidation ?? "";
    message.close_price = object.close_price ?? "";
    message.open_price = object.open_price ?? "";
    message.leverage = object.leverage ?? "";
    message.buy = object.buy ?? false;
    message.tp = object.tp ?? "";
    message.sl = object.sl ?? "";
    message.close_type = object.close_type ?? "";
    message.rollover_fee = object.rollover_fee ?? "";
    message.funding_rate = object.funding_rate ?? "";
    message.closing_fee = object.closing_fee ?? "";
    message.borrowing_fee = object.borrowing_fee ?? "";
    message.vault_fee = object.vault_fee ?? "";
    message.open_fee = object.open_fee ?? "";
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

function createBaseSymbolInfo(): SymbolInfo {
  return {
    ticker: "",
    name: "",
    description: "",
    type: "",
    session: "",
    timezone: "",
    exchange: "",
    minmov: Long.ZERO,
    pricescale: Long.ZERO,
    visible_plots_set: "",
    supported_resolutions: [],
    has_intraday: false,
    intraday_multipliers: [],
  };
}

export const SymbolInfo = {
  encode(
    message: SymbolInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.ticker !== "") {
      writer.uint32(10).string(message.ticker);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.type !== "") {
      writer.uint32(34).string(message.type);
    }
    if (message.session !== "") {
      writer.uint32(42).string(message.session);
    }
    if (message.timezone !== "") {
      writer.uint32(50).string(message.timezone);
    }
    if (message.exchange !== "") {
      writer.uint32(58).string(message.exchange);
    }
    if (!message.minmov.isZero()) {
      writer.uint32(64).int64(message.minmov);
    }
    if (!message.pricescale.isZero()) {
      writer.uint32(72).int64(message.pricescale);
    }
    if (message.visible_plots_set !== "") {
      writer.uint32(82).string(message.visible_plots_set);
    }
    for (const v of message.supported_resolutions) {
      writer.uint32(90).string(v!);
    }
    if (message.has_intraday === true) {
      writer.uint32(96).bool(message.has_intraday);
    }
    for (const v of message.intraday_multipliers) {
      writer.uint32(106).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SymbolInfo {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSymbolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ticker = reader.string();
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

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.type = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.session = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.timezone = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.exchange = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.minmov = reader.int64() as Long;
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.pricescale = reader.int64() as Long;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.visible_plots_set = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.supported_resolutions.push(reader.string());
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.has_intraday = reader.bool();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.intraday_multipliers.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SymbolInfo {
    return {
      ticker: isSet(object.ticker) ? String(object.ticker) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      type: isSet(object.type) ? String(object.type) : "",
      session: isSet(object.session) ? String(object.session) : "",
      timezone: isSet(object.timezone) ? String(object.timezone) : "",
      exchange: isSet(object.exchange) ? String(object.exchange) : "",
      minmov: isSet(object.minmov) ? Long.fromValue(object.minmov) : Long.ZERO,
      pricescale: isSet(object.pricescale)
        ? Long.fromValue(object.pricescale)
        : Long.ZERO,
      visible_plots_set: isSet(object.visible_plots_set)
        ? String(object.visible_plots_set)
        : "",
      supported_resolutions: Array.isArray(object?.supported_resolutions)
        ? object.supported_resolutions.map((e: any) => String(e))
        : [],
      has_intraday: isSet(object.has_intraday)
        ? Boolean(object.has_intraday)
        : false,
      intraday_multipliers: Array.isArray(object?.intraday_multipliers)
        ? object.intraday_multipliers.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: SymbolInfo): unknown {
    const obj: any = {};
    if (message.ticker !== "") {
      obj.ticker = message.ticker;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.session !== "") {
      obj.session = message.session;
    }
    if (message.timezone !== "") {
      obj.timezone = message.timezone;
    }
    if (message.exchange !== "") {
      obj.exchange = message.exchange;
    }
    if (!message.minmov.isZero()) {
      obj.minmov = (message.minmov || Long.ZERO).toString();
    }
    if (!message.pricescale.isZero()) {
      obj.pricescale = (message.pricescale || Long.ZERO).toString();
    }
    if (message.visible_plots_set !== "") {
      obj.visible_plots_set = message.visible_plots_set;
    }
    if (message.supported_resolutions?.length) {
      obj.supported_resolutions = message.supported_resolutions;
    }
    if (message.has_intraday === true) {
      obj.has_intraday = message.has_intraday;
    }
    if (message.intraday_multipliers?.length) {
      obj.intraday_multipliers = message.intraday_multipliers;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SymbolInfo>, I>>(base?: I): SymbolInfo {
    return SymbolInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SymbolInfo>, I>>(
    object: I,
  ): SymbolInfo {
    const message = createBaseSymbolInfo();
    message.ticker = object.ticker ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.type = object.type ?? "";
    message.session = object.session ?? "";
    message.timezone = object.timezone ?? "";
    message.exchange = object.exchange ?? "";
    message.minmov =
      object.minmov !== undefined && object.minmov !== null
        ? Long.fromValue(object.minmov)
        : Long.ZERO;
    message.pricescale =
      object.pricescale !== undefined && object.pricescale !== null
        ? Long.fromValue(object.pricescale)
        : Long.ZERO;
    message.visible_plots_set = object.visible_plots_set ?? "";
    message.supported_resolutions =
      object.supported_resolutions?.map((e) => e) || [];
    message.has_intraday = object.has_intraday ?? false;
    message.intraday_multipliers =
      object.intraday_multipliers?.map((e) => e) || [];
    return message;
  },
};

function createBaseSearchSymbolResultItem(): SearchSymbolResultItem {
  return {
    description: "",
    exchange: "",
    full_name: "",
    symbol: "",
    ticker: "",
    type: "",
  };
}

export const SearchSymbolResultItem = {
  encode(
    message: SearchSymbolResultItem,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.exchange !== "") {
      writer.uint32(18).string(message.exchange);
    }
    if (message.full_name !== "") {
      writer.uint32(26).string(message.full_name);
    }
    if (message.symbol !== "") {
      writer.uint32(34).string(message.symbol);
    }
    if (message.ticker !== "") {
      writer.uint32(42).string(message.ticker);
    }
    if (message.type !== "") {
      writer.uint32(50).string(message.type);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): SearchSymbolResultItem {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchSymbolResultItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.exchange = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.full_name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.symbol = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.ticker = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.type = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchSymbolResultItem {
    return {
      description: isSet(object.description) ? String(object.description) : "",
      exchange: isSet(object.exchange) ? String(object.exchange) : "",
      full_name: isSet(object.full_name) ? String(object.full_name) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      ticker: isSet(object.ticker) ? String(object.ticker) : "",
      type: isSet(object.type) ? String(object.type) : "",
    };
  },

  toJSON(message: SearchSymbolResultItem): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.exchange !== "") {
      obj.exchange = message.exchange;
    }
    if (message.full_name !== "") {
      obj.full_name = message.full_name;
    }
    if (message.symbol !== "") {
      obj.symbol = message.symbol;
    }
    if (message.ticker !== "") {
      obj.ticker = message.ticker;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SearchSymbolResultItem>, I>>(
    base?: I,
  ): SearchSymbolResultItem {
    return SearchSymbolResultItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SearchSymbolResultItem>, I>>(
    object: I,
  ): SearchSymbolResultItem {
    const message = createBaseSearchSymbolResultItem();
    message.description = object.description ?? "";
    message.exchange = object.exchange ?? "";
    message.full_name = object.full_name ?? "";
    message.symbol = object.symbol ?? "";
    message.ticker = object.ticker ?? "";
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseTradingSummary(): TradingSummary {
  return {
    time: 0,
    volume: 0,
    pnl: 0,
    num_trades: Long.UZERO,
    liquidation: 0,
    fees_earned: 0,
    fees_paid: 0,
  };
}

export const TradingSummary = {
  encode(
    message: TradingSummary,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.time !== 0) {
      writer.uint32(8).uint32(message.time);
    }
    if (message.volume !== 0) {
      writer.uint32(17).double(message.volume);
    }
    if (message.pnl !== 0) {
      writer.uint32(25).double(message.pnl);
    }
    if (!message.num_trades.isZero()) {
      writer.uint32(32).uint64(message.num_trades);
    }
    if (message.liquidation !== 0) {
      writer.uint32(41).double(message.liquidation);
    }
    if (message.fees_earned !== 0) {
      writer.uint32(49).double(message.fees_earned);
    }
    if (message.fees_paid !== 0) {
      writer.uint32(57).double(message.fees_paid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TradingSummary {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradingSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.time = reader.uint32();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.volume = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.pnl = reader.double();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.num_trades = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.liquidation = reader.double();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.fees_earned = reader.double();
          continue;
        case 7:
          if (tag !== 57) {
            break;
          }

          message.fees_paid = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TradingSummary {
    return {
      time: isSet(object.time) ? Number(object.time) : 0,
      volume: isSet(object.volume) ? Number(object.volume) : 0,
      pnl: isSet(object.pnl) ? Number(object.pnl) : 0,
      num_trades: isSet(object.num_trades)
        ? Long.fromValue(object.num_trades)
        : Long.UZERO,
      liquidation: isSet(object.liquidation) ? Number(object.liquidation) : 0,
      fees_earned: isSet(object.fees_earned) ? Number(object.fees_earned) : 0,
      fees_paid: isSet(object.fees_paid) ? Number(object.fees_paid) : 0,
    };
  },

  toJSON(message: TradingSummary): unknown {
    const obj: any = {};
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    if (message.volume !== 0) {
      obj.volume = message.volume;
    }
    if (message.pnl !== 0) {
      obj.pnl = message.pnl;
    }
    if (!message.num_trades.isZero()) {
      obj.num_trades = (message.num_trades || Long.UZERO).toString();
    }
    if (message.liquidation !== 0) {
      obj.liquidation = message.liquidation;
    }
    if (message.fees_earned !== 0) {
      obj.fees_earned = message.fees_earned;
    }
    if (message.fees_paid !== 0) {
      obj.fees_paid = message.fees_paid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TradingSummary>, I>>(
    base?: I,
  ): TradingSummary {
    return TradingSummary.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TradingSummary>, I>>(
    object: I,
  ): TradingSummary {
    const message = createBaseTradingSummary();
    message.time = object.time ?? 0;
    message.volume = object.volume ?? 0;
    message.pnl = object.pnl ?? 0;
    message.num_trades =
      object.num_trades !== undefined && object.num_trades !== null
        ? Long.fromValue(object.num_trades)
        : Long.UZERO;
    message.liquidation = object.liquidation ?? 0;
    message.fees_earned = object.fees_earned ?? 0;
    message.fees_paid = object.fees_paid ?? 0;
    return message;
  },
};

function createBasePagination(): Pagination {
  return { page: 0, per_page: 0, total_pages: 0, total_items: 0 };
}

export const Pagination = {
  encode(
    message: Pagination,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.page !== 0) {
      writer.uint32(8).uint32(message.page);
    }
    if (message.per_page !== 0) {
      writer.uint32(16).uint32(message.per_page);
    }
    if (message.total_pages !== 0) {
      writer.uint32(24).uint32(message.total_pages);
    }
    if (message.total_items !== 0) {
      writer.uint32(32).uint32(message.total_items);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pagination {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePagination();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.page = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.per_page = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.total_pages = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.total_items = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Pagination {
    return {
      page: isSet(object.page) ? Number(object.page) : 0,
      per_page: isSet(object.per_page) ? Number(object.per_page) : 0,
      total_pages: isSet(object.total_pages) ? Number(object.total_pages) : 0,
      total_items: isSet(object.total_items) ? Number(object.total_items) : 0,
    };
  },

  toJSON(message: Pagination): unknown {
    const obj: any = {};
    if (message.page !== 0) {
      obj.page = Math.round(message.page);
    }
    if (message.per_page !== 0) {
      obj.per_page = Math.round(message.per_page);
    }
    if (message.total_pages !== 0) {
      obj.total_pages = Math.round(message.total_pages);
    }
    if (message.total_items !== 0) {
      obj.total_items = Math.round(message.total_items);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Pagination>, I>>(base?: I): Pagination {
    return Pagination.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Pagination>, I>>(
    object: I,
  ): Pagination {
    const message = createBasePagination();
    message.page = object.page ?? 0;
    message.per_page = object.per_page ?? 0;
    message.total_pages = object.total_pages ?? 0;
    message.total_items = object.total_items ?? 0;
    return message;
  },
};

function createBaseTradingLeaderboardItem(): TradingLeaderboardItem {
  return { trader: "", value: 0 };
}

export const TradingLeaderboardItem = {
  encode(
    message: TradingLeaderboardItem,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.trader !== "") {
      writer.uint32(10).string(message.trader);
    }
    if (message.value !== 0) {
      writer.uint32(17).double(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): TradingLeaderboardItem {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradingLeaderboardItem();
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
          if (tag !== 17) {
            break;
          }

          message.value = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TradingLeaderboardItem {
    return {
      trader: isSet(object.trader) ? String(object.trader) : "",
      value: isSet(object.value) ? Number(object.value) : 0,
    };
  },

  toJSON(message: TradingLeaderboardItem): unknown {
    const obj: any = {};
    if (message.trader !== "") {
      obj.trader = message.trader;
    }
    if (message.value !== 0) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TradingLeaderboardItem>, I>>(
    base?: I,
  ): TradingLeaderboardItem {
    return TradingLeaderboardItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TradingLeaderboardItem>, I>>(
    object: I,
  ): TradingLeaderboardItem {
    const message = createBaseTradingLeaderboardItem();
    message.trader = object.trader ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBasePairHistoricalSummary(): PairHistoricalSummary {
  return {
    pair_index: Long.UZERO,
    volume: 0,
    pnl: 0,
    num_trades: Long.UZERO,
    liquidation: 0,
    fees_earned: 0,
    fees_paid: 0,
  };
}

export const PairHistoricalSummary = {
  encode(
    message: PairHistoricalSummary,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.pair_index.isZero()) {
      writer.uint32(8).uint64(message.pair_index);
    }
    if (message.volume !== 0) {
      writer.uint32(17).double(message.volume);
    }
    if (message.pnl !== 0) {
      writer.uint32(25).double(message.pnl);
    }
    if (!message.num_trades.isZero()) {
      writer.uint32(32).uint64(message.num_trades);
    }
    if (message.liquidation !== 0) {
      writer.uint32(41).double(message.liquidation);
    }
    if (message.fees_earned !== 0) {
      writer.uint32(49).double(message.fees_earned);
    }
    if (message.fees_paid !== 0) {
      writer.uint32(57).double(message.fees_paid);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): PairHistoricalSummary {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePairHistoricalSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pair_index = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.volume = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.pnl = reader.double();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.num_trades = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.liquidation = reader.double();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.fees_earned = reader.double();
          continue;
        case 7:
          if (tag !== 57) {
            break;
          }

          message.fees_paid = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PairHistoricalSummary {
    return {
      pair_index: isSet(object.pair_index)
        ? Long.fromValue(object.pair_index)
        : Long.UZERO,
      volume: isSet(object.volume) ? Number(object.volume) : 0,
      pnl: isSet(object.pnl) ? Number(object.pnl) : 0,
      num_trades: isSet(object.num_trades)
        ? Long.fromValue(object.num_trades)
        : Long.UZERO,
      liquidation: isSet(object.liquidation) ? Number(object.liquidation) : 0,
      fees_earned: isSet(object.fees_earned) ? Number(object.fees_earned) : 0,
      fees_paid: isSet(object.fees_paid) ? Number(object.fees_paid) : 0,
    };
  },

  toJSON(message: PairHistoricalSummary): unknown {
    const obj: any = {};
    if (!message.pair_index.isZero()) {
      obj.pair_index = (message.pair_index || Long.UZERO).toString();
    }
    if (message.volume !== 0) {
      obj.volume = message.volume;
    }
    if (message.pnl !== 0) {
      obj.pnl = message.pnl;
    }
    if (!message.num_trades.isZero()) {
      obj.num_trades = (message.num_trades || Long.UZERO).toString();
    }
    if (message.liquidation !== 0) {
      obj.liquidation = message.liquidation;
    }
    if (message.fees_earned !== 0) {
      obj.fees_earned = message.fees_earned;
    }
    if (message.fees_paid !== 0) {
      obj.fees_paid = message.fees_paid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PairHistoricalSummary>, I>>(
    base?: I,
  ): PairHistoricalSummary {
    return PairHistoricalSummary.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PairHistoricalSummary>, I>>(
    object: I,
  ): PairHistoricalSummary {
    const message = createBasePairHistoricalSummary();
    message.pair_index =
      object.pair_index !== undefined && object.pair_index !== null
        ? Long.fromValue(object.pair_index)
        : Long.UZERO;
    message.volume = object.volume ?? 0;
    message.pnl = object.pnl ?? 0;
    message.num_trades =
      object.num_trades !== undefined && object.num_trades !== null
        ? Long.fromValue(object.num_trades)
        : Long.UZERO;
    message.liquidation = object.liquidation ?? 0;
    message.fees_earned = object.fees_earned ?? 0;
    message.fees_paid = object.fees_paid ?? 0;
    return message;
  },
};

function createBaseHoneyReward(): HoneyReward {
  return { fees_to_honey: "", fees_to_bgt: "", combined_fees: "", apr: "" };
}

export const HoneyReward = {
  encode(
    message: HoneyReward,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.fees_to_honey !== "") {
      writer.uint32(10).string(message.fees_to_honey);
    }
    if (message.fees_to_bgt !== "") {
      writer.uint32(18).string(message.fees_to_bgt);
    }
    if (message.combined_fees !== "") {
      writer.uint32(26).string(message.combined_fees);
    }
    if (message.apr !== "") {
      writer.uint32(34).string(message.apr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HoneyReward {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHoneyReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fees_to_honey = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fees_to_bgt = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.combined_fees = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.apr = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HoneyReward {
    return {
      fees_to_honey: isSet(object.fees_to_honey)
        ? String(object.fees_to_honey)
        : "",
      fees_to_bgt: isSet(object.fees_to_bgt) ? String(object.fees_to_bgt) : "",
      combined_fees: isSet(object.combined_fees)
        ? String(object.combined_fees)
        : "",
      apr: isSet(object.apr) ? String(object.apr) : "",
    };
  },

  toJSON(message: HoneyReward): unknown {
    const obj: any = {};
    if (message.fees_to_honey !== "") {
      obj.fees_to_honey = message.fees_to_honey;
    }
    if (message.fees_to_bgt !== "") {
      obj.fees_to_bgt = message.fees_to_bgt;
    }
    if (message.combined_fees !== "") {
      obj.combined_fees = message.combined_fees;
    }
    if (message.apr !== "") {
      obj.apr = message.apr;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HoneyReward>, I>>(base?: I): HoneyReward {
    return HoneyReward.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HoneyReward>, I>>(
    object: I,
  ): HoneyReward {
    const message = createBaseHoneyReward();
    message.fees_to_honey = object.fees_to_honey ?? "";
    message.fees_to_bgt = object.fees_to_bgt ?? "";
    message.combined_fees = object.combined_fees ?? "";
    message.apr = object.apr ?? "";
    return message;
  },
};

function createBaseReferrerTraderDetails(): ReferrerTraderDetails {
  return { referrer: "", trader: "", volume_trader: "", rewards: "" };
}

export const ReferrerTraderDetails = {
  encode(
    message: ReferrerTraderDetails,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.referrer !== "") {
      writer.uint32(10).string(message.referrer);
    }
    if (message.trader !== "") {
      writer.uint32(18).string(message.trader);
    }
    if (message.volume_trader !== "") {
      writer.uint32(26).string(message.volume_trader);
    }
    if (message.rewards !== "") {
      writer.uint32(34).string(message.rewards);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ReferrerTraderDetails {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReferrerTraderDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.referrer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.trader = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.volume_trader = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.rewards = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReferrerTraderDetails {
    return {
      referrer: isSet(object.referrer) ? String(object.referrer) : "",
      trader: isSet(object.trader) ? String(object.trader) : "",
      volume_trader: isSet(object.volume_trader)
        ? String(object.volume_trader)
        : "",
      rewards: isSet(object.rewards) ? String(object.rewards) : "",
    };
  },

  toJSON(message: ReferrerTraderDetails): unknown {
    const obj: any = {};
    if (message.referrer !== "") {
      obj.referrer = message.referrer;
    }
    if (message.trader !== "") {
      obj.trader = message.trader;
    }
    if (message.volume_trader !== "") {
      obj.volume_trader = message.volume_trader;
    }
    if (message.rewards !== "") {
      obj.rewards = message.rewards;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReferrerTraderDetails>, I>>(
    base?: I,
  ): ReferrerTraderDetails {
    return ReferrerTraderDetails.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReferrerTraderDetails>, I>>(
    object: I,
  ): ReferrerTraderDetails {
    const message = createBaseReferrerTraderDetails();
    message.referrer = object.referrer ?? "";
    message.trader = object.trader ?? "";
    message.volume_trader = object.volume_trader ?? "";
    message.rewards = object.rewards ?? "";
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
