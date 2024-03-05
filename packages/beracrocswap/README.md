# 🛠🐊🛠 An SDK for building applications on top of CrocSwap

## Getting Started

### https://www.npmjs.com/package/@crocswap-libs/sdk

```bash
# Clone the repository (you can also click "Use this template")
git clone https://github.com/CrocSwap/sdk.git your_project_name
cd your_project_name

# Edit `package.json` and `tsconfig.json` to your liking
...

# Install dependencies
yarn install

# Now you can run various yarn commands:
yarn lint
yarn test
yarn build-all
yarn build-local (builds and copies /dist to node_modules/@crocswap-libs/sdk)
(note for above command - you may need to update this command in package.json with the correct path to your local interface directory.)
yarn ts-node <filename>
...

# featured capabilities

parse a transaction receipt from ethers.js and web3.js

# run the first example app (note: run 'yarn build-all' first)
# yarn ts-node ./examples/01-retrieve-spot-price.ts

# project dependencies
ethers
```
