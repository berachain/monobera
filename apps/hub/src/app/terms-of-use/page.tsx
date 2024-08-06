import { type Metadata } from "next";
import { TermsOfUse } from "@bera/shared-ui";

import { getMetaTitle } from "@bera/shared-ui";
import { bgtName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Term Of Use", bgtName),
  description: "Public Testnet Terms of Use",
};

export default function Page() {
  return <TermsOfUse />;
}
