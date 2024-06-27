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
  sortBy?: string | number;
  sortDir?: "asc" | "desc";
  pairIndex?: number;
}

export interface FilterableTableState extends TableState {
  filters?: string;
}

export interface FilterableLeaderboardTableState extends FilterableTableState {
  days?: string;
  wallet?: string;
}
