import { type Metadata } from "next";
import { lendName } from "@bera/config";
import { PrivacyPolicy } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: `Privacy Policy | ${lendName}`,
  description: "Public Testnet Privacy Policy",
};

export default function Page() {
  return <PrivacyPolicy />;
}
