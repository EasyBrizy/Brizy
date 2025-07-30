"use client";

import { Editor } from "@brizy/builder";
import type { EditorConfig, EditorPage, EditorProject } from "@brizy/builder";
import "@brizy/builder/editor/styles.css";
import axios from "axios";
import { useMemo } from "react";
import { config } from "@/brizy.config";
import { CollectionTypes } from "@/types";
import { thirdPartyComponents } from "@/widgets/thirdPartyComponents";

interface Props {
  collection: string;
  item: string;
  pageData: EditorPage;
  projectData: EditorProject;
}

const updateItem = async (id: string, data: EditorPage) => {
  const res = await axios.put("/api/items", {
    id,
    data,
  });

  return res.data;
};

const updateProject = async (projectData: EditorProject) => {
  const res = await axios.put("/api/project", {
    projectData,
  });

  return res.data;
};

export function Client(props: Props) {
  const { projectData, pageData, collection, item } = props;
  const pagePreview = collection === CollectionTypes.PAGE ? `/${item}` : `/${collection}/${item}`;

  const cnf = useMemo((): EditorConfig => {
    return {
      ...config,
      urls: {
        ...config.urls,
        pagePreview,
      },
      api: {
        ...config.api,
        screenshots: {
          update: async (res, rej, data) => {
            try {
              const { id } = data;
              const response = await fetch(`/api/screenshots/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
              });
              const resData = await response.json();
              res({ id: resData.id });
            } catch {
              rej("Failed to update screenshot");
            }
          },
          create: async (res, rej, data) => {
            try {
              const response = await fetch("/api/screenshots", {
                method: "POST",
                body: JSON.stringify(data),
              });

              const resData = await response.json();
              const { id } = resData;
              res({ id });
            } catch {
              rej("Unable to create screenshot:");
            }
          },
        },
      },
      ui: {
        ...config.ui,
        publish: {
          async handler(res, rej, output) {
            try {
              const {
                pageData: outputPageData,
                projectData: outputProjectData,
                error = "Failed to update data",
              } = output;

              if (!outputPageData && !outputProjectData) {
                return rej(error);
              }

              const pageDataValue = outputPageData ?? pageData;
              const projectDataValue = outputProjectData ?? projectData;

              await Promise.all([updateItem(pageData.id, pageDataValue), updateProject(projectDataValue)]);
              res(output);
            } catch (e) {
              console.error(e);
              rej("Failed to update data.");
            }
          },
        },
      },
    };
  }, [pageData, pagePreview, projectData]);

  return (
    <Editor projectData={projectData} pageData={pageData} config={cnf} thirdPartyComponents={thirdPartyComponents} />
  );
}
