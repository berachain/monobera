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
      errorMSG: "Invalid limit conditions.",
    },
    PRICE_IMPACT_TOO_HIGH: {
      keywords: ["PRICE_IMPACT_TOO_HIGH"],
      errorMSG: "This trade has too much price impact!",
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
