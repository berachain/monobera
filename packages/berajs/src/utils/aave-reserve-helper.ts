export function getReservesHumanized(
	reservesRaw: any[],
	poolBaseCurrencyRaw: any,
) {
	const reservesData = reservesRaw.map((reserveRaw) => ({
		id: `${1111}-${reserveRaw.underlyingAsset}`.toLowerCase(),
		underlyingAsset: reserveRaw.underlyingAsset,
		name: reserveRaw.name,
		symbol: reserveRaw.symbol,
		decimals: Number(reserveRaw.decimals),
		baseLTVasCollateral: reserveRaw.baseLTVasCollateral.toString(),
		reserveLiquidationThreshold:
			reserveRaw.reserveLiquidationThreshold.toString(),
		reserveLiquidationBonus: reserveRaw.reserveLiquidationBonus.toString(),
		reserveFactor: reserveRaw.reserveFactor.toString(),
		usageAsCollateralEnabled: reserveRaw.usageAsCollateralEnabled,
		borrowingEnabled: reserveRaw.borrowingEnabled,
		stableBorrowRateEnabled: reserveRaw.stableBorrowRateEnabled,
		isActive: reserveRaw.isActive,
		isFrozen: reserveRaw.isFrozen,
		liquidityIndex: reserveRaw.liquidityIndex.toString(),
		variableBorrowIndex: reserveRaw.variableBorrowIndex.toString(),
		liquidityRate: reserveRaw.liquidityRate.toString(),
		variableBorrowRate: reserveRaw.variableBorrowRate.toString(),
		stableBorrowRate: reserveRaw.stableBorrowRate.toString(),
		lastUpdateTimestamp: reserveRaw.lastUpdateTimestamp,
		aTokenAddress: reserveRaw.aTokenAddress.toString(),
		stableDebtTokenAddress: reserveRaw.stableDebtTokenAddress.toString(),
		variableDebtTokenAddress: reserveRaw.variableDebtTokenAddress.toString(),
		interestRateStrategyAddress:
			reserveRaw.interestRateStrategyAddress.toString(),
		availableLiquidity: reserveRaw.availableLiquidity.toString(),
		totalPrincipalStableDebt: reserveRaw.totalPrincipalStableDebt.toString(),
		averageStableRate: reserveRaw.averageStableRate.toString(),
		stableDebtLastUpdateTimestamp: Number(
			reserveRaw.stableDebtLastUpdateTimestamp,
		),
		totalScaledVariableDebt: reserveRaw.totalScaledVariableDebt.toString(),
		priceInMarketReferenceCurrency:
			reserveRaw.priceInMarketReferenceCurrency.toString(),
		priceOracle: reserveRaw.priceOracle,
		variableRateSlope1: reserveRaw.variableRateSlope1.toString(),
		variableRateSlope2: reserveRaw.variableRateSlope2.toString(),
		stableRateSlope1: reserveRaw.stableRateSlope1.toString(),
		stableRateSlope2: reserveRaw.stableRateSlope2.toString(),
		baseStableBorrowRate: reserveRaw.baseStableBorrowRate.toString(),
		baseVariableBorrowRate: reserveRaw.baseVariableBorrowRate.toString(),
		optimalUsageRatio: reserveRaw.optimalUsageRatio.toString(),
		// new fields
		isPaused: reserveRaw.isPaused,
		debtCeiling: reserveRaw.debtCeiling.toString(),
		eModeCategoryId: reserveRaw.eModeCategoryId,
		borrowCap: reserveRaw.borrowCap.toString(),
		supplyCap: reserveRaw.supplyCap.toString(),
		eModeLtv: reserveRaw.eModeLtv,
		eModeLiquidationThreshold: reserveRaw.eModeLiquidationThreshold,
		eModeLiquidationBonus: reserveRaw.eModeLiquidationBonus,
		eModePriceSource: reserveRaw.eModePriceSource.toString(),
		eModeLabel: reserveRaw.eModeLabel.toString(),
		borrowableInIsolation: reserveRaw.borrowableInIsolation,
		accruedToTreasury: reserveRaw.accruedToTreasury.toString(),
		unbacked: reserveRaw.unbacked.toString(),
		isolationModeTotalDebt: reserveRaw.isolationModeTotalDebt.toString(),
		debtCeilingDecimals: Number(reserveRaw.debtCeilingDecimals),
		isSiloedBorrowing: reserveRaw.isSiloedBorrowing,
		flashLoanEnabled: reserveRaw.flashLoanEnabled,
	}));

	const baseCurrencyData = {
		marketReferenceCurrencyDecimals:
			poolBaseCurrencyRaw.marketReferenceCurrencyUnit.toString().length - 1,
		marketReferenceCurrencyPriceInUsd:
			poolBaseCurrencyRaw.marketReferenceCurrencyPriceInUsd.toString(),
		networkBaseTokenPriceInUsd:
			poolBaseCurrencyRaw.networkBaseTokenPriceInUsd.toString(),
		networkBaseTokenPriceDecimals:
			poolBaseCurrencyRaw.networkBaseTokenPriceDecimals,
	};

	return {
		reservesData,
		baseCurrencyData,
	};
}
