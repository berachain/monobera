import { ethers } from "ethers";
import { PublicClient } from "viem";
import { clientToProvider } from "./ethers-client-to-provider";

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
      errorMSG: "You rejected the transaction.",
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

// from CrocSwap-protocol https://github.com/berachain/CrocSwap-protocol/blob/31ea60687e07b64f482e6268a07d887fd5ad6d6a/etc/errors.json
const TransactionRevertReasonMap: { [key: string]: string } = {
  A: "Unauthorized",
  B: "Insufficient base token",
  BD: "Barrier burn down overflow",
  C: "Oversized sqrt approx",
  D: "Tick size below minimum increment",
  DS: "Double spend msg val",
  EC: "Insufficient ether sent",
  G: "Overwriting a non-zero position on transfer",
  I: "Tick below min",
  J: "Pool not initialized",
  K: "Settle flow below required qty",
  L: "Max liquidity exceeded",
  LT: "Must be bera variant LP token",
  M: "Mezzanine bitmap broken",
  MQ: "Max quote liquidity",
  N: "Already initialized",
  O: "Ticks out of order",
  OD: "Odd lot size",
  OR: "Off-grid partial burn",
  Q: "Insufficient quote token",
  PA: "Protocol authorization",
  PI: "Pool not initialized",
  PT: "No pool template at index",
  PF: "Pool already initialized",
  R: "Price outside tick range",
  RB: "Swap Curve Boundary Crash",
  S: "Mezzanine spill broken",
  SL: "Swap output exceeds slippage",
  ST: "Terminus spill broken",
  T: "Price below max tick",
  TF: "Transfer failed",
  TD: "Token failed due to fee on transfer",
  V: "Insufficient liquidity in level",
  X: "Tick below max",
  Y: "Lobby bitmap broken",
  WB: "Must use wrapped native token",
  Z: "Not authorized for pool",
};

export const getRevertReason = async (
  publicClient: PublicClient,
  txHash: string | undefined,
): Promise<string | undefined> => {
  if (!txHash) return "Transaction reverted for unknown reason.";
  try {
    // Use public client to get ethers provider since wagmi doesn't have the capability to get revert reasons
    const ethersProvider = clientToProvider(publicClient);
    // Get the transaction details
    const tx = await ethersProvider?.getTransaction(txHash);
    const response = await ethersProvider.call({
      ...(tx as any),
      maxFeePerGas: undefined,
      maxPriorityFeePerGas: undefined,
    });
    // Decode the error data (for some reason it's always at index 138)
    const reason = ethers.utils.toUtf8String(`0x${response.substring(138)}`);
    // Clean & remove hidden UTF-8 characters
    const cleanedReasonString = reason.replace(/[^\x20-\x7E]/g, "");
    // Get the human readable mapping of error codes
    return (
      TransactionRevertReasonMap[cleanedReasonString] ??
      "Transaction reverted for unknown reason."
    );
  } catch (error) {
    console.error(
      "Error fetching transaction or receipt revert reason: ",
      error,
    );
  }
};
