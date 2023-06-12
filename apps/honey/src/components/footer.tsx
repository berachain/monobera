import Link from "next/link";
import { Icons } from "@bera/ui/icons";

export function SiteFooter() {
  return (
    <footer className="container z-10 border-t border-borderSecondary py-6">
      <div className="flex flex-col items-center justify-between gap-4">
        <div className="flex w-full justify-between">
          <Link href="/" className="flex items-center text-lg font-medium">
            <Icons.honeyLogo className="h-10 w-10" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
