import { type RowSelectionState } from "@tanstack/react-table";

export type TableTabTypes = "positions" | "orders" | "history" | "pnl";

export interface TableStateProps {
  positions: TableState;
  orders: TableState;
  history: FilterableTableState;
  pnl: FilterableTableState;
  tabType: TableTabTypes;
  selection: RowSelectionState;
}

export interface TableState {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  pairIndex?: number;
}

export interface FilterableTableState extends TableState {
  filters?: string;
}
