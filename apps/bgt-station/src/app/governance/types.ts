import { isAddress } from "viem";
import * as z from "zod";

export enum StatusEnum {
  ACTIVE = "active",
  IN_QUEUE = "in-queue",
  PASSED = "passed",
  REJECTED = "rejected",
}

export enum OrderByEnum {
  MOST_RECENT = "most-recent",
  OLDEST = "oldest",
  NEWEST = "newest",
  HIGHEST_PARTICIPATION = "highest-participation",
  LOWEST_PARTICIPATION = "lowest-participation",
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

export type ProposalVotes = {
  yes: number;
  no: number;
  veto: number;
  abstain: number;
};

const parameterChangeLineSchema = z.object({
  subspace: z.string(),
  key: z.string(),
  value: z.string(),
});

export const BaseFormSchema = z.object({
  type: z.enum(Object.values(ProposalTypeEnum) as any),
  title: z.string().nonempty("Required"),
  forumLink: z.string().nonempty("Required"),
  description: z.string().nonempty("Required"),
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
  recipient: z.string().nonempty("Required"),
  // amountA: z
  //   .string()
  //   .nonempty("Required")
  //   .refine((val) => Number(val) > 0, {
  //     message: "Amount must be greater than 0.",
  //   }),
  amount: z
    .string()
    .nonempty("Required")
    .refine((val) => Number(val) > 0, {
      message: "Amount must be greater than 0.",
    }),
});

export const ParameterFormSchema = BaseFormSchema.extend({
  type: z.literal(ProposalTypeEnum.PARAMETER_CHANGE),
  parameters2Change: z
    .array(parameterChangeLineSchema)
    .nonempty()
    .refine(
      (data) =>
        data.every(
          (item: ParameterChangeLine) =>
            item.subspace && item.key && item.value,
        ),
      {
        message: "Imcomplete fields",
      },
    ),
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

export const VoteColorMap = {
  yes: "#059669",
  no: "#DC2629",
  veto: "#0284C7",
  abstain: "#78716c",
  yes_secondary: "#ECFDF5",
  no_secondary: "#FEF2F2",
  veto_secondary: "#F0F9FF",
  abstain_secondary: "#E7E5E4",
  default: "#57534e",
};

export const voteTypes: VOTE_TYPE[] = ["yes", "no", "veto", "abstain"];

export const voterTypes: VOTER_TYPE[] = ["validators", "users"];

export type VOTE_TYPE = "yes" | "no" | "veto" | "abstain";

export type VOTER_TYPE = "validators" | "users";

export type ALL = "all";
