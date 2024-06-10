import {
  TransactionActionType,
  type TransactionActionType as ITransactionActionType,
} from "@bera/berajs";
import { Icons } from "@bera/ui/icons";

export const TransactionIcon = ({
  transaction,
}: {
  transaction: ITransactionActionType | undefined;
}) => {
  const getIcon = () => {
    switch (transaction) {
      case TransactionActionType.DELEGATE:
        return <Icons.delegate />;
      case TransactionActionType.REDELEGATE:
        return <Icons.redelegate />;
      case TransactionActionType.UNBONDING:
        return <Icons.unbond />;
      case TransactionActionType.CANCEL_UNBONDING:
        return <Icons.cancelUnbond />;
      case TransactionActionType.REDEEM_BGT:
        return <Icons.redeemBGT />;
      case TransactionActionType.VOTE:
        return <Icons.vote />;
      case TransactionActionType.CLAIMING_BRIBES:
        return <Icons.claim />;
      case TransactionActionType.REDEEM_BERA:
        return <Icons.redeemBera />;

      case TransactionActionType.ADD_LIQUIDITY:
        return <Icons.addlp />;
      case TransactionActionType.WITHDRAW_LIQUIDITY:
        return <Icons.removelp />;
      case TransactionActionType.SWAP:
        return <Icons.swap />;
      case TransactionActionType.CLAIMING_REWARDS:
        return <Icons.claim />;
      case TransactionActionType.REPAY:
        return <Icons.repay />;
      case TransactionActionType.SUPPLY:
        return <Icons.supply />;
      case TransactionActionType.WITHDRAW:
        return <Icons.withdraw />;
      case TransactionActionType.BORROW:
        return <Icons.borrow />;
      case TransactionActionType.REFER:
        return <Icons.ticket />;

      case TransactionActionType.REDEEM_HONEY:
        return <Icons.redeemHoney />;
      case TransactionActionType.MINT_HONEY:
        return <Icons.mintHoney />;

      case TransactionActionType.APPROVAL:
        return <Icons.approve />;
      // case TransactionActionType.REJECTED:
      //   return <Icons.rejected />;
      // case TransactionActionType.SUCCESS:
      //   return <Icons.success />;
      // case TransactionActionType.FAILURE:
      //   return <Icons.failure />;
      // case TransactionActionType.SEND:
      // return <Icons.send />;
      // case TransactionActionType.RECEIVE:
      //   return <Icons.receive />;
      case TransactionActionType.MARKET_LONG:
        return <Icons.market_long />;

      case TransactionActionType.MARKET_SHORT:
        return <Icons.market_short />;
      case TransactionActionType.LIMIT_LONG:
        return <Icons.limit_long />;
      case TransactionActionType.LIMIT_SHORT:
        return <Icons.limit_short />;
      case TransactionActionType.DEPOSIT_HONEY:
        return <Icons.deposit_honey />;
      case TransactionActionType.START_WITHDRAW_REQUEST:
        return <Icons.withdraw_request />;
      case TransactionActionType.CANCEL_WITHDRAW_REQUEST:
        return <Icons.withdraw_request_cancel />;
      case TransactionActionType.WITHDRAW_HONEY:
        return <Icons.withdraw_honey />;
      case TransactionActionType.EDIT_PERPS_ORDER:
        return <Icons.edit_order />;
      case TransactionActionType.CANCEL_ORDER:
        return <Icons.close_order />;
      case TransactionActionType.CANCEL_ALL_ORDERS:
        return <Icons.close_all_orders />;
      case TransactionActionType.DELEGATE_OCT:
        return <Icons.delegate_oct />;
      case TransactionActionType.REVOKE_OCT:
        return <Icons.revoke_oct />;
      default:
        return <Icons.success />;
    }
  };

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary p-2 text-secondary-foreground">
      {getIcon()}
    </div>
  );
};
