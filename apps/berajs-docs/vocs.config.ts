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
          items: [{ text: "Getting Started", link: "/react/getting-started/" }],
        },
        {
          text: "Honey",
          collapsed: true,
          items: [{ text: "Getting Started", link: "/react/getting-started/" }],
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
          text: "usePollWalletBalances",
          link: "/react/usePollWalletBalances/",
        },
        {
          text: "useTokens",
          link: "/react/useTokens/",
        },
        {
          text: "useTokenHoneyPrice",
          link: "/react/useTokenHoneyPrice/",
        },
        {
          text: "useTokenHoneyPrices",
          link: "/react/useTokenHoneyPrices/",
        },
        {
          text: "usePollBeraBalance",
          link: "/react/usePollBeraBalance/",
        },
        {
          text: "usePollHoneyBalance",
          link: "/react/usePollHoneyBalance/",
        },
        {
          text: "usePollAllowance",
          link: "/react/usePollAllowance/",
        },
        {
          text: "usePollAllowances",
          link: "/react/usePollAllowances/",
        },
        {
          text: "usePollTransactionCount",
          link: "/react/usePollTransactionCount/",
        },
        {
          text: "useTokenInformation",
          link: "/react/useTokenInformation/",
        },
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
          ],
        },
        {
          text: "Honey",
          collapsed: true,
          items: [{ text: "Getting Started", link: "/react/getting-started/" }],
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
            { text: "getTxnPayload", link: "/actions/lend/getTxnPayload/" },
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
          text: "sortBaseQuoteAddresses",
          link: "/actions/sortBaseQuoteAddresses/",
        },
        {
          text: "getBeraLpAddress",
          link: "/actions/getBeraLpAddress/",
        },
        {
          text: "getBeraBalance",
          link: "/actions/getBeraBalance/",
        },
        {
          text: "getHoneyBalance",
          link: "/actions/getHoneyBalance/",
        },
        {
          text: "getAllowance",
          link: "/actions/getAllowance/",
        },
        {
          text: "getAllowances",
          link: "/actions/getAllowances/",
        },
        {
          text: "getTokenInformation",
          link: "/actions/getTokenInformation/",
        },
        {
          text: "getTransactionCount",
          link: "/actions/getTransactionCount/",
        },
        {
          text: "getTokens",
          link: "/actions/getTokens/",
        },
        {
          text: "getWalletBalances",
          link: "/actions/getWalletBalances/",
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
