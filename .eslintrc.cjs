/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  settings: {
    'import/ignore': ['node_modules'],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
  root: true,
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'dev-dist/', 'vendor/'],
  rules: {
    'consistent-return': 'error',
    'no-else-return': 'warn',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        varsIgnorePattern: '^(_|debug$)',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
  },
};
