module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  env: {
    browser: false,
    node: true,
    es6: true,
    mocha: true,
  },
  plugins: [
    'react',
  ],
  rules: {
    'eqeqeq': ['error', 'always', {'null': 'never'}],
    'curly': ['error', 'all'],
    'guard-for-in': 'error',
    'no-eval': 'error',
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'spaced-comment': ['error', 'always', {'exceptions': ['-', '+']}],
    'comma-dangle': ['error', 'always-multiline'],
    'no-cond-assign': ['error', 'always'],
    'key-spacing': 'error',
    'brace-style': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'space-infix-ops': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'object-property-newline': ['error', {'allowMultiplePropertiesPerLine': true}],
    'eol-last': ['error', 'always'],
    'camelcase': 'error',
    'no-var': 'error',
    'no-const-assign': 'error',
    'no-undefined': 'error',
    'no-shadow': 'warn',
    'dot-notation': 'error',
    'valid-typeof': 'error',
    'object-curly-spacing': 'error',
    'array-bracket-spacing': 'error',
    'no-console': 'off',
    'space-before-function-paren': ['error', 'never'],
    'no-unused-vars': ['error', {'args': 'all', 'argsIgnorePattern': '^_'}],
    'react/jsx-uses-vars': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-no-undef': 'error',
    'react/no-unknown-property': 'error',
    'react/no-render-return-value': 'error',
  },
};
