const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.config({
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "tsconfigRootDir": __dirname,
      "sourceType": "module"
    },
    "plugins": ["@typescript-eslint/eslint-plugin", "import"],
    "extends": ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    "root": true,
    "env": {
      "node": true,
      "jest": true
    },
    "ignorePatterns": [".eslintrc.js"],
    "rules": {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          "pathGroupsExcludedImportTypes": ["builtin"],
          "pathGroups": [
            {
              "pattern": "@src/**/**",
              "group": "parent"
            },
            {
              "pattern": "@lib/**/**",
              "group": "parent"
            }
          ],
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ]
    }
  })
]
