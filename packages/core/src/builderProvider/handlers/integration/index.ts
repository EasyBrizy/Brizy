import { ExposedHandlers } from "../../types/type";

interface Data {
  integration: Record<string, unknown>;
  handlers: ExposedHandlers;
  uid: string;
}

export const getIntegration = (data: Data) => {
  return data.integration;
};
