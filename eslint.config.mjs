import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.url
    ? URL.fileURLToPath(new URL(".", import.meta.url))
    : process.cwd(),
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  }),
];

export default eslintConfig;
