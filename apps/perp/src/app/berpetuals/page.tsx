import { redirect } from "next/navigation";
import { isIPFS } from "@bera/config";

import { DEFAULT_MARKET } from "~/utils/constants";

export default function Home() {
  if (isIPFS) {
    return null;
  }
  return redirect(`/berpetuals/${DEFAULT_MARKET}`);
}
