import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(request: Request) {
  const { pageData, path, projectData } = await request.json();

  const pageDataJson = JSON.parse(
    fs.existsSync("pages.database.json") ? fs.readFileSync("pages.database.json", "utf-8") : "{}",
  );

  const updatedPages = {
    ...pageDataJson,
    [path]: pageData,
  };

  fs.writeFileSync("pages.database.json", JSON.stringify(updatedPages));
  fs.writeFileSync("project.database.json", JSON.stringify(projectData));

  // Purge Next.js cache
  revalidatePath(path);

  return NextResponse.json({ status: "ok" });
}
