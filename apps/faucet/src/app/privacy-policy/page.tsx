import { type Metadata } from "next";
import { faucetName } from "@bera/config";
import { PrivacyPolicy } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: `Privacy Policy | ${faucetName}`,
  description: "Public Testnet Privacy Policy",
};

export default function Page() {
  return <PrivacyPolicy />;
}
