import { lendEndpointUrl } from "@bera/config";
import { type Address } from "wagmi";

export interface AssetItem {
  asset_address: Address;
  symbol: string;
  decimals: number;
  atoken_address: Address;
  stable_debt_token_address: Address;
  variable_debt_token_address: Address;
}

export interface AmountItem {
  asset_address: Address;
  time: string;
  amount: string;
}

export interface RateItem {
  asset_address: Address;
  time: string;
  rate: string;
}

export enum RateType {
  SUPPLY = "supply",
  VARIABLE = "variable",
  STABLE = "stable",
}

export enum Interval {
  ONE_DAY = "1D",
  SEVEN_DAY = "7D",
  THIRTY_DAY = "30D",
}

export enum RequestType {
  ASSETS = "assets",
  SUPPLIED = "supplied",
  BORROWED = "borrowed",
  VOLUME = "volume",
  UTILIZATION = "utilization",
  INTEREST = "interest",
}
// need refactor, i over complicated this
// no need this many functions, i am dumb

export async function getAssets(): Promise<AssetItem[]> {
  const res = await fetch(`${lendEndpointUrl}/assets`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetsSupplied(): Promise<AmountItem[]> {
  const res = await fetch(`${lendEndpointUrl}/supplied`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetsBorrowed(): Promise<AmountItem[]> {
  const res = await fetch(`${lendEndpointUrl}/borrowed`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getBorrowStableAPR(): Promise<RateItem[]> {
  const res = await fetch(`${lendEndpointUrl}/interest?rate_type=stable`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getBorrowVariableAPR(): Promise<RateItem[]> {
  const res = await fetch(`${lendEndpointUrl}/interest?rate_type=variable`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getSupplyAPR(): Promise<RateItem[]> {
  const res = await fetch(`${lendEndpointUrl}/interest?rate_type=supply`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetSupplied(address: Address): Promise<AmountItem> {
  const res = await fetch(`${lendEndpointUrl}/supplied/${address}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetBorrowed(address: Address): Promise<AmountItem> {
  const res = await fetch(`${lendEndpointUrl}/borrowed/${address}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetVolume(address: Address): Promise<AmountItem> {
  const res = await fetch(`${lendEndpointUrl}/volume/${address}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetUtilization(address: Address): Promise<RateItem> {
  const res = await fetch(`${lendEndpointUrl}/utilization/${address}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetSupplyAPR(address: Address): Promise<RateItem> {
  const res = await fetch(
    `${lendEndpointUrl}/interest/${address}?rate_type=supply`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetBorrowVariableAPR(
  address: Address,
): Promise<RateItem> {
  const res = await fetch(
    `${lendEndpointUrl}/interest/${address}?rate_type=variable`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetSupplyAPRInterval(
  address: Address,
  interval: "1D" | "7D" | "30D",
): Promise<RateItem[]> {
  const res = await fetch(
    `${lendEndpointUrl}/interest/${address}/${interval}?rate_type=supply`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetBorrowVariableAPRInterval(
  address: Address,
  interval: "1D" | "7D" | "30D",
): Promise<RateItem[]> {
  const res = await fetch(
    `${lendEndpointUrl}/interest/${address}/${interval}?rate_type=variable`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
