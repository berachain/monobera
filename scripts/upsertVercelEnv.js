// pookie bear is watching

/**
 * Notes for usage
 * Make sure to get your token by following the instructions here: https://vercel.com/docs/rest-api#creating-an-access-token
 * Make sure to select your env file name
 * This script overrides existing keys if a new value exists
 * This script does NOT erase existing keys if they do not exist in the `envFileName` file.
 *
 * Resources for development
 * 1. Add env variables API: https://vercel.com/docs/rest-api/endpoints/projects#create-one-or-more-environment-variables
 * 2. Read env variables API: https://vercel.com/docs/rest-api/endpoints/projects#retrieve-the-environment-variables-of-a-project-by-id-or-name
 *
 * Example usages:
 *
 * 1. Upsert to all monobera project
 * > pnpm upsertenv --token=b0cR4RAqHXuNBKabQLCVbGw8 --envFileName=.env.devnet
 * The above command upserts all env variables in file from root named ".env.devnet" to all monobera-* projects on the berachain vercel
 *
 * 2. Upsert to specific project
 * > pnpm upsertenv --token=b0cR4RAqHXuNBKabQLCVbGw8 --envFileName=.env.devnet --project=monobera-faucet
 * The above command upserts all env variables in file from root named ".env.devnet" to project "monobera-faucet"
 *
 * Arguments:
 *
 * @argument --token (required): your vercel authentication token from your account settings with Berachain team as scope
 * @argument --envFileName (required): the env file you are upserting
 * @argument --project (optional): the project slug on vercel you are upserting to, if not provided will send to all monobera prod projects
 * @argument --production (optional): upserts env to include production, if not included will only push to Development and Preview
 * @argument --verbose or -v (optional): shows the key/value pairs that were upserted on success
 * @argument --help or -h (optional): shows example usage and accepted arguments
 */

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { writeFile, mkdir } = require("fs").promises;

const teamId = "team_1OTkqDgy6VcVy0OhB8Ksxf8O";

const allTargetProjects = [
  "ambassador-prod",
  "berps-prod",
  "ecosystem-prod",
  "bgt-prod",
  "faucet-prod",
  "bex-prod",
  "honey-prod",
  "bend-prod",
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

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
    "Usage example: pnpm upsertenv --token=YOUR_VERCEL_AUTH_TOKEN --envFileName=.env.devnet --project=monobera-faucet --production\n\n",
  );
  console.log(
    "--token (required): your vercel authentication token from your account settings with Berachain team as scope. You can generate a token by following the instructions here: https://vercel.com/docs/rest-api#creating-an-access-token\n",
  );
  console.log("--envFileName (required): the env file you are upserting\n");
  console.log(
    "--project (optional): the project slug on vercel you are upserting to, if not provided will send to all monobera prod projects. You can have multiple projects separated by commas\n",
  );
  console.log(
    "--production (optional): upserts env to include production, if not included will only push to Development and Preview\n",
  );
  console.log(
    "--productionOnly (optional): upserts env to ONLY production, if not included will only push to Development and Preview, overrides --production flag\n",
  );
  console.log(
    "--verbose or -v (optional): shows the key/value pairs that were upserted on success\n",
  );
  console.log(
    "--help or -h (optional): shows example usage and accepted arguments\n",
  );
};

const simplifyEnvData = (envData) => {
  return envData?.map((createdVariable) => ({
    key: createdVariable.key,
    value: createdVariable.value,
  }));
};

const upsertVercelEnvToProject = (projectName, bearerToken, requestBody) => {
  return fetch(
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
      if (data.error || (data.status && data.status !== 201)) {
        console.log(
          "An error has occurred while processing your request for project: ",
          projectName,
        );
        console.log(data.error);
        process.exit();
      } else if (data?.created) {
        if (argv.v || argv.verbose) {
          console.log(simplifyEnvData(data.created));
        }
        console.log(
          `Success! Upserted the above key-value pairs to project: 
          ${projectName}.`,
        );
      }
    })
    .catch((e) => {
      console.log(
        "An error has occurred while upserting your environment variables",
      );
      console.log(e);
      process.exit();
    });
};

const fetchProjectEnvVariables = (projectName, token) => {
  return fetch(
    `https://api.vercel.com/v9/projects/${projectName}/env?teamId=${teamId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "get",
    },
  ).then((res) => res.json());
};

/**
 * Converts an array of objects into a .env file format string and writes it to an env history file in ".envHistory" directory in root.
 *
 * @param {string} filePath - The path to the file where the text should be written.
 * @param {Array<{key: string, value: string}>} data - An array of objects containing key-value pairs.
 */
const writeEnvHistoryFile = async (projectName, envData) => {
  // Convert the array of objects into a .env file format string
  if (!projectName || !envData) return;
  const envString = envData
    .map(({ key, value }) => `${key}=${value}`)
    .join("\n");

  try {
    // write history file with project name that env history was pulled from and the date it was pulled
    const dirPath = path.join(__dirname, "../.env-history");
    const historyFilePath = path.join(
      dirPath,
      `/.env.history.${projectName}.${new Date(Date.now())
        .toISOString()
        .replace(" ", "")}`,
    );

    await mkdir(dirPath, { recursive: true });

    await writeFile(historyFilePath, envString);
    console.log("Environment history file has been written successfully.");
  } catch (err) {
    console.error("There was an error writing to the file:", err);
  }
};

const main = async () => {
  if (argv.help || argv.h) {
    printExampleUsage();
    process.exit();
  }
  // inputs
  // flag upserts to Vercel production environment variables as well
  const isProduction = argv.production;
  // env file name, check for validity
  const envFilePath = argv.envFileName;
  // auth bearer token
  const bearerToken = argv.token;
  // specific project
  const projectName = argv.project;

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

  if (!projectName) {
    await question(
      `
You did not add a --project option, this means that ${envFilePath} will be pushed to all of the following projects:\n
${allTargetProjects.join(", ")}\n
Continue? (Y/n)`,
    ).then((answer) => {
      if (answer === "n") {
        console.log("aborting");
        process.exit();
      } else if (answer !== "Y") {
        console.log("invalid response");
        process.exit();
      }
      rl.close();
    });
  }

  // parse file into envVariables
  const envVariables = readEnvFile(envFilePath);

  const getTargetEnvs = () => {
    if (isProduction) {
      return ["production", "development", "preview"];
    }
    if (argv.productionOnly) {
      return ["production"];
    } else {
      return ["development", "preview"];
    }
  };

  const requestBody = Object.entries(envVariables).map(([key, value]) => ({
    key,
    value,
    type: "encrypted",
    target: getTargetEnvs(),
  }));

  if (Object.keys(envVariables) < 1) {
    console.log(
      `Env file at path ${envFilePath} does not contain any valid env key-value pairs. Please provide a valid env file.`,
    );
    printExampleUsage();
    process.exit();
  }

  // fetch current project env and store in local history file in case of emergency
  const projectNameToFetchHistory =
    projectName?.split(",")?.[0] || allTargetProjects[0];
  const envData = await fetchProjectEnvVariables(
    projectNameToFetchHistory,
    bearerToken,
    teamId,
  );
  if (envData) {
    writeEnvHistoryFile(
      projectNameToFetchHistory,
      simplifyEnvData(envData.envs),
    );
  } else {
    console.warn("Warning: could not write env history");
  }

  if (projectName) {
    const projects = projectName.split(",");
    const promises = [];
    projects.forEach((projectName) => {
      promises.push(
        upsertVercelEnvToProject(projectName, bearerToken, requestBody),
      );
    });
    await Promise.all(promises);
  } else {
    const promises = [];
    allTargetProjects.forEach((projectName) => {
      promises.push(
        upsertVercelEnvToProject(projectName, bearerToken, requestBody),
      );
    });
    await Promise.all(promises);
  }

  rl.close();
};

main();
