module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "import/extensions": "off",
    "import/no-unresolved": "off"
  },
  "overrides": [
    {
      "files": ["node_modules", "jest.config.js"],
      "rules": {
        "strict": "off"
      }
    }
  ]
};
