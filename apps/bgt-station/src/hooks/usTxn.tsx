import { useEffect, useState } from "react";
import { useAddRecentTransaction, useBeraContractWrite } from "@bera/berajs";
import toast from "react-hot-toast";

interface useTxnApi {
  message?: string;
}

export const useTxn = ({ message = "" }: useTxnApi) => {
  const [identifier, setIdentifier] = useState("");
  useEffect(() => {
    setIdentifier(message + Math.random().toString(6));
  }, [message]);

  const addRecentTransaction = useAddRecentTransaction();

  const { write, isLoading, isSuccess, isError } = useBeraContractWrite({
    onError: (error) => {
      console.log(error);
      toast.remove(`loading-${identifier}`);
      toast.remove(`submission-${identifier}`);
      toast.error("error!", {
        duration: 3000,
        id: `error-${identifier}`,
      });
    },
    onSuccess: (result) => {
      console.log(result);
      toast.remove(`submission-${identifier}`);
      toast.success("Success!", {
        duration: 3000,
        id: `success-${identifier}`,
      });
      addRecentTransaction({
        hash: result,
        description: message,
        timestamp: Date.now(),
      });
    },
    onLoading: () => {
      toast.loading("Waiting for wallet action.", {
        icon: "⏳",
        id: `loading-${identifier}`,
      });
    },
    onSubmission: () => {
      toast.remove(`loading-${identifier}`);
      toast("Transaction submitted!", {
        icon: "⬆️",
        id: `submission-${identifier}`,
      });
    },
  });

  return { write, isLoading, isSuccess, isError };
};
