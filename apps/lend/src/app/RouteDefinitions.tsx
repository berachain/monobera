import { ReactNode, useMemo } from "react"
import { useLocation, Navigate } from "react-router-dom";
import LandingPage from "./page";
import DashboardPage from "./dashboard/page";
import MarketsPage from "./markets/[address]/page";
import { AccessDeny, PrivacyPolicy, TermsOfUse } from "@bera/shared-ui";

function isLocalhost({ hostname }: { hostname: string }): boolean {
    return hostname === "localhost";
  }
  
  export function isBrowserRouterEnabled(): boolean {
    const isProd = process.env.VERCEL_ENV === "production";
  
    if (isProd) {
      if (isLocalhost(window.location)) {
        return true;
      }
      return false; // production builds *not* served through our domains or localhost, eg IPFS
    }
    return true; // local dev builds
  }
  
interface RouterConfig {
    browserRouterEnabled?: boolean
    hash?: string
    shouldDisableNFTRoutes?: boolean
  }

export interface RouteDefinition {
    path: string
    nestedPaths: string[]
    getTitle: (path?: string) => string
    getDescription: (path?: string) => string
    enabled: (args: RouterConfig) => boolean
    getElement: (args: RouterConfig) => ReactNode
  }
  
  /**
 * Convenience hook which organizes the router configuration into a single object.
 */
export function useRouterConfig(): RouterConfig {
    const browserRouterEnabled = isBrowserRouterEnabled()
    const { hash } = useLocation()
    return useMemo(
      () => ({
        browserRouterEnabled,
        hash,
      }),
      [browserRouterEnabled, hash]
    )
  }

  
function createRouteDefinition(route: Partial<RouteDefinition>): RouteDefinition {
    return {
      getElement: () => null,
      getTitle: () => 'Bend',
      getDescription: () => 'Supply and Borrow assets.',
      enabled: () => true,
      path: '/',
      nestedPaths: [],
      // overwrite the defaults
      ...route,
    }
  }
  
  export const routes: RouteDefinition[] = [
    createRouteDefinition({
        path: '/',
        getTitle: () => 'Bend',
        getDescription: () => 'Welcome to Bend!',
        getElement: (args) => {
          return args.browserRouterEnabled && args.hash ? <Navigate to={args.hash.replace('#', '')} replace /> : <LandingPage />
        },
      }),
      createRouteDefinition({
        path: '/dashboard',
        getTitle: () => 'Bend',
        getDescription: () => 'Welcome to Bend!',
        getElement: () => <DashboardPage />,
      }),
      createRouteDefinition({
        path: '/markets/:tokenAddress',
        getTitle: () => 'Bend',
        getDescription: () => 'Welcome to Bend!',
        getElement: () => <MarketsPage />,
      }),
      createRouteDefinition({
        path: '/privacy-policy',
        getTitle: () => 'Bend',
        getDescription: () => 'Welcome to Bend!',
        getElement: () => <PrivacyPolicy />,
      }),
      createRouteDefinition({
        path: '/terms-of-use',
        getTitle: () => 'Bend',
        getDescription: () => 'Welcome to Bend!',
        getElement: () => <TermsOfUse />,
      }),
      createRouteDefinition({
        path: '/access-deny',
        getTitle: () => 'Bend',
        getDescription: () => 'Welcome to Bend!',
        getElement: () => <AccessDeny />,
      }),
  ]