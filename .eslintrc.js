module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    jsx: true,
    useJSXTextNode: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:import/warnings',
    'plugin:unicorn/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
  rules: {
    // common rules
    'no-unused-vars': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    eqeqeq: 'error',
    'no-else-return': 'error',
    'no-multi-spaces': 'error',
    'no-console': 'warn',
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    camelcase: [
      'error',
      {
        ignoreImports: true,
        ignoreDestructuring: true,
        properties: 'always',
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order:
            'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
      },
    ],
    'no-lonely-if': 'error',
    'no-mixed-operators': 'error',
    'no-multi-assign': 'error',
    'no-nested-ternary': 'error',
    'no-plusplus': 'error',
    'no-unneeded-ternary': ['error'],
    'one-var': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
    ],
    'no-var': 'error',
    'prefer-const': 'error',

    // react rules
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'react/no-array-index-key': 'error',
    'react/react-in-jsx-scope': 'off',

    // comments rules
    'sort-vars': ['error', { ignoreCase: true }],
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // unicorn rules
    'unicorn/prefer-query-selector': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    // typescript rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/no-magic-numbers': [
      'warn',
      {
        ignoreEnums: true,
        ignoreArrayIndexes: true,
        ignore: [200, 300, 500, 401, 404, 503],
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
