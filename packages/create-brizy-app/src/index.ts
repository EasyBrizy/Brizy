#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { program } from "commander";
import { input, confirm, select } from "@inquirer/prompts";
import Handlebars from "handlebars";
import { glob } from "glob";
import { execSync } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lifted from https://github.com/vercel/next.js/blob/c2d7bbd1b82c71808b99e9a7944fb16717a581db/packages/create-next-app/helpers/get-pkg-manager.ts
function getPkgManager() {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const userAgent = process.env.npm_config_user_agent || "";

  if (userAgent.startsWith("yarn")) {
    return "yarn";
  }

  if (userAgent.startsWith("pnpm")) {
    return "pnpm";
  }

  return "npm";
}

program
  .command("create [app-name]")
  .option(
    "--use-npm",
    `

    Explicitly instruct the CLI to bootstrap the application using npm
  `,
  )
  .option(
    "--use-pnpm",
    `

    Explicitly instruct the CLI to bootstrap the application using pnpm
  `,
  )
  .option(
    "--use-yarn",
    `

    Explicitly instruct the CLI to bootstrap the application using Yarn
  `,
  )
  .action(async (_appName, options) => {
    let appName = _appName;
    const recipe = await select({
      message: "Choose which recipe you want to create:",
      choices: ["next", "remix"],
      default: "next",
    });

    if (typeof recipe !== "string") {
      throw new Error("Invalid recipe. Accepted values are 'next' or 'remix'.");
    }

    if (!appName) {
      appName = await input({ message: "What is the name of your app?", required: true });
    }

    // Copy template files to the new directory
    const templatePath = path.join(__dirname, "../templates", recipe);
    const appPath = path.join(process.cwd(), appName);

    if (fs.existsSync(appPath)) {
      await confirm({
        message: `${chalk.red("Warn!")} Folder ${chalk.cyan(appName)} already exist !\n Would you like to clear the folder?`,
        default: false,
      }).then((canClear) => {
        if (canClear) {
          fs.rmSync(appPath, { recursive: true, force: true });
        } else {
          throw new Error("Your Folder isn't Empty! App installation must be done in empty folder");
        }
      });
    } else {
      fs.mkdirSync(appName);
    }

    const packageManager = !!options.useNpm
      ? "npm"
      : !!options.usePnpm
        ? "pnpm"
        : !!options.useYarn
          ? "yarn"
          : getPkgManager();

    const templateFiles = glob.sync(`**/*`, {
      cwd: templatePath,
      nodir: true,
      dot: true,
    });

    for (const templateFile of templateFiles) {
      const filePath = path.join(templatePath, templateFile);
      const targetPath = filePath.replace(templatePath, appPath).replace(".hbs", "").replace("gitignore", ".gitignore");

      if (path.extname(filePath) === ".hbs") {
        const templateString = fs.readFileSync(filePath, "utf-8");
        const template = Handlebars.compile(templateString);
        const data = template({
          appName,
          editorVersion: "^1",
        });
        const dir = path.dirname(targetPath);

        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(targetPath, data, "utf-8");
      } else {
        const dir = path.dirname(targetPath);
        fs.mkdirSync(dir, { recursive: true });

        // Copy the file as binary to preserve any format
        fs.copyFileSync(filePath, targetPath);
      }
    }

    if (packageManager === "yarn") {
      execSync("yarn install", { cwd: appPath, stdio: "inherit" });
    } else {
      execSync(`${packageManager} i`, { cwd: appPath, stdio: "inherit" });
    }

    let inGitRepo = false;

    try {
      inGitRepo = execSync("git status", { cwd: appPath }).toString().indexOf("fatal:") !== 0;
    } catch {}

    if (!inGitRepo) {
      try {
        execSync("git init", { cwd: appPath, stdio: "inherit" });
        execSync("git add .", { cwd: appPath, stdio: "inherit" });
        execSync('git commit -m "build(brizy): generate app"', {
          cwd: appPath,
          stdio: "inherit",
        });
      } catch (error) {
        console.log(chalk.red("Failed to commit git changes"));
      }
    }
  })
  .parse(process.argv);
