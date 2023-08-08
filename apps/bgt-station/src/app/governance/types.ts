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
  type: z.enum(Object.values(ProposalTypeEnum)),
  title: z.string().nonempty("Required"),
  forumLink: z
    .string()
    .nonempty("Required")
    .url("Forum link must be a valid URL."),
  description: z.string().nonempty("Required").min(10, {
    message: "Description must be at least 10 characters.",
  }),
  expedite: z.boolean(),
  initialDeposit: z
    .string()
    .nonempty("Required")
    .refine((val) => Number(val) > 0, {
      message: "Initial deposit must be greater than 0.",
    }),
});

export const CommunityFormSchema = BaseFormSchema.extend({
  type: z.literal(ProposalTypeEnum.COMMUNITY_POOL_SPEND),
  recipient: z.string().refine((value) => isAddress(value), {
    message: "Invalid recipient address.",
  }),
  amountA: z
    .string()
    .nonempty("Required")
    .refine((val) => Number(val) > 0, {
      message: "Amount must be greater than 0.",
    }),
  amountB: z
    .string()
    .nonempty("Required")
    .refine((val) => Number(val) > 0, {
      message: "Amount must be greater than 0.",
    }),
});

export const ParameterFormSchema = BaseFormSchema.extend({
  type: z.literal(ProposalTypeEnum.PARAMETER_CHANGE),
  // parameters2Change: z.array(parameterChangeLineSchema),
});

export const ExecuteFormSchema = BaseFormSchema.extend({
  type: z.literal(ProposalTypeEnum.EXECUTE_CONTRACT),
  runAs: z
    .string()
    .nonempty("Required")
    .refine((value) => isAddress(value), {
      message: "Invalid address.",
    }),
  contractAddress: z
    .string()
    .nonempty("Required")
    .refine((value) => isAddress(value), {
      message: "Invalid contract address.",
    }),
  message: z.string().nonempty("Required"),
  amount: z
    .string()
    .nonempty("Required")
    .refine((val) => Number(val) > 0, {
      message: "Amount must be greater than 0.",
    }),
});

export const ProposalFormSchema = z.union([
  CommunityFormSchema,
  ParameterFormSchema,
  ExecuteFormSchema,
]);
