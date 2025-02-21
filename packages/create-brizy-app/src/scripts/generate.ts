#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { glob } from "glob";
import { dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { execSync } from "child_process";

const run = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Copy template files to the new directory
  const recipePath = path.join(__dirname, "../../../../recipes");
  const templatePath = path.join(__dirname, "../../templates");

  if (!fs.existsSync(recipePath)) {
    console.error(chalk.red(`No recipe directory could be found at ${recipePath}.`));
    return;
  }

  if (!fs.existsSync(templatePath)) {
    console.error(chalk.red(`No template directory could be found at ${templatePath}.`));
    return;
  }

  // Clean templates before coping
  console.log(chalk.blue("Cleaning templates before copying..."));
  execSync("git clean -dfx", { cwd: templatePath, stdio: "inherit" });
  console.log(chalk.green("Templates cleaned successfully."));

  const recipeFiles = glob.sync("*/**", {
    cwd: `${recipePath}`,
    nodir: true,
    dot: true,
  });

  let counter = 0;

  for (const recipeFile of recipeFiles) {
    const filePath = path.join(recipePath, recipeFile);
    const targetPath = filePath.replace(recipePath, templatePath);

    if (fs.existsSync(`${targetPath}.hbs`)) {
      console.log(chalk.yellow(`- ${recipeFile}`));
    } else {
      const dir = path.dirname(targetPath);

      fs.mkdirSync(dir, { recursive: true });

      // Copy the file as binary to preserve any non-text formats
      fs.copyFileSync(filePath, targetPath);

      if (targetPath.indexOf(".gitignore") > -1) {
        fs.copyFileSync(filePath, targetPath.replace(".gitignore", "gitignore"));
      }

      counter += 1;
    }
  }

  console.log(chalk.green(`Copied ${counter} files into the generator!`));
};

await run();
