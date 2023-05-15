import { cn } from "@bera/ui";
import { buttonVariants } from "@bera/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import Balancer from "react-wrap-balancer";
import { marketingFeatures, siteConfig } from "~/app/config";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="z-10 min-h-[50vh] w-full max-w-4xl px-5 xl:px-0">
        <a
          href="https://twitter.com/steventey/status/1613928948915920896"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center py-2 mx-auto mb-5 space-x-2 overflow-hidden transition-colors rounded-full max-w-fit animate-fade-up bg-sky-100 px-7 hover:bg-sky-200"
        >
          <Icons.twitter className="w-5 h-5 text-sky-500" />
          <p className="text-sm font-semibold text-sky-500">
            Introducing bera Corp
          </p>
        </a>
        <h1
          className="font-display animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          <Balancer>Your all-in-one, enterprise ready starting point</Balancer>
        </h1>
        <p
          className="mt-6 text-center opacity-0 animate-fade-up text-muted-foreground/80 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Acme Corp is a Next.js starter kit that includes everything you need
            to build a modern web application. Mobile application preconfigured,
            ready to go.
          </Balancer>
        </p>
        <div
          className="flex items-center justify-center mx-auto mt-6 space-x-5 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.40s", animationFillMode: "forwards" }}
        >
          <a
            className={cn(buttonVariants({ variant: "default" }))}
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
      <div className="w-full max-w-screen-lg gap-5 p-5 my-16 border-t animate-fade-up xl:px-0">
        <h2 className="py-8 text-3xl font-bold text-center md:text-4xl">
          What&apos;s included?
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {marketingFeatures.map((feature) => (
            <Card key={feature.title} className={feature.extraClassNames}>
              <CardHeader>{feature.icon}</CardHeader>
              <CardContent>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="mt-2">
                  {feature.body}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
