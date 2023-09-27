import {
  type AmountItem,
  type AssetItem,
  type RateItem,
} from "~/utils/getServerSideData";
import { type Asset } from "./types";

export function getAssetsList(
  assets: AssetItem[],
  borrowedAssets: AmountItem[],
  suppliedAssets: AmountItem[],
  borrowStableAPR: RateItem[],
  borrowVariableAPR: RateItem[],
  supplyStableAPR: RateItem[],
  supplyVariableAPR: RateItem[],
): Asset[] {
  const assetDictionary: { [key: string]: Partial<Asset> } = {};
  assets.forEach((asset: AssetItem) => {
    assetDictionary[asset.asset_address] = asset;
  });
  borrowedAssets.forEach((asset: AmountItem) => {
    assetDictionary[asset.asset_address]!.borrowed = Number(asset.amount);
  });
  suppliedAssets.forEach((asset: AmountItem) => {
    assetDictionary[asset.asset_address]!.supplied = Number(asset.amount);
  });
  borrowStableAPR.forEach((asset: RateItem) => {
    assetDictionary[asset.asset_address]!.borrowStableAPR = Number(asset.rate);
  });
  borrowVariableAPR.forEach((asset: RateItem) => {
    assetDictionary[asset.asset_address]!.borrowVariableAPR = Number(
      asset.rate,
    );
  });
  supplyStableAPR.forEach((asset: RateItem) => {
    assetDictionary[asset.asset_address]!.supplyStableAPR = Number(asset.rate);
  });
  supplyVariableAPR.forEach((asset: RateItem) => {
    assetDictionary[asset.asset_address]!.supplyVariableAPR = Number(
      asset.rate,
    );
  });
  return Object.keys(assetDictionary).map(
    (key) => assetDictionary[key] as Asset,
  );
}
