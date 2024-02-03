import { ApolloProvider } from "@apollo/client";

import { client } from "./client";

export const BeraGraphProvider = ({ children }: React.PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
