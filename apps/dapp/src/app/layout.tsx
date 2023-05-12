import "@bera/ui/styles.css";
import "../styles/globals.css";
import { cn } from "@bera/ui";
import { Toaster } from "@bera/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { SiteFooter } from "~/components/footer";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { ThemeProvider } from "~/components/theme-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className="bg-background">
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex flex-col min-h-screen">
              <div className="flex-1">
                {props.children}
                {props.modal}
              </div>
              <SiteFooter />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
          <Analytics />
          <Toaster />
        </body>
      </html>
    </>
  );
}
