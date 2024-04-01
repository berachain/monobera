export interface OrderType {
  assets?: any; //Token
  orderType: "long" | "short";
  optionType: "market" | "limit";
  amount: string;
  limitPrice?: string | undefined;
  quantity: string | undefined;
  price?: string | undefined;
  leverage: string | undefined;
  tp: string;
  sl: string;
}
