import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true },
        project: true,
      },
      globals: globals.browser,
    },
    plugins: {
      js,
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
