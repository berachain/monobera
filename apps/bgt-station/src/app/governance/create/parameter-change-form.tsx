import { CustomParameterGroup, Tooltip } from "@bera/shared-ui";
import { FormField, FormItem, FormMessage } from "@bera/ui/form";
import { type UseFormReturn } from "react-hook-form";

export default function ParameterForm({ form }: { form: UseFormReturn }) {
  return (
    <>
      <FormField
        control={form.control}
        name="parameters2Change"
        render={({}) => (
          <FormItem className="inline-flex flex-col justify-start">
            <div className="text-sm font-semibold leading-tight">
              Parameters to change <Tooltip text="test" />
            </div>
            <div>
              <CustomParameterGroup
                onSubmit={(parameterForm) =>
                  form.setValue("parameters2Change", parameterForm)
                }
              />
              <FormMessage className="mt-[-24px]" />
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
