import { type Metadata } from "next";
import { TermsOfUse } from "@bera/shared-ui";

import { getMetaTitle } from "@bera/shared-ui";
import { hubName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Term Of Use", hubName),
  description: "Public Testnet Terms of Use",
};

export default function Page() {
  return <TermsOfUse />;
}
