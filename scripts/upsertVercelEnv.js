// pookie bear is watching
// Nice to have: add option to clean up / remove existing env variables of a project, ensure you write a history file with those vars in case of rollback
// Nice to have: for every project in a list, upsert - currently only one project at a time

/**
 * Notes for usage
 * Make sure to get your token by following the instructions here: https://vercel.com/docs/rest-api#creating-an-access-token
 * Make sure to select your env file name
 * This script overrides existing keys if a new value exists
 * This script does NOT erase existing keys if they do not exist in the `envFileName` file.
 */

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const { exec } = require("child_process");

const fs = require("fs");
const path = require("path");

// Function to read the .env file and convert it to an object
function readEnvFile(filePath) {
  try {
    // Path to your .env file
    const envFilePath = path.join(__dirname, "..", filePath);
    // Read the file content
    const fileContent = fs.readFileSync(envFilePath, { encoding: "utf-8" });

    // Split the content into lines
    const lines = fileContent.split("\n");

    // Reduce the lines into an object
    const envObject = lines.reduce((acc, line) => {
      // Remove any whitespace and split by '=' to get key/value pairs
      const [key, value] = line.trim().split("=");

      // Skip empty lines and lines that start with '#' (comments)
      if (key && value && !key.startsWith("#")) {
        acc[key] = value.replaceAll("'", "").replaceAll('"', "");
      }

      return acc;
    }, {});

    return envObject;
  } catch (error) {
    console.error("Error reading .env file:", error);
    process.exit();
  }
}

const printExampleUsage = () => {
  console.log(
    "Usage example: pnpm upsertenv --token=YOUR_VERCEL_AUTH_TOKEN --envFileName=.env.devnet --project=monobera-faucet --production",
  );
  console.log(
    "--token (required): your vercel authentication token from your account settings with Berachain team as scope",
  );
  console.log("--envFileName (required): the env file you are upserting");
};

const main = async () => {
  // inputs
  // flag upserts to Vercel production environment variables as well
  const isProduction = argv.production;
  // env file name, check for validity
  const envFilePath = argv.envFileName;
  // auth bearer token
  const bearerToken = argv.token;
  // specific project
  const projectName = argv.project;

  if (!projectName) {
    console.log(
      "You must pass in the vercel project name whose environment you want to update.",
    );
    printExampleUsage();
    process.exit();
  }

  // check bearerToken, if not tell user
  if (!bearerToken) {
    console.log(
      "You must pass in a vercel auth token, create one by following these instructions. https://vercel.com/docs/rest-api#creating-an-access-token",
    );
    printExampleUsage();
    process.exit();
  }

  // check validity and parse env file into object
  if (!envFilePath) {
    console.log(
      "You must pass in --envFilePath, which is the file path of the env you want to upsert.",
    );
    printExampleUsage();
    process.exit();
  } else if (!fs.existsSync(envFilePath)) {
    console.log(
      "file path passed as --envFilePath does not exist. Please enter a valid file path.",
    );
    printExampleUsage();
    process.exit();
  }

  // pares file into envVariables
  const envVariables = readEnvFile(envFilePath);

  const requestBody = Object.entries(envVariables).map(([key, value]) => ({
    key,
    value,
    type: "plain",
    target: isProduction
      ? ["production", "development", "preview"]
      : ["development", "preview"],
  }));

  await fetch(
    `https://api.vercel.com/v10/projects/${projectName}/env?teamId=team_1OTkqDgy6VcVy0OhB8Ksxf8O&upsert=true`,
    {
      body: JSON.stringify(requestBody),
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      method: "post",
    },
  )
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      if (data.status && data.status !== 201) {
        console.log("An error has occurred while processing your request", key);
        console.log(res);
        process.exit();
      }
    })
    .catch((e) => {
      console.log(
        "An error has occurred while upserting your environment variables",
      );
      console.log(e);
      process.exit();
    });

  console.log("Success! Your environment variables have been upserted.");
};

main();
