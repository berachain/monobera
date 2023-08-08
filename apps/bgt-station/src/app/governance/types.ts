import { isAddress } from "viem";
import * as z from "zod";

export enum StatusEnum {
  Voting = "voting",
  Pending = "pending",
  Passed = "passed",
  Rejected = "rejected",
}

export enum ProposalTypeEnum {
  COMMUNITY_POOL_SPEND = "community-pool-spend",
  PARAMETER_CHANGE = "parameter-change",
  EXECUTE_CONTRACT = "execute-contract",
}

export type ParameterChangeLine = {
  subspace: string;
  key: string;
  value: string;
};

const parameterChangeLineSchema = z.object({
  subspace: z.string(),
  key: z.string(),
  value: z.string(),
});

export const BaseFormSchema = z.object({
  // type: z.enum(Object.values(ProposalTypeEnum)),
  title: z.string().nonempty("Required"),
  // forumLink: z.string().url("Forum link must be a valid URL."),
  // description: z.string(),
  // expedite: z.boolean(),
  // initialDeposit: z.number().gt(0, "Initial deposit must be greater than 0."),
});

export const CommunityFormSchema = z.object({
  ...BaseFormSchema,
  // type: z.literal(ProposalTypeEnum.COMMUNITY_POOL_SPEND),
  // recipient: z.string().refine((value) => isAddress(value), {
  //   message: "Invalid recipient address.",
  // }),
  // amountA: z.number().gt(0, "Amount must be greater than 0."),
  // amountB: z.number().gt(0, "Amount must be greater than 0."),
});

export const ParameterFormSchema = z.object({
  ...BaseFormSchema,
  // type: z.literal(ProposalTypeEnum.PARAMETER_CHANGE),
  // parameters2Change: z.array(parameterChangeLineSchema),
});

export const ExecuteFormSchema = z.object({
  ...BaseFormSchema,
  // type: z.literal(ProposalTypeEnum.EXECUTE_CONTRACT),
  // runAs: z.string().refine((value) => isAddress(value), {
  //   message: "Invalid address.",
  // }),
  // contractAddress: z.string().refine((value) => isAddress(value), {
  //   message: "Invalid contract address.",
  // }),
  // message: z.string(),
  // amount: z.number().gt(0, "Amount must be greater than 0."),
});

export const ProposalFormSchema = z.union([
  CommunityFormSchema,
  ParameterFormSchema,
  ExecuteFormSchema,
]);
