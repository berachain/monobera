import { type TallyResult } from "@bera/berajs";

export const sumTally = (tally: TallyResult | undefined) => {
  if (!tally) return 0;
  return (
    Number(tally.abstainCount) +
    Number(tally.noCount) +
    Number(tally.noWithVetoCount) +
    Number(tally.yesCount)
  );
};
