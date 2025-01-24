import { BuilderOutput, Output } from "@/types/types";

export const createOutput = (output: BuilderOutput): Output => {
  const { pageData, projectData, error } = output;
  return { pageData, projectData, error };
};
