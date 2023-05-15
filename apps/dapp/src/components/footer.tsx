import { Icons } from "@bera/ui/icons";
import dynamic from "next/dynamic";
import Link from "next/link";
import { siteConfig } from "~/app/config";

const ThemeToggle = dynamic(() => import("~/components/theme-toggle"), {
  ssr: true,
});

export function SiteFooter() {
  return (
    <footer className="container py-6 border-t">
      <div className="flex flex-col items-center justify-between gap-4">
        <div className="flex justify-between w-full">
          <Link href="/" className="flex items-center text-lg font-medium">
            Bera
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
