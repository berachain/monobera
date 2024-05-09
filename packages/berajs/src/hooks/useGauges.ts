import { gaugeListUrl } from "@bera/config";
import POLLING from "~/enum/polling";
import { Gauge } from "..";
import useSWR from "swr";

interface IUseGaugess {
  gaugeList: Gauge[] | undefined;
  gaugeDictionary: { [key: string]: Gauge } | undefined;
}

function gaugeListToDict(list: Gauge[]): { [key: string]: Gauge } {
  return list.reduce((acc, item) => {
    // @ts-ignore
    acc[item.address] = item;
    return acc;
  }, {});
}

const useGauges = (): IUseGaugess => {
  const { data } = useSWR(
    ["defaultGaugeList"],
    async () => {
      try {
        const gaugeList = await fetch(gaugeListUrl);
        const temp = await gaugeList.json();
        if (!temp.gauges) {
          return { list: [], dictionary: {} };
        }
        const defaultList = temp.gauges.map((gauge: Gauge) => {
          return { ...gauge, default: true };
        });

        const list = [...defaultList];
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
        return { list: [], dictionary: {} };
      }
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  return {
    gaugeList: data?.list ?? [],
    gaugeDictionary: data?.dictionary ?? {},
  };
};

export default useGauges;
