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
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="currentColor"
          {...props}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
            fill="url(#paint0_linear_2198_2186109)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.8638 23.7466C17.8603 20.6984 22.5257 18.6888 24.8601 17.7179C31.5251 14.9456 32.91 14.4641 33.8127 14.4482C34.0113 14.4447 34.4552 14.4939 34.7427 14.7272C34.9855 14.9242 35.0523 15.1904 35.0843 15.3771C35.1163 15.5639 35.1561 15.9895 35.1244 16.3219C34.7633 20.1169 33.2004 29.3263 32.4053 33.5767C32.0689 35.3752 31.4065 35.9782 30.7652 36.0373C29.3714 36.1655 28.3131 35.1162 26.9632 34.2313C24.8509 32.8467 23.6576 31.9847 21.6072 30.6336C19.2377 29.0721 20.7738 28.2139 22.1242 26.8113C22.4776 26.4442 28.6183 20.8587 28.7372 20.352C28.7521 20.2886 28.7659 20.0524 28.6255 19.9277C28.4852 19.803 28.2781 19.8456 28.1286 19.8795C27.9168 19.9276 24.5423 22.158 18.0053 26.5707C17.0475 27.2284 16.1799 27.5489 15.4026 27.5321C14.5457 27.5135 12.8973 27.0475 11.6719 26.6492C10.1689 26.1606 8.97432 25.9023 9.07834 25.0726C9.13252 24.6404 9.72767 24.1984 10.8638 23.7466Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2198_2186109"
              x1="24"
              y1="0"
              x2="24"
              y2="47.644"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2AABEE" />
              <stop offset="1" stopColor="#229ED9" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: "X",
      href: "#",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 48 48"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M36.4878 4.5H43.1038L28.6498 21.02L45.6538 43.5H32.3398L21.9118 29.866L9.97981 43.5H3.35981L18.8198 25.83L2.50781 4.5H16.1598L25.5858 16.962L36.4878 4.5ZM34.1658 39.54H37.8318L14.1678 8.252H10.2338L34.1658 39.54Z"
            fill="#191717"
          />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 48 48"
          fill="currentColor"
          {...props}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.9915 1C18.294 1.00296 12.7832 3.02092 8.4447 6.69305C4.10618 10.3652 1.22277 15.452 0.310056 21.044C-0.602662 26.636 0.51482 32.3684 3.46271 37.2164C6.4106 42.0643 10.9966 45.7115 16.4008 47.5059C17.5931 47.7272 18.0422 46.9883 18.0422 46.36C18.0422 45.7317 18.0183 43.91 18.0104 41.9184C11.3338 43.3608 9.92294 39.101 9.92294 39.101C8.83402 36.3349 7.26024 35.6078 7.26024 35.6078C5.0824 34.1299 7.4232 34.1576 7.4232 34.1576C9.83551 34.3275 11.1033 36.6194 11.1033 36.6194C13.2414 40.2667 16.7188 39.2116 18.0859 38.5952C18.3005 37.0501 18.9244 35.999 19.612 35.4023C14.2786 34.8017 8.67504 32.7548 8.67504 23.6108C8.64199 21.2394 9.52701 18.9461 11.147 17.2054C10.9006 16.6047 10.0779 14.1785 11.3815 10.8829C11.3815 10.8829 13.3964 10.2427 17.9826 13.3289C21.9163 12.2592 26.0667 12.2592 30.0004 13.3289C34.5827 10.2427 36.5936 10.8829 36.5936 10.8829C37.9011 14.1706 37.0784 16.5968 36.832 17.2054C38.4571 18.9464 39.344 21.2437 39.3079 23.6187C39.3079 32.7824 33.6924 34.8017 28.3512 35.3905C29.2096 36.1333 29.9766 37.5836 29.9766 39.8122C29.9766 43.0051 29.9488 45.5736 29.9488 46.36C29.9488 46.9962 30.3819 47.7391 31.598 47.5059C37.0029 45.7113 41.5894 42.0634 44.5372 37.2147C47.485 32.3659 48.6019 26.6326 47.6882 21.0401C46.7744 15.4476 43.8896 10.3607 39.5496 6.68921C35.2097 3.01771 29.6977 1.00108 23.9994 1H23.9915Z"
            fill="#191717"
          />
        </svg>
      ),
    },
    {
      name: "Discord",
      href: "#",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M40.634 9.03283C37.5747 7.62906 34.294 6.59483 30.8638 6.00248C30.8013 5.99105 30.7389 6.01962 30.7067 6.07676C30.2848 6.82719 29.8175 7.80619 29.4902 8.57568C25.8008 8.02334 22.1304 8.02334 18.5166 8.57568C18.1893 7.78909 17.705 6.82719 17.2811 6.07676C17.249 6.02153 17.1866 5.99296 17.1241 6.00248C13.6958 6.59294 10.4151 7.62717 7.35387 9.03283C7.32737 9.04425 7.30465 9.06332 7.28958 9.08806C1.06678 18.3848 -0.637901 27.453 0.19836 36.4088C0.202144 36.4526 0.22674 36.4945 0.260796 36.5211C4.36642 39.5362 8.34341 41.3666 12.2466 42.5799C12.309 42.599 12.3752 42.5761 12.415 42.5247C13.3383 41.2638 14.1613 39.9344 14.867 38.5363C14.9086 38.4544 14.8688 38.3572 14.7837 38.3249C13.4783 37.8297 12.2352 37.2259 11.0395 36.5402C10.9449 36.485 10.9373 36.3497 11.0243 36.2849C11.2759 36.0964 11.5276 35.9002 11.7679 35.7021C11.8114 35.6659 11.872 35.6583 11.9231 35.6811C19.7786 39.2677 28.2831 39.2677 36.0459 35.6811C36.097 35.6564 36.1576 35.664 36.203 35.7002C36.4433 35.8983 36.6949 36.0964 36.9484 36.2849C37.0354 36.3497 37.0298 36.485 36.9352 36.5402C35.7394 37.2392 34.4964 37.8297 33.189 38.323C33.1039 38.3554 33.0661 38.4544 33.1077 38.5363C33.8285 39.9324 34.6515 41.2619 35.5578 42.5228C35.5957 42.5761 35.6637 42.599 35.7262 42.5799C39.6483 41.3666 43.6252 39.5362 47.7309 36.5211C47.7668 36.4945 47.7895 36.4545 47.7933 36.4107C48.7942 26.0568 46.117 17.063 40.6964 9.08995C40.6832 9.06332 40.6605 9.04425 40.634 9.03283ZM16.04 30.9556C13.675 30.9556 11.7263 28.7844 11.7263 26.1178C11.7263 23.4512 13.6372 21.2799 16.04 21.2799C18.4617 21.2799 20.3916 23.4703 20.3538 26.1178C20.3538 28.7844 18.4428 30.9556 16.04 30.9556ZM31.9895 30.9556C29.6245 30.9556 27.6758 28.7844 27.6758 26.1178C27.6758 23.4512 29.5867 21.2799 31.9895 21.2799C34.4113 21.2799 36.3411 23.4703 36.3033 26.1178C36.3033 28.7844 34.4113 30.9556 31.9895 30.9556Z"
            fill="#5865F2"
          />
        </svg>
      ),
    },
  ],
};

export function Footer() {
  return (
    <footer
      className="container bg-background"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
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
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
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
            <div>
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
