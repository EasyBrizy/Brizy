module.exports = {
  trailingComma: "all",
  singleQuote: false,
  jsxBracketSameLine: false,
  bracketSpacing: true,
  printWidth: 120,
  importOrder: ["<THIRD_PARTY_MODULES>", "^[./]"],
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
};
