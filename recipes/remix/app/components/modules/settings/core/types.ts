import { ProjectSettings } from "~/lib/projectSettings/types";

export type ContextDataItem = Partial<Pick<ProjectSettings, keyof ProjectSettings>>;

export interface ProjectSettingsContextModel {
  data: ProjectSettings | null;
  updateSettings: (data: ContextDataItem) => void;
  isLoading: boolean;
}
