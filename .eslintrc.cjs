module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:import/errors', 'airbnb', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx'],
        map: [
          ['~', './src'],
          ['~', './src'],
          ['static', './public/static'],
        ],
      },
    },
  },
  plugins: ['react'],
  rules: {
    'react/jsx-no-bind': 0,
    'no-unused-expressions': 0,
    'consistent-return': 0,
    'react/require-default-props': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-no-constructed-context-values': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'react/no-unstable-nested-components': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/no-array-index-key': 0,
    'no-underscore-dangle': 0,
    'react/jsx-props-no-spreading': 0,
    'no-param-reassign': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-shadow': 0,
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
