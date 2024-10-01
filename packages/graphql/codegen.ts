import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({
  path: ["../../.env.local", "../../.env"],
});

const governanceSchemaUrl = process.env.NEXT_PUBLIC_GOVERNANCE_SUBGRAPH_URL;
const chainSchemaUrl = process.env.NEXT_PUBLIC_CHAIN_BLOCKS_SUBGRAPH_URL;

if (!governanceSchemaUrl || !chainSchemaUrl) {
  throw new Error(
    "GraphQL schema URLs are not defined in the environment variables.",
  );
}
const config: CodegenConfig = {
  overwrite: true,
  // documents: "./src/**/query.ts",
  schema: process.env.NEXT_PUBLIC_CHAIN_BLOCKS_SUBGRAPH_URL,
  generates: {
    "./src/modules/governance/codegen.ts": {
      documents: "./src/modules/governance/query.ts",
      schema: process.env.NEXT_PUBLIC_GOVERNANCE_SUBGRAPH_URL,
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        {
          "typescript-document-nodes": {
            gqlImport: "@apollo/client#gql",
          },
        },
      ],
      config: {
        noExport: true,
      },
    },
    "./src/modules/chain/codegen.ts": {
      documents: "./src/modules/chain/query.ts",
      schema: process.env.NEXT_PUBLIC_CHAIN_BLOCKS_SUBGRAPH_URL,

      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        {
          "typescript-document-nodes": {
            gqlImport: "@apollo/client#gql",
          },
        },
      ],
      config: {
        noExport: true,
      },
    },
  },
};

export default config;
