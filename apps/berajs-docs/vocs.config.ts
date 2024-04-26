import { defineConfig } from "vocs";

export default defineConfig({
  title: "BeraJS",
  description: "BeraJS is a library for interacting with Berachain",

  iconUrl: {
    dark: "https://res.cloudinary.com/duv0g402y/image/upload/v1713456719/BeraJS_Bracket_Light_bpkwd9.svg",
    light:
      "https://res.cloudinary.com/duv0g402y/image/upload/v1713456720/BeraJS_Bracket_Dark_rkiah6.svg",
  },
  logoUrl: {
    dark: "https://res.cloudinary.com/duv0g402y/image/upload/v1713456719/BeraJS_Bracket_Light_bpkwd9.svg",
    light:
      "https://res.cloudinary.com/duv0g402y/image/upload/v1713456720/BeraJS_Bracket_Dark_rkiah6.svg",
  },
  theme: {
    accentColor: "#76bae9",
  },
  editLink: {
    pattern:
      "https://github.com/berachain/monobera/edit/v2/apps/berajs-docs/docs/pages/:path",
    text: "Suggest changes to this page",
  },
  socials: [
    {
      icon: "github",
      link: "https://github.com/berachain/monobera",
    },
    {
      icon: "x",
      link: "https://twitter.com/berachain",
    },
  ],
  sidebar: [
    { text: "Getting Started", link: "/getting-started/" },
    {
      text: "React",
      collapsed: true,
      items: [
        { text: "Getting Started", link: "/react/getting-started/" },
        {
          text: "Bex",
          collapsed: true,
          items: [
            {
              text: "usePoolRecentSwaps",
              link: "/react/dex/usePoolRecentSwaps/",
            },
            {
              text: "usePoolUserPosition",
              link: "/react/dex/usePoolUserPosition/",
            },
          ],
        },
        {
          text: "Honey",
          collapsed: true,
          items: [
            {
              text: "useCollateralsRates",
              link: "/react/honey/useCollateralsRates/",
            },
            {
              text: "usePollHoneyPreview",
              link: "/react/honey/usePollHoneyPreview/",
            },
          ],
        },
        {
          text: "Bend",
          collapsed: true,
          items: [{ text: "Getting Started", link: "/react/getting-started/" }],
        },
        {
          text: "Berps",
          collapsed: true,
          items: [{ text: "Getting Started", link: "/react/getting-started/" }],
        },
        {
          text: "BGT",
          collapsed: true,
          items: [{ text: "Getting Started", link: "/react/getting-started/" }],
        },
        {
          text: "Utils",
          collapsed: true,
          items: [
            {
              text: "usePollWalletBalances",
              link: "/react/utils/usePollWalletBalances/",
            },
            {
              text: "useTokens",
              link: "/react/utils/useTokens/",
            },
            {
              text: "useTokenHoneyPrice",
              link: "/react/utils/useTokenHoneyPrice/",
            },
            {
              text: "useTokenHoneyPrices",
              link: "/react/utils/useTokenHoneyPrices/",
            },
            {
              text: "usePollBeraBalance",
              link: "/react/utils/usePollBeraBalance/",
            },
            {
              text: "usePollAllowance",
              link: "/react/utils/usePollAllowance/",
            },
            {
              text: "usePollAllowances",
              link: "/react/utils/usePollAllowances/",
            },
            {
              text: "usePollTransactionCount",
              link: "/react/utils/usePollTransactionCount/",
            },
            {
              text: "useTokenInformation",
              link: "/react/utils/useTokenInformation/",
            },
          ],
        },
      ],
    },
    {
      text: "Types",
      collapsed: true,
      items: [
        { text: "IUserPosition", link: "/types/IUserPosition/" },
        { text: "BeraConfig", link: "/types/BeraConfig/" },
        { text: "DefaultHookOptions", link: "/types/DefaultHookOptions/" },
        {
          text: "DefaultHookReturnType",
          link: "/types/DefaultHookReturnType/",
        },
        { text: "HoneyPreviewMethod", link: "/types/HoneyPreviewMethod/" },
        { text: "ReserveData", link: "/types/ReserveData/" },
        { text: "BaseCurrencyData", link: "/types/BaseCurrencyData/" },
        { text: "CollateralRates", link: "/types/CollateralRates/" },
        { text: "UserAccountData", link: "/types/UserAccountData/" },
      ],
    },
    {
      text: "Actions",
      collapsed: true,
      items: [
        { text: "Getting Started", link: "/actions/getting-started/" },
        {
          text: "Bex",
          collapsed: true,
          items: [
            { text: "getRoute", link: "/actions/dex/getRoute/" },
            { text: "getSwap", link: "/actions/dex/getSwap/" },
            { text: "getSwapPayload", link: "/actions/dex/getSwapPayload/" },
            {
              text: "getAddLiquidityPayload",
              link: "/actions/dex/getAddLiquidityPayload/",
            },
            {
              text: "getWithdrawLiquidityPayload",
              link: "/actions/dex/getWithdrawLiquidityPayload/",
            },
            {
              text: "getPoolUserPosition",
              link: "/actions/dex/getPoolUserPosition/",
            },
            {
              text: "getPoolRecentSwaps",
              link: "/actions/dex/getPoolRecentSwaps/",
            },
            {
              text: "sortBaseQuoteAddresses",
              link: "/actions/dex/sortBaseQuoteAddresses/",
            },
            {
              text: "getBeraLpAddress",
              link: "/actions/dex/getBeraLpAddress/",
            },
          ],
        },
        {
          text: "Honey",
          collapsed: true,
          items: [
            {
              text: "getCollateralRates",
              link: "/actions/honey/getCollateralRates/",
            },
            {
              text: "getHoneyPreview",
              link: "/actions/honey/getHoneyPreview/",
            },
          ],
        },
        {
          text: "Bend",
          collapsed: true,
          items: [
            { text: "getReserveData", link: "/actions/lend/getReserveData/" },
            {
              text: "getUserAccountData",
              link: "/actions/lend/getUserAccountData/",
            },
            {
              text: "getLendBorrowPayload",
              link: "/actions/lend/getLendBorrowPayload/",
            },
            {
              text: "getLendRepayPayload",
              link: "/actions/lend/getLendRepayPayload/",
            },
            {
              text: "getLendSupplyPayload",
              link: "/actions/lend/getLendSupplyPayload/",
            },
            {
              text: "getLendWithdrawPayload",
              link: "/actions/lend/getLendWithdrawPayload/",
            },
          ],
        },
        {
          text: "Berps",
          collapsed: true,
          items: [{ text: "Getting Started", link: "/react/getting-started/" }],
        },
        {
          text: "BGT",
          collapsed: true,
          items: [{ text: "Getting Started", link: "/react/getting-started/" }],
        },
        {
          text: "Utils",
          collapsed: true,
          items: [
            {
              text: "getAllowance",
              link: "/actions/utils/getAllowance/",
            },
            {
              text: "getAllowances",
              link: "/actions/utils/getAllowances/",
            },
            {
              text: "getTokenInformation",
              link: "/actions/utils/getTokenInformation/",
            },
            {
              text: "getTransactionCount",
              link: "/actions/utils/getTransactionCount/",
            },
            {
              text: "getTokens",
              link: "/actions/utils/getTokens/",
            },
            {
              text: "getWalletBalances",
              link: "/actions/utils/getWalletBalances/",
            },

            {
              text: "getBeraBalance",
              link: "/actions/utils/getBeraBalance/",
            },
          ],
        },
      ],
    },
    {
      text: "ABI",
      collapsed: true,
      items: [
        {
          text: "bTokenAbi",
          link: "/abi/bTokenAbi/",
        },
        {
          text: "bexQueryAbi",
          link: "/abi/bexQueryAbi/",
        },
        {
          text: "bexAbi",
          link: "/abi/bexAbi/",
        },
        {
          text: "honeyRouterAbi",
          link: "/abi/honeyRouterAbi",
        },
        {
          text: "lendPoolImplementationAbi",
          link: "/abi/lendPoolImplementationAbi/",
        },
        {
          text: "lendRewardHelperAbi",
          link: "/abi/lendRewardHelperAbi/",
        },
        {
          text: "lendUiDataProviderAbi",
          link: "/abi/lendUiDataProviderAbi/",
        },
        {
          text: "multicall3Abi",
          link: "/abi/multicall3Abi/",
        },
        {
          text: "multiswapAbi",
          link: "/abi/multiswapAbi/",
        },
        {
          text: "referralsAbi",
          link: "/abi/referralsAbi/",
        },
        {
          text: "tradingAbi",
          link: "/abi/tradingAbi/",
        },
        {
          text: "wberaAbi",
          link: "/abi/wberaAbi/",
        },
      ],
    },
    {
      text: "Bera Config",
      link: "/bera-config/",
    },
  ],
});
