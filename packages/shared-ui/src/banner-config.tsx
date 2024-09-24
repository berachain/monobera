import React from "react";
import {
  hubName,
  dexName,
  faucetName,
  honeyName,
  lendName,
  perpsName,
} from "@bera/config";

import {
  CustomizedBanner,
  LaunchBanner,
  NetworkCongestedBanner,
  RPCBanner,
} from "./banner";

export interface DappBannerConfig {
  [DappBannerType.LAUNCH]: BannerProperty;
  [DappBannerType.RPC]: BannerProperty;
  [DappBannerType.SLOW]: BannerProperty;
  [DappBannerType.CUSTOM]?: BannerProperty;
}

export interface BannerConfig {
  [key: string]: DappBannerConfig;
}

export interface BannerProperty {
  enabled: boolean;
  bannerComponent?: React.ReactNode;
  hrefs?: string[];
}

export enum DappBannerType {
  LAUNCH = "LAUNCH",
  RPC = "RPC",
  SLOW = "SLOW",
  CUSTOM = "CUSTOM",
}

export const bannerConfig: BannerConfig = {
  global: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      bannerComponent: <LaunchBanner appName="Berachain Dapps" />,
    },
    [DappBannerType.RPC]: {
      enabled: false,
      bannerComponent: <RPCBanner />,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      bannerComponent: <NetworkCongestedBanner />,
    },
  },
  BEND: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      bannerComponent: <LaunchBanner appName={lendName} />,
    },
    [DappBannerType.RPC]: {
      enabled: false,
      bannerComponent: <RPCBanner />,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      bannerComponent: <NetworkCongestedBanner />,
    },
  },
  BEX: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      bannerComponent: <LaunchBanner appName={dexName} />,
    },
    [DappBannerType.RPC]: {
      enabled: false,
      bannerComponent: <RPCBanner />,
      hrefs: ["/pools", "/swap", "/"],
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      bannerComponent: <NetworkCongestedBanner />,
      hrefs: ["/pools", "/"],
    },
  },
  Honey: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      bannerComponent: <LaunchBanner appName={honeyName} />,
    },
    [DappBannerType.RPC]: {
      enabled: false,
      bannerComponent: <RPCBanner />,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      bannerComponent: <NetworkCongestedBanner />,
    },
  },
  BERPS: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      bannerComponent: <LaunchBanner appName={perpsName} />,
      hrefs: ["/leaderboard", "/portfolio"],
    },
    [DappBannerType.RPC]: {
      enabled: false,
      bannerComponent: <RPCBanner />,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      bannerComponent: <NetworkCongestedBanner />,
    },
    [DappBannerType.CUSTOM]: {
      enabled: false,
      hrefs: [
        "/berpetuals",
        "/berpetuals/ETH-USDC",
        "/berpetuals/BTC-USDC",
        "/berpetuals/TIA-USDC",
        "/berpetuals/ATOM-USDC",
      ],
      bannerComponent: (
        <CustomizedBanner
          className="px-2 text-xs md:text-sm"
          textComponent="System Maintenance: Trading has been temporarily paused, but we'll be back up shortly."
        />
      ),
    },
  },
  "BGT Station": {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      bannerComponent: <LaunchBanner appName={hubName} />,
    },
    [DappBannerType.RPC]: {
      enabled: false,
      bannerComponent: <RPCBanner />,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      bannerComponent: <NetworkCongestedBanner />,
    },
  },
  Faucet: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      bannerComponent: <LaunchBanner appName={faucetName} />,
    },
    [DappBannerType.RPC]: {
      enabled: false,
      bannerComponent: <RPCBanner />,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      bannerComponent: <NetworkCongestedBanner />,
    },
  },
};
