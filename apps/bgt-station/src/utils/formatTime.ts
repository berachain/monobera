export const formatTime = (timeString: string): string => {
  // Parse the time string into a Date object
  const time = new Date(timeString);

  // Calculate the remaining time in milliseconds
  const remainingTime = time.getTime() - Date.now();

  // Convert the remaining time to days, hours, and minutes
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);

  // Format the remaining time based on the largest unit
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  let formattedTime = "";

  if (days >= 1) {
    formattedTime = formatter.format(days, "day");
  } else if (hours >= 1) {
    formattedTime = formatter.format(hours, "hour");
  } else {
    formattedTime = formatter.format(minutes, "minute");
  }
  return formattedTime;
};
