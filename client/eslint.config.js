// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      {
        languageOptions: {
          parserOptions: {
            projectService: true,
            tsconfigRootDir: "./",
          },
        },
      },
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // angular
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: ["rk", "common", "auth", "core", "recipe"],
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: ["rk", "common", "auth", "core", "recipe"],
          style: "kebab-case",
        },
      ],
      "@angular-eslint/component-class-suffix": "off",

      // typescript
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          // prefix unused variables with an underscore _
          // commonly used in guards to implement interface for route and state snapshot arguments, which are not always needed
          "argsIgnorePattern": "^_"
        }
      ],
    },
  },
  {
    files: ["**/*spec.ts"],
    rules: {
      "@typescript-eslint/unbound-method": "off", // prevents propper usage of spies with .toHaveBeenCalled()
      "@typescript-eslint/no-unsafe-assignment": 'off',
      "@typescript-eslint/no-unsafe-call": 'off',
      "@typescript-eslint/no-unsafe-member-access": 'off',
      "@typescript-eslint/no-unsafe-return": 'off',
      "@typescript-eslint/no-unsafe-argument": 'off'
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/elements-content": "off",
    },
  }
);
