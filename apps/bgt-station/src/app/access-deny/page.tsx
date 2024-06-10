import { type Metadata } from "next";
import { bgtName } from "@bera/config";
import { AccessDeny } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: `Access Denied | ${bgtName}`,
  description: "Public Testnet Access Denied",
};

export default function Page() {
  return (
    <div>
      <AccessDeny />
    </div>
  );
}
