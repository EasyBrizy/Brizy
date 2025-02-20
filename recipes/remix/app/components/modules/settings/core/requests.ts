import axios from "axios";
import { ProjectSettings } from "~/lib/projectSettings/types";

export const getProjectSettings = async (origin = ""): Promise<ProjectSettings> => {
  const apiUrl = `${origin}/action/projectSettings`;

  const response = await axios.get(apiUrl);
  const { data } = response.data;

  return data;
};

export const updateProjectSettings = async (settings: Partial<ProjectSettings>) => {
  const {
    sharing = { preserveSeoTitle: false, preserveSeoDescription: false, title: "", description: "" },
    seo = {
      title: "",
      description: "",
    },
  } = settings;

  const { preserveSeoTitle, preserveSeoDescription, title: sharingTitle, description: sharingDescription } = sharing;

  const updatedSharing = {
    ...sharing,
    title: preserveSeoTitle ? seo.title || "" : sharingTitle,
    description: preserveSeoDescription ? seo.description || "" : sharingDescription,
  };

  const updatedSettings = { ...settings, sharing: updatedSharing };

  const response = await axios.put("/action/projectSettings", {
    projectSettings: updatedSettings,
  });

  return response.data;
};
