export interface OrderType {
  assets?: any; //Token
  orderType: "long" | "short";
  optionType: "market" | "limit";
  amount: string;
  limitPrice?: number | undefined;
  quantity: number | undefined;
  price?: number | undefined;
  leverage: number | undefined;
  tp: string;
  sl: string;
}
