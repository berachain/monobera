"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GOVERNANCE_PRECOMPILE_ABI, usePollBgtBalance } from "@bera/berajs";
import { Tooltip, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
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
import type * as z from "zod";

import { governanceAddress } from "~/config";
import { ProposalFormSchema } from "../types";
import { useCreateProposal } from "./useCreateProposal";

export default function NewProposal() {
  const router = useRouter();
  const triggerRef = useRef<HTMLDivElement>(null);
  const [_contentWidth, setContentWidth] = useState("w-[450px]");
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();

  useEffect(() => {
    if (triggerRef.current) {
      const width = triggerRef.current.offsetWidth;
      setContentWidth(`w-[${width}px]`);
    }
  }, [triggerRef.current, triggerRef.current?.offsetWidth]);

  const form = useForm<z.infer<typeof ProposalFormSchema>>({
    resolver: zodResolver(ProposalFormSchema),
    defaultValues: {
      expedite: false,
    },
  });

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

  return (
    <div className="mx-auto  w-full max-w-[564px] pb-16">
      {ModalPortal}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Image
            className="max-[600px]:mx-auto"
            src="/bears/proposal-bear.png"
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
            <Button type="submit">Submit</Button>
          </Card>
        </form>
      </Form>
    </div>
  );
}
