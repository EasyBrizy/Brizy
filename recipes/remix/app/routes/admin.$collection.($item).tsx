import type { EditorConfig, EditorPage, EditorProject } from "@brizy/builder";
import { Editor as BrizyEditor } from "@brizy/builder/editor";
import brizyStylesHref from "@brizy/builder/editor/styles.css?url";
import { ActionFunctionArgs, type LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { useMemo } from "react";
import { config, pageData, projectData } from "~/brizy.config";
import { MissingPage } from "~/components/MissingPage";
import { getPage, updateItem } from "~/lib/item";
import { getProject } from "~/lib/project/getProject";
import { updateProject } from "~/lib/project/updateProject";
import { CollectionTypes, isCollectionType } from "~/types";
import { thirdPartyComponents } from "~/widgets/thirdPartyComponents";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: brizyStylesHref, id: "brizy-editor-css" }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const pageData = formData.get("pageData");
  const projectData = formData.get("projectData");

  if (typeof pageData === "string") {
    updateItem(JSON.parse(pageData));
  }

  if (typeof projectData === "string") {
    updateProject(JSON.parse(projectData));
  }

  return { ok: true };
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let collection = params.collection ?? "";
  let item = params.item;

  if (!item) {
    item = collection;
    collection = CollectionTypes.PAGE;
  }

  const pageData = getPage(collection, item);
  const projectData = getProject();

  return { pageData, projectData, collection, item };
};

export default function Editor() {
  const data = useLoaderData<typeof loader>();
  const page = data.pageData || pageData;
  const project = data.projectData || projectData;
  const { collection, item } = data;

  if (!isCollectionType(collection)) {
    return <MissingPage />;
  }

  const pagePreview = collection === CollectionTypes.PAGE ? `/${item}` : `/${collection}/${item}`;

  return <Client page={page} project={project} pagePreview={pagePreview} />;
}

const Client = ({ page, project, pagePreview }: { page: EditorPage; project: EditorProject; pagePreview: string }) => {
  const submit = useSubmit();

  const cnf = useMemo((): EditorConfig => {
    return {
      ...config,
      urls: {
        ...config.urls,
        pagePreview,
      },
      ui: {
        ...config.ui,
        publish: {
          async handler(res, rej, data) {
            try {
              const { pageData, projectData } = data;
              const formData = new FormData();

              if (pageData) {
                formData.append("pageData", JSON.stringify(pageData));
              }

              if (projectData) {
                formData.append("projectData", JSON.stringify(projectData));
              }

              submit(formData, { method: "post" });
              res(data);
            } catch (e) {
              rej("Failed to update data.");
              console.error(e);
            }
          },
        },
      },
    };
  }, [submit, pagePreview]);

  return <BrizyEditor pageData={page} projectData={project} config={cnf} thirdPartyComponents={thirdPartyComponents} />;
};
