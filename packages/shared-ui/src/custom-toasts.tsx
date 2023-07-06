import { type PropsWithChildren } from "react";
import Link from "next/link";
import { useBeraConfig } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";

interface IToast {
  title: string;
  message?: string;
  hash?: string;
  onClose: () => void;
}

interface IBaseToast extends PropsWithChildren {
  title: string;
  href?: string;
  onClose: () => void;
  duration?: number;
}

const BaseToast = ({ title, href, onClose, children }: IBaseToast) => {
  return (
    <div
      className="flex-col rounded-md bg-primary p-2"
      style={{ width: "225px" }} // i dont know why this is needed, but we ball 🤮
    >
      <div className="flex justify-between">
        <div className="flex text-sm font-medium">
          {title}
          {href && (
            <Link href={href} passHref>
              <Icons.external className="h-4 w-4" />
            </Link>
          )}
        </div>
        <Icons.close className="h-4	w-4" onClick={() => onClose()} />
      </div>
      <div className="text-xs">{children}</div>
    </div>
  );
};
export const SuccessToast = ({
  title = "Success",
  message = "",
  hash = undefined,
  onClose,
}: IToast) => {
  const { networkConfig } = useBeraConfig();
  return (
    <BaseToast
      title={title}
      onClose={onClose}
      href={
        hash
          ? `${networkConfig.chain.blockExplorers?.default.url}/tx/${hash}`
          : undefined
      }
    >
      {message}
    </BaseToast>
  );
};

export const ErrorToast = ({
  title = "Error",
  message = "",
  hash = undefined,
  onClose,
}: IToast) => {
  const { networkConfig } = useBeraConfig();

  // HANDLE ERROR MESSAGES
  return (
    <BaseToast
      title={title}
      onClose={onClose}
      href={
        hash
          ? `${networkConfig.chain.blockExplorers?.default.url}/tx/${hash}`
          : undefined
      }
    >
      {message}
    </BaseToast>
  );
};

export const SubmissionToast = ({
  title = "Submitting",
  message = "",
  hash = undefined,
  onClose,
}: IToast) => {
  const { networkConfig } = useBeraConfig();

  return (
    <BaseToast
      title={title}
      onClose={onClose}
      href={
        hash
          ? `${networkConfig.chain.blockExplorers?.default.url}/tx/${hash}`
          : undefined
      }
    >
      {message}
    </BaseToast>
  );
};

export const LoadingToast = ({
  title = "Loading",
  message = "",
  onClose,
}: IToast) => {
  return (
    <BaseToast title={title} onClose={onClose}>
      {message}
    </BaseToast>
  );
};
