import "@tanstack/react-table";

import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    selectVisibleRows?: boolean;
    loading?: boolean;
    loadingText?: string;
    validating?: boolean;
    emptyDataText?: string;
    totalDataSize?: number;
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    filter?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
    tooltip?: string;
    className?: string;
  }
}
