const shell = require("shelljs");
const path = require("path");

if (!process.env.CHARTING_ACCESS_TOKEN) {
  console.log(
    "Charting library credentials are missing. Skipping the install of the charting library.",
    "\n\n",
    "To install the charting library, please provide the following environment variables:",
    "\n",
    "CHARTING_ACCESS_TOKEN",
  );
} else {
  const scriptPath = path.join(__dirname, "copy-charting-lib.sh");
  const command = `CHARTING_ACCESS_TOKEN=${process.env.CHARTING_ACCESS_TOKEN} ${scriptPath}`;
  shell.exec(command);
}
