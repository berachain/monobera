import React from "react";
import {
  bgtName,
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
      enabled: true,
      bannerComponent: (
        <CustomizedBanner
          className="text-xs md:text-sm px-2"
          textComponent="System Maintenance: Our services will be temporarily unavailable, but we&apos;ll be back up shortly. Please wind down positions and deposits."
        />
      ),
    },
  },
  "BGT Station": {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      bannerComponent: <LaunchBanner appName={bgtName} />,
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
