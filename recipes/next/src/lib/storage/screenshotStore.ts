import { randomUUID } from "crypto";
import { existsSync } from "fs";
import { mkdir, readFile, readdir, stat, writeFile } from "fs/promises";
import path from "path";
import type { SavedScreenshotMeta, ScreenshotBaseData, ScreenshotUpdateData } from "@/types/screenshot";

const baseDir = path.join(process.cwd(), "tmp", "screenshots");

const BASE_DIR = path.join(process.cwd(), "tmp", "screenshots");

function extractBase64Parts(base64string: string): { mimeType: string; buffer: Buffer } {
  const match = base64string.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

  if (!match) throw new Error("Invalid base64 image format");

  const [, mimeType, encoded] = match;
  const buffer = Buffer.from(encoded, "base64");
  return { mimeType, buffer };
}

function getExtensionFromMime(mimeType: string): string {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return map[mimeType] || "bin";
}

export async function saveScreenshot(data: ScreenshotBaseData): Promise<SavedScreenshotMeta> {
  const id = crypto.randomUUID();
  const { mimeType, buffer } = extractBase64Parts(data.base64);
  const ext = getExtensionFromMime(mimeType);

  await mkdir(BASE_DIR, { recursive: true });

  const imagePath = path.join(BASE_DIR, `${id}.${ext}`);
  const metaPath = path.join(BASE_DIR, `${id}.json`);

  await writeFile(imagePath, buffer);
  await writeFile(
    metaPath,
    JSON.stringify(
      {
        id,
        mimeType,
        blockType: data.blockType,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );

  return {
    id,
    mimeType,
    blockType: data.blockType,
    createdAt: new Date().toISOString(),
  };
}

export async function updateData(input: ScreenshotUpdateData): Promise<{ id: string } | null> {
  if (!input.id) return null;

  const id = input.id;
  const filePath = path.join(baseDir, `${id}.png`);
  const metaPath = path.join(baseDir, `${id}.json`);

  if (!existsSync(metaPath)) return null;

  const buffer = Buffer.from(input.base64, "base64");
  await writeFile(filePath, buffer);

  const metadata = JSON.parse(await readFile(metaPath, "utf8")) as SavedScreenshotMeta;

  metadata.updatedAt = new Date().toISOString();
  metadata.blockType = input.blockType;

  await writeFile(metaPath, JSON.stringify(metadata, null, 2), "utf8");

  return { id };
}

export async function readData(id: string): Promise<SavedScreenshotMeta | null> {
  const metaPath = path.join(baseDir, `${id}.json`);
  if (!existsSync(metaPath)) return null;
  const content = await readFile(metaPath, "utf8");
  return JSON.parse(content);
}

export async function readAllData(): Promise<SavedScreenshotMeta[]> {
  const files = await readdir(baseDir);
  const records: SavedScreenshotMeta[] = [];

  for (const file of files) {
    if (file.endsWith(".json")) {
      const content = await readFile(path.join(baseDir, file), "utf8");
      records.push(JSON.parse(content));
    }
  }

  return records;
}
