export function calculateVoteStatistics(
  abstainCount: number,
  noCount: number,
  yesCount: number,
  vetoCount: number,
  totalBGTDelegated: number,
) {
  const totalVotes = abstainCount + noCount + yesCount + vetoCount;

  let abstainPercentage = 0;
  let noPercentage = 0;
  let yesPercentage = 0;
  let vetoPercentage = 0;
  let globalAbstainPercentage = 0;
  let globalNoPercentage = 0;
  let globalYesPercentage = 0;
  let globalVetoPercentage = 0;
  let participationRate = 0;

  if (totalVotes !== 0) {
    abstainPercentage = (abstainCount / totalVotes) * 100;
    noPercentage = (noCount / totalVotes) * 100;
    yesPercentage = (yesCount / totalVotes) * 100;
    vetoPercentage = (vetoCount / totalVotes) * 100;
  }

  if (totalBGTDelegated !== 0) {
    globalAbstainPercentage = (abstainCount / totalBGTDelegated) * 100;
    globalNoPercentage = (noCount / totalBGTDelegated) * 100;
    globalYesPercentage = (yesCount / totalBGTDelegated) * 100;
    globalVetoPercentage = (vetoCount / totalBGTDelegated) * 100;
    participationRate = (totalVotes / totalBGTDelegated) * 100;
  }

  return {
    abstainPercentage,
    noPercentage,
    yesPercentage,
    vetoPercentage,
    globalAbstainPercentage,
    globalNoPercentage,
    globalYesPercentage,
    globalVetoPercentage,
    totalVotes,
    participationRate,
  };
}
