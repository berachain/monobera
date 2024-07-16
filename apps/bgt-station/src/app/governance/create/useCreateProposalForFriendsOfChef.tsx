import { useState } from "react";
import { Address } from "viem";

export const useCreateProposalForFriendsOfChef = () => {
  const [gaugeAddress, setGaugeAddress] = useState<Address | undefined>();
  const gaugeAddressError = {
    error: false,
    message: "Title is required",
  };

  return {
    gaugeAddress,
    setGaugeAddress,
    gaugeAddressError,
    isFriendsOfChefLoading: false,
  };
};
