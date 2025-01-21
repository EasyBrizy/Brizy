module.exports = {
  trailingComma: "none",
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  jsxBracketSameLine: false,
  endOfLine: "lf",
  bracketSpacing: true,
  importOrder: ["<THIRD_PARTY_MODULES>", "^[./]"],
  importOrderSortSpecifiers: true,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")]
};
