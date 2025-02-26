import fs from "fs";
import path from "path";

function getPath(fileName: string): string {
  return path.join(process.cwd(), fileName);
}

export function writeFile(fileName: string, data: string) {
  fs.writeFileSync(getPath(fileName), data);
}

export function readFile(fileName: string): string {
  return fs.readFileSync(getPath(fileName), "utf-8");
}

export function existsFile(path: string): boolean {
  return fs.existsSync(getPath(path));
}
