import { type Metadata } from "next";
import { TermsOfUse } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: "Term Of Use",
  description: "Public Testnet Terms of Use",
};

export default function Page() {
  return <TermsOfUse />;
}
