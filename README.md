# eslint-config-bzc
Eslint Config for my personal and professional projects.

The rules defined in this package are purely my personal preference over years of development. It starts with `eslint-config-airbnb` as a base and shakes things up by either turning off overkill rules or adding more.

## Installation

```
npm install --save-dev eslint-config-bzc
```
or
```
yarn add -D eslint-config-bzc
```

In addition you will also need a list of peer dependencies for the linter to run properly
```
@babel/core @babel/eslint-parser @babel/plugin-syntax-flow @babel/plugin-transform-react-jsx eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-fb-flow eslint-plugin-flowtype eslint-plugin-react-hooks eslint-plugin-testing-library
```

## Set up

In your `.eslintrc.js` file you can add the following
```
extends: ['eslint-config-bzc'],
```

eg:
```
module.exports = {
  extends: ['eslint-config-bzc'],
  // ...
};
```
