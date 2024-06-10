import {
  getQuoteTokenAddress,
  getBaseTokenAddress,
  sortBaseQuoteTokens,
} from "../utils/token";
import { AddressZero } from "@ethersproject/constants";

test("getQuoteTokenAddress returns correct address when ETH compared with Dai on Kovan", () => {
  const daiKovanAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";
  const quoteAddress = getQuoteTokenAddress(
    AddressZero, daiKovanAddress
  );
  expect(quoteAddress).toBe(daiKovanAddress);
});

test("getBaseTokenAddress returns correct address when ETH compared with Dai on Kovan", () => {
  const daiKovanAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";
  const quoteAddress = getBaseTokenAddress(
    AddressZero, 
    daiKovanAddress
  );
  expect(quoteAddress).toBe(AddressZero);
});

test("sortBaseQuoteTokens returns correct address array when ETH compared with Dai on Kovan when already correctly sorted", () => {
  const daiKovanAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";
  const addressArray = sortBaseQuoteTokens(
    AddressZero, 
    daiKovanAddress
  );
  expect(addressArray).toStrictEqual([
    AddressZero, 
    daiKovanAddress,
  ]);
});

test("sortBaseQuoteTokens returns correct address array when ETH compared with Dai on Kovan when NOT already correctly sorted", () => {
  const daiKovanAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";
  const addressArray = sortBaseQuoteTokens(
    daiKovanAddress,
    AddressZero
  );
  expect(addressArray).toStrictEqual([
    AddressZero, 
    daiKovanAddress,
  ]);
});
