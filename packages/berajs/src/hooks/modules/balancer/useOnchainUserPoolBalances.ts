/* eslint-disable react-hooks/exhaustive-deps */
import {
  GqlPoolUserBalance,
  GqlUserStakedBalance,
} from '@/lib/shared/services/api/generated/graphql'
import { bn, safeSum } from '@/lib/shared/utils/numbers'
import { captureNonFatalError } from '@/lib/shared/utils/query-errors'
import { HumanAmount } from '@balancer/sdk'
import BigNumber from 'bignumber.js'
import { useEffect } from 'react'
import { ReadContractsErrorType } from 'wagmi/actions'
import { Pool as OriginalPool } from '../../../providers/poolProvider'
import { calcBptPriceFor } from '../pool.helpers'
import { calcNonOnChainFetchedStakedBalance } from '../user-balance.helpers'
import { StakedBalancesByPoolId, useUserStakedBalance } from './useUserStakedBalance'
import { UnstakedBalanceByPoolId, useUserUnstakedBalance } from './useUserUnstakedBalance'
import { isSameAddress } from '~/utils'

type Pool = OriginalPool & {
  nonGaugeStakedBalance?: BigNumber
}

export function useOnchainUserPoolBalances(pools: Pool[] = []) {
  const {
    unstakedBalanceByPoolId,
    isLoading: isLoadingUnstakedPoolBalances,
    isFetching: isFetchingUnstakedPoolBalances,
    refetch: refetchUnstakedBalances,
    error: unstakedPoolBalancesError,
  } = useUserUnstakedBalance(pools)

  const {
    stakedBalancesByPoolId,
    isLoading: isLoadingStakedPoolBalances,
    isFetching: isFetchingStakedPoolBalances,
    refetch: refetchedStakedBalances,
    error: stakedPoolBalancesError,
  } = useUserStakedBalance(pools)

  async function refetch() {
    return Promise.all([refetchUnstakedBalances(), refetchedStakedBalances()])
  }

  const isLoading = isLoadingUnstakedPoolBalances || isLoadingStakedPoolBalances
  const isFetching = isFetchingUnstakedPoolBalances || isFetchingStakedPoolBalances

  const enrichedPools = isLoading
    ? pools
    : overwriteOnchainPoolBalanceData(pools, unstakedBalanceByPoolId, stakedBalancesByPoolId)

  useEffect(() => {
    if (stakedPoolBalancesError) {
      captureStakedMulticallError(stakedPoolBalancesError)
    }
    if (unstakedPoolBalancesError) {
      captureUnstakedMulticallError(unstakedPoolBalancesError)
    }
  }, [unstakedPoolBalancesError, stakedPoolBalancesError])

  return {
    data: enrichedPools,
    isLoading,
    isFetching,
    refetchUnstakedBalances,
    refetchedStakedBalances,
    refetch,
  }
}

function captureStakedMulticallError(stakedPoolBalancesError: ReadContractsErrorType) {
  console.log(
    'Error in stake pool balances multicall in useOnchainUserPoolBalances',
    stakedPoolBalancesError
  )
  captureNonFatalError({
    error: stakedPoolBalancesError,
    errorName: 'UseOnchainUserPoolBalancesError',
    errorMessage: 'Error in staked pool balances multicall',
  })
}

function captureUnstakedMulticallError(unstakedPoolBalancesError: ReadContractsErrorType) {
  console.log(
    'Error in  unstake pool balances multicall in useOnchainUserPoolBalances',
    unstakedPoolBalancesError
  )
  captureNonFatalError({
    error: unstakedPoolBalancesError,
    errorName: 'UseOnchainUserPoolBalancesError',
    errorMessage: 'Error in unstaked pool balances multicall',
  })
}

/**
 * Overwrites the pool's userBalance with onchain data.
 *
 * Needs to be an overwrite rather than a merge because figuring out if an
 * onchain result is correct over the API result is too complicated. e.g. in the
 * stakedBalance case, we allow failures, so that the array is the correct size. We know
 * there will be pools that don't have gauges. If they don't have
 * gauges then they don't have staked balances, so we can safely overwrite
 * with a 0 balance.
 */
function overwriteOnchainPoolBalanceData(
  pools: Pool[],
  ocUnstakedBalances: UnstakedBalanceByPoolId,
  stakedBalancesByPoolId: StakedBalancesByPoolId
) {
  return pools.map(pool => {
    if (!Object.keys(ocUnstakedBalances).length || !Object.keys(stakedBalancesByPoolId).length) {
      return pool
    }

    const bptPrice = calcBptPriceFor(pool)

    // Unstaked balances
    const onchainUnstakedBalances = ocUnstakedBalances[pool.id]
    if (!onchainUnstakedBalances) {
      return pool
    }

    const onchainUnstakedBalance = onchainUnstakedBalances.unstakedBalance as HumanAmount
    const onchainUnstakedBalanceUsd = bn(onchainUnstakedBalance).times(bptPrice).toNumber()

    // Staked balances
    const onchainStakedBalances = stakedBalancesByPoolId[pool.id]

    if (!onchainStakedBalances) {
      return pool
    }
    const onchainTotalStakedBalance = safeSum(
      onchainStakedBalances.map(stakedBalance => bn(stakedBalance.balance))
    )

    // Total balances
    const totalBalance = safeSum([
      calcNonOnChainFetchedStakedBalance(pool),
      onchainTotalStakedBalance,
      onchainUnstakedBalance,
    ])

    const totalBalanceUsd = Number(bn(totalBalance).times(bptPrice))

    const userBalance: GqlPoolUserBalance = {
      __typename: 'GqlPoolUserBalance',
      ...(pool.userBalance || {}),
      stakedBalances: overrideStakedBalances(pool, stakedBalancesByPoolId[pool.id] ?? []),
      walletBalance: onchainUnstakedBalance,
      walletBalanceUsd: onchainUnstakedBalanceUsd,
      totalBalance: totalBalance.toString(),
      totalBalanceUsd,
    }

    return {
      ...pool,
      userBalance,
    }
  })
}

/* Returns a GqlUserStakedBalance[] array by overriding pool.userBalance.stakedBalances with the given onchain gauge staking balances.
 */
function overrideStakedBalances(
  pool: Pool,
  onChainStakedBalances: GqlUserStakedBalance[]
): GqlUserStakedBalance[] {
  if (!pool.userBalance) return onChainStakedBalances
  const apiStakedBalances = [...pool.userBalance.stakedBalances]

  onChainStakedBalances.forEach(onchainStakedBalance => {
    // Index of the onchain gauge in the api staked balances
    const index = apiStakedBalances.findIndex(apiBalance =>
      isSameAddress(apiBalance.stakingId, onchainStakedBalance.stakingId)
    )
    if (index === -1) {
      apiStakedBalances.push(onchainStakedBalance)
    } else {
      apiStakedBalances[index] = onchainStakedBalance
    }
  })
  return apiStakedBalances
}
