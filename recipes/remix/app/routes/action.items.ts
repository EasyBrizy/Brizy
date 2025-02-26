import { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { deleteItem, getItem, getItems, newItem } from "~/lib/item";
import { Item } from "~/lib/item/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const collection = new URL(request.url).searchParams.get("collection");

    if (!collection) {
      return Response.json("Collection not found", {
        status: 400,
      });
    }

    const items = await getItems({
      type: collection,
    });

    return Response.json(
      { success: true, data: items },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.error(e);
    return Response.json("Fail to get items", {
      status: 400,
    });
  }
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const data = await request.json();

    switch (request.method) {
      case "POST":
        return addItem(data);
      case "DELETE":
        return deleteItems(data.ids);
      default:
        return Response.json("Invalid method", {
          status: 400,
        });
    }
  } catch (e) {
    console.error(e);
    return Response.json("Fail to create item", {
      status: 400,
    });
  }
};

async function addItem(data: Item) {
  try {
    const { data: pageData, slug, id, title } = data;

    const schema = {
      id,
      slug,
      title,
      status: "draft" as const,
      dataVersion: 1,
      createdAt: new Date().toLocaleDateString(),
      data: JSON.stringify(pageData),
    };

    // @ts-expect-error Types of property data are incompatible.
    // Type string is not assignable to type { items: Block[]; }
    const item = await newItem(schema);

    return Response.json({ success: true, data: item }, { status: 200 });
  } catch (e) {
    return Response.json({ success: false, error: "Fail to update page" }, { status: 400 });
  }
}

async function deleteItems(ids: string[]) {
  try {
    if (!Array.isArray(ids)) {
      return Response.json({ success: false, error: "Invalid id" }, { status: 400 });
    }

    for (const _id of ids) {
      const item = await getItem({ id: _id });

      if (!item) {
        return Response.json({ success: false, error: "Item not found" }, { status: 400 });
      }

      await deleteItem(_id);
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (e) {
    return Response.json({ success: false, error: "Fail to delete item" }, { status: 400 });
  }
}
