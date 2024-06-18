export enum POLLING {
  FAST = 10000,
  NORMAL = 20000,
  SLOW = 200000,
}

export const DAILY = "1d";
export const WEEKLY = "7d";
export const MONTHLY = "30d";
export const QUARTERLY = "90d";

export const MAX_GAIN = "900";
export const MAX_STOP_LOSS = "-75";
export const INITIAL_GAIN = "100";

export const POSITIONS_SORTING_MAP = {
  position_size: "SORT_BY_SIZE",
  open_price: "SORT_BY_PRICE",
  borrow_fee: "SORT_BY_FEE",
};

export const OPEN_ORDERS_SORTING_MAP = {
  position_size: "SORT_BY_SIZE",
  min_price: "SORT_BY_MIN_PRICE",
  timestamp_placed: "SORT_BY_TIME",
};

export const HISTORY_SORTING_MAP = {
  position_size: "SORT_BY_SIZE",
  timestamp_open: "SORT_BY_OPEN_TIME",
  timestamp_close: "SORT_BY_CLOSE_TIME",
  open_price: "SORT_BY_OPEN_PRICE",
  price: "SORT_BY_CLOSE_PRICE",
  fees: "SORT_BY_FEE",
  pnl: "SORT_BY_PNL",
};

export const CLOSED_TRADES_SORTING_MAP = {
  open_time: "SORT_BY_OPEN_TIME",
  close_time: "SORT_BY_CLOSE_TIME",
  entry_price: "SORT_BY_SIZE",
  amount: "SORT_BY_OPEN_PRICE",
  total: "SORT_BY_CLOSE_PRICE",
  pnl: "SORT_BY_PNL",
};

export const DEFAULT_QUERY = "page=1&perPage=10&sortDir=desc";

export const API_FILTERS = [
  "page",
  "perPage",
  "sortBy",
  "sortDir",
  "pairIndex",
  "filters",
  "days",
];

export const LEADERBOARD_TRADING_FILTERS = [
  "pair_index",
  "volume",
  "num_trades",
  "liquidation",
  "trader",
  "trade_open",
  "tp",
  "sl",
];

export const LEADERBOARD_TABS = [
  {
    title: "💰 Most Profitable",
    value: "SORT_BY_PNL",
    header: "Realized Profit & Loss",
    index: 1,
  },
  {
    title: "🔥 Top Liquidations",
    value: "SORT_BY_LIQUIDATION",
    header: "Liquidations",
    index: 2,
  },
  {
    title: "📈 Most Volume",
    value: "SORT_BY_VOLUME",
    header: "Volume",
    index: 3,
  },
];

export const PYTH_ABI = [
  {
    name: "id",
    type: "bytes32",
    internalType: "bytes32",
  },
  {
    name: "price",
    type: "tuple",
    internalType: "struct PythStructs.Price",
    components: [
      {
        name: "price",
        type: "int64",
        internalType: "int64",
      },
      {
        name: "conf",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "expo",
        type: "int32",
        internalType: "int32",
      },
      {
        name: "publishTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    name: "emaPrice",
    type: "tuple",
    internalType: "struct PythStructs.Price",
    components: [
      {
        name: "price",
        type: "int64",
        internalType: "int64",
      },
      {
        name: "conf",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "expo",
        type: "int32",
        internalType: "int32",
      },
      {
        name: "publishTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
];

// TODO: These IDs are hardcoded for now but will be fetched from chain based on governance voting to add new pairs
export const USDC_USD_INDEX = "-1";
export const PYTH_IDS = [
  {
    id: "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
    name: "USDC/USD",
    pairIndex: "-1",
  },
  {
    id: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
    name: "BTC-USDC",
    pairIndex: "0",
  },
  {
    id: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    name: "ETH-USDC",
    pairIndex: "1",
  },
  {
    id: "0xb00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819",
    name: "ATOM-USDC",
    pairIndex: "2",
  },
  {
    id: "0x09f7c1d7dfbb7df2b8fe3d3d87ee94a2259d212da4f30c1f0540d066dfa44723",
    name: "TIA-USDC",
    pairIndex: "3",
  },
];
