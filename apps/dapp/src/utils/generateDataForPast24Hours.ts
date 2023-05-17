export const generateDataForPast24Hours = () => {
  // Generate data for the past 24 hours
  const timeIntervals = 24; // Number of data points

  const data = [];
  for (let i = timeIntervals - 1; i >= 0; i--) {
    const value = Math.floor(Math.random() * 100); // Random value for demonstration
    data.push(value);
  }

  return {
    name: "Price",
    data: data,
  };
};
