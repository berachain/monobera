import Image from "next/image";
import { useBeraConfig } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import Balancer from "react-wrap-balancer";

import { Spinner } from "./spinner";

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
        <Balancer className="text-xs font-medium">{message}</Balancer>
        {href && (
          <Button
            onClick={() => window.open(href, "_blank")}
            className="w-full self-center"
          >
            View Txn on{" "}
            {process.env.NEXT_PUBLIC_BLOCK_EXPLORER_NAME ?? "Block Explorer"}
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
  const { networkConfig } = useBeraConfig();

  return (
    <BaseModal
      title={title}
      onClose={onClose}
      icon={
        <Image
          width={64}
          height={64}
          src={`https://res.cloudinary.com/duv0g402y/image/upload/f_auto,q_auto/v1/shared/wanb54qn8spfnfw9r3hy`}
          alt={"user-x"}
        />
      }
      open={open}
      href={
        hash
          ? `${networkConfig.chain.blockExplorers?.default.url}/tx/${hash}`
          : undefined
      }
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
  // const { networkConfig } = useBeraConfig();

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
            src={`https://res.cloudinary.com/duv0g402y/image/upload/f_auto,q_auto/v1/shared/o19qbcofjpagywj9i7xc`}
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
          src={`https://res.cloudinary.com/duv0g402y/image/upload/f_auto,q_auto/v1/shared/e6jziojwz3j3hewudeam`}
          alt={"user-x"}
        />
      }
      message={"Something went wrong. Please try again."}
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
  const { networkConfig } = useBeraConfig();

  return (
    <BaseModal
      title={title}
      onClose={onClose}
      open={open}
      icon={<Spinner size={64} color="#f8b613" />}
      message={message}
      href={
        hash
          ? `${networkConfig.chain.blockExplorers?.default.url}/tx/${hash}`
          : undefined
      }
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
