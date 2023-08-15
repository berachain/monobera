import { usePollBgtBalance } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { FormControl, FormField, FormItem, FormMessage } from "@bera/ui/form";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { type UseFormReturn } from "react-hook-form";

export default function CommunityForm({ form }: { form: UseFormReturn<any> }) {
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  return (
    <>
      <FormField
        control={form.control}
        name="recipient"
        render={({ field }) => (
          <FormItem className="inline-flex flex-col justify-start">
            <div className="text-sm font-semibold leading-tight">
              Recipient <Tooltip text="test" />
            </div>
            <div>
              <FormControl>
                <Input
                  type="text"
                  id="forum-discussion-link"
                  placeholder="0x0000...0000"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-2" />
            </div>
          </FormItem>
        )}
      />

      {/* <FormField
        control={form.control}
        name="amountA"
        render={(field: any) => (
          <FormItem className="inline-flex flex-col justify-start">
            <div className="text-sm font-semibold leading-tight">Amount</div>
            <div>
              <Input
                type="number"
                id="forum-discussion-link"
                placeholder="0.0"
                {...field}
              />
              <FormMessage className="mt-2" />
            </div>
          </FormItem>
        )}
      /> */}

      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="inline-flex flex-col justify-start">
            <div className="text-sm font-semibold leading-tight">
              Amount <Tooltip text="test" />
            </div>
            <div className="relative">
              <Input
                type="number"
                id="forum-discussion-link"
                placeholder="0.0"
                endAdornment="BGT"
                {...field}
              />
              <FormMessage className="mt-2" />
              <div className="absolute right-1 mt-2 flex h-3 w-fit items-center gap-1 text-[10px] text-muted-foreground">
                <Icons.wallet className="relative inline-block h-3 w-3 " />
                {userBalance}
                <span
                  className="underline hover:cursor-pointer"
                  onClick={() => {
                    form.setValue("amountB", userBalance);
                  }}
                >
                  MAX
                </span>
              </div>
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
