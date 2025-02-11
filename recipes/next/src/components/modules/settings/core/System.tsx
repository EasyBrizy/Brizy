"use client";

import { ProjectSettings } from "@/lib/projectSettings/types";
import React, { FC, useCallback, useContext, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProjectSettingsContext } from "./Context";
import { ContextDataItem } from "./types";
import { WithChildren } from "@/components/helpers";
import { getProjectSettings, updateProjectSettings } from "./requests";

const ProjectSettingsProvider: FC<WithChildren> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data = null, isLoading } = useQuery<ProjectSettings>(["projectSettings"], getProjectSettings);

  const mutation = useMutation(updateProjectSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projectSettings"]);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const handleUpdateSettings = useCallback(
    (settings: ContextDataItem) => {
      mutation.mutate({
        ...data,
        ...settings,
      });
    },
    [data, mutation],
  );

  const contextValue = useMemo(
    () => ({
      data,
      updateSettings: handleUpdateSettings,
      isLoading: isLoading || mutation.isLoading,
    }),
    [data, handleUpdateSettings, isLoading, mutation],
  );

  return <ProjectSettingsContext.Provider value={contextValue}>{children}</ProjectSettingsContext.Provider>;
};

const useProjectSetting = () => useContext(ProjectSettingsContext);

export { ProjectSettingsProvider, useProjectSetting };
