import { Resolver } from "react-hook-form";
import { FormValues } from "./types";

export const sharingFormResolver: Resolver<FormValues> = async (values) => {
  const errors: Record<string, unknown> = {};

  if (!values.sharingTitle?.trim()) {
    errors.sharingTitle = {
      type: "required",
      message: "Social sharing title is required",
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};
