import { type SVGProps } from "react";
import { Icons } from "@bera/ui/icons";

const navigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],

  social: [
    {
      name: "Telegram",
      href: "#",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <g clip-path="url(#clip0_2220_15440)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.5332 6.98129C13.5332 10.6011 10.5988 13.5355 6.97902 13.5355C3.35923 13.5355 0.424805 10.6011 0.424805 6.98129C0.424805 3.3615 3.35923 0.427074 6.97902 0.427074C10.5988 0.427074 13.5332 3.3615 13.5332 6.98129ZM7.21389 5.26569C6.5764 5.53084 5.30231 6.07965 3.39162 6.9121C3.08136 7.03548 2.91882 7.15619 2.90403 7.27421C2.87902 7.47367 3.12881 7.55222 3.46895 7.65917C3.51522 7.67372 3.56316 7.6888 3.6123 7.70477C3.94695 7.81355 4.39711 7.94081 4.63113 7.94587C4.84341 7.95046 5.08033 7.86294 5.34191 7.68332C7.12712 6.47826 8.04866 5.86916 8.10652 5.85602C8.14733 5.84676 8.2039 5.83511 8.24222 5.86917C8.28054 5.90324 8.27677 5.96775 8.27272 5.98505C8.24797 6.09054 7.26747 7.0021 6.76007 7.47383C6.60188 7.62089 6.48968 7.7252 6.46674 7.74903C6.41536 7.8024 6.36299 7.85288 6.31267 7.90139C6.00177 8.2011 5.76863 8.42585 6.32557 8.79287C6.59322 8.96924 6.80739 9.1151 7.02105 9.2606C7.2544 9.41951 7.48713 9.578 7.78826 9.77539C7.86498 9.82568 7.93825 9.87791 8.00961 9.92879C8.28117 10.1224 8.52513 10.2963 8.82654 10.2686C9.00168 10.2525 9.18258 10.0878 9.27446 9.59662C9.49159 8.43586 9.91838 5.92085 10.017 4.88447C10.0257 4.79367 10.0148 4.67747 10.0061 4.62646C9.99733 4.57544 9.97909 4.50276 9.91278 4.44896C9.83425 4.38524 9.71302 4.3718 9.6588 4.37276C9.41229 4.3771 9.03407 4.50861 7.21389 5.26569Z"
              fill="#57534E"
            />
          </g>
          <defs>
            <clipPath id="clip0_2220_15440">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.424805 0.427074)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Discord",
      href: "#",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <g clip-path="url(#clip0_2220_15436)">
            <path
              d="M11.4911 2.72827C10.6617 2.34772 9.77236 2.06735 8.84247 1.90677C8.82553 1.90367 8.80862 1.91142 8.7999 1.92691C8.68551 2.13034 8.55882 2.39574 8.4701 2.60434C7.46994 2.45461 6.47492 2.45461 5.49527 2.60434C5.40653 2.3911 5.27524 2.13034 5.16034 1.92691C5.15162 1.91193 5.1347 1.90419 5.11777 1.90677C4.18839 2.06684 3.29903 2.34721 2.46915 2.72827C2.46197 2.73137 2.45581 2.73653 2.45172 2.74324C0.764781 5.26349 0.302657 7.7218 0.52936 10.1496C0.530385 10.1615 0.537053 10.1729 0.546285 10.1801C1.65928 10.9974 2.73741 11.4937 3.79551 11.8226C3.81245 11.8277 3.83039 11.8215 3.84117 11.8076C4.09146 11.4658 4.31458 11.1054 4.50588 10.7264C4.51717 10.7042 4.50639 10.6778 4.48331 10.6691C4.12942 10.5348 3.79243 10.3711 3.46828 10.1853C3.44264 10.1703 3.44059 10.1336 3.46417 10.1161C3.53239 10.0649 3.60062 10.0118 3.66576 9.95806C3.67754 9.94825 3.69396 9.94618 3.70782 9.95237C5.83737 10.9247 8.14286 10.9247 10.2473 9.95237C10.2611 9.94567 10.2776 9.94774 10.2899 9.95754C10.355 10.0112 10.4232 10.0649 10.492 10.1161C10.5155 10.1336 10.514 10.1703 10.4884 10.1853C10.1642 10.3747 9.82723 10.5348 9.47282 10.6685C9.44974 10.6773 9.43948 10.7042 9.45077 10.7264C9.64617 11.1048 9.86929 11.4653 10.115 11.8071C10.1252 11.8215 10.1437 11.8277 10.1606 11.8226C11.2239 11.4937 12.302 10.9974 13.415 10.1801C13.4247 10.1729 13.4309 10.162 13.4319 10.1501C13.7032 7.34331 12.9775 4.90516 11.508 2.74375C11.5044 2.73653 11.4983 2.73137 11.4911 2.72827ZM4.82389 8.67134C4.18275 8.67134 3.65447 8.08272 3.65447 7.35984C3.65447 6.63696 4.1725 6.04834 4.82389 6.04834C5.48039 6.04834 6.00356 6.64213 5.9933 7.35984C5.9933 8.08272 5.47526 8.67134 4.82389 8.67134ZM9.14764 8.67134C8.50651 8.67134 7.97823 8.08272 7.97823 7.35984C7.97823 6.63696 8.49625 6.04834 9.14764 6.04834C9.80416 6.04834 10.3273 6.64213 10.3171 7.35984C10.3171 8.08272 9.80416 8.67134 9.14764 8.67134Z"
              fill="#57534E"
            />
          </g>
          <defs>
            <clipPath id="clip0_2220_15436">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.475586 0.475164)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="col-span-2 space-y-8">
            <Icons.logo className="h-10 w-auto" />
            <p className="text-sm leading-6 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ornare cursus sed nunc eget dictum Sed ornare cursus sed nunc eget
              dictumd nunc eget dictum Sed ornare cursus sed nunc eget dictum
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Solutions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-between border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} BeraChain | All rights reserved
            (not really)
          </p>
          <p className="text-xs">Made W/❤️ at the 🐻BeraDen</p>
        </div>
      </div>
    </footer>
  );
}
