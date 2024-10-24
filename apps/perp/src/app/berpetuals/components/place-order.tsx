import { useCallback, useContext, useMemo } from "react";
import {
  TransactionActionType,
  tradingAbi,
  useBeraJs,
  usePollAllowance,
  usePollWalletBalances,
  usePythUpdateFee,
} from "@bera/berajs";
import {
  honeyAddress,
  storageContractAddress,
  tradingContractAddress,
} from "@bera/config";
import { ActionButton, ApproveButton } from "@bera/shared-ui";
import { useOctTxn, useSlippage } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import BigNumber from "bignumber.js";
import { ContractFunctionArgs, parseUnits } from "viem";

import { formatToBaseUnit } from "~/utils/formatBigNumber";
import {
  useIsPythConnected,
  usePriceData,
  useVaa,
} from "~/context/price-context";
import { TableContext } from "~/context/table-context";
import { usePollMarketOrders } from "~/hooks/usePollMarketOrders";
import { usePollOpenLimitOrders } from "~/hooks/usePollOpenLimitOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { type OrderType } from "~/types/order-type";

export function PlaceOrder({
  form,
  price,
  error,
  pairIndex,
}: {
  form: OrderType;
  price: string;
  error: string | undefined;
  pairIndex: string;
}) {
  const prices = usePriceData();
  const vaa = useVaa();
  const isPythConnected = useIsPythConnected();
  const { data: pythUpdateFee } = usePythUpdateFee(vaa.current, pairIndex);
  const { tableState } = useContext(TableContext);

  const { multiRefresh: refreshPositions } = usePollOpenPositions(tableState);
  const { multiRefresh: refreshOpenLimitOrders } =
    usePollOpenLimitOrders(tableState);
  const { multiRefresh: refreshMarketHistory } =
    usePollMarketOrders(tableState);
  const { refresh: refreshBalance } = usePollWalletBalances();
  let warning = undefined;

  const slippage = useSlippage();

  if ((slippage ?? 0) < 0.3) {
    warning = "Slippage is set very low, your order may not be filled.";
  } else if (!isPythConnected) {
    warning =
      "Prices are not connected. Some placed orders may fail without real-time price data.";
  } else {
    warning = undefined;
  }

  const safeAmount = form.amount === "" ? "0" : form.amount;

  const { isLoading, write, ModalPortal } = useOctTxn({
    actionType:
      form.optionType === "market"
        ? form.orderType === "long"
          ? TransactionActionType.MARKET_LONG
          : TransactionActionType.MARKET_SHORT
        : form.orderType === "long"
          ? TransactionActionType.LIMIT_LONG
          : TransactionActionType.LIMIT_SHORT,
    message:
      form.optionType === "market"
        ? form.orderType === "long"
          ? `Longing ${form.assets}`
          : `Shorting ${form.assets}`
        : form.orderType === "long"
          ? `Placing Limit Long Order ${form.assets}`
          : `Placing Limit Short Order ${form.assets}`,
    onSuccess: () => {
      refreshBalance();
      refreshPositions();
      refreshOpenLimitOrders();
      refreshMarketHistory();
    },
  });

  const { account } = useBeraJs();

  const parsedPositionSize = parseUnits(safeAmount, 18);

  const handlePlaceOrder = useCallback(async () => {
    const payload: ContractFunctionArgs<
      typeof tradingAbi,
      "payable",
      "openTrade"
    > = [
      {
        trader: account!,
        pairIndex: BigInt(pairIndex),
        index: 0n,
        initialPosToken: 0n,
        positionSizeHoney: parsedPositionSize, // position size
        openPrice:
          form.optionType === "market"
            ? parseUnits(`${price ?? 0}`, 10)
            : parseUnits(`${form.limitPrice ?? 0}`, 10), // for limit orders
        buy: form.orderType === "long" ? true : false,
        leverage: BigInt(form.leverage!),
        tp: form.tp === "" ? 0n : parseUnits(form?.tp ?? "0", 10),
        sl: form.sl === "" ? 0n : parseUnits(form?.sl ?? "0", 10),
      },
      form.optionType === "market" ? 0 : 1,
      parseUnits(`${slippage ?? 0}`, 10),
      vaa.current,
    ];

    write({
      address: tradingContractAddress,
      abi: tradingAbi,
      functionName: "openTrade",
      params: payload,
      value: pythUpdateFee,
    });
  }, [
    tradingContractAddress,
    tradingAbi,
    account,
    pythUpdateFee,
    pairIndex,
    form.optionType,
    form.orderType,
    form.leverage,
    form.tp,
    form.sl,
    form.optionType,
    slippage,
    form.limitPrice,
    write,
    prices,
  ]);

  const honey = {
    symbol: "HONEY",
    address: honeyAddress,
    decimals: 18,
    name: "Honey",
  };

  const { data: allowance } = usePollAllowance({
    spender: storageContractAddress,
    token: honey,
  });

  return (
    <>
      {ModalPortal}
      <ActionButton className="mt-4">
        {allowance?.formattedAllowance === "0" ||
        BigNumber((allowance?.allowance ?? 0n).toString()).isLessThan(
          formatToBaseUnit(safeAmount, 18),
        ) ? (
          <ApproveButton
            token={honey}
            spender={storageContractAddress}
            amount={parseUnits(safeAmount, 18)}
            disabled={
              isLoading ||
              form.amount === "0" ||
              form.amount === "" ||
              error !== undefined
            }
          />
        ) : (
          <Button
            className={cn(
              "w-full capitalize hover:opacity-80",
              form.orderType === "long"
                ? "bg-success-foreground text-white"
                : "bg-destructive-foreground text-white",
            )}
            disabled={
              isLoading ||
              error !== undefined ||
              form.amount === "" ||
              safeAmount === "0" ||
              form.amount === undefined ||
              form.tp === ""
            }
            onClick={handlePlaceOrder}
          >
            Place {form.optionType} {form.orderType} order
          </Button>
        )}
      </ActionButton>
      {warning !== undefined && (
        <Alert variant="warning" className="mt-2">
          {warning}
        </Alert>
      )}
      {error !== undefined && (
        <Alert variant="destructive" className="mt-2">
          {error}
        </Alert>
      )}
    </>
  );
}
