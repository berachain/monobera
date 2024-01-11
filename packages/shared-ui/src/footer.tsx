import {
  bgtName,
  bgtUrl,
  blockExplorerName,
  blockExplorerUrl,
  careersUrl,
  dexName,
  dexUrl,
  discord,
  docsUrl,
  github,
  homepageUrl,
  honeyName,
  honeyUrl,
  lendName,
  lendUrl,
  perpsName,
  perpsUrl,
  telegram,
  // pressKit,
  twitter,
} from "@bera/config";
import { Icons } from "@bera/ui/icons";

export const footerNavigation = {
  ecosystem: [
    {
      name: dexName,
      href: dexUrl,
    },
    {
      name: bgtName,
      href: bgtUrl,
    },
    {
      name: honeyName,
      href: honeyUrl,
    },
    {
      name: lendName,
      href: lendUrl,
    },
    {
      name: perpsName,
      href: perpsUrl,
    },
    {
      name: blockExplorerName,
      href: blockExplorerUrl,
    },
  ],
  resources: [
    { name: "Foundation", href: homepageUrl },
    { name: "Docs", href: docsUrl },
    { name: "Careers", href: careersUrl },
    // { name: "Press Kit", href: pressKit },
  ],

  social: [
    {
      name: "X",
      href: twitter,
      icon: Icons.elonMusk,
    },
    {
      name: "GitHub",
      href: github,
      icon: Icons.gitHub,
    },
    {
      name: "Discord",
      href: discord,
      icon: Icons.discord,
    },
    {
      name: "Telegram",
      href: telegram,
      icon: Icons.telegram,
    },
  ],
};

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-background"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container max-w-1280 pb-8 pt-16 sm:pt-24 lg:pt-32">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="col-span-2 space-y-8">
            <Icons.logo className="h-10 w-auto" />
            <p className="text-sm leading-6 text-secondary-foreground">
              Berachain is a high-performance EVM-compatible blockchain built on
              Proof-of-Liquidity consensus. Proof-of-Liquidity is a novel
              consensus mechanism that aims to align network incentives,
              creating strong synergy between Berachain validators and the
              ecosystem of projects.
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                <a
                  target="_blank"
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-secondary-foreground"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon
                    className="h-6 w-6 text-foreground"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">
                Ecosystem
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.ecosystem.map((item) => (
                  <li key={item.name}>
                    <a
                      target="_blank"
                      href={item.href}
                      className="text-sm leading-6 text-secondary-foreground hover:text-foreground"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">
                Resources
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.resources.map((item) => (
                  <li key={item.name}>
                    <a
                      target="_blank"
                      href={item.href}
                      className="text-sm leading-6 text-secondary-foreground hover:text-foreground"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between border-t border-border pt-8 sm:mt-20 sm:flex-row lg:mt-24">
          <p className="text-xs leading-5 text-secondary-foreground">
            &copy; {new Date().getFullYear()} Berachain | All rights reserved |{" "}
            <a className="font-bold underline" href="/terms-of-use">
              Terms of Service
            </a>{" "}
            |{" "}
            <a className="font-bold underline" href="/privacy-policy">
              Privacy Policy
            </a>
          </p>
          <p className="text-xs">Made W/❤️ at the 🐻Beraden</p>
        </div>
        <div className="text-center text-[8px] sm:text-left">
          *Annual Percentage Yield (APY) data is provided from third party and
          publicly available information, is subject to change, may not be
          accurate or complete and may not reflect your actual earnings but
          rather the general network yields estimated to be applicable to all
          relevant network participants based on current conditions of the
          network, which may change. Presented rates are retrospective in nature
          and there is no guarantee that historic rates will represent current
          or future rates. APY data is provided for informational purposes only
          and should not be relied on.
        </div>
      </div>
    </footer>
  );
}

export function FooterSM() {
  return (
    <footer
      className="border-t border-border bg-background p-4 sm:p-8"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="flex flex-col items-center justify-between sm:flex-row">
        <p className="text-xs leading-5 text-secondary-foreground">
          &copy; {new Date().getFullYear()} Berachain | All rights reserved |{" "}
          <a className="font-bold underline" href="/terms-of-use">
            Terms of Service
          </a>{" "}
          |{" "}
          <a className="font-bold underline" href="/privacy-policy">
            Privacy Policy
          </a>
        </p>
        <p className="whitespace-nowrap text-xs">Made W/❤️ at the 🐻Beraden</p>
      </div>

      <div className="text-[8px]  sm:text-left">
        *Annual Percentage Yield (APY) data is provided from third party and
        publicly available information, is subject to change, may not be
        accurate or complete and may not reflect your actual earnings but rather
        the general network yields estimated to be applicable to all relevant
        network participants based on current conditions of the network, which
        may change. Presented rates are retrospective in nature and there is no
        guarantee that historic rates will represent current or future rates.
        APY data is provided for informational purposes only and should not be
        relied on.
      </div>
    </footer>
  );
}
