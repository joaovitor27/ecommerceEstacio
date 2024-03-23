module.exports = {
    env: {
    node: true,
  },
  globals: {
    __dirname: true,
    module: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // Adicione outros plugins e extensões conforme necessário
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    // Outras regras
  },
};
