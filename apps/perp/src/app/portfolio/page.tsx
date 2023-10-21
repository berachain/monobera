"use client";

import React from "react";
import { useBeraJs } from "@/../../packages/berajs/dist";
import { ConnectWalletBear } from "@bera/shared-ui";
import LoadingPortfolio from "./[address]/loading";
import { PortfolioHome } from "./components/portfolio";

export default function Home() {
  const { account } = useBeraJs();

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      {!isMounted && <LoadingPortfolio />}
      {isMounted && !account && (
        <ConnectWalletBear message="Connect Wallet to view portfolio" />
      )}
      {isMounted && account && <PortfolioHome />}
    </>
  );
}

// BELOW IS A SSR THINGY

// "use client"
// import React, { useEffect, useLayoutEffect } from "react";

// import { PortfolioHome } from "./components/portfolio";
// import { useBeraJs } from "@/../../packages/berajs/dist";
// import { redirect, useRouter } from 'next/navigation'
// import { ConnectWalletBear } from "@bera/shared-ui";

// export default function Home() {
//   const {account} = useBeraJs()
//     useLayoutEffect(() => {
//       if(account){
//         redirect(`/portfolio/${account}`)
//       }
//     }, [account])
//   return (
//     <>
//          <ConnectWalletBear message="Connect Wallet to view portfolio" />
//     </>
//   );
// }
