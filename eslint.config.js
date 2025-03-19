const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginJest = require("eslint-plugin-jest");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    languageOptions: {
      globals: {...globals.browser, ...globals.node}
    }
  },
  {
    // update this to match your test files
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
  pluginJs.configs.recommended,
];
