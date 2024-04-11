// vocs.config.ts
import { defineConfig } from "file:///Users/aiweiwu/Documents/monobera/node_modules/vocs/_lib/index.js";
const vocs_config_default = defineConfig({
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
          text: "usePollAssetWalletBalance",
          link: "/react/usePollAssetWalletBalance/",
        },
      ],
    },
    {
      text: "Actions",
      collapsed: true,
      items: [
        { text: "Getting Started", link: "/react/getting-started/" },
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
export { vocs_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidm9jcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWl3ZWl3dS9Eb2N1bWVudHMvbW9ub2JlcmEvYXBwcy9iZXJhanMtZG9jc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Fpd2Vpd3UvRG9jdW1lbnRzL21vbm9iZXJhL2FwcHMvYmVyYWpzLWRvY3Mvdm9jcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Fpd2Vpd3UvRG9jdW1lbnRzL21vbm9iZXJhL2FwcHMvYmVyYWpzLWRvY3Mvdm9jcy5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidm9jc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICB0aXRsZTogXCJCZXJhSlNcIixcbiAgZWRpdExpbms6IHtcbiAgICBwYXR0ZXJuOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9iZXJhY2hhaW4vbW9ub2JlcmEvZWRpdC9hcHBzL2JlcmFqcy1kb2MvOnBhdGhcIixcbiAgICB0ZXh0OiBcIlN1Z2dlc3QgY2hhbmdlcyB0byB0aGlzIHBhZ2VcIixcbiAgfSxcbiAgc29jaWFsczogW1xuICAgIHtcbiAgICAgIGljb246IFwiZ2l0aHViXCIsXG4gICAgICBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9iZXJhY2hhaW4vbW9ub2JlcmFcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IFwieFwiLFxuICAgICAgbGluazogXCJodHRwczovL3R3aXR0ZXIuY29tL2JlcmFjaGFpblwiLFxuICAgIH0sXG4gIF0sXG4gIHNpZGViYXI6IFtcbiAgICB7XG4gICAgICB0ZXh0OiBcIkludHJvZHVjdGlvblwiLFxuICAgICAgbGluazogXCIvaW50cm9kdWN0aW9uL1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJSZWFjdFwiLFxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyB0ZXh0OiBcIkdldHRpbmcgU3RhcnRlZFwiLCBsaW5rOiBcIi9yZWFjdC9nZXR0aW5nLXN0YXJ0ZWQvXCIgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiQmV4XCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbeyB0ZXh0OiBcIkdldHRpbmcgU3RhcnRlZFwiLCBsaW5rOiBcIi9yZWFjdC9nZXR0aW5nLXN0YXJ0ZWQvXCIgfV0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIkhvbmV5XCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbeyB0ZXh0OiBcIkdldHRpbmcgU3RhcnRlZFwiLCBsaW5rOiBcIi9yZWFjdC9nZXR0aW5nLXN0YXJ0ZWQvXCIgfV0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIkJlbmRcIixcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFt7IHRleHQ6IFwiR2V0dGluZyBTdGFydGVkXCIsIGxpbms6IFwiL3JlYWN0L2dldHRpbmctc3RhcnRlZC9cIiB9XSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiQmVycHNcIixcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFt7IHRleHQ6IFwiR2V0dGluZyBTdGFydGVkXCIsIGxpbms6IFwiL3JlYWN0L2dldHRpbmctc3RhcnRlZC9cIiB9XSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiQkdUXCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbeyB0ZXh0OiBcIkdldHRpbmcgU3RhcnRlZFwiLCBsaW5rOiBcIi9yZWFjdC9nZXR0aW5nLXN0YXJ0ZWQvXCIgfV0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcInVzZVBvbGxBc3NldFdhbGxldEJhbGFuY2VcIixcbiAgICAgICAgICBsaW5rOiBcIi9yZWFjdC91c2VQb2xsQXNzZXRXYWxsZXRCYWxhbmNlL1wiLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiQWN0aW9uc1wiLFxuICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyB0ZXh0OiBcIkdldHRpbmcgU3RhcnRlZFwiLCBsaW5rOiBcIi9yZWFjdC9nZXR0aW5nLXN0YXJ0ZWQvXCIgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiQmV4XCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbeyB0ZXh0OiBcImdldFJvdXRlXCIsIGxpbms6IFwiL2FjdGlvbnMvZ2V0Um91dGUvXCIgfV0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIkhvbmV5XCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbeyB0ZXh0OiBcIkdldHRpbmcgU3RhcnRlZFwiLCBsaW5rOiBcIi9yZWFjdC9nZXR0aW5nLXN0YXJ0ZWQvXCIgfV0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIkJlbmRcIixcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFt7IHRleHQ6IFwiR2V0dGluZyBTdGFydGVkXCIsIGxpbms6IFwiL3JlYWN0L2dldHRpbmctc3RhcnRlZC9cIiB9XSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiQmVycHNcIixcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFt7IHRleHQ6IFwiR2V0dGluZyBTdGFydGVkXCIsIGxpbms6IFwiL3JlYWN0L2dldHRpbmctc3RhcnRlZC9cIiB9XSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiQkdUXCIsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbeyB0ZXh0OiBcIkdldHRpbmcgU3RhcnRlZFwiLCBsaW5rOiBcIi9yZWFjdC9nZXR0aW5nLXN0YXJ0ZWQvXCIgfV0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJCZXJhIENvbmZpZ1wiLFxuICAgICAgbGluazogXCIvYmVyYS1jb25maWcvXCIsXG4gICAgfSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3VSxTQUFTLG9CQUFvQjtBQUVyVyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsSUFDUixTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1A7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixXQUFXO0FBQUEsTUFDWCxPQUFPO0FBQUEsUUFDTCxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sMEJBQTBCO0FBQUEsUUFDM0Q7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxVQUNYLE9BQU8sQ0FBQyxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFBQSxRQUN0RTtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxVQUNYLE9BQU8sQ0FBQyxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFBQSxRQUN0RTtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxVQUNYLE9BQU8sQ0FBQyxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFBQSxRQUN0RTtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxVQUNYLE9BQU8sQ0FBQyxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFBQSxRQUN0RTtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxVQUNYLE9BQU8sQ0FBQyxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sMEJBQTBCLENBQUM7QUFBQSxRQUN0RTtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixXQUFXO0FBQUEsTUFDWCxPQUFPO0FBQUEsUUFDTCxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sMEJBQTBCO0FBQUEsUUFDM0Q7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxVQUNYLE9BQU8sQ0FBQyxFQUFFLE1BQU0sWUFBWSxNQUFNLHFCQUFxQixDQUFDO0FBQUEsUUFDMUQ7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixXQUFXO0FBQUEsVUFDWCxPQUFPLENBQUMsRUFBRSxNQUFNLG1CQUFtQixNQUFNLDBCQUEwQixDQUFDO0FBQUEsUUFDdEU7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixXQUFXO0FBQUEsVUFDWCxPQUFPLENBQUMsRUFBRSxNQUFNLG1CQUFtQixNQUFNLDBCQUEwQixDQUFDO0FBQUEsUUFDdEU7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixXQUFXO0FBQUEsVUFDWCxPQUFPLENBQUMsRUFBRSxNQUFNLG1CQUFtQixNQUFNLDBCQUEwQixDQUFDO0FBQUEsUUFDdEU7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixXQUFXO0FBQUEsVUFDWCxPQUFPLENBQUMsRUFBRSxNQUFNLG1CQUFtQixNQUFNLDBCQUEwQixDQUFDO0FBQUEsUUFDdEU7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
