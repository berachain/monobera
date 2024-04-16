import { defineConfig } from "vocs";

export default defineConfig({
  title: "BeraJS",
  editLink: {
    pattern: "https://github.com/berachain/monobera/edit/apps/berajs-doc/:path",
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
    {
      text: "Introduction",
      collapsed: false,
      items: [
        { text: "Getting Started", link: "/introduction/getting-started/" },
      ],
    },
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
      ],
    },
    {
      text: "Bera Config",
      link: "/bera-config/",
    },
  ],
});
