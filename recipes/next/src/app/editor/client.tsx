"use client";

import { useMemo } from "react";
import { Editor } from "@brizy/builder";
import type { EditorConfig, EditorPage, EditorProject } from "@brizy/builder";
import "@brizy/builder/editor/styles.css";
import { config } from "@/brizy.config";
import { thirdPartyComponents } from "@/widgets/thirdPartyComponents";

interface Props {
  path: string;
  pageData: EditorPage;
  projectData: EditorProject;
}

export function Client(props: Props) {
  const { path, projectData, pageData } = props;

  const cnf = useMemo((): EditorConfig => {
    return {
      ...config,
      ui: {
        ...config.ui,
        publish: {
          async handler(res, rej, data) {
            try {
              await fetch("/editor/api", {
                method: "POST",
                body: JSON.stringify({
                  path,
                  pageData: data.pageData ?? pageData,
                  projectData: data.projectData ?? projectData,
                }),
              });
              res(data);
            } catch (e) {
              rej("Failed to update data.");
              console.error(e);
            }
          },
        },
      },
    };
  }, [pageData, path, projectData]);

  return (
    <Editor projectData={projectData} pageData={pageData} config={cnf} thirdPartyComponents={thirdPartyComponents} />
  );
}
