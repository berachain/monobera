export const formatDaysToTimestamps = (daysRange: number) => {
  const currentDate = new Date();
  return (
    currentDate.setDate(currentDate.getDate() - daysRange) * 1000
  ).toString();
};
