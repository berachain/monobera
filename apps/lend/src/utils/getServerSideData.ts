import { lendEndpointUrl } from "@bera/config";

export async function getAssets() {
  const res = await fetch(`${lendEndpointUrl}/assets`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetsSupplied() {
  const res = await fetch(
    `${lendEndpointUrl}/supplied?asset_address=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getAssetsBorrowed() {
  const res = await fetch(
    `${lendEndpointUrl}/borrowed?asset_address=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getBorrowAPR() {
  const res = await fetch(
    `${lendEndpointUrl}/interest?asset_address=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&side=borrow`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getSupplyAPR() {
  const res = await fetch(
    `${lendEndpointUrl}/interest?asset_address=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&side=supply`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
