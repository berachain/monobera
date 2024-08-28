import {
  type BlockRewardStatsByValidators,
  type Token,
  type ValidatorBgtStaked,
  type ValidatorTokenRewardUsages,
} from "@bera/berajs";
import { addDays } from "date-fns";

type GroupedValidatorRewardsData = {
  [timestamp: string]: BlockRewardStatsByValidators;
};

type GroupedValidatorBgtStakedData = {
  [timestamp: string]: ValidatorBgtStaked;
};

type GroupedValidatorBgtStakedDataDelta = {
  [timestamp: string]: ValidatorBgtStaked;
};

type TokenInformation = Token & {
  tokenRewarded: string;
  usdValueTokenRewarded: string;
};

type GroupedTokenRewardsUsageEntry = {
  tokens: TokenInformation[];
  timestamp: string;
  totalTokenRewardedOnTimestamp: number;
  totalUsdValueTokenRewardedOnTimestamp: number;
  allTimeUsdValueTokenRewarded: string;
};

type GroupedTokenRewardsUsageData = {
  [timestamp: string]: GroupedTokenRewardsUsageEntry;
};

export type GroupedTokenRewardsData = {
  [address: string]: {
    token: Token;
    totalTokenRewarded: number;
    totalUsdValueTokenRewarded: number;
  };
};

const generateValidatorRewardsEmptyData = (
  timestamp: string,
): BlockRewardStatsByValidators => {
  return {
    timestamp: timestamp,
    rewardRate: "0",
    commissionRate: "0",
  };
};

const generateValidatorBgtStakedEmptyData = (
  timestamp: string,
): ValidatorBgtStaked => {
  return {
    allTimeBgtStaked: "0",
    bgtStaked: "0",
    coinbase: "",
    timestamp: timestamp,
  };
};

const generatValidatorTokenRewardsUsageEmptyData = (
  timestamp: string,
): GroupedTokenRewardsUsageEntry => {
  return {
    tokens: [],
    timestamp: timestamp,
    totalTokenRewardedOnTimestamp: 0,
    totalUsdValueTokenRewardedOnTimestamp: 0,
    allTimeUsdValueTokenRewarded: "0",
  };
};

export const formatValidatorRewardsData = (
  data: BlockRewardStatsByValidators[],
  days: number,
) => {
  const groupedData = {} as GroupedValidatorRewardsData;

  data.forEach((item: BlockRewardStatsByValidators) => {
    const timestamp = item.timestamp;
    const dateKey = new Date(parseInt(timestamp) / 1000)
      .toISOString()
      .split("T")[0];

    if (!groupedData[dateKey]) {
      groupedData[dateKey] = item;
    }
  });

  // Fill in missing days with mock data
  for (let i = 0; i < days; i++) {
    const date = addDays(new Date(), -i).toISOString().split("T")[0];
    if (!groupedData[date] && i !== 0) {
      groupedData[date] = generateValidatorRewardsEmptyData(
        (addDays(new Date(), -i).valueOf() * 1000).toString(),
      );
    }
  }

  // Convert the grouped data back to an array of objects
  return Object.values(groupedData)
    .map((group) => group)
    .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
};

export const formatValidatorBgtDelegated = (
  data: ValidatorBgtStaked[],
  days: number,
) => {
  const groupedData = {} as GroupedValidatorBgtStakedData;

  let currentBgtTotal = 0;

  data.forEach((item: ValidatorBgtStaked) => {
    const timestamp = item.timestamp;
    const dateKey = new Date(parseInt(timestamp) / 1000)
      .toISOString()
      .split("T")[0];

    currentBgtTotal += Number(item.bgtStaked);
    if (!groupedData[dateKey]) {
      groupedData[dateKey] = item;
    }
  });

  // Fill in missing days with mock data
  for (let i = 0; i < days; i++) {
    const date = addDays(new Date(), -i).toISOString().split("T")[0];
    if (!groupedData[date] && i !== 0) {
      groupedData[date] = generateValidatorBgtStakedEmptyData(
        (addDays(new Date(), -i).valueOf() * 1000).toString(),
      );
    }
  }

  // Convert the grouped data back to an array of objects
  return {
    data: Object.values(groupedData)
      .map((group) => group)
      .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp)),
    currentBgtTotal: currentBgtTotal,
  };
};

export const formatValidatorTokenRewardsUsage = (
  data: ValidatorTokenRewardUsages[],
  days: number,
) => {
  if (!data)
    return {
      incentives: [],
      groupedTokens: {},
    };

  const groupedData = {} as GroupedTokenRewardsUsageData;
  const groupedTokens = {} as GroupedTokenRewardsData;

  data.forEach((item: ValidatorTokenRewardUsages) => {
    const timestamp = item.timestamp;
    const dateKey = new Date(parseInt(timestamp) / 1000)
      .toISOString()
      .split("T")[0];

    if (!groupedData[dateKey]) {
      groupedData[dateKey] = {
        tokens: [],
        timestamp: timestamp,
        totalTokenRewardedOnTimestamp: 0,
        totalUsdValueTokenRewardedOnTimestamp: 0,
        allTimeUsdValueTokenRewarded: item.allTimeUsdValueTokenRewarded,
      };
    }

    const address = item?.token?.address;
    if (!groupedTokens[address]) {
      groupedTokens[address] = {
        token: item.token,
        totalTokenRewarded: Number(item.tokenRewarded),
        totalUsdValueTokenRewarded: Number(item.usdValueTokenRewarded),
      };
    } else {
      groupedTokens[address].totalTokenRewarded += Number(item.tokenRewarded);
      groupedTokens[address].totalUsdValueTokenRewarded += Number(
        item.usdValueTokenRewarded,
      );
    }
    groupedData[dateKey].tokens.push({
      ...item.token,
      tokenRewarded: item.tokenRewarded,
      usdValueTokenRewarded: item.usdValueTokenRewarded,
    });

    groupedData[dateKey].totalTokenRewardedOnTimestamp += parseFloat(
      item.tokenRewarded,
    );
    groupedData[dateKey].totalUsdValueTokenRewardedOnTimestamp += parseFloat(
      item.usdValueTokenRewarded,
    );
  });

  for (let i = 0; i < days; i++) {
    const date = addDays(new Date(), -i).toISOString().split("T")[0];
    // if the current day is not in the grouped data, prevent mocking data for current day
    if (!groupedData[date] && i !== 0) {
      groupedData[date] = generatValidatorTokenRewardsUsageEmptyData(
        (addDays(new Date(), -i).valueOf() * 1000).toString(),
      );
    }
  }

  // Convert the grouped data back to an array of objects
  return {
    incentives: Object.values(groupedData)
      .map((group) => ({
        ...group,
        totalTokenRewardedOnTimestamp: group.totalTokenRewardedOnTimestamp,
        totalUsdValueTokenRewardedOnTimestamp:
          group.totalUsdValueTokenRewardedOnTimestamp,
      }))
      .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp)),
    groupedTokens,
  };
};

export const formatValidatorBgtDelegatedDelta = (
  data: ValidatorBgtStaked[],
  days: number,
) => {
  const groupedData = {} as GroupedValidatorBgtStakedDataDelta;

  let delegationIn = 0;
  let delegationOut = 0;

  data.forEach((item: ValidatorBgtStaked) => {
    const timestamp = item.timestamp;
    const dateKey = new Date(parseInt(timestamp) / 1000)
      .toISOString()
      .split("T")[0];

    if (Number(item.bgtStaked) > 0) {
      delegationIn += Number(item.bgtStaked);
    } else {
      delegationOut += Number(item.bgtStaked);
    }
    if (!groupedData[dateKey]) {
      groupedData[dateKey] = item;
    }
  });

  // Fill in missing days with mock data
  for (let i = 0; i < days; i++) {
    const date = addDays(new Date(), -i).toISOString().split("T")[0];
    if (!groupedData[date] && i !== 0) {
      groupedData[date] = generateValidatorBgtStakedEmptyData(
        (addDays(new Date(), -i).valueOf() * 1000).toString(),
      );
    }
  }

  // Convert the grouped data back to an array of objects
  return {
    data: Object.values(groupedData)
      .map((group) => group)
      .sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp)),
    netDelegation: delegationIn + delegationOut,
    delegationIn: delegationIn,
    delegationOut: delegationOut,
  };
};
