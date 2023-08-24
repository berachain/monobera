import { Icons } from "@bera/ui/icons";

export function Footer({
  navItem,
}: {
  navItem: { solutions: any[]; support: any[]; social: any[] };
}) {
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ornare cursus sed nunc eget dictum Sed ornare cursus sed nunc eget
              dictumd nunc eget dictum Sed ornare cursus sed nunc eget dictum
            </p>
            <div className="flex space-x-6">
              {navItem.social.map((item) => (
                <a
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
                Solutions
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navItem.solutions.map((item) => (
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
            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground">
                Support
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navItem.support.map((item) => (
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
            &copy; {new Date().getFullYear()} BeraChain | All rights reserved
            (not really)
          </p>
          <p className="text-xs">Made W/❤️ at the 🐻BeraDen</p>
        </div>
      </div>
    </footer>
  );
}
