import dynamic from "next/dynamic";
import Link from "next/link";
import { Icons } from "@bera/ui/icons";

const ThemeToggle = dynamic(() => import("~/components/theme-toggle"), {
  ssr: true,
});

export function SiteFooter() {
  return (
    <footer className="container border-t py-6">
      <div className="flex flex-col items-center justify-between gap-4">
        <div className="flex w-full justify-between">
          <Link href="/" className="flex items-center text-lg font-medium">
            <Icons.logo className="h-12 w-12" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
