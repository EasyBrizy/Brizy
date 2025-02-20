import { CheckCircleIcon, Circle } from "lucide-react";

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const statuses = [
  {
    value: "draft",
    label: "Draft",
    icon: Circle,
  },
  {
    value: "publish",
    label: "Publish",
    icon: CheckCircleIcon,
  },
];
