export interface DappBannerConfig {
  [DappBannerType.LAUNCH]: BannerProperty;
  [DappBannerType.RPC]: BannerProperty;
  [DappBannerType.SLOW]: BannerProperty;
}

export interface BannerConfig {
  [key: string]: DappBannerConfig;
}

export interface BannerProperty {
  enabled: boolean;
  text?: React.ReactNode;
  hrefs?: string[];
}

export enum DappBannerType {
  LAUNCH = "LAUNCH",
  RPC = "RPC",
  SLOW = "SLOW",
}

export const bannerConfig: BannerConfig = {
  global: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
    },
    [DappBannerType.RPC]: {
      enabled: false,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
    },
  },
  BEND: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
    },
    [DappBannerType.RPC]: {
      enabled: false,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
    },
  },
  BEX: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
    },
    [DappBannerType.RPC]: {
      enabled: false,
      hrefs: ["/pools", "/swap", "/"],
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      hrefs: ["/pools", "/"],
    },
  },
  Honey: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
    },
    [DappBannerType.RPC]: {
      enabled: false,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
    },
  },
  BERPS: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      hrefs: ["/leaderboard", "/portfolio"],
    },
    [DappBannerType.RPC]: {
      enabled: false,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
    },
  },
  "BGT Station": {
    [DappBannerType.LAUNCH]: {
      enabled: false,
    },
    [DappBannerType.RPC]: {
      enabled: false,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
    },
  },
  Faucet: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
    },
    [DappBannerType.RPC]: {
      enabled: false,
    },
    [DappBannerType.SLOW]: {
      enabled: false,
    },
  },
};
