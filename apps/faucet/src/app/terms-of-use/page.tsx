import { type Metadata } from "next";
import { faucetName } from "@bera/config";
import { TermsOfUse } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: `Term Of Use | ${faucetName}`,
  description: "Public Testnet Terms of Use",
};

export default function Page() {
  return <TermsOfUse />;
}
