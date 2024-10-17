import dotenv from "dotenv";

dotenv.config({
  path: ["./.env.local", "./.env"],
});
module.exports = {
  projects: {
    governance: {
      schema: process.env.NEXT_PUBLIC_GOVERNANCE_SUBGRAPH_URL,
      documents: "./packages/graphql/src/modules/governance/query.ts",
    },
    blocks: {
      schema: process.env.NEXT_PUBLIC_CHAIN_BLOCKS_SUBGRAPH_URL,
      documents: "./packages/graphql/src/modules/chain/query.ts",
    },
  },
};
