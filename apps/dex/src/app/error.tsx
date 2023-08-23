"use client";

// Error components must be Client Components
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ErrorPage } from "@bera/shared-ui";

export default function Error({
  error,
}: // reset,
{
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();
  return (
    <div className="my-[100px]">
      <ErrorPage onBack={() => router.push("/")} />
    </div>
  );
}
