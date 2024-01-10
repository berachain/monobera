import { type Metadata } from "next";
import { PrivacyPolicy } from "@bera/shared-ui";

import { getMetaTitle } from "~/utils/metadata";

export const metadata: Metadata = {
  title: getMetaTitle("Privacy Policy"),
  description: "Public Testnet Privacy Policy",
};

export default function Page() {
  return <PrivacyPolicy />;
}
