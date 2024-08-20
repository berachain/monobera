import { redirect } from "next/navigation";

import { DEFAULT_MARKET } from "~/utils/constants";

export default function Home() {
  if (process.env.NEXT_PUBLIC_HOST === "ipfs") {
    return null;
  }
  return redirect(`/berpetuals/${DEFAULT_MARKET}`);
}
