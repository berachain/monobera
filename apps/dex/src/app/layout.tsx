import "@bera/ui/styles.css";
import "../styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@bera/ui";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import Providers from "./Providers";

const fontSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col overflow-hidden">
            <div className="flex-1">
              <Header />
              <main className="w-full py-40">{props.children}</main>
              <Toaster position="bottom-right" />
              <Footer />
            </div>
          </div>
          <TailwindIndicator />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
