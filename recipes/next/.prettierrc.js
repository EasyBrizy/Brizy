const config = {
  trailingComma: "all",
  singleQuote: false,
  bracketSpacing: true,
  printWidth: 120,
  importOrder: ["<THIRD_PARTY_MODULES>", "@/", "^[./]"],
  importOrderSortSpecifiers: true,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
};

module.exports = config;
