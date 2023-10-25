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
      case TransactionActionType.CLAIMING_BRIBES:
        return <Icons.claim />;

      case TransactionActionType.REPAY:
        return <Icons.repay />;
      case TransactionActionType.SUPPLY:
        return <Icons.supply />;
      case TransactionActionType.WITHDRAW:
        return <Icons.withdraw />;
      case TransactionActionType.BORROW:
        return <Icons.borrow />;

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
      case TransactionActionType.CLAIMING_REWARDS:
        return <Icons.claim />;

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
