import { defineConfig } from "vocs";

export default defineConfig({
  title: "BeraJS",
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
            { text: "getRoute", link: "/actions/getRoute/" },
            { text: "getSwap", link: "/actions/getSwap/" },
            { text: "getSwapPayload", link: "/actions/getSwapPayload/" },
            {
              text: "getAddLiquidityPayload",
              link: "/actions/getAddLiquidityPayload/",
            },
            {
              text: "getWithdrawLiquidityPayload",
              link: "/actions/getWithdrawLiquidityPayload/",
            },
            {
              text: "getBeraBalance",
              link: "/actions/getBeraBalance/",
            },
            {
              text: "getHoneyBalance",
              link: "/actions/getHoneyBalance/",
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
          text: "sortBaseQuoteAddresses",
          link: "/actions/sortBaseQuoteAddresses/",
        },
        {
          text: "getBeraLpAddress",
          link: "/actions/getBeraLpAddress/",
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
      ]
    },
    {
      text: "Bera Config",
      link: "/bera-config/",
    },
  ],
});
