import { clsx } from "clsx";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "~/components/helpers/Loading";
import { useProjectSetting } from "~/components/modules/settings/core/System";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { FormValues } from "./types";
import { seoFormResolver } from "./utils";

const defaultValues: FormValues = {
  siteTitle: "",
  siteDescription: "",
  searchEngineVisibility: true,
};

export const SeoForm = () => {
  const { updateSettings, data, isLoading } = useProjectSetting();
  const { description, title, searchVisibility } = data?.seo ?? {};

  const form = useForm<FormValues>({
    resolver: seoFormResolver,
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      siteTitle: title ?? defaultValues.siteTitle,
      siteDescription: description ?? defaultValues.siteDescription,
      searchEngineVisibility: searchVisibility ?? defaultValues.searchEngineVisibility,
    });
  }, [title, description, searchVisibility, form]);

  const handleSubmitForm = useCallback(
    (values: FormValues) => {
      const { siteTitle, siteDescription, searchEngineVisibility } = values;

      updateSettings({
        seo: {
          title: siteTitle,
          description: siteDescription,
          searchVisibility: searchEngineVisibility,
        },
      });
    },
    [updateSettings],
  );

  const formClassNames = clsx("space-y-8", "relative", {
    "pointer-events-none": isLoading,
  });

  return (
    <form className={formClassNames} onSubmit={form.handleSubmit(handleSubmitForm)}>
      <Form {...form}>
        <FormField
          name="siteTitle"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Site Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the site title" {...field} />
              </FormControl>
              <FormDescription>
                The site title is adding SEO benefits (recommended length 50-70 characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="siteDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Site Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the site description" rows={5} {...field} />
              </FormControl>
              <FormDescription>
                The description is used as metadata for SEO (recommended length is 150-160 characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="searchEngineVisibility"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-bold">Search Engine Visibility</FormLabel>
                <FormDescription>
                  If set to ON, your site will show up in search results. Turn OFF to discourage search engines from
                  indexing the site.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
      <Button type="submit">Update settings</Button>
      {isLoading && <Loading />}
    </form>
  );
};
