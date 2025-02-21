"use client";

import type { EditorPage, EditorProject } from "@brizy/builder/preview";
import { Preview } from "@brizy/builder/preview";
import "@brizy/builder/preview/styles.css";
import { thirdPartyComponents } from "@/widgets/thirdPartyComponents";

interface Props {
  pageData: EditorPage;
  projectData: EditorProject;
}

export function Client({ pageData, projectData }: Props) {
  return <Preview pageData={pageData} projectData={projectData} thirdPartyComponents={thirdPartyComponents} />;
}
