module.exports = {
  env: {
    es2021: true
  },
  ignorePatterns: [".prettierrc.js", ".eslintrc.js", "tsconfig.json"],
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'no-relative-import-paths'],
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'arrow-body-style': 'off',
    camelcase: 'off',
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: true }
    ],
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': 'off',
    'node/no-unpublished-import': ['error', {
      allowModules: ['vitest']
    }],
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};