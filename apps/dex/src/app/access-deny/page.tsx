import { type Metadata } from "next";
import { dexName } from "@bera/config";
import { AccessDeny } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: `Access Denied | ${dexName}`,
  description: "Public Testnet Access Denied",
};

export default function Page() {
  return (
    <div>
      <AccessDeny />
    </div>
  );
}
