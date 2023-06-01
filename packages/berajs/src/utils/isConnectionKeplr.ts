import { connectorLocalStorageKey } from "~/hooks/useAuth";

export const isConnectionKeplr = () =>
  window?.localStorage?.getItem(connectorLocalStorageKey) === "keplr";
