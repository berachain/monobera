import React from "react";

import { PortfolioHome } from "../components/portfolio";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function Home() {
  await sleep(2000); // Sleep for 2 seconds

  return <PortfolioHome />;
}
