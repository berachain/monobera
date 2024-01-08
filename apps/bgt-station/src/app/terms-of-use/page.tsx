import { type Metadata } from "next";
import { TermsOfUse } from "@bera/shared-ui";

import { getMetaTitle } from "~/utils/metadata";

export const metadata: Metadata = {
  title: getMetaTitle("Term Of Use"),
  description: "Public Testnet Terms of Use",
};

export default function Page() {
  return <TermsOfUse />;
}
