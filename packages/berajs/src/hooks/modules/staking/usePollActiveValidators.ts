// import useSWR from "swr";
// import useSWRImmutable from "swr/immutable";
// import { usePublicClient } from "wagmi";

// import { STAKING_PRECOMPILE_ADDRESS, STAKING_PRECOMPILE_ABI } from "~/config";

// const REFRESH_INTERVAL = 2000;

// export const usePollRawValidators = () => {
//   const publicClient = usePublicClient();
//   useSWR(
//     "rawValidators",
//     async () => {
//       const result = await publicClient.readContract({
//         address: STAKING_PRECOMPILE_ADDRESS,
//         abi: STAKING_PRECOMPILE_ABI,
//         functionName: "getActiveValidators",
//         args: [],
//       });

//       return result;
//     },
//     {
//       refreshInterval: REFRESH_INTERVAL,
//     },
//   );
// };

// export const useActiveValidators = () => {
//   const { data: rawValidators = undefined } = useSWRImmutable("rawValidators");
//   return rawValidators;
// };

// TODO replace with raw namespace
export {};
