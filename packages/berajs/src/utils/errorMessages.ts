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
        "Currently, Limit Prices must be set above the current price for long positions and below for short positions.",
    },
    PRICE_IMPACT_TOO_HIGH: {
      keywords: ["PRICE_IMPACT_TOO_HIGH"],
      errorMSG: "This trade has too much price impact.",
    },
    MAX_TRADES_PER_PAIR: {
      keywords: ["MAX_TRADES_PER_PAIR"],
      errorMSG: "You've exceeded your maximum amount of trades for this pair!",
    },
    ABOVE_MAX_POS: {
      keywords: ["ABOVE_MAX_POS"],
      errorMSG: "The trade's position size is too high.",
    },
    ABOVE_MAX_GROUP_COLLATERAL: {
      keywords: ["ABOVE_MAX_GROUP_COLLATERAL"],
      errorMSG: "The trade's collateral is more than the vault can support.",
    },
    BELOW_MIN_POS: {
      keywords: ["BELOW_MIN_POS"],
      errorMSG: "The trade's position size is too low.",
    },
    LEVERAGE_INCORRECT: {
      keywords: ["LEVERAGE_INCORRECT"],
      errorMSG: "The leverage for this trade is either too low or too high.",
    },
    WRONG_TP: {
      keywords: ["WRONG_TP", "TP_REACHED"],
      errorMSG: "The Take Profit is invalid for this trade.",
    },
    WRONG_SL: {
      keywords: ["WRONG_SL", "SL_TOO_BIG", "SL_REACHED"],
      errorMSG: "The Stop Loss is invalid for this trade.",
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
      keywords: ["NO_TRADE"],
      errorMSG: "This position is no longer open.",
    },
    NO_LIMIT: {
      keywords: ["NO_LIMIT"],
      errorMSG: "This order is no longer open.",
    },
    SLIPPAGE_EXCEEDED: {
      keywords: ["SLIPPAGE_EXCEEDED"],
      errorMSG:
        "The price just moved significantly! Please set a higher slippage.",
    },
    PAST_EXPOSURE_LIMITS: {
      keywords: ["PAST_EXPOSURE_LIMITS"],
      errorMSG:
        "This position's size is beyond the safe exposure limits of the system. Please try again later or with a smaller size.",
    },
    PENDING_WITHDRAWAL: {
      keywords: ["PENDING_WITHDRAWAL"],
      errorMSG:
        "You have a pending withdrawal. Please wait for it to be processed.",
    },
    MORE_THAN_WITHDRAW_AMOUNT: {
      keywords: ["MORE_THAN_WITHDRAW_AMOUNT"],
      errorMSG: "You can't cancel more than you've requested to withdraw.",
    },
    NOT_ENOUGH_ASSETS: {
      keywords: ["NOT_ENOUGH_ASSETS"],
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
    BGT_CLAIMING_ERROR: {
      keywords: ["unexpected withdraw amount from Rewards Module"],
      errorMSG: "BGT claiming is currently disabled for maintenance.",
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
