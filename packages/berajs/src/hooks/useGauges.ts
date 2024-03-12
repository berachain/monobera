"use client";

import { gaugeListUrl } from "@bera/config";
import useSWRImmutable from "swr/immutable";
import { useLocalStorage } from "usehooks-ts";

import { type Gauge } from "~/api";
import POLLING from "~/config/constants/polling";

interface IUseGaugess {
  gaugeList: Gauge[] | undefined;
  gaugeDictionary: { [key: string]: Gauge } | undefined;
  addNewGauge: (gauge: Gauge | undefined) => void;
  removeGauge: (gauge: Gauge) => void;
}

function gaugeListToDict(list: Gauge[]): { [key: string]: Gauge } {
  return list.reduce((acc, item) => {
    // @ts-ignore
    acc[item.address] = item;
    return acc;
  }, {});
}

const useGauges = (): IUseGaugess => {
  const GAUGE_KEY = "gauges";

  const [localStorageGaugeList, setLocalStorageGaugeList] = useLocalStorage<
    Gauge[]
  >(GAUGE_KEY, []);

  const { data } = useSWRImmutable(
    ["defaultGaugeList", localStorageGaugeList],
    async () => {
      try {
        const gaugeList = await fetch(gaugeListUrl);
        const temp = await gaugeList.json();
        if (!temp.gauges) {
          return { list: localStorageGaugeList, dictionary: {} };
        }
        const defaultList = temp.gauges.map((gauge: Gauge) => {
          return { ...gauge, default: true };
        });

        const list = [...defaultList, ...localStorageGaugeList];
        // Make it unique
        const uniqueList = list.filter(
          (item, index) =>
            list.findIndex((i) => i.address === item.address) === index,
        );
        return {
          list: uniqueList,
          dictionary: gaugeListToDict(list),
        };
      } catch (error) {
        console.error("Error fetching token list", error);
        return { list: localStorageGaugeList, dictionary: {} };
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const addNewGauge = (gauge: Gauge | undefined) => {
    // Indicate that this gauge is now accepted into the default list of gauges
    const acceptedGauge = {
      ...gauge,
      default: true,
    };

    // Check if the gauge already exists in gaugeList
    if (
      data?.list.some(
        (t) =>
          t.address.toLowerCase() === acceptedGauge?.address?.toLowerCase(),
      )
    ) {
      return;
    }

    const updatedData = !gauge
      ? [...localStorageGaugeList]
      : [...localStorageGaugeList, acceptedGauge as Gauge];
    setLocalStorageGaugeList(updatedData);
    // Update config data and store it in localStorage
  };

  const removeGauge = (gauge: Gauge) => {
    const filteredList = localStorageGaugeList.filter(
      (t) => t.address !== gauge.address,
    );

    const updatedData = [...filteredList];
    setLocalStorageGaugeList(updatedData);
  };

  return {
    gaugeList: data?.list ?? [],
    gaugeDictionary: data?.dictionary ?? {},
    addNewGauge,
    removeGauge,
  };
};

export default useGauges;
