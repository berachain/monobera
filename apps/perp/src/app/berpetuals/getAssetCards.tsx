import {
  IClosedTrade,
  ILimitOrder,
  IMarketOrder,
} from "./components/order-history";
import { ICards, IRow } from "./components/order-history-table";

export const getAssetCardList = ({
  marketOrderItems,
  limitOrderItems,
  historyItems,
}: {
  marketOrderItems: IMarketOrder[];
  limitOrderItems: ILimitOrder[];
  historyItems: IClosedTrade[];
}): {
  marketList: ICards[];
  limitList: ICards[];
  historyList: ICards[];
  pnlList: ICards[];
} => {
  return {
    marketList: getMarketListItems(marketOrderItems ?? []),
    limitList: getLimitListItems(limitOrderItems ?? []),
    historyList: getHisoryListItems(historyItems ?? []),
    pnlList: getPnlListItems(historyItems ?? []),
  };
};

const Title = () => {
  return <div>This is a custom component.</div>;
};

const getMarketListItems = (marketOrderItems: IMarketOrder[]): ICards[] => {
  const rows = [
    {
      key: "title",
      value: <Title />,
    },
    {
      key: "Entry Price",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Size",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Leverage",
      value: <div>Another custom component.</div>,
    },
    {
      key: "LIQ/SL",
      value: <div>Another custom component.</div>,
    },
    {
      key: "TP/SL",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Net PnL",
      value: <div>Another custom component.</div>,
    },
    // Add more rows as needed
  ];
  const cards = marketOrderItems.map((item) => {
    return {
      title: <>deez</>,
      footer: undefined,
      rows: rows,
    };
  });

  return cards;
};

const getLimitListItems = (limitOrderItems: ILimitOrder[]): ICards[] => {
  const rows: IRow[] = [
    {
      key: "title",
      value: <Title />,
    },
    {
      key: "Time",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Order Type",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Price",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Total",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Filled/UnFilled",
      value: <div>Another custom component.</div>,
    },
  ];

  const cards = limitOrderItems.map((item) => {
    return {
      title: <>deez</>,
      footer: undefined,
      rows: rows,
    };
  });

  return cards;
};

const getHisoryListItems = (historyItems: IClosedTrade[]): ICards[] => {
  const rows: IRow[] = [
    {
      key: "title",
      value: <Title />,
    },
    {
      key: "Time",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Order Type",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Open Price",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Close Price",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Total",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Trade Fee",
      value: <div>Another custom component.</div>,
    },
    {
      key: "PnL",
      value: <div>Another custom component.</div>,
    },
  ];
  const cards = historyItems.map((item) => {
    return {
      title: <>deez</>,
      footer: undefined,
      rows: rows,
    };
  });

  return cards;
};

const getPnlListItems = (historyItems: IClosedTrade[]): ICards[] => {
  const rows: IRow[] = [
    {
      key: "title",
      value: <Title />,
    },
    {
      key: "Time",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Entry Price",
      value: <div>Another custom component.</div>,
    },
    {
      key: "Exit Price",
      value: <div>Another custom component.</div>,
    },
    {
      key: "PnL",
      value: <div>Another custom component.</div>,
    },
  ];
  const cards = historyItems.map((item) => {
    return {
      title: <>deez</>,
      footer: undefined,
      rows: rows,
    };
  });

  return cards;
};
