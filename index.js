module.exports = {
  extends: [
    'airbnb',
    'plugin:ft-flow/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  parser: 'hermes-eslint',
  plugins: [
    'react',
    'jest',
    'fb-flow',
    'ft-flow',
    'react-hooks',
    'testing-library',
  ],
  settings: {
    'ft-flow': {
      onlyFilesWithFlowAnnotation: true,
    },
  },
  rules: {
    camelcase: 0,
    'fb-flow/use-indexed-access-type': 2,
    'ft-flow/array-style-complex-type': 2,
    'ft-flow/array-style-simple-type': 2,
    'ft-flow/delimiter-dangle': [
      2,
      'always-multiline',
    ],
    'ft-flow/no-weak-types': [2, {
      any: false,
      Object: true,
      Function: true,
    }],
    'ft-flow/enforce-line-break': 2,
    'ft-flow/enforce-suppression-code': 2,
    'ft-flow/newline-after-flow-annotation': [2, 'never'],
    'ft-flow/object-type-curly-spacing': [2, 'always'],
    'ft-flow/object-type-delimiter': [2, 'comma'],
    'ft-flow/quotes': [2, 'single'],
    'ft-flow/semi': [2, 'always'],
    'ft-flow/interface-id-match': ['error', '^_?([A-Z][A-Za-z0-9$]*I)$'],
    'ft-flow/type-id-match': ['error', '^_?([A-Z][A-Za-z0-9$]*T|Props)$'],
    // Turn off for now because of enums until it's fixed.
    // Flow basically does this checking for us anyways
    'import/named': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // Rule incompatible with flowtype's type imports
    // eg: import type { Blah } from 'blah'; module.exports = {};
    'import/no-import-module-exports': 0,
    'import/no-named-as-default': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: '{@tabdigital,@hometale}/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
      },
    ],
    'import/prefer-default-export': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'max-len': ['error', 100, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignorePattern: '^.*React\\$AbstractComponent.*',
    }],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-continue': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'prefer-promise-reject-errors': 0,
    'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: true }],
    'react/destructuring-assignment': 0,
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'react/jsx-curly-brace-presence': ['error', {
      props: 'never',
      children: 'ignore',
    }],
    'react/jsx-curly-spacing': [2, {
      when: 'never',
      children: true,
    }],
    'react/jsx-indent': [2, 2, {
      checkAttributes: true,
      indentLogicalExpressions: true,
    }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/jsx-newline': ['error', { prevent: true }],
    'react/jsx-props-no-spreading': 0,
    // Majority of our code uses flowtype now so this is not necessary
    'react/require-default-props': 0,
    'react/no-unstable-nested-components': [2, { allowAsProps: true }],
    'react-hooks/rules-of-hooks': 2,
    'testing-library/no-dom-import': 2,
    'testing-library/no-manual-cleanup': 2,
    'testing-library/no-wait-for-empty-callback': 2,
    'testing-library/no-wait-for-side-effects': 2,
    'testing-library/prefer-screen-queries': 2,
    'testing-library/prefer-wait-for': 2,
  },
};
