"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GOVERNANCE_PRECOMPILE_ABI, usePollBgtBalance } from "@bera/berajs";
import { Tooltip, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

import {
  cloudinaryUrl,
  governanceAddress,
  governanceMinDeposit,
} from "~/config";
import { ProposalTypeEnum } from "../types";
import NewGaugeForm from "./gauge-proposal-form";
import NewCollateralForm from "./new-collateral-form";
import NewMarketCollateralForm from "./new-market-form";
import { useCreateProposal } from "./useCreateProposal";

export default function NewProposal({ type }: { type: ProposalTypeEnum }) {
  const router = useRouter();
  const triggerRef = useRef<HTMLDivElement>(null);
  const [_contentWidth, setContentWidth] = useState("w-[450px]");
  const { useBgtBalance } = usePollBgtBalance();
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Image
            className="max-[600px]:mx-auto"
            src={`${cloudinaryUrl}/bears/pgnhgjsm1si8gb2bdm1m`}
            alt="proposal-bear"
            width={269.75}
            height={174}
          />
          <Card className=" flex flex-col justify-start gap-8 p-6">
            <div className="relative text-lg font-semibold leading-7 text-foreground">
              New proposal
              <Icons.close
                className="absolute right-0 top-0 h-5 w-5 hover:cursor-pointer"
                onClick={() => router.push(`/governance`)}
              />
            </div>
            <div className="inline-flex flex-col justify-start gap-2">
              <div className="text-sm font-semibold leading-tight">
                Type <Tooltip text="test" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className="inline-flex h-[42px] w-[500px] flex-col items-start justify-start hover:cursor-pointer"
                    ref={triggerRef}
                  >
                    <div className=" inline-flex w-full items-center justify-start gap-2.5 rounded-xl border border-gray-200 px-3 py-2">
                      <div className="relative shrink grow basis-0 caption-top text-sm font-normal capitalize leading-normal text-stone-700">
                        {type.replaceAll("-", " ")}
                        <Icons.chevronDown className="absolute right-0 top-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-full">
                  {Object.values(ProposalTypeEnum).map(
                    (type: ProposalTypeEnum) => (
                      <DropdownMenuItem
                        key={`proposal-option-${type}`}
                        onClick={() => {
                          router.push(`/governance/create?type=${type}`);
                          // form.setValue("type", type);
                        }}
                        className="w-full capitalize"
                      >
                        {type.replaceAll("-", " ")}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
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
                    Expedite <Tooltip text="test" />
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
                    Initial deposit <Tooltip text="test" />
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="number"
                        id="initial-deposit"
                        placeholder="0.0"
                        endAdornment="BGT"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
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
                  </div>
                </FormItem>
              )}
            />
            {type === ProposalTypeEnum.NEW_GAUGE_PROPOSAL && (
              <NewGaugeForm form={form} />
            )}
            {type === ProposalTypeEnum.NEW_COLLATERAL_PROPOSAL && (
              <NewCollateralForm form={form} />
            )}
            {type === ProposalTypeEnum.NEW_MARKET_COLLATERAL_PROPOSAL && (
              <NewMarketCollateralForm form={form} />
            )}
            <Button type="submit">Submit</Button>
          </Card>
        </form>
      </Form>
    </div>
  );
}
