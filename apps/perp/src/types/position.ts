export interface Position {
  icon: string;
  assets: string;
  counter: string;
  option_type: "long" | "short";
  position_size: number;
  leverage: number;
  liquidation_price: number;
  current_price: number;
  unrealized_pnl: number;
  realized_pnl: number;
  stop_loss?: number;
  take_profit?: number;
  funding_payment: number;
  borrow_fee: number; //24 hrs
  open_interest_long: number;
  open_interest_short: number;
}
