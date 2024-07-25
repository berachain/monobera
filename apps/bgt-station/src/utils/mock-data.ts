type UptimeStatus = {
  status: boolean;
  block: number;
  fill: string;
  content: number;
};

export function createUptimeArray(size: number): uptimeStatus[] {
  const array: uptimeStatus[] = [];
  for (let i = 0; i < size; i++) {
    const status = Math.random() < 0.8;
    array.push({
      status: status,
      block: 1000 + i,
      content: 100,
      fill: status ? "var(--color-active)" : "var(--color-inactive)",
    });
  }
  return array;
}

type BgtDelegated = {
  bgt: number;
  date: string;
};

export function createBgtDelegatedArray(
  daysBeforeYesterday: number,
): BgtDelegated[] {
  const array: BgtDelegated[] = [];
  // Calculate the starting date
  const startingDate = new Date();
  startingDate.setDate(startingDate.getDate() - (daysBeforeYesterday + 1));

  for (let i = 0; i < daysBeforeYesterday; i++) {
    const date = new Date(startingDate);
    date.setDate(date.getDate() + i);

    array.push({
      bgt: Math.random() * 1000000 + 1000000,
      date: date.toISOString().split("T")[0], // Format the date as 'YYYY-MM-DD'
    });
  }
  return array;
}

type IncentivesEarned = {
  tokens: {
    amount: number;
    symbol: string;
    value: number;
  }[];
  incentives: number;
  date: string;
};

export function createIncentivesEarnedArray(
  daysBeforeYesterday: number,
): IncentivesEarned[] {
  const array: IncentivesEarned[] = [];
  // Calculate the starting date
  const startingDate = new Date();
  startingDate.setDate(startingDate.getDate() - (daysBeforeYesterday + 1));

  for (let i = 0; i < daysBeforeYesterday; i++) {
    const date = new Date(startingDate);
    date.setDate(date.getDate() + i);

    const total = Math.random() * 1000000 + 1000000;
    array.push({
      tokens: [
        {
          amount: (total / 5) * 2,
          symbol: "BGT",
          value: (total / 5) * 2 * 3,
        },
        {
          amount: (total / 5) * 2,
          symbol: "HONEY",
          value: (total / 5) * 2 * 3,
        },
        {
          amount: (total / 5) * 1,
          symbol: "TOKEN",
          value: (total / 5) * 1 * 3,
        },
      ],
      incentives: total,
      date: date.toISOString().split("T")[0], // Format the date as 'YYYY-MM-DD'
    });
  }
  return array;
}

type ValidatorRewards = {
  earned: number;
  percentage: string;
  distributed: number;
  date: string;
};

export function createValidatorRewardsArray(
  daysBeforeYesterday: number,
): ValidatorRewards[] {
  const array: ValidatorRewards[] = [];
  // Calculate the starting date
  const startingDate = new Date();
  startingDate.setDate(startingDate.getDate() - (daysBeforeYesterday + 1));

  for (let i = 0; i < daysBeforeYesterday; i++) {
    const date = new Date(startingDate);
    date.setDate(date.getDate() + i);

    const total = Math.random() * 1000000 + 1000000;
    array.push({
      percentage: (Math.random() * 100).toFixed(2),
      earned: total,
      distributed: total * 4,
      date: date.toISOString().split("T")[0], // Format the date as 'YYYY-MM-DD'
    });
  }
  return array;
}

type StakeFlow = {
  in: string;
  out: string;
  net: number;
  date: string;
};

export function createStakeFlowArray(daysBeforeYesterday: number): StakeFlow[] {
  const array: StakeFlow[] = [];
  // Calculate the starting date
  const startingDate = new Date();
  startingDate.setDate(startingDate.getDate() - (daysBeforeYesterday + 1));

  for (let i = 0; i < daysBeforeYesterday; i++) {
    const date = new Date(startingDate);
    date.setDate(date.getDate() + i);

    let total = Math.random() * 10000;
    total = Math.random() > 0.5 ? total : -total;
    const diff = total * Math.random();
    array.push({
      in: (total - diff).toFixed(2),
      out: diff.toFixed(2),
      net: Number(total.toFixed(2)),
      date: date.toISOString().split("T")[0], // Format the date as 'YYYY-MM-DD'
    });
  }
  return array;
}
