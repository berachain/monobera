/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import {
  GetFeaturedPoolsQuery,
  GetPoolDocument,
  GetPoolQuery,
  GqlChain,
} from '@/lib/shared/services/api/generated/graphql'
import { createContext, PropsWithChildren, useRef } from 'react'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { FetchPoolProps } from './pool.types'
import { useMandatoryContext } from '@/lib/shared/utils/contexts'
import { calcBptPriceFor, usePoolHelpers } from './pool.helpers'
import { useUserAccount } from '@/lib/modules/web3/UserAccountProvider'
import { usePoolEnrichWithOnChainData } from '@/lib/modules/pool/queries/usePoolEnrichWithOnChainData'
import { useOnchainUserPoolBalances } from './queries/useOnchainUserPoolBalances'

export type UsePoolResponse = ReturnType<typeof _usePool> & {
  chain: GqlChain
}
export const PoolContext = createContext<UsePoolResponse | null>(null)

export type Pool = GetPoolQuery['pool']
export type FeaturedPool = GetFeaturedPoolsQuery['featuredPools'][0]['pool']

export function _usePool({
  id,
  chain,
  initialData,
}: FetchPoolProps & { initialData: GetPoolQuery }) {
  const { userAddress } = useUserAccount()
  const queryVariables = { id, chain, userAddress: userAddress.toLowerCase() }

  const myLiquiditySectionRef = useRef<HTMLDivElement | null>(null)

  const { data } = useQuery(GetPoolDocument, {
    variables: queryVariables,
  })

  const {
    pool: poolWithOnChainData,
    refetch: refetchOnchainData,
    isLoading: isLoadingOnchainData,
  } = usePoolEnrichWithOnChainData(data?.pool || initialData.pool)

  // fallbacks to ensure the pool is always present. We prefer the pool with on chain data
  let pool: Pool = poolWithOnChainData || data?.pool || initialData.pool

  const {
    data: [poolWithOnchainUserBalances],
    refetch: refetchOnchainUserBalances,
    isLoading: isLoadingOnchainUserBalances,
  } = useOnchainUserPoolBalances([pool])

  pool = poolWithOnchainUserBalances || pool

  const bptPrice = calcBptPriceFor(pool)

  async function refetch() {
    return Promise.all([refetchOnchainData(), refetchOnchainUserBalances()])
  }

  const isLoading = isLoadingOnchainData || isLoadingOnchainUserBalances

  return {
    pool,
    bptPrice,
    isLoading,
    isLoadingOnchainData,
    isLoadingOnchainUserBalances,
    myLiquiditySectionRef,
    // TODO: we assume here that we never need to reload the entire pool.
    // this assumption may need to be questioned
    refetch,
    ...usePoolHelpers(pool, chain),
  }
}

export function PoolProvider({
  id,
  chain,
  variant,
  children,
  data,
}: PropsWithChildren<FetchPoolProps> & { data: GetPoolQuery }) {
  const hook = _usePool({ id, chain, variant, initialData: data })
  const payload = {
    ...hook,
    chain,
  }
  return <PoolContext.Provider value={payload}>{children}</PoolContext.Provider>
}

export const usePool = (): UsePoolResponse => useMandatoryContext(PoolContext, 'Pool')
