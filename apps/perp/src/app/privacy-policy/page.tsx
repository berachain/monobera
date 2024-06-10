import { type Metadata } from "next";
import { perpsName } from "@bera/config";
import { PrivacyPolicy } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: `Privacy Policy | ${perpsName}`,
  description: "Public Testnet Privacy Policy",
};

export default function Page() {
  return <PrivacyPolicy />;
}
