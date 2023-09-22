"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GOVERNANCE_PRECOMPILE_ABI,
  useBeraJs,
  usePollBgtBalance,
} from "@bera/berajs";
import {
  cloudinaryUrl,
  governanceAddress,
  governanceMinDeposit,
} from "@bera/config";
import { ActionButton, Tooltip, useTxn } from "@bera/shared-ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@bera/ui/form";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Switch } from "@bera/ui/switch";
import { TextArea } from "@bera/ui/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isAddress } from "viem";
import * as z from "zod";

import { ProposalTypeEnum } from "../types";
import NewGaugeForm from "./gauge-proposal-form";
import NewCollateralForm from "./new-collateral-form";
import NewMarketCollateralForm from "./new-market-form";
import { useCreateProposal } from "./useCreateProposal";

export default function NewProposal({ type }: { type: ProposalTypeEnum }) {
  const router = useRouter();
  const { isReady } = useBeraJs();
  const triggerRef = useRef<HTMLDivElement>(null);
  const [_contentWidth, setContentWidth] = useState("w-[450px]");
  const { useBgtBalance, isLoading: isBalanceLoading } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  const minDeposit = governanceMinDeposit;
  useEffect(() => {
    if (triggerRef.current) {
      const width = triggerRef.current.offsetWidth;
      setContentWidth(`w-[${width}px]`);
    }
  }, [triggerRef.current, triggerRef.current?.offsetWidth]);

  const { createPayload } = useCreateProposal();

  const { write, ModalPortal } = useTxn({
    message: "Submit Proposal",
    disableToast: true,
    onSuccess: () => {
      router.push(`/governance`);
    },
  });

  function onSubmit(values: z.infer<typeof ProposalFormSchema>) {
    const payload = createPayload(values);
    write({
      address: governanceAddress,
      abi: GOVERNANCE_PRECOMPILE_ABI as any[],
      functionName: "submitProposal",
      params: payload as any,
    });
  }

  const BaseFormSchema = z.object({
    title: z.string().nonempty("Required"),
    description: z.string().nonempty("Required"),
    expedite: z.boolean(),
    initialDeposit: z
      .string()
      .nonempty("Required")
      .refine((val) => Number(val) > 0, {
        message: "Initial deposit must be greater than 0.",
      })
      .refine((val) => Number(val) >= minDeposit, {
        message: `Inital deposit must be at least ${minDeposit} BGT.`,
      })
      .refine((val) => Number(val) < Number(userBalance), {
        message: "Insufficient BGT balance.",
      }),
  });

  const NewGaugeProposal = BaseFormSchema.extend({
    gaugeAddress: z
      .string()
      .nonempty("Required")
      .refine((value) => isAddress(value), {
        message: "Invalid address.",
      }),
  });

  const NewCollateralProposal = BaseFormSchema.extend({
    collateralAddress: z
      .string()
      .nonempty("Required")
      .refine((value) => isAddress(value), {
        message: "Invalid address.",
      }),
  });

  const NewMarketCollateralProposal = BaseFormSchema.extend({
    marketCollateralAddress: z
      .string()
      .nonempty("Required")
      .refine((value) => isAddress(value), {
        message: "Invalid address.",
      }),
  });

  const ProposalTypeInformationEnum = {
    [ProposalTypeEnum.GAUGE_PROPOSAL]:
      "New gauge proposal will propose a new gauge be whitelisted to receive BGT rewards.",
    [ProposalTypeEnum.COLLATERAL_PROPOSAL]:
      "New collateral proposal will propose a new stablecoin collateral be added to Honey's PSM.",
    [ProposalTypeEnum.MARKET_COLLATERAL_PROPOSAL]: `New market proposal will propose a new market be added to ${process.env.NEXT_PUBLIC_LEND_NAME} for the proposed collateral.`,
  };

  const ProposalFormSchema = z.union([
    BaseFormSchema,
    NewGaugeProposal,
    NewCollateralProposal,
    NewMarketCollateralProposal,
  ]) as any;

  const form = useForm<z.infer<typeof ProposalFormSchema>>({
    resolver: zodResolver(ProposalFormSchema),
    defaultValues: {
      expedite: false,
    },
  });
  return (
    <div className="mx-auto  w-full max-w-[564px] pb-16">
      {ModalPortal}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="proposal">
          <Image
            className="max-[600px]:mx-auto"
            src={`${cloudinaryUrl}/bears/pgnhgjsm1si8gb2bdm1m`}
            alt="proposal-bear"
            width={350}
            height={174}
          />
          <Card className=" flex flex-col justify-start gap-8 p-6">
            <div className="relative text-lg font-semibold leading-7 text-foreground">
              New proposal
              <Link href="/governance">
                <Icons.close className="absolute right-0 top-0 h-5 w-5 hover:cursor-pointer" />
              </Link>
            </div>
            <div className="inline-flex flex-col justify-start gap-2">
              <div className="text-sm font-semibold leading-tight">Type</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className="inline-flex h-[42px] w-full flex-col items-start justify-start hover:cursor-pointer"
                    ref={triggerRef}
                  >
                    <div className=" inline-flex w-full items-center justify-start gap-2.5 rounded-xl border border-border px-3 py-2">
                      <div className="relative shrink grow basis-0 caption-top text-sm font-normal capitalize leading-normal text-muted-foreground">
                        {type.replaceAll("-", " ")}
                        <Icons.chevronDown className="absolute right-0 top-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-full">
                  {Object.values(ProposalTypeEnum).map(
                    (typeT: ProposalTypeEnum) => (
                      <DropdownMenuCheckboxItem
                        key={`proposal-option-${typeT}`}
                        onClick={() => {
                          router.push(`/governance/create?type=${typeT}`);
                          // form.setValue("type", type);
                        }}
                        checked={type === typeT}
                        className="w-full capitalize hover:text-foreground"
                      >
                        {typeT.replaceAll("-", " ")}
                      </DropdownMenuCheckboxItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {type !== ProposalTypeEnum.TEXT_PROPOSAL && (
                <Alert variant="warning">
                  {ProposalTypeInformationEnum[type]}
                </Alert>
              )}
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="inline-flex flex-col justify-start">
                  <div className="text-sm font-semibold leading-tight">
                    Title
                  </div>
                  <span>
                    <FormControl>
                      <Input
                        type="text"
                        id="proposal-title"
                        placeholder="Ooga booga"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </span>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="inline-flex flex-col justify-start">
                  <div className="text-sm font-semibold leading-tight">
                    Description
                  </div>
                  <div>
                    <FormControl>
                      <TextArea
                        id="proposal-message"
                        placeholder="Tell us about your proposal"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expedite"
              render={({ field }) => (
                <FormItem className="inline-flex flex-col justify-start">
                  <div className="text-sm font-semibold leading-tight">
                    Expedite{" "}
                    <Tooltip text="Speed up your proposal voting time" />
                  </div>
                  <FormControl>
                    <Switch
                      id="proposal-expedite"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initialDeposit"
              render={({ field }) => (
                <FormItem className="inline-flex flex-col justify-start">
                  <div className="text-sm font-semibold leading-tight">
                    Initial deposit{" "}
                    <Tooltip text="Required collateral to propose changes or amendments to the network" />
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="number"
                        id="initial-deposit"
                        disabled={isBalanceLoading}
                        placeholder="0.0"
                        endAdornment="BGT"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
                    {isReady && (
                      <div className="absolute right-1 mt-2 flex h-3 w-fit items-center gap-1 text-[10px] text-muted-foreground">
                        <Icons.wallet className="relative inline-block h-3 w-3 " />
                        {userBalance}
                        <span
                          className="underline hover:cursor-pointer"
                          onClick={() => {
                            form.setValue("initialDeposit", userBalance);
                          }}
                        >
                          Fill Deposit
                        </span>
                      </div>
                    )}
                  </div>
                </FormItem>
              )}
            />
            {type === ProposalTypeEnum.GAUGE_PROPOSAL && (
              <NewGaugeForm form={form} />
            )}
            {type === ProposalTypeEnum.COLLATERAL_PROPOSAL && (
              <NewCollateralForm form={form} />
            )}
            {type === ProposalTypeEnum.MARKET_COLLATERAL_PROPOSAL && (
              <NewMarketCollateralForm form={form} />
            )}
            <ActionButton>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </ActionButton>
          </Card>
        </form>
      </Form>
    </div>
  );
}
