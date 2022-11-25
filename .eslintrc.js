module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    "prettier"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],

  rules: {
    'semi': [2, 'always'],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-undef': ['error'],
    'comma-dangle': ['error', 'only-multiline'],
    'keyword-spacing': ['error', { before: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'always', next: '*', prev: ['const', 'let'] },
      { blankLine: 'always', next: ['const', 'let'], prev: '*' },
      { blankLine: 'never', next: ['const', 'let'], prev: ['const', 'let'] },
      { blankLine: 'always', next: '*', prev: 'if' },
      { blankLine: 'always', next: 'if', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'try' },
      { blankLine: 'always', next: 'try', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'block' },
      { blankLine: 'always', next: 'block', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'multiline-const' },
      { blankLine: 'always', next: 'multiline-const', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'multiline-block-like' },
      { blankLine: 'always', next: 'multiline-block-like', prev: '*' },
      { blankLine: 'always', next: '*', prev: 'expression' },
      { blankLine: 'always', next: 'expression', prev: '*' },
      { blankLine: 'never', next: 'expression', prev: 'expression' },
      { blankLine: 'always', next: '*', prev: 'multiline-expression' },
      { blankLine: 'always', next: 'multiline-expression', prev: '*' },
    ],
    'react/forbid-prop-types': [0, {}],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': [1, { custom: 'ignore' }],
    'react/require-default-props': [0, {}],
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: false,
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
      },
    ],
  },
};
