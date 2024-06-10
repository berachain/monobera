import { type Metadata } from "next";
import { lendName } from "@bera/config";
import { TermsOfUse } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: `Term Of Use | ${lendName}`,
  description: "Public Testnet Terms of Use",
};

export default function Page() {
  return <TermsOfUse />;
}
