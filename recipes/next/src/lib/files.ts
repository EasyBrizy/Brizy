import fs from "fs";
import path from "path";

function getPath(fileName: string): string {
  return process.env.VERCEL ? path.join("/tmp", fileName) : fileName;
}

export function writeFile(fileName: string, data: string) {
  console.log("writeFile", fileName);
  fs.writeFileSync(getPath(fileName), data);
}

export function readFile(fileName: string): string {
  console.log("readFile", fileName);
  return fs.readFileSync(getPath(fileName), "utf-8");
}

export function existsFile(path: string): boolean {
  console.log("existsFile", path);
  return fs.existsSync(getPath(path));
}
