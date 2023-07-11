"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { RouterService, defaultConfig } from "@bera/bera-router";

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
  useEffect(() => {
    const fetchPools = async () => {
      await router.fetchPools();
    };

    void fetchPools();
  }, []);

  return (
    <RouterContext.Provider value={{ router }}>
      {children}
    </RouterContext.Provider>
  );
};
export default RouterProvider;
