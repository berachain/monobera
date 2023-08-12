import React, {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { RouterService, defaultConfig } from "@bera/bera-router";
import useSWR from "swr";

import { POLLING } from "~/utils/constants";

export interface IRouter {
  router: RouterService;
}

export const RouterContext = createContext<IRouter | undefined>(undefined);

export const useRouter = () => {
  const routerContext = useContext(RouterContext);

  if (routerContext === undefined) {
    throw new Error("router context undefined");
  }

  return routerContext;
};

const RouterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [router] = useState<RouterService>(new RouterService(defaultConfig));

  useSWR("pools", async () => await router.fetchPools(), {
    refreshInterval: POLLING.SLOW, // Polling interval in milliseconds (e.g., 5000ms = 5 seconds)
  });

  return (
    <RouterContext.Provider value={{ router }}>
      {children}
    </RouterContext.Provider>
  );
};

export default RouterProvider;
