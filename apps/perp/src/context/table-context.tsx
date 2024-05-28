import React, { useState, type ReactNode, type Dispatch } from "react";
import type { TableStateProps } from "~/types/table";

interface TableContextType {
  tableState: TableStateProps;
  setTableState: Dispatch<React.SetStateAction<TableStateProps>>;
}

const defaultTableState: TableStateProps = {
  positions: {
    page: 1,
    perPage: 10,
    sortBy: undefined,
    sortDir: "desc",
    pairIndex: undefined,
  },
  orders: {
    page: 1,
    perPage: 10,
    sortBy: undefined,
    sortDir: "desc",
    pairIndex: undefined,
  },
  history: {
    page: 1,
    perPage: 10,
    sortBy: undefined,
    sortDir: "desc",
    filters: undefined,
  },
  pnl: {
    page: 1,
    perPage: 10,
    sortBy: undefined,
    sortDir: "desc",
    filters: undefined,
  },
  tabType: "positions",
  selection: {},
};

const TableContext = React.createContext({
  tableState: defaultTableState,
  setTableState: () => {},
} as TableContextType);

const TableContextProvider = ({ children }: { children: ReactNode }) => {
  const [tableState, setTableState] =
    useState<TableStateProps>(defaultTableState);

  return (
    <TableContext.Provider value={{ tableState, setTableState }}>
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableContextProvider, defaultTableState };
