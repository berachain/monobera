import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({
  path: ["../../.env", "../../.env.local"],
});

const config: CodegenConfig = {
  overwrite: true,
  documents: "./lib/**/query.ts",
  schema: process.env.NEXT_PUBLIC_GOVERNANCE_SUBGRAPH_URL,
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
    },
  },
};

export default config;
