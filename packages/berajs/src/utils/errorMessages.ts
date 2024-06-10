interface ErrorType {
  keywords: string[];
  errorMSG: string;
}

interface ErrorCategory {
  [key: string]: ErrorType;
}

interface ErrorMessages {
  GENERAL_ERROR: string;
  [key: string]: ErrorCategory | string;
}

const errorMsgMap: ErrorMessages = {
  GENERAL_ERROR: "Something went wrong. Please try again later.",
  RPC: {
    GAS_PRICE: {
      keywords: ["gasLimit"],
      errorMSG:
        "It seems an RPC error has occurred while estimating gas. Please try your request later.",
    },
    JSON_RPC: {
      keywords: ["JSON-RPC"],
      errorMSG:
        "It seems an RPC error has occurred. Please try your request one more later.",
    },
    // ETH_GETBALANCE: {
    //   keywords: "eth_getBalance",
    //   err: "An RPC error has been detected. Please attempt your request after a short while.",
    // },
    HASH: {
      keywords: ["hash"],
      errorMSG:
        "It seems an RPC error has occurred. Please check if your transaction was finalized. If not, please try again.",
    },
    USER_REJECTION: {
      keywords: ["User denied transaction signature"],
      errorMSG: "You Rejected the transaction.",
    },
  },
  LEND: {
    PRICE_FLUCTUATION: {
      keywords: [`function "borrow"`, `function "repay"`, "repay", "borrow"],
      errorMSG:
        "The price of the asset you are trying to borrow has fluctuated too much. Please try again.",
    },
  },
  PERPS: {
    WRONG_LIMIT_PRICE: {
      keywords: ["WRONG_LIMIT_PRICE"],
      errorMSG:
        "Currently, Limit Prices must be set below the current price for long positions and above for short positions.",
    },
    PRICE_IMPACT_TOO_HIGH: {
      keywords: ["PRICE_IMPACT_TOO_HIGH", "0xfb30d03a"],
      errorMSG: "This position causes too much price impact.",
    },
    MAX_TRADES_PER_PAIR: {
      keywords: ["MAX_TRADES_PER_PAIR", "0xa38355c0"],
      errorMSG:
        "You've exceeded your maximum amount of trades for this market!",
    },
    ABOVE_MAX_POS: {
      keywords: ["ABOVE_MAX_POS", "0xb4503281"],
      errorMSG: "The position's collateral is too high.",
    },
    ABOVE_MAX_GROUP_COLLATERAL: {
      keywords: ["ABOVE_MAX_GROUP_COLLATERAL", "0x7061e4f8"],
      errorMSG:
        "The position's collateral is more than the vault can support for this market.",
    },
    BELOW_MIN_POS: {
      keywords: ["BELOW_MIN_POS", "0x8d5543b1"],
      errorMSG: "The position's volume (leveraged position size) is too low.",
    },
    LEVERAGE_INCORRECT: {
      keywords: ["LEVERAGE_INCORRECT", "0x7061fe95"],
      errorMSG: "The leverage for this position is either too low or too high.",
    },
    WRONG_TP: {
      keywords: ["WRONG_TP", "TP_REACHED", "0x7f527065", "0x40305e8d"],
      errorMSG: "The Take Profit is invalid for this position.",
    },
    WRONG_SL: {
      keywords: [
        "WRONG_SL",
        "SL_TOO_BIG",
        "SL_REACHED",
        "0x62dd5ee3",
        "0xfa0789e0",
      ],
      errorMSG: "The Stop Loss is invalid for this position.",
    },
    TOO_MANY_PAIRS: {
      keywords: ["TOO_MANY_PAIRS"],
      errorMSG: "We only support batch closing at most 10 trades at this time.",
    },
    ALREADY_BEING_CLOSED: {
      keywords: ["ALREADY_BEING_CLOSED"],
      errorMSG: "This trade is currently being closed or has been closed.",
    },
    NO_TRADE: {
      keywords: ["NO_TRADE", "0xa3b36525"],
      errorMSG: "This position is no longer open.",
    },
    NO_LIMIT: {
      keywords: ["NO_LIMIT", "0xe6803dc4"],
      errorMSG: "This order is no longer open.",
    },
    SLIPPAGE_EXCEEDED: {
      keywords: ["SLIPPAGE_EXCEEDED", "0x8199f5f3"],
      errorMSG:
        "The price just moved significantly! Please set a higher slippage.",
    },
    PAST_EXPOSURE_LIMITS: {
      keywords: ["PAST_EXPOSURE_LIMITS", "0x0c26d69e"],
      errorMSG:
        "This position's volume is beyond the safe exposure limits of open interest. Please try again later or with a smaller size.",
    },
    PENDING_WITHDRAWAL: {
      keywords: ["PENDING_WITHDRAWAL", "0x423023f1"],
      errorMSG:
        "You have a pending withdrawal. Please wait for it to be processed.",
    },
    MORE_THAN_WITHDRAW_AMOUNT: {
      keywords: ["MORE_THAN_WITHDRAW_AMOUNT", "0xf4d678b8"],
      errorMSG: "You can't cancel more than you've requested to withdraw.",
    },
    NOT_ENOUGH_ASSETS: {
      keywords: ["NOT_ENOUGH_ASSETS", "0x3786fdd4", "0xb2ac7c0c"],
      errorMSG: "The vault cannot settle your position at this time.",
    },
    MAX_DAILY_PNL: {
      keywords: ["MAX_DAILY_PNL"],
      errorMSG:
        "This trade exceeds the daily maximum allowed PnL on the vault.",
    },
    ARITHMETIC_ERROR: {
      keywords: ["Arithmetic operation resulted in underflow or overflow."],
      errorMSG: "This operation reverted on chain. Please try again later.",
    },
    INVALID_REFERRER: {
      keywords: ["INVALID_REFERRER", "0x61104228"],
      errorMSG: "The referrer address is invalid.",
    },
    ALREADY_REFERRED: {
      keywords: ["ALREADY_REFERRED", "0x7aabdfe3"],
      errorMSG: "You have already been referred.",
    },
    REFERRAL_CYCLE: {
      keywords: ["REFERRAL_CYCLE", "0x8f6f8611"],
      errorMSG: "You cannot be referred by someone you have already referred.",
    },
    STALE_FEED: {
      keywords: ["STALE_FEED", "0x19abf40e"],
      errorMSG:
        "The price feed from the oracle is currently stale. Please try again later.",
    },
    INVALID_LIMIT: {
      keywords: ["0x3577cd46"],
      errorMSG:
        "Invalid limit conditions. For reversal limit orders on Berps, you must set an open price that is below the current price for a long position, or above the current price for a short position.",
    },
    GENERIC_PARAMETERS_ERROR: {
      keywords: ["0x5863f789"],
      errorMSG: "The given parameters are invalid.",
    },
    INVALID_PERMISSIONS: {
      keywords: ["0xee90c468"],
      errorMSG: "You are not permitted to execute this operation.",
    },
    PRICE_ORACLE_ERROR: {
      keywords: [
        "0x39c733d8",
        "0xe7cd821c",
        "0xde2c57fa",
        "0x45805f5d",
        "0x14aebe68",
      ],
      errorMSG:
        "The price oracle failed to return correctly, please try again later.",
    },
    TRADING_PAUSED: {
      keywords: ["0x9e87fac8"],
      errorMSG: "Trading has been momentarily paused.",
    },
    TRADING_DISABLED: {
      keywords: ["0x9f9fb434"],
      errorMSG: "Trading on the current contracts is done.",
    },
    POSITION_TIMEOUT: {
      keywords: ["0x506bf1a8"],
      errorMSG:
        "This position is currently in timeout. Please wait for the timeout to expire to execute.",
    },
    MAX_DEPOSIT: {
      keywords: ["0x3b8698ab"],
      errorMSG:
        "The vault cannot currently support minting this much bHONEY right now. Please try an amount less than the current max deposit or come back later.",
    },
  },
};

export const getErrorMessage = (e: any) => {
  let errorMsgDetails = "";

  for (const key in e) {
    if (e[key]) {
      errorMsgDetails += `${key}: ${String(e[key])}, `;
    }
  }
  for (const category in errorMsgMap) {
    if (
      category !== "GENERAL_ERROR" &&
      typeof errorMsgMap[category] !== "string"
    ) {
      const errors = errorMsgMap[category] as ErrorCategory;
      for (const type in errors) {
        const errorType = errors[type];
        if (
          errorType?.keywords.some((keyword) =>
            errorMsgDetails.includes(keyword),
          )
        ) {
          return errorType.errorMSG;
        }
      }
    }
  }
  return errorMsgMap.GENERAL_ERROR;
};
