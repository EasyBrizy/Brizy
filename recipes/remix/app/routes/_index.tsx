import { Preview as BrizyPreview } from "@brizy/builder/preview";
import brizyPreviewStylesHref from "@brizy/builder/preview/styles.css?url";
import { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { MissingPage } from "~/components/MissingPage";
import { getPage } from "~/lib/item";
import { getProject } from "~/lib/project/getProject";
import { getProjectSettings } from "~/lib/projectSettings";
import { CollectionTypes } from "~/types";
import { createCustomCode } from "~/utils";
import { thirdPartyComponents } from "~/widgets/thirdPartyComponents";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: brizyPreviewStylesHref, id: "brizy-preview-css" },
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let collection = params.collection ?? "";
  let item = params.item;

  if (!item) {
    item = collection;
    collection = CollectionTypes.PAGE;
  }

  const pageData = getPage(collection, item);
  const projectData = getProject();
  const projectSettings = getProjectSettings();

  return { pageData, projectData, projectSettings };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { projectSettings } = data ?? {};

  if (!projectSettings) {
    return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
  }

  const { seo, sharing } = projectSettings;
  const { title = "", description = "", searchVisibility } = seo ?? {};
  const { title: sharingTitle = "", description: sharingDescription = "" } = sharing ?? {};

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: sharingTitle },
    { property: "og:description", content: sharingDescription },
    { name: "robots", content: searchVisibility ? "index, follow" : "noindex, nofollow" },
  ];
};

export default function Home() {
  const { pageData, projectData, projectSettings } = useLoaderData<typeof loader>();

  const { code } = projectSettings ?? {};

  useEffect(() => {
    if (code) {
      createCustomCode(code);
    }
  }, [code]);

  if (!pageData || !projectData) {
    return <MissingPage />;
  }

  return <BrizyPreview pageData={pageData} projectData={projectData} thirdPartyComponents={thirdPartyComponents} />;
}
