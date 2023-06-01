import { bech32 } from "bech32";

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

export const BERA = bech32Chain("BERA", "bera");

export const BERAVALOPER = bech32Chain("BERA", "beravaloper");

export const ethToBera = (ethAddress: string): string => {
  const data = ETH.decoder(ethAddress);
  return BERA.encoder(data);
};

export const BeravaloperToEth = (bech32Address: string): string => {
  const data = BERAVALOPER.decoder(bech32Address);
  return ETH.encoder(data);
};

export const beraToEth = (bech32Address: string): string => {
  const data = BERA.decoder(bech32Address);
  return ETH.encoder(data);
};
