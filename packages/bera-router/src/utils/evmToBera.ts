// @ts-nocheck

import { bech32Prefix } from "@bera/config";
import { bech32 } from "bech32";
import { type Address } from "viem";

import {
  isValidChecksumAddress,
  stripHexPrefix,
  toChecksumAddress,
} from "./addressChecker";

function makeChecksummedHexDecoder(chainId?: number) {
  return (data: string) => {
    const stripped = stripHexPrefix(data);
    if (
      !isValidChecksumAddress(data, chainId || null) &&
      stripped !== stripped.toLowerCase() &&
      stripped !== stripped.toUpperCase()
    ) {
      throw Error("Invalid address checksum");
    }
    return Buffer.from(stripHexPrefix(data), "hex");
  };
}

function makeChecksummedHexEncoder(chainId?: number) {
  return (data: Buffer) =>
    toChecksumAddress(data.toString("hex"), chainId || null);
}

const hexChecksumChain = (name: string, chainId?: number) => ({
  decoder: makeChecksummedHexDecoder(chainId),
  encoder: makeChecksummedHexEncoder(chainId),
  name,
});

export const ETH = hexChecksumChain("ETH");

function makeBech32Encoder(prefix: string) {
  return (data: Buffer) => bech32.encode(prefix, bech32.toWords(data));
}

function makeBech32Decoder(currentPrefix: string) {
  return (data: string) => {
    const { prefix, words } = bech32.decode(data);
    if (prefix !== currentPrefix) {
      throw Error("Unrecognised address format");
    }
    return Buffer.from(bech32.fromWords(words));
  };
}

const bech32Chain = (name: string, prefix: string) => ({
  decoder: makeBech32Decoder(prefix),
  encoder: makeBech32Encoder(prefix),
  name,
});

const prefix = bech32Prefix;

export const BERA = bech32Chain("BERA", prefix);

export const BERAVALOPER = bech32Chain("BERA", prefix + "valoper");

export const COSMOS = bech32Chain("COSMOS", prefix);

export const COSMOSVALOPER = bech32Chain("COSMOS", prefix + "valoper");

export const ethToBera = (ethAddress: string | undefined): Address => {
  if (!ethAddress) {
    return "" as Address;
  }
  const data = ETH.decoder(ethAddress);
  return BERA.encoder(data) as Address;
};

export const ethToBeravaloper = (ethAddress: string | undefined): Address => {
  if (!ethAddress) {
    return "" as Address;
  }
  const data = ETH.decoder(ethAddress);
  return BERAVALOPER.encoder(data) as Address;
};

export const BeravaloperToEth = (
  bech32Address: string | undefined,
): Address => {
  if (!bech32Address) {
    return "" as Address;
  }
  const data = BERAVALOPER.decoder(bech32Address);
  return ETH.encoder(data) as Address;
};

export const beraToEth = (bech32Address: string | undefined): Address => {
  if (!bech32Address) {
    return "" as Address;
  }
  const data = BERA.decoder(bech32Address);
  return ETH.encoder(data) as Address;
};

export const cosmosvaloperToEth = (
  bech32Address: string | undefined,
): string => {
  if (!bech32Address) {
    return "";
  }
  const data = COSMOSVALOPER.decoder(bech32Address);
  return ETH.encoder(data) as Address;
};

export const cosmosToEth = (bech32Address: string | undefined): Address => {
  if (!bech32Address) {
    return "" as Address;
  }
  const data = COSMOS.decoder(bech32Address);
  return ETH.encoder(data) as Address;
};
