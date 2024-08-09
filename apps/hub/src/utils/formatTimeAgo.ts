const formatTimeAgo = (unixTimestamp: number): string => {
  const secondsAgo = Math.floor(Date.now() / 1000 - unixTimestamp);

  if (secondsAgo < 60) {
    return `${secondsAgo} secs ago`;
  }

  const minutesAgo = Math.floor(secondsAgo / 60);

  if (minutesAgo < 60) {
    return `${minutesAgo} mins ago`;
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  }
  const daysago = Math.floor(hoursAgo / 24);
  return `${daysago} days ${hoursAgo - daysago * 24} hours ago`;
};

export default formatTimeAgo;
