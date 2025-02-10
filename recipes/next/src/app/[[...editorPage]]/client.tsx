"use client";

import type { EditorPage, EditorProject } from "@brizy/builder/preview";
import { Preview } from "@brizy/builder/preview";
import { thirdPartyComponents } from "@/widgets/thirdPartyComponents";
import "@brizy/builder/preview/css.css";

interface Props {
  pageData: EditorPage;
  projectData: EditorProject;
}

export function Client({ pageData, projectData }: Props) {
  return <Preview pageData={pageData} projectData={projectData} thirdPartyComponents={thirdPartyComponents} />;
}
