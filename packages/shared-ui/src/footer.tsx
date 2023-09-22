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
  pressKit,
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
    { name: "Press Kit", href: pressKit },
  ],

  social: [
    // {
    //   name: "Telegram",
    //   href: process.env.NEXT_PUBLIC_TELEGRAM,
    //   icon: () => <Icons.telegram className="h-6 w-6 text-background" />,
    // },
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
  ],
};

export function Footer() {
  return (
    <footer className="bg-background" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
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
                Resurces
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.resources.map((item) => (
                  <li key={item.name}>
                    <a
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
        <div className="mt-16 flex justify-between border-t border-border pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-secondary-foreground">
            &copy; {new Date().getFullYear()} Berachain | All rights reserved
          </p>
          <p className="text-xs">Made W/❤️ at the 🐻Beraden</p>
        </div>
      </div>
    </footer>
  );
}
