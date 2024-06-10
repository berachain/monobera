import { type Metadata } from "next";
import { lendName } from "@bera/config";
import { AccessDeny } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: `Access Denied | ${lendName}`,
  description: "Public Testnet Access Denied",
};

export default function Page() {
  return (
    <div>
      <AccessDeny />
    </div>
  );
}
