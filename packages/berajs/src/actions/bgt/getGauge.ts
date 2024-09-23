import { bgtEndpointUrl } from "@bera/config";
import { Gauge } from "~/types";

export const getGauge = async (gaugeAddress: string): Promise<Gauge | null> => {
  try {
    const url = `${bgtEndpointUrl}/vaults/${gaugeAddress}`;
    const gauge = await fetch(url);
    const temp = await gauge.json();
    return temp.vault;
  } catch (error) {
    console.log(`Error fetching gauge: ${error}`);
    throw error;
  }
};
