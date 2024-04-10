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
      link: "/introduction/",
    },
    {
      text: "React",
      collapsed: true,
      items: [{ text: "Getting Started", link: "/react/getting-started/" }],
    },
    {
      text: "Actions",
      collapsed: true,
      items: [
        { text: "Getting Started", link: "/actions/getting-started/" },
        { text: "getRoute", link: "/actions/getRoute/" },
      ],
    },
    {
      text: "Bera Config",
      link: "/bera-config/",
    },
  ],
});
