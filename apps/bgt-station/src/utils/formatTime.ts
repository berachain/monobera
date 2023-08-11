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

export function timeDifferenceFromNow(unixTimestamp: number) {
  const now = Date.now();
  const inputDate = new Date(unixTimestamp * 1000); // Convert to milliseconds
  let difference = Number(inputDate) - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  difference -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(difference / (1000 * 60 * 60));
  difference -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(difference / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
}

export function formatUnixTimestamp(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  let daySuffix = "th";

  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  return `${
    monthNames[date.getMonth()]
  } ${day}${daySuffix}, ${date.getFullYear()}`;
}
