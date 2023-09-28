"use client";

import React, { useEffect, useMemo } from "react";
import { useBeraJs } from "@bera/berajs";

import { getAssetDictionary } from "~/utils/getAssetDictionary";
import {
  type AmountItem,
  type AssetItem,
  type RateItem,
} from "~/utils/getServerSideData";
import Dashboard from "./dashboard";

interface DashboardProps {
  assets: AssetItem[];
  borrowedAssets: AmountItem[];
  suppliedAssets: AmountItem[];
  borrowStableAPR: RateItem[];
  borrowVariableAPR: RateItem[];
  supplyStableAPR: RateItem[];
}

export default function DashboardPageContent({
  assets,
  borrowedAssets,
  suppliedAssets,
  borrowStableAPR,
  borrowVariableAPR,
  supplyStableAPR,
}: DashboardProps) {
  const { isReady } = useBeraJs();
  const [tableView, setUseTableView] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (tableView && window.innerWidth < 1024) {
        setUseTableView(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tableView]);

  const assetDictionary = useMemo(
    () =>
      getAssetDictionary(
        assets,
        borrowedAssets,
        suppliedAssets,
        borrowStableAPR,
        borrowVariableAPR,
        supplyStableAPR,
      ),
    [
      assets,
      borrowedAssets,
      suppliedAssets,
      borrowStableAPR,
      borrowVariableAPR,
      supplyStableAPR,
    ],
  );

  return (
    <>
      {isReady ? (
        <Dashboard assetDictionary={assetDictionary} />
      ) : (
        <div>not connect or wrong network</div>
      )}
    </>
  );
}
