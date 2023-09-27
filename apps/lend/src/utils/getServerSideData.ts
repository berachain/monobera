import { lendEndpointUrl } from "@bera/config";
import { type Address } from "wagmi";

export interface AssetItem {
  asset_address: Address;
  name: string;
  decimal: number;
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
  const res = await fetch(
    `${lendEndpointUrl}/interest?side=borrow&type=stable`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getBorrowVariableAPR(): Promise<RateItem[]> {
  const res = await fetch(
    `${lendEndpointUrl}/interest?side=borrow&type=variable`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getSupplyStableAPR(): Promise<RateItem[]> {
  const res = await fetch(
    `${lendEndpointUrl}/interest?side=supply&type=stable`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getSupplyVariableAPR(): Promise<RateItem[]> {
  const res = await fetch(
    `${lendEndpointUrl}/interest?side=supply&type=variable`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
