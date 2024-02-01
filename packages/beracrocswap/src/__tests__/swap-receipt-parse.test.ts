/*import { parseSwapEthersTxReceipt } from "../swap";
import { parseSwapWeb3TxReceipt } from "../swap";

import { BigNumber } from "ethers";

const testWeb3Receipt = {
  blockHash:
    "0x671bc2d6d650f6227dd0e0af6688c681ec1031d5e5efa3cfaf7e493086372373",
  blockNumber: 11807868,
  contractAddress: null,
  cumulativeGasUsed: 2620852,
  effectiveGasPrice: "0x1e49ffec4",
  from: "0xd825d73cdd050ecbebc0b3a8d9c5952d1f64722e",
  gasUsed: 105925,
  logsBloom:
    "0x00000000000000000000000000000000000000100000000000080000000000000000000000000000000000000000100000000800000000400000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000004000000000000000000004000000000000000000000080000000000000000000400000000000000000000000002000000000000000000002000000000000000000000000002000000000000000000000000000000000008000000000000000000000000000000000000",
  status: true,
  to: "0xB6Ff2e53408f38A5a363586746d1dB306AF5caa4",
  transactionHash:
    "0xd79eac4bdca7883ebd26e7ebe739d2c656fba2fab9abb11b5099ebafb5d4d4f2",
  transactionIndex: 11,
  type: "0x2",
  events: {
    "0": {
      address: "0x83e77C197E744D21810A1f970cD24A246E0932a1",
      blockHash:
        "0x671bc2d6d650f6227dd0e0af6688c681ec1031d5e5efa3cfaf7e493086372373",
      blockNumber: 11807868,
      logIndex: 17,
      removed: false,
      transactionHash:
        "0xd79eac4bdca7883ebd26e7ebe739d2c656fba2fab9abb11b5099ebafb5d4d4f2",
      transactionIndex: 11,
      id: "log_d574c848",
      returnValues: {},
      signature: null,
      raw: {
        data: "0x00000000000000000000000000000000000000000000000000000000000f4240",
        topics: [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "0x000000000000000000000000d825d73cdd050ecbebc0b3a8d9c5952d1f64722e",
          "0x000000000000000000000000B6Ff2e53408f38A5a363586746d1dB306AF5caa4",
        ],
      },
    },
    "1": {
      address: "0xccea4Dfe9F0dBCCf6357b935846bF67778167D99",
      blockHash:
        "0x671bc2d6d650f6227dd0e0af6688c681ec1031d5e5efa3cfaf7e493086372373",
      blockNumber: 11807868,
      logIndex: 18,
      removed: false,
      transactionHash:
        "0xd79eac4bdca7883ebd26e7ebe739d2c656fba2fab9abb11b5099ebafb5d4d4f2",
      transactionIndex: 11,
      id: "log_bd8d3c43",
      returnValues: {},
      signature: null,
      raw: {
        data: "0x00000000000000000000000000000000000000000000000000000000000007a6",
        topics: [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "0x000000000000000000000000B6Ff2e53408f38A5a363586746d1dB306AF5caa4",
          "0x000000000000000000000000d825d73cdd050ecbebc0b3a8d9c5952d1f64722e",
        ],
      },
    },
  },
};

const testEthersTokenReceipt = {
  to: "0xB6Ff2e53408f38A5a363586746d1dB306AF5caa4",
  from: "0xd825D73CDD050ecbEBC0B3a8D9C5952d1F64722e",
  contractAddress: null,
  transactionIndex: 38,
  gasUsed: BigNumber.from("0x019e7d"),
  logsBloom:
    "0x00000000000000000000000000000000000000100000000000080000000000000000000000000000000000000000100000000800000000400000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000004000000000000000000004000000000000000000000080000000000000000000400000000000000000000000002000000000000000000002000000000000000000000000002000000000000000000000000000000000008000000000000000000000000000000000000",
  blockHash:
    "0x3d4243b55a35efe9cd33247a31506162889b72ea13e19bf2a12e3297f27fb9cf",
  transactionHash:
    "0xe98e392e186379489a119feaa8d19573e946c756b1df480c05fd088d3851d888",
  logs: [
    {
      transactionIndex: 38,
      blockNumber: 11838227,
      transactionHash:
        "0xe98e392e186379489a119feaa8d19573e946c756b1df480c05fd088d3851d888",
      address: "0x83e77C197E744D21810A1f970cD24A246E0932a1",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000B6Ff2e53408f38A5a363586746d1dB306AF5caa4",
        "0x000000000000000000000000d825d73cdd050ecbebc0b3a8d9c5952d1f64722e",
      ],
      data: "0x00000000000000000000000000000000000000000000000000000000001e8480",
      logIndex: 28,
      blockHash:
        "0x3d4243b55a35efe9cd33247a31506162889b72ea13e19bf2a12e3297f27fb9cf",
    },
    {
      transactionIndex: 38,
      blockNumber: 11838227,
      transactionHash:
        "0xe98e392e186379489a119feaa8d19573e946c756b1df480c05fd088d3851d888",
      address: "0xccea4Dfe9F0dBCCf6357b935846bF67778167D99",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000d825d73cdd050ecbebc0b3a8d9c5952d1f64722e",
        "0x000000000000000000000000B6Ff2e53408f38A5a363586746d1dB306AF5caa4",
      ],
      data: "0x0000000000000000000000000000000000000000000000000000000000000fc5",
      logIndex: 29,
      blockHash:
        "0x3d4243b55a35efe9cd33247a31506162889b72ea13e19bf2a12e3297f27fb9cf",
    },
  ],
  blockNumber: 11838227,
  confirmations: 1,
  cumulativeGasUsed: BigNumber.from("0x1bb486"),

  effectiveGasPrice: BigNumber.from("0x024093f083"),
  status: 1,
  type: 2,
  byzantium: true,
  events: [
    {
      transactionIndex: 38,
      blockNumber: 11838227,
      transactionHash:
        "0xe98e392e186379489a119feaa8d19573e946c756b1df480c05fd088d3851d888",
      address: "0x83e77C197E744D21810A1f970cD24A246E0932a1",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000B6Ff2e53408f38A5a363586746d1dB306AF5caa4",
        "0x000000000000000000000000d825d73cdd050ecbebc0b3a8d9c5952d1f64722e",
      ],
      data: "0x00000000000000000000000000000000000000000000000000000000001e8480",
      logIndex: 28,
      blockHash:
        "0x3d4243b55a35efe9cd33247a31506162889b72ea13e19bf2a12e3297f27fb9cf",
    },
    {
      transactionIndex: 38,
      blockNumber: 11838227,
      transactionHash:
        "0xe98e392e186379489a119feaa8d19573e946c756b1df480c05fd088d3851d888",
      address: "0xccea4Dfe9F0dBCCf6357b935846bF67778167D99",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000d825d73cdd050ecbebc0b3a8d9c5952d1f64722e",
        "0x000000000000000000000000B6Ff2e53408f38A5a363586746d1dB306AF5caa4",
      ],
      data: "0x0000000000000000000000000000000000000000000000000000000000000fc5",
      logIndex: 29,
      blockHash:
        "0x3d4243b55a35efe9cd33247a31506162889b72ea13e19bf2a12e3297f27fb9cf",
    },
  ],
};

const testEthersNativeReceipt = {
  to: "0xB6Ff2e53408f38A5a363586746d1dB306AF5caa4",
  from: "0xa86dabFBb529a4C8186BdD52bd226aC81757E090",
  contractAddress: null,
  transactionIndex: 12,
  gasUsed: BigNumber.from("0x01626a"),
  logsBloom:
    "0x00004000000000000400000000000000000000000000000000000000001000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000008000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000008000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000400000000000",
  blockHash:
    "0xc5283f0b723332f32606484009ab572ef5467d3ed55c70a8a93dfc1d3feb9aac",
  transactionHash:
    "0xa1e62967292574eada0a423926bace7eb3a69e0d38f72369e1eff8fe577c8d6a",
  logs: [
    {
      transactionIndex: 12,
      blockNumber: 11848148,
      transactionHash:
        "0xa1e62967292574eada0a423926bace7eb3a69e0d38f72369e1eff8fe577c8d6a",
      address: "0xaD6D458402F60fD3Bd25163575031ACDce07538D",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000b6ff2e53408f38a5a363586746d1db306af5caa4",
        "0x000000000000000000000000a86dabfbb529a4c8186bdd52bd226ac81757e090",
      ],
      data: "0x000000000000000000000000000000000000000000000000001d0e0605539fff",
      logIndex: 10,
      blockHash:
        "0xc5283f0b723332f32606484009ab572ef5467d3ed55c70a8a93dfc1d3feb9aac",
    },
  ],
  blockNumber: 11848148,
  confirmations: 1,
  cumulativeGasUsed: BigNumber.from("0x0efb72"),
  effectiveGasPrice: BigNumber.from("0x037c399fb4"),
  status: 1,
  type: 2,
  byzantium: true,
  events: [
    {
      transactionIndex: 12,
      blockNumber: 11848148,
      transactionHash:
        "0xa1e62967292574eada0a423926bace7eb3a69e0d38f72369e1eff8fe577c8d6a",
      address: "0xaD6D458402F60fD3Bd25163575031ACDce07538D",
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000b6ff2e53408f38a5a363586746d1db306af5caa4",
        "0x000000000000000000000000a86dabfbb529a4c8186bdd52bd226ac81757e090",
      ],
      data: "0x000000000000000000000000000000000000000000000000001d0e0605539fff",
      logIndex: 10,
      blockHash:
        "0xc5283f0b723332f32606484009ab572ef5467d3ed55c70a8a93dfc1d3feb9aac",
    },
  ],
};

type parsedReceipt = {
  blockNumber: number;
  timestamp: number;
  transactionHash: string;
  gasUsed: number;
  gasCostInEther: number;
  gasPriceInGwei: number;
  status: boolean;
  buyAddress: string;
  sellAddress: string;
  sellSymbol: string;
  buyQtyUnscaled: number;
  buySymbol: string;
  sellQtyUnscaled: number;
  moreExpensiveSymbol: string;
  lessExpensiveSymbol: string;
  readableConversionRate: number;
  conversionRateString: string;
};

beforeAll(async () => {
  await callParseEthersTokenTxReceipt();
  await callParseWeb3TxReceipt();
  await callParseEthersNativeTxReceipt();
});

let parsedWeb3Receipt: parsedReceipt;
let parsedEthersTokenReceipt: parsedReceipt;
let parsedEthersNativeReceipt: parsedReceipt;

async function callParseWeb3TxReceipt() {
  parsedWeb3Receipt = await parseSwapWeb3TxReceipt(testWeb3Receipt);
  // console.log({ parsedWeb3Receipt });
}
async function callParseEthersTokenTxReceipt() {
  parsedEthersTokenReceipt = await parseSwapEthersTxReceipt(testEthersTokenReceipt);
  // console.log({ parsedEthersTokenReceipt });
}
async function callParseEthersNativeTxReceipt() {
  parsedEthersNativeReceipt = await parseSwapEthersTxReceipt(
    testEthersNativeReceipt
  );
  // console.log({ parsedEthersTokenReceipt });
}

test("gas used is correct?", async () => {
  expect(parsedWeb3Receipt.gasUsed).toBe(105925);
});

test("total cost in ether is correct?", async () => {
  expect(parsedWeb3Receipt.gasCostInEther).toBe(0.0008612399473789);
});

test("effective gas price in gwei is correct?", async () => {
  expect(parsedWeb3Receipt.gasPriceInGwei).toBe(8.130657988);
});
test("base quantity scaled for decimals is correct?", async () => {
  expect(parsedWeb3Receipt.sellQtyUnscaled).toBe(1.0);
});
test("quote quantity scaled for decimals is correct?", async () => {
  expect(parsedWeb3Receipt.buyQtyUnscaled).toBe(0.00001958);
});
test("sell address is correct?", async () => {
  expect(parsedWeb3Receipt.sellAddress).toBe(
    "0x83e77c197e744d21810a1f970cd24a246e0932a1"
  );
});
test("native base address is correct?", async () => {
  expect(parsedEthersNativeReceipt.sellAddress).toBe(
    "0x0000000000000000000000000000000000000000"
  );
});
test("buy address is correct?", async () => {
  expect(parsedWeb3Receipt.buyAddress).toBe(
    "0xccea4dfe9f0dbccf6357b935846bf67778167d99"
  );
});
test("conversion rate string is correct?", async () => {
  expect(parsedWeb3Receipt.conversionRateString).toBe(
    "Swapped 1 USDC for 0.00001958 WBTC at a rate of 51072.52 USDC per WBTC"
  );
});

test("gas used is correct?", async () => {
  expect(parsedEthersTokenReceipt.gasUsed).toBe(106109);
});

test("total cost in ether is correct?", async () => {
  expect(parsedEthersTokenReceipt.gasCostInEther).toBe(0.001026431806097911);
});

test("effective gas price in gwei is correct?", async () => {
  expect(parsedEthersTokenReceipt.gasPriceInGwei).toBe(9.673371779);
});
test("token swap base quantity scaled for decimals is correct?", async () => {
  expect(parsedEthersTokenReceipt.sellQtyUnscaled).toBe(0.00004037);
});
test("native swap base quantity scaled for decimals is correct?", async () => {
  expect(parsedEthersNativeReceipt.sellQtyUnscaled).toBe(0.0001);
});
test("token swap quote quantity scaled for decimals is correct?", async () => {
  expect(parsedEthersTokenReceipt.buyQtyUnscaled).toBe(2);
});
test("native swap quote quantity scaled for decimals is correct?", async () => {
  expect(parsedEthersNativeReceipt.buyQtyUnscaled).toBe(0.008178193346568191);
});
test("sell address is correct?", async () => {
  expect(parsedEthersTokenReceipt.sellAddress).toBe(
    "0xccea4dfe9f0dbccf6357b935846bf67778167d99"
  );
});
test("buy address is correct?", async () => {
  expect(parsedEthersTokenReceipt.buyAddress).toBe(
    "0x83e77c197e744d21810a1f970cd24a246e0932a1"
  );
});
test("conversion rate string is correct?", async () => {
  expect(parsedEthersTokenReceipt.conversionRateString).toBe(
    "Swapped 0.00004037 WBTC for 2 USDC at a rate of 49541.74 USDC per WBTC"
  );
});*/
