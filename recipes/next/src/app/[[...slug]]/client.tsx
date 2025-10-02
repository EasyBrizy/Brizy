"use client";

import type { EditorPage, EditorProject } from "@brizy/builder/preview";
import "@brizy/builder/preview/styles.css";
import dynamic from "next/dynamic";
import { thirdPartyComponents } from "@/widgets/thirdPartyComponents";

const Preview = dynamic(() => import("@brizy/builder/preview").then((m) => ({ default: m.Preview })), {
  ssr: false,
});

interface Props {
  pageData: EditorPage;
  projectData: EditorProject;
}

export function Client({ pageData, projectData }: Props) {
  return <Preview pageData={pageData} projectData={projectData} thirdPartyComponents={thirdPartyComponents} />;
}
