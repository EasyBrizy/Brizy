import type { EditorConfig } from "@brizy/builder/editor";
import { Editor as BrizyEditor } from "@brizy/builder/editor";
import brizyStylesHref from "@brizy/builder/editor/styles.css?url";
import { ActionFunctionArgs, LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { useMemo } from "react";
import { config, pageData, projectData } from "~/brizy.config";
import { getPage, setPage } from "~/lib/page";
import { getProject, setProject } from "~/lib/project";
import { thirdPartyComponents } from "~/widgets/thirdPartyComponents";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const path = formData.get("path");
  const pageData = formData.get("pageData");
  const projectData = formData.get("projectData");

  if (typeof path !== "string") {
    throw Error("Missing path");
  }

  if (typeof pageData === "string") {
    setPage(path, JSON.parse(pageData));
  }

  if (typeof projectData === "string") {
    setProject(JSON.parse(projectData));
  }

  return { ok: true };
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: brizyStylesHref, id: "brizy-editor-css" }];

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const path = params["*"] || "/";
  const pageData = getPage(path);
  const projectData = getProject();

  return { pageData, projectData, path };
};

export const meta: MetaFunction = () => {
  return [{ title: "Builder" }];
};

export default function Editor() {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const page = data.pageData || pageData;
  const project = data.projectData || projectData;
  const path = data.path;

  const cnf = useMemo((): EditorConfig => {
    return {
      ...config,
      urls: {
        ...config.urls,
        pagePreview: `/${path}`,
      },
      ui: {
        ...config.ui,
        publish: {
          async handler(res, rej, data) {
            try {
              const { pageData, projectData } = data;
              const formData = new FormData();
              formData.append("path", path);

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
  }, [path, submit]);

  return <BrizyEditor pageData={page} projectData={project} config={cnf} thirdPartyComponents={thirdPartyComponents} />;
}
