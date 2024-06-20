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
      keywords: ["WrongLimitPrice"],
      errorMSG:
        "Currently, Limit Prices must be set below the current price for long positions and above for short positions.",
    },
    PRICE_IMPACT_TOO_HIGH: {
      keywords: ["PriceImpactTooHigh"],
      errorMSG: "This position causes too much price impact.",
    },
    MAX_TRADES_PER_PAIR: {
      keywords: ["MaxTradesPerPair"],
      errorMSG:
        "You've exceeded your maximum amount of trades for this market!",
    },
    ABOVE_MAX_POS: {
      keywords: ["AboveMaxPos"],
      errorMSG: "The position's collateral is too high.",
    },
    ABOVE_MAX_GROUP_COLLATERAL: {
      keywords: ["AboveMaxGroupCollateral"],
      errorMSG:
        "The position's collateral is more than the vault can support for this market.",
    },
    BELOW_MIN_POS: {
      keywords: ["BelowMinPos"],
      errorMSG: "The position's volume (leveraged position size) is too low.",
    },
    LEVERAGE_INCORRECT: {
      keywords: ["LeverageIncorrect"],
      errorMSG: "The leverage for this position is either too low or too high.",
    },
    WRONG_TP: {
      keywords: ["WrongTp", "TpReached"],
      errorMSG: "The Take Profit is invalid for this position.",
    },
    WRONG_SL: {
      keywords: ["WrongSl", "SlReached"],
      errorMSG: "The Stop Loss is invalid for this position.",
    },
    NO_TRADE: {
      keywords: ["NoTrade"],
      errorMSG: "This position is no longer open.",
    },
    NO_LIMIT: {
      keywords: ["NoLimit"],
      errorMSG: "This order is no longer open.",
    },
    SLIPPAGE_EXCEEDED: {
      keywords: ["SlippageExceeded"],
      errorMSG:
        "The price just moved significantly! Please set a higher slippage.",
    },
    PAST_EXPOSURE_LIMITS: {
      keywords: ["PastExposureLimits"],
      errorMSG:
        "This position's volume is beyond the safe exposure limits of open interest. Please try again later or with a smaller size.",
    },
    PENDING_WITHDRAWAL: {
      keywords: ["PendingWithdrawal"],
      errorMSG:
        "You have a pending withdrawal. Please wait for it to be processed.",
    },
    MORE_THAN_WITHDRAW_AMOUNT: {
      keywords: ["InsufficientBalance"],
      errorMSG: "You can't cancel more than you've requested to withdraw.",
    },
    NOT_ENOUGH_ASSETS: {
      keywords: ["NotEnoughAssets", "MaxDailyPnL"],
      errorMSG: "The vault cannot settle your position at this time.",
    },
    ARITHMETIC_ERROR: {
      keywords: ["Arithmetic operation resulted in underflow or overflow."],
      errorMSG: "This operation reverted on chain. Please try again later.",
    },
    INVALID_REFERRER: {
      keywords: ["InvalidReferrer"],
      errorMSG: "The referrer address is invalid.",
    },
    ALREADY_REFERRED: {
      keywords: ["AlreadyReferred"],
      errorMSG: "You have already been referred.",
    },
    REFERRAL_CYCLE: {
      keywords: ["ReferralCycle"],
      errorMSG: "You cannot be referred by someone you have already referred.",
    },
    GENERIC_PARAMETERS_ERROR: {
      keywords: ["WrongParams"],
      errorMSG: "The given parameters are invalid.",
    },
    INVALID_PERMISSIONS: {
      keywords: ["Unauthorized"],
      errorMSG: "You are not permitted to execute this operation.",
    },
    PRICE_ORACLE_ERROR: {
      keywords: [
        "InvalidExpo",
        "NoFreshUpdate",
        "PriceFeedNotFoundWithinRange",
        "PriceFeedNotFound",
      ],
      errorMSG:
        "The price oracle failed to return correctly, please try again later.",
    },
    INVALID_CONFIDENCE: {
      keywords: ["InvalidConfidence"],
      errorMSG:
        "The price oracle returned with a very high uncertainty for this market. For safety. Please try again later.",
    },
    STALE_FEED: {
      keywords: ["StalePrice"],
      errorMSG:
        "The price feed from the oracle is currently stale. Please try again later.",
    },
    TRADING_PAUSED: {
      keywords: ["Paused"],
      errorMSG: "Trading has been momentarily paused.",
    },
    POSITION_TIMEOUT: {
      keywords: ["InTimeout"],
      errorMSG:
        "This position is currently in timeout. Please wait for the timeout to expire to execute.",
    },
    MAX_DEPOSIT: {
      keywords: ["MaxDeposit"],
      errorMSG:
        "The vault cannot currently support minting this much bHONEY right now. Please try an amount less than the current max deposit or come back later.",
    },
  },
};

export const getCustomAppErrorMessages = (e: any, app: "PERPS" | "BEND") => {
  if (e?.metaMessages?.[0]) {
    const errors = errorMsgMap[app] as ErrorCategory;
    for (const type in errors) {
      const errorType = errors[type];
      if (
        errorType?.keywords.some((keyword) =>
          e.metaMessages[0].includes(keyword),
        )
      ) {
        return errorType.errorMSG;
      }
    }
  }
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
