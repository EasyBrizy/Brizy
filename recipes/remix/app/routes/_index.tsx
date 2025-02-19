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
  const path = params.editorPage || "/editor";
  const pageData = getPage(path);
  const projectData = getProject();
  return { pageData, projectData, path };
};

export const meta: MetaFunction = () => {
  return [
    {
      title: "New Remix App",
    },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Home() {
  const data = useLoaderData<typeof loader>() ?? {};
  const page = data.pageData;
  const project = data.projectData;
  const path = data.path;

  console.log(path);

  if (!page || !project) {
    return <MissingPage to={path} />;
  }

  return <BrizyPreview pageData={page} projectData={project} thirdPartyComponents={thirdPartyComponents} />;
}
