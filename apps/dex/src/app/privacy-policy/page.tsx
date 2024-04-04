import { type Metadata } from "next";
import { PrivacyPolicy } from "@bera/shared-ui";

import { getMetaTitle } from "@bera/shared-ui";
import { dexName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Privacy Policy", dexName),
  description: "Public Testnet Privacy Policy",
};

export default function Page() {
  return <PrivacyPolicy />;
}
