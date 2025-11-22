module.exports = {
  extends: [
    './rules/base/best.practices.js',
    './rules/base/es6.js',
    './rules/base/possible-error.js',
    './rules/base/strict.js',
    './rules/base/style.js',
    './rules/base/variables.js',
    './rules/imports.js',
  ].map(require.resolve),
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
    },
  },
  root: true,
};
