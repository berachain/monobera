import useSWR from "swr";
import { usePublicClient } from "wagmi";

import { getCancellerRole } from "~/actions/governance/getCancellerRole";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";

export const useCancellerRole = () => {
  const { config } = useBeraJs();
  // TODO: get the timelock address from the config. We're assuming it's the same for all topics
  const timelockAddress = config?.contracts?.governance?.general?.timelock;
  const client = usePublicClient();

  const QUERY_KEY =
    client && timelockAddress ? ["useCancellerRole", timelockAddress] : null;

  return useSWR(
    QUERY_KEY,
    () =>
      getCancellerRole({ client: client!, timelockAddress: timelockAddress! }),
    {
      refreshInterval: POLLING.SLOW,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );
};
