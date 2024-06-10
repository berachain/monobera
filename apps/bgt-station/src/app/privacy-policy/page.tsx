import { type Metadata } from "next";
import { PrivacyPolicy } from "@bera/shared-ui";

import { getMetaTitle } from "@bera/shared-ui";
import { bgtName } from "@bera/config";

export const metadata: Metadata = {
  title: getMetaTitle("Privacy Policy", bgtName),
  description: "Public Testnet Privacy Policy",
};

export default function Page() {
  return <PrivacyPolicy />;
}
