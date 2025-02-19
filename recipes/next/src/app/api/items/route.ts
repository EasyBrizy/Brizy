import { deleteItem } from "@/lib/item/deleteItem";
import { getItem } from "@/lib/item/getItem";
import { getItems } from "@/lib/item/getItems";
import { newItem } from "@/lib/item/newItem";
import { updateItem } from "@/lib/item/updateItem";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pageData, slug, id, title } = await req.json();

    const schema = {
      id,
      slug,
      title,
      status: "draft",
      dataVersion: "1",
      createdAt: new Date().toLocaleDateString(),
      ...(pageData && { data: JSON.stringify(pageData) }),
    };

    const item = await newItem(schema);

    return NextResponse.json({ success: true, data: item }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Fail to update page" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const { data, id } = await req.json();
    await updateItem({ id, data });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Fail to update page" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const collection = req.nextUrl.searchParams.get("collection");

    if (!collection) {
      return NextResponse.json({ success: false, error: "Invalid collection" }, { status: 400 });
    }

    const qs = {
      type: collection,
    };

    const items = await getItems(qs);

    return NextResponse.json(
      {
        success: true,
        data: items,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Fail to get items" }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.json();

    const ids = data.ids;

    if (!Array.isArray(ids)) {
      return NextResponse.json({ success: false, error: "Invalid id" }, { status: 400 });
    }

    for (const _id of ids) {
      const item = await getItem({ id: _id });

      if (!item) {
        return NextResponse.json({ success: false, error: "Item not found" }, { status: 400 });
      }

      await deleteItem(_id);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Fail to delete item" }, { status: 400 });
  }
}
