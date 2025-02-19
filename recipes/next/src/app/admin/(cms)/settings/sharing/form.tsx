import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FormValues } from "./types";
import { sharingFormResolver } from "./utils";
import { useProjectSetting } from "@/components/modules/settings/core/System";
import { useCallback, useEffect } from "react";
import { clsx } from "clsx";
import { Loading } from "@/components/helpers/Loading";

const defaultValues: FormValues = {
  sharingTitle: "",
  sharingDescription: "",
  preserveSeoTitle: false,
  preserveSeoDescription: false,
};

export const SharingForm = () => {
  const { isLoading, data, updateSettings } = useProjectSetting();
  const form = useForm<FormValues>({
    resolver: sharingFormResolver,
    defaultValues,
    mode: "onChange",
  });
  const { preserveSeoDescription, preserveSeoTitle, description, title } = data?.sharing ?? {};
  const { title: seoTitle, description: seoDescription } = data?.seo ?? {};

  const preserveSeoTitleValue = form.watch("preserveSeoTitle");
  const preserveSeoDescriptionValue = form.watch("preserveSeoDescription");

  useEffect(() => {
    const sharingTitle = preserveSeoTitle ? seoTitle : title;
    const sharingDescription = preserveSeoDescription ? seoDescription : description;

    form.reset({
      sharingTitle: sharingTitle ?? defaultValues.sharingTitle,
      sharingDescription: sharingDescription ?? defaultValues.sharingDescription,
      preserveSeoTitle: preserveSeoTitle ?? defaultValues.preserveSeoTitle,
      preserveSeoDescription: preserveSeoDescription ?? defaultValues.preserveSeoDescription,
    });
  }, [title, description, preserveSeoTitle, preserveSeoDescription, form, seoTitle, seoDescription]);

  useEffect(() => {
    if (preserveSeoTitleValue) {
      form.setValue("sharingTitle", seoTitle ?? "");
    }

    if (preserveSeoDescriptionValue) {
      form.setValue("sharingDescription", seoDescription ?? "");
    }
  }, [form, preserveSeoTitleValue, preserveSeoDescriptionValue, seoTitle, seoDescription]);

  const handleSubmit = useCallback(
    (values: FormValues) => {
      const { sharingTitle, sharingDescription, preserveSeoTitle, preserveSeoDescription } = values;

      updateSettings({
        sharing: {
          title: sharingTitle,
          description: sharingDescription,
          preserveSeoTitle: preserveSeoTitle,
          preserveSeoDescription: preserveSeoDescription,
        },
      });
    },
    [updateSettings],
  );

  const wrapperClassNames = clsx("space-y-6", "relative", {
    "pointer-events-none": isLoading,
  });

  return (
    <div className={wrapperClassNames}>
      <div>
        <span className="text-sm font-bold">Social Information</span>
        <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
      </div>
      <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
        <Form {...form}>
          <FormField
            name="sharingTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Social Sharing Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the social sharing title" {...field} disabled={preserveSeoTitleValue} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="preserveSeoTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormDescription className="!mt-0">Set the same as SEO Title</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            name="sharingDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Social Sharing Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the social sharing description"
                    rows={5}
                    {...field}
                    disabled={preserveSeoDescriptionValue}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="preserveSeoDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormDescription className="!mt-0">Set the same as SEO Description</FormDescription>
              </FormItem>
            )}
          />
        </Form>
        <Button type="submit">Update settings</Button>
      </form>
      {isLoading && <Loading />}
    </div>
  );
};
