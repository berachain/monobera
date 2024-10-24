import Image from "next/image";
import Link from "next/link";
import { blockExplorerName, blockExplorerUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import Balancer from "react-wrap-balancer";

import { Spinner } from "./spinner";
import { TokenIconList } from "./token-icon-list";
import { getRewardsVaultUrl } from "./utils/getHubUrls";

interface IModal {
  title: string;
  message?: string;
  hash?: string;
  onClose: () => void;
  open: boolean;
}

interface IBaseModal {
  title: string;
  href?: string;
  open?: boolean;
  onClose: () => void;
  className?: string;
  icon?: React.ReactNode;
  message: string;
}

const BaseModal = ({
  title,
  href,
  onClose,
  icon = undefined,
  message = "",
  open = false,
}: IBaseModal) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center justify-center gap-3 py-12 sm:max-w-[420px]">
        <div className="flex h-fit w-full flex-row justify-center">{icon}</div>
        <p className="text-lg font-semibold">{title}</p>
        <Balancer className="text-center text-xs font-medium">
          {message}
        </Balancer>
        {href && (
          <Button
            onClick={() => window.open(href, "_blank")}
            className="w-full self-center"
          >
            View Txn on {blockExplorerName}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
export const SuccessModal = ({
  title = "Success",
  hash = undefined,
  onClose,
  message = "",
  open,
}: IModal) => {
  return (
    <BaseModal
      title={title}
      onClose={onClose}
      icon={
        <Image
          width={64}
          height={64}
          src={
            "https://res.cloudinary.com/duv0g402y/image/upload/f_auto,q_auto/v1/shared/wanb54qn8spfnfw9r3hy"
          }
          alt={"user-x"}
        />
      }
      open={open}
      href={hash ? `${blockExplorerUrl}/tx/${hash}` : undefined}
      message={message}
    />
  );
};

export const ErrorModal = ({
  title = "Error",
  message = "",
  onClose,
  open,
}: IModal) => {
  if (message === "User rejected txn") {
    return (
      <BaseModal
        title={title}
        onClose={onClose}
        open={open}
        icon={
          <Image
            width={64}
            height={64}
            src={
              "https://res.cloudinary.com/duv0g402y/image/upload/f_auto,q_auto/v1/shared/o19qbcofjpagywj9i7xc"
            }
            alt={"user-x"}
          />
        }
        message={message}
        href={undefined}
      />
    );
  }
  return (
    <BaseModal
      title={title}
      onClose={onClose}
      open={open}
      icon={
        <Image
          width={64}
          height={64}
          src={
            "https://res.cloudinary.com/duv0g402y/image/upload/f_auto,q_auto/v1/shared/e6jziojwz3j3hewudeam"
          }
          alt={"user-x"}
        />
      }
      message={message}
      href={undefined}
    />
  );
};

export const SubmissionModal = ({
  title = "Submitting",
  hash = undefined,
  message = "",
  onClose,
  open,
}: IModal) => {
  return (
    <BaseModal
      title={title}
      onClose={onClose}
      open={open}
      icon={<Spinner size={64} color="#f8b613" />}
      message={message}
      href={hash ? `${blockExplorerUrl}/tx/${hash}` : undefined}
    />
  );
};

export const LoadingModal = ({
  title = "Loading",
  onClose,
  open,
  message = "",
}: IModal) => {
  return (
    <BaseModal
      title={title}
      onClose={onClose}
      open={open}
      message={message}
      icon={<Spinner size={64} color="#f8b613" />}
    />
  );
};

export const AddLiquiditySuccess = ({ onClose, open = false, pool }: any) => {
  if (!pool) return undefined;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex w-80 flex-col items-center justify-center gap-3 py-12">
        <TokenIconList tokenList={pool.tokens} size="2xl" />
        <span className="text-center text-xl font-medium">
          Deposit your {pool.name} Receipt Tokens
        </span>
        <span className="my-2 text-center text-xs text-muted-foreground">
          Deposit your receipt tokens in the gauge vault to start earning
          <span className="inline-flex items-center">
            <Icons.bgt className="mx-1 h-3 w-3" />
          </span>
          BGT Rewards
        </span>
        <Link
          href={getRewardsVaultUrl(pool.vaultAddress)}
          onClick={(e) => e.stopPropagation()}
          className="w-full"
        >
          <Button className="w-full">Deposit</Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
};
