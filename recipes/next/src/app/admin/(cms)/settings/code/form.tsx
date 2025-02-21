import { clsx } from "clsx";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "@/components/helpers/Loading";
import { useProjectSetting } from "@/components/modules/settings/core/System";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FormValues } from "./types";

const defaultValues: FormValues = {
  customCss: "",
  codeInjectionHeader: "",
  codeInjectionFooter: "",
};

export const CodeForm = () => {
  const { updateSettings, data, isLoading } = useProjectSetting();
  const form = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
  });

  const { customCss, codeInjectionFooter, codeInjectionHeader } = data?.code ?? {};

  const formClassNames = clsx("space-y-8", "relative", {
    "pointer-events-none": isLoading,
  });

  const handleSubmit = useCallback(
    (values: FormValues) => {
      const { customCss, codeInjectionHeader, codeInjectionFooter } = values;

      updateSettings({
        code: {
          customCss: customCss,
          codeInjectionHeader,
          codeInjectionFooter,
        },
      });
    },
    [updateSettings],
  );

  useEffect(() => {
    form.reset({ customCss, codeInjectionHeader, codeInjectionFooter });
  }, [form, customCss, codeInjectionHeader, codeInjectionFooter]);

  return (
    <form className={formClassNames} onSubmit={form.handleSubmit(handleSubmit)}>
      <Form {...form}>
        <FormField
          name="customCss"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Custom CSS</FormLabel>
              <FormControl>
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormDescription>The CSS code entered above will affect the styling of the entire site.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="codeInjectionHeader"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Code injection &gt; Header</FormLabel>
              <FormControl>
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormDescription>
                Enter code that will be injected into the &#39;head&#39; tag on every page of your site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="codeInjectionFooter"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Code injection &gt; Footer</FormLabel>
              <FormControl>
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormDescription>
                Enter code that will be injected into the &#39;footer&#39; tag on every page of your site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button type="submit">Update settings</Button>
      {isLoading && <Loading />}
    </form>
  );
};
