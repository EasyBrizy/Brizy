import fs from "fs";
import path from "path";
import * as process from "process";
import { fileURLToPath } from "url";

function findPackageRootFromPath(startPath) {
  let dir = startPath;

  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, "package.json"))) {
      return dir;
    }
    dir = path.dirname(dir);
  }

  throw new Error(`package.json not found starting from ${startPath}`);
}

function copyFolderRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  const builderEntryPoint = import.meta.resolve("@brizy/builder");
  const builderPath = path.dirname(fileURLToPath(builderEntryPoint));

  try {
    const srcPkgRoot = findPackageRootFromPath(builderPath);
    const currentPkgRoot = findPackageRootFromPath(process.cwd());
    const src = path.resolve(srcPkgRoot, "dist/workers");
    const dest = path.resolve(currentPkgRoot, "public/workers");

    copyFolderRecursive(src, dest);
    console.log("Workers copied successfully");
  } catch (error) {
    console.error("Failed to copy workers:", error.message);
    process.exit(1);
  }
}

main();
