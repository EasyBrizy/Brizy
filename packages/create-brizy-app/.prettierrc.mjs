import { fileURLToPath } from "url";

export default {
  trailingComma: "all",
  singleQuote: false,
  bracketSpacing: true,
  printWidth: 120,
  importOrder: ["<THIRD_PARTY_MODULES>", "^[./]"],
  importOrderSortSpecifiers: true,
  plugins: [fileURLToPath(import.meta.resolve("@trivago/prettier-plugin-sort-imports"))],
};
