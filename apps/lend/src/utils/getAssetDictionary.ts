import {
  type AmountItem,
  type AssetItem,
  type RateItem,
} from "~/utils/getServerSideData";
import { type Asset, type AssetDictionary } from "./types";

export function getAssetDictionary(
  assets: AssetItem[],
  borrowedAssets: AmountItem[],
  suppliedAssets: AmountItem[],
  borrowStableAPR: RateItem[],
  borrowVariableAPR: RateItem[],
  supplyStableAPR: RateItem[],
): AssetDictionary {
  const assetDictionary: { [key: string]: Partial<Asset> } = {};
  assets.forEach((asset: AssetItem) => {
    assetDictionary[asset.asset_address] = asset;
    assetDictionary[asset.asset_address]!.dollarValue = 1;
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
  return assetDictionary;
}
