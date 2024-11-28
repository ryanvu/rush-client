import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import svelteParser from "svelte-eslint-parser";
import sveltePlugin from "eslint-plugin-svelte";

export default [
  // TypeScript files configuration
  {
    ignores: ["node_modules/*", "build/*", "dist/*"],
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json"
      },
      globals: {
        document: true,
        window: true,
        console: true,
        module: true,
        require: true,
        process: true,
        __dirname: true
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
    }
  },
  // Svelte files configuration
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser
      }
    },
    plugins: {
      svelte: sveltePlugin
    },
    rules: {
      ...sveltePlugin.configs.recommended.rules,
      "svelte/valid-compile": "error",
      "svelte/no-at-html-tags": "warn",
      "svelte/require-store-callbacks-use-set-param": "error",
      "svelte/require-store-reactive-access": "error",
      "svelte/no-dom-manipulating": "warn"
    }
  }
];
