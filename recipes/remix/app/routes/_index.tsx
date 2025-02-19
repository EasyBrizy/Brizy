import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Preview as BrizyPreview } from "@brizy/builder/preview";
import brizyPreviewStylesHref from "@brizy/builder/preview/styles.css?url";
import { MissingPage } from "~/components/MissingPage";
import { getPage } from "~/lib/page";
import { getProject } from "~/lib/project";
import { thirdPartyComponents } from "~/widgets/thirdPartyComponents";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: brizyPreviewStylesHref, id: "brizy-preview-css" },
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const path = params.editorPage || "/";
  const pageData = getPage(path);
  const projectData = getProject();
  return { pageData, projectData, path: params.editorPage ? `/editor/${path}` : "/editor" };
};

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Home() {
  const { pageData, projectData, path } = useLoaderData<typeof loader>();

  if (!pageData || !projectData) {
    return <MissingPage to={path} />;
  }

  return <BrizyPreview pageData={pageData} projectData={projectData} thirdPartyComponents={thirdPartyComponents} />;
}
