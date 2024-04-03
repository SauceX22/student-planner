/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
export default {
  endOfLine: "lf",
  printWidth: 80,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "es5",
  bracketSameLine: true,
  bracketSpacing: true,
  quoteProps: "as-needed",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/env(.*)$",
    "^@/types/(.*)$",
    "^@db/types/(.*)$",
    "^@db/(.*)$",
    "^@/config/(.*)$",
    "^@lib/(.*)$",
    "^@utils/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/pages/(.*)$",
    "^@/app/(.*)$",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  tailwindConfig: "./tailwind.config.ts",
  tailwindFunctions: ["clsx", "cn", "tw"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  pluginSearchDirs: false,
};