import dotenv from "dotenv";

dotenv.config({
  path: ["./.env", "./.env.local"],
});
module.exports = {
  projects: {
    governance: {
      schema: "http://localhost:8000/subgraphs/name/governance-subgraph",
      documents: "./packages/graphql/src/modules/governance/query.ts",
    },
    blocks: {
      schema: process.env.NEXT_PUBLIC_CHAIN_BLOCKS_SUBGRAPH_URL,
      documents: "./packages/graphql/src/modules/chain/query.ts",
    },
  },
};
