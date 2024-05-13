export type TableTabTypes = "positions" | "orders" | "history" | "pnl";

export interface TableStateProps {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortDir?: string;
  pairIndex?: number;
}
