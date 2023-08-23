"use client";

import { useRouter } from "next/navigation";
import { ErrorPage } from "@bera/shared-ui";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="my-[100px]">
      <ErrorPage onBack={() => router.push("/")} />
    </div>
  );
}
