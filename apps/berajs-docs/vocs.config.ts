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
          items: [{ text: "getRoute", link: "/actions/getRoute/" }],
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
      ],
    },
    {
      text: "Bera Config",
      link: "/bera-config/",
    },
  ],
});
