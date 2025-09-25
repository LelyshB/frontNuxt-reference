import js from "@eslint/js"
import globals from "globals"
import vue from "eslint-plugin-vue"
import tseslint from "typescript-eslint"

const vueRecommended = vue.configs["flat/recommended"].map((config) => ({
  ...config,
  files: ["**/*.vue"],
  languageOptions: {
    ...config.languageOptions,
    parserOptions: {
      ...(config.languageOptions?.parserOptions ?? {}),
      parser: tseslint.parser,
      extraFileExtensions: [".vue"],
      ecmaVersion: 2022,
      sourceType: "module"
    }
  }
}))

export default tseslint.config(
  { ignores: ["dist", ".nuxt", "node_modules"] },
  {
    files: ["**/*.{ts,tsx,vue}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module"
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      vue
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  ...vueRecommended,
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/first-attribute-linebreak": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/html-closing-bracket-spacing": "off",
      "vue/html-self-closing": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/attributes-order": "off"
    }
  }
)
