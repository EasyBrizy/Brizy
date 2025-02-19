import { Resolver } from "react-hook-form";
import { FormValues } from "./types";

export const seoFormResolver: Resolver<FormValues> = async (values) => {
  const errors: Record<string, unknown> = {};

  if (!values.siteTitle?.trim()) {
    errors.siteTitle = {
      type: "required",
      message: "Site title is required",
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};
