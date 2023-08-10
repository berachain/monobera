import Link from "next/link";
import { useBeraConfig } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";

import { Spinner } from "./spinner";

interface IToast {
  title: string;
  message?: string;
  hash?: string;
  onClose: () => void;
}

interface IBaseToast {
  title: string;
  href?: string;
  onClose: () => void;
  duration?: number;
  className?: string;
  startAdornment?: React.ReactNode;
}

const BaseToast = ({
  title,
  href,
  onClose,
  className = "",
  startAdornment,
}: IBaseToast) => {
  return (
    <div
      className={cn(
        "flex h-14 flex-row items-center justify-between rounded-md p-4 text-white  shadow",
        className,
      )}
      style={{ width: "350px", background: "#292524" }} // i dont know why this is needed, but we ball 🤮
    >
      <div className="flex flex-row items-center gap-2 text-sm font-semibold">
        {startAdornment && startAdornment}
        {title}
      </div>
      {href ? (
        <Link href={href} passHref className="flex flex-row gap-2">
          <p className="text-sm font-normal">View Txn</p>
          <Icons.external className="h-4 w-4" />
        </Link>
      ) : (
        <Icons.close
          className="h-4	w-4  bg-muted-foreground"
          onClick={() => onClose()}
        />
      )}
    </div>
  );
};
export const SuccessToast = ({
  title = "Success",
  hash = undefined,
  onClose,
}: IToast) => {
  const { networkConfig } = useBeraConfig();

  return (
    <BaseToast
      title={title}
      onClose={onClose}
      startAdornment={<Icons.checkCircle className="h-6 w-6 text-positive" />}
      href={
        hash
          ? `${networkConfig.chain.blockExplorers?.default.url}/tx/${hash}`
          : undefined
      }
    />
  );
};

export const ErrorToast = ({ title = "Error", onClose }: IToast) => {
  // HANDLE ERROR MESSAGES
  if (title === "User rejected txn") {
    return (
      <BaseToast
        title={title}
        onClose={onClose}
        startAdornment={<Icons.userX className="h-6 w-6 text-destructive" />}
      />
    );
  }
  return (
    // TODO: txn handle txn hash
    <BaseToast
      title={title}
      onClose={onClose}
      startAdornment={<Icons.XOctagon className="h-6 w-6 text-destructive" />}
      // href={
      //   hash
      //     ? `${networkConfig.chain.blockExplorers?.default.url}/tx/${hash}`
      //     : undefined
      // }
    />
  );
};

export const SubmissionToast = ({
  title = "Submitting",
  hash = undefined,
  onClose,
}: IToast) => {
  const { networkConfig } = useBeraConfig();

  return (
    <BaseToast
      title={title}
      onClose={onClose}
      startAdornment={<Spinner size={18} color="#f8b613" />}
      href={
        hash
          ? `${networkConfig.chain.blockExplorers?.default.url}/tx/${hash}`
          : undefined
      }
    />
  );
};

export const LoadingToast = ({ title = "Loading", onClose }: IToast) => {
  return (
    <BaseToast
      title={title}
      onClose={onClose}
      startAdornment={<Spinner size={18} color="#f8b613" />}
    />
  );
};
