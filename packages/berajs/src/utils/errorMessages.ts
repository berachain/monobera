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
  },
  LEND: {
    PRICE_FLUCTUATION: {
      keywords: [`function "borrow" reverted`, `function "repay" reverted`],
      errorMSG:
        "The price of the asset you are trying to borrow has fluctuated too much. Please try again.",
    },
  },
};

export const getErrorMessage = (errorMsgDetails: string | undefined) => {
  if (!errorMsgDetails) {
    return errorMsgMap.GENERAL_ERROR;
  } else {
    for (const category in errorMsgMap) {
      if (
        category !== "GENERAL_ERROR" &&
        typeof errorMsgMap[category] !== "string"
      ) {
        const errors = errorMsgMap[category] as ErrorCategory;
        for (const type in errors) {
          const errorType = errors[type];
          if (
            errorType &&
            errorType.keywords.some((keyword) =>
              errorMsgDetails.includes(keyword),
            )
          ) {
            return errorType.errorMSG;
          }
        }
      }
    }
    return errorMsgMap.GENERAL_ERROR;
  }
};
