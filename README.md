<br>

<p align="center">
  <a href="https://wagmi.sh">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/duv0g402y/image/upload/v1713381289/monobera_color_alt2_ppo8o6.svg">
      <img alt="wagmi logo" src="https://res.cloudinary.com/duv0g402y/image/upload/v1713381289/monobera_color_alt_fgny7b.svg" width="auto" height="200">
    </picture>
  </a>
</p>

<p align="center">
    Monorepo for maintaining Berachain Applications & Libraries
<p>

### Installation
Monobera requires node 18+.

``` pnpm i```

#### Commands

| Script                   | Description                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `pnpm build`             | Builds all packages and apps. Not recommended as it takes large amounts of memory                        |
| `pnpm build:dex`         | Builds only the `Bex` and related packages.                                                              |
| `pnpm build:honey`       | Builds only the `Honey` and related packages.                                                            |
| `pnpm build:bgt`         | Builds only the `BGT` and related packages.                                                              |
| `pnpm build:lend`        | Builds only the `Bend` and related packages.                                                             |
| `pnpm build:perp`        | Builds only the `Berps` and related packages.                                                            |
| `pnpm build:faucet`      | Builds only the `Faucet` and related packages.                                                           |
| `pnpm build:berajs-docs` | Builds only the `Berajs Docs` and related packages.                                                     |
| `pnpm build:ambassador`  | Builds only the `Ambassador` and related packages.                                                       |
| `pnpm build:ecosystem`   | Builds only the `Ecosystem` and related packages.                                                        |
| `pnpm build:pkg`         | Builds all packages.                                                                                     |
| `pnpm dev`               | Runs all packages and apps in dev mode. Not recommended as it takes large amounts of memory              |
| `pnpm dev:dex`           | Runs `Bex` and related packages in dev mode.                                                             |
| `pnpm dev:honey`         | Runs `Honey` and related packages in dev mode.                                                           |
| `pnpm dev:bgt`           | Runs `BGT` Station and related packages in dev mode.                                                     |
| `pnpm dev:lend`          | Runs `Bend` and related packages in dev mode.                                                            |
| `pnpm dev:perp`          | Runs `Berps` and related packages in dev mode.                                                           |
| `pnpm dev:faucet`        | Runs `Faucet` and related packages in dev mode.                                                          |
| `pnpm dev:berajs-docs`   | Runs `Berajs Docs` and related packages in dev mode.                                                     |
| `pnpm dev:ambassador`    | Runs `Ambassador` and related packages in dev mode.                                                      |
| `pnpm dev:ecosystem`     | Runs `Ecosystem` and related packages in dev mode.                                                       |
| `pnpm clean`             | Cleans the project using turbo clean and removes untracked files with git clean, including node_modules. |
| `pnpm pullenv`           | Pulls production environment variables from Vercel. Requires Vercel Login                                |
| `pnpm check-types`       | Runs type-checking across all apps and packages.                                                         |
| `pnpm lint`              | Lints all apps and packages.                                                                             |
| `pnpm format:check`      | Checks the formatting of all apps and packages without making changes.                                   |
| `pnpm format`            | Formats the apps and packages and writes the changes.                                                    |
| `pnpm check`             | Performs a comprehensive check of all apps and packages, including linting and type-checking.            |
| `pnpm prepare`           | Installs Husky, setting up Git hooks for the project.                                                    |
| `pnpm upsertenv`         | Runs a script to upsert environment variables in Vercel for the project.                                 |
| `pnpm knip`              | Executes the knip command to exclude binaries from operations.                                           |

To run Bex for example, run `pnpm i && pnpm dev:dex`

#### Apps

| App                  | Description                                    |
| -------------------- | ---------------------------------------------- |
| `app/dex`            | `Bex` application code                         |
| `app/honey`          | `Honey` application code                       |
| `app/bgt-station`    | `BGT Station` application code                 |
| `app/lend`           | `Bend` application code                        |
| `app/perp`           | `Berps` application code                       |
| `app/faucet`         | `Faucet` application code                      |
| `app/ambassador`     | `Ambassador` application code                  |
| `app/ecosystem`      | `Ecosystem` application code                   |
| `app/validator-clue` | `Validator Clue` application code (deprecated) |

#### Packages

| Package                 | Description                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `packages/berajs`       | A Typescript package for interacting with Berachain. [View Docs]("https://berajsdocs.vercel.app/") |
| `packages/wagmi`        | A package to create a shared wagmi / dynamic config for web3 applications |
| `packages/config`       | A package to store shared config variables across applications |
| `packages/graphql`      | A package to store appolo clients / gql subgraph queries |
| `packages/proto`        | A package to generate e2e typing & protobuf for interacting with Cosmos-SDK|
| `packages/shared-ui`    | A package of built UI widgets made from `packages/ui` component |
| `packages/ui`           | A package of [shadcn](https://ui.shadcn.com/) components  |
| `packages/beracrocswap` | A forked version of [CrocSwap SDK]("https://github.com/CrocSwap/sdk") to work better with `packages/berajs`|

#### Environments
All Berachain dapps are built to be single chain applications.
| Environment Variables | Environment                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `.env.devnet`         | Environment variables for running the application against our Devnet. Subject to change often  |
| `.env.testnet`        | Environment variables for running the application against our Testnet. Subject to change often |
| `.env.prod`           | thoon                                                                                          |

To run our applications in one of these environments, simply copy and paste a `.env.*` file into your `.env` and run any application.

#### Tooling & Libraries

A short list of tooling and libraries we use across all apps and packages.
- [biomejs]("https://biomejs.dev/")
- [knip]("https://knip.dev/")
- [turbo]("https://turbo.build/")
- [next]("https://nextjs.org/")
- [wagmi]("https://wagmi.sh/")
- [viem]("https://viem.sh/")
- [swr]("https://swr.vercel.app/")
- [vocs]("https://vocs.dev/")
- [shadcn]("https://ui.shadcn.com/")
- [tailwind]("https://tailwindcss.com/")
