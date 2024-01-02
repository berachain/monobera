export const getLatestDay = (): number => {
  const currentTimestamp: number = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds
  const dayID: number = Math.floor(currentTimestamp / 86400);
  const dayStartTimestamp: number = dayID * 86400;
  return dayStartTimestamp;
};

export const getDayStartTimestampDaysAgo = (daysAgo: number): number => {
  const currentTimestamp: number = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds
  const timestampDaysAgo: number = currentTimestamp - daysAgo * 86400; // Subtract the specified number of days in seconds
  const dayID: number = Math.floor(timestampDaysAgo / 86400); // Calculate dayID
  const dayStartTimestamp: number = dayID * 86400; // Calculate dayStartTimestamp
  return dayStartTimestamp;
};
