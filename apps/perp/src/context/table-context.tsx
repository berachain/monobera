import React, { useState } from "react";
import type { TableStateProps } from "~/types/table";

interface TableContextType {
  tableState: TableStateProps;
  setTableState: (state: TableStateProps) => void;
}

const TableContext = React.createContext({
  tableState: {
    page: 1,
    // TODO: Change perPage to 10 after pagination is implemented
    perPage: 420,
    sortBy: undefined,
    sortDir: undefined,
    pairIndex: undefined,
  },
  setTableState: () => {},
} as TableContextType);

const TableContextProvider = ({ children }: any) => {
  const [tableState, setTableState] = useState<TableStateProps>({
    page: 1,
    perPage: 420,
    sortBy: undefined,
    sortDir: "desc",
    pairIndex: undefined,
  });

  return (
    <TableContext.Provider value={{ tableState, setTableState }}>
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableContextProvider };
