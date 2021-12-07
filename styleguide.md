# brianzchen's Style Guide() {

When writing code every line should have thought put behind it. Ask yourself, why add a newline or why not, why multiline this function?

> When you add code to an existing block, adding it to the end is not necessarily the best thing, it may not make sense to a new comer. Where would you want this variable positioned if you were in someone elses shoes?

# Table of Contents
1. [Import rules](#import-rules)
2. [Declarative programming](#declarative-programming)
3. [Import React with *](#import-react-with-*)
4. [Basic module structure of React components](#basic-module-structure-of-react-components)
5. [React render return null first](#react-render-return-null-first)
6. [Component prop indentation and multiline](#component-prop-indentation-and-multiline)
7. [Setting state derived from previous state](#setting-state-derived-from-previous-state)
8. [Folder structure and naming conventions for React components](#folder-structure-and-naming-conventions-for-react-components)
9. [Sizing values in css-in-js objects](#sizing-values-in-css-in-js-objects)
10. [Use undefined](#use-undefined)
11. [PascalCase vs camelCase for JS variable naming](#pascalcase-vs-camelcase-for-js-variable-naming)
12. [HTML attribute strings](#html-attribute-strings)
13. [New lines in JSX blocks](#new-lines-in-jsx-blocks)
14. [Single line if statements](#single-line-if-statements)
15. [Use curly brace around strings in JSX blocks](#use-curly-brace-around-strings-in-jsx-blocks)
16. [Inline styles on html elements](#inline-styles-on-html-elements)
17. [Avoid classes in general](#avoid-classes-in-general)
18. [Exporting inline](#exporting-inline)
19. [Type Definition T Suffix](#type-definition-t-suffix)
<!-- end of contents -->

---

## Import rules

Generally the rule of imports breaks into 4 major categories, third part, first party, absolute, and relative.

Each of these imports should be structured in their own groups, separated by a new line.

On top of this, imports should be ordered alphabetically, with the exception of third party imports which should follow the format:

- React and it's related libraries
- Redux or testing tools and it's related libraries
- Anything else that's of high importance and value
- All supporting utility libraries such as lodash/moment/etc

Keeping this standard allows a developer to come in and easily know the basic requirements of your module without reading too much into the code.

```js
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import { Box } from '@company-x/component-lib';

import AbsoluteComp from '@views/AbsoluteComp';
import ThatComponent from '@views/ThatComponent';

import RelativeComponent from './RelativeComponent';
```

## Declarative programming

`const` should always be used in favour of `let`.

This makes us more declarative and as a result pushes us to a functional mindset of development.

If you typically did
```js
let that;
if (test === 'hi') {
  that = 'bye';
} else {
  that = 'hi';
}
```

It could be shortened to
```js
const test = test === 'hi' ? 'bye' : 'hi';
```

If you have more complicated logic to determine your final result, it creates an indication that you should push this logic out to another function that would return the result. This ultimately creates small functions that can be tested and reasoned about in isolation.

```js
const func = (input) => {
  switch (input) {
    case 'this':
      return 'hi';
    case 'that':
      return 'boo';
    default:
      return 'baz';
  }
}

const thing = func('something else');
```

## Import React with *

When you read and learn about react, you will generally see this statement a lot

```js
import React from 'react';
```

But contrary to popular belief, the correct way to import as recommended by the react team is to write it as

```js
import * as React from 'react';
```

By doing so we also simplify development when using react properties such as `useEffect`, `useState` without the hassle of adding more imports at the top of a module.

In particular when developing with flowtype it allows us to access the type definitions defined in the library definitions such as `React.Node` and `React.ComponentType`.

Reference: https://twitter.com/search?q=import%20*%20as%20react&src=typed_query

## Basic module structure of React components

For consistency your module should always only consist of a single component and should be structured in the following way.

With React functional components, it can get very messy very quickly if there is no structure to follow on where to define what, which causes future developers needing to scroll around trying to find exactly what.

```js
// Good
type Props = {
  ...
};

const Component = (): React.Node => {
  // Any constants or hooks
  const theme = useTheme();
  const history = useHistory();

  // State which may derive from constants
  const [something, setSomething] = useState();

  // Hooks which may rely on state or constants
  React.useEffect(() => {
    // ...
  });

  // Functions
  const handleAction = () => {

  };

  // Styles defined closely to jsx block
  const styles = {
    a: {
      // ...
    },
    b: {
      // ...
    }
  };

  return (
    <div>
      {something}
    </div>
  );
};

export default Component;
```

```js
// Bad
type Props = {
  ...
};

const Component = (): React.Node => {
  // Will need to scroll up and down when working on styles with jsx
  const styles = {
    a: {
      // ...
    },
    b: {
      // ...
    }
  };

  // State which may derive from constants
  const [something, setSomething] = useState();

  // High potential of constants needing to be used higher up and will cause inconsistencies
  const theme = useTheme();
  const history = useHistory();

  // Hooks which may rely on state or constants
  React.useEffect(() => {
    // ...
  });

  // Functions
  const handleAction = () => {

  };

  return (
    <div>
      {something}
    </div>
  );
};

export default Component;
```

Following this basic structure even without all the supporting code blocks initially will make your module easier to extend and enhance without massive code diffs when opening pull requests. A future developer who wants to find logic within a component in the future can easily scroll to a given area and find what they need easily.

## React render return null first

In your component, it's common practice to return your main JSX block at the end of your function. Any exit conditions should happen before this.

```js
const Component = ({ data }) => {
  if (!data) return null;

  if (data.length === 0) {
    return (
      <EmptyState />
    );
  }

  return (
    <div>
      // ...
    </div>
  );
}
```

## Component prop indentation and multiline

As a shortcut you can opt to define all your props on the same line you declare your component.

```js
return (
  <Comp valid={test === 1} />
);
```

But it's typically more advantageous to multiline all your props. This will lead to easier to read code, as well as improving the diff created from pull requests.

```js
return (
  <Comp
    valid={test === 1}
  />
);

// --- or

return (
  <Comp
    data={data}
    valid={test === 1}
    onClick={(e) => {
      something(e.target.value);
    }}
  />
)
```

## Setting state derived from previous state

In React, a common use case is to update a state variable based on what it used to be or as a mutation of the previous value. Such as setting a modal's state from open to closed state.

In these cases we recommend you use the method of passing the new value as a function as opposed to a value. During high speed reads/writes this will ensure the values used are consistent with the current value of the instance.

> For consistency and convenience, naming the function param prefixed with `p` reduces issues with name conflicts or using arbitrary keys such as `o` or `i`.

```js
// good
const [open, setOpen] = useState(false);
setOpen((pOpen) => !pOpen);

const [data, setData] = useState({});
setOpen((pData) => ({
  ...pData,
  newProp: '123',
}));

// bad
const [open, setOpen] = useState(false);
setOpen(!open);

const [data, setData] = useState({});
setOpen({
  ...data,
  newProp: '123',
});
```

## Folder structure and naming conventions for React components

React is all about composition. A component to a parent may in actual fact be composed of many smaller components. Because of this, it's important to create a folder structure that embodies this encapsulation.

```
- App
    - index.js
    - Body
          - index.js
          - Header.js
          - Table
                - index.js
                - Row.js
                - PageTurner.js
    - Footer.js
    - LoginModal
          - index.js
          - Background.js
          - Header
                - Text.js
                - CloseButton.js
          - Body.js
```

All folders should contain an `index.js` file, which when importing the directory, will automatically resolve to the index file.

All Components should start of as being a simple file, named the same as their component. When the components gets too large, you can break it into smaller components then move it into a directory named the same as the component and nest all child components in it. The parent will not need to be modified for this change, as long as the dir name matches the previous file name.

By doing this, any developer can read the folder structure compared to the real application and very easily find the component they're interested in.

If they look at `Row.js` for example, without having a full understanding of the rest of the application can easily tell it's being consumed by `Table/index.js`, whose parent is, `Body/index.js` and so on.

## Sizing values in css-in-js objects

When writing CSS objects in JS, it's generally good practice to include `px` to the value, despite react being able to infer the value if only a number is supplied.

Doing this creates a level of consistency in the system where if you define many CSS properties using a shorthand, you are required to pass in the unit.

```js
const style = {
  padding: '0 8px 24px',
};
```

Also if we get into a habit of not passing in the unit it can lead to some unexpected behaviour down the line.

As an example, `lineHeight` accepts both values with or without units. If the unit if not supplied `lineHeight` will use that as the multiplier to apply to all it's child elements as opposed to the element itself.

## Use undefined

Prioritise using `undefined` over `null` whenever possible.

When a developer wants to know if a value is not populated the common way to do this could be.

```js
if (!value)
```

But this is not always accurate as `''` and `0` also resolve to `false` in conditional statements. To combat this a developer may write the following

```js
if (typeof value === 'undefined')
```

This statement has the added value of being able to check the value even if it's not defined in the give scope, which  makes it very powerful. But if we mix null and undefined in the system then this statement will not always be reliable.

---

The only exception would be when working with DOM nodes such as returning components, where returning `null` tells React to render nothing.

## PascalCase vs camelCase for JS variable naming

PascalCase should be used for classes or components.

camelCase should be used in all other circumstances.

**note** This also applies for module naming, for example if you have a component called `MyComp` the corresponding module should be named as `MyComp.js` to allow easier debugging

## HTML attribute strings

When declaring string attributes to an HTML element, using `kebab-case` is the standard practice across the web community. This falls inline with how generally tags and attributes rendered across the the DOM are kept lower-case.

```html
<div
  id="my-id"
  class="a-class another-class"
  data-testid="an-element"
>
  hello
</div>
```

## New lines in JSX blocks

If you want to create new lines in between JSX statements to improve readability it's probably a good indication that your component is too large and you're better off splitting them into multiple smaller components that compose together.

```js
// Bad
const Comp = () => (
  <div>
    <Modal>
      {/* ... */}
    <Modal>

    <Modal>
      {/* ... */}
    <Modal>

    <div>
      {/* ... */}
    </div>
  </div>
)
```

## Single line if statements

Keep it simple, if you have a short if statement, you can write it in one line.

```js
// good
if (!data) return null;

// bad
if (!data) {
  return null;
}

// good
if (!data
    && this.state.foo === 'hi'
    && testData.indexOf('hi') > -1) {
  return data.thing(this.state.foo);
}

// bad
if (!data && this.state.foo === 'hi' && testData.indexOf('hi') > -1) return data.thing(this.state.foo);
```

## Use curly brace around strings in JSX blocks

If you have a long line of text or paragraph, you can render it all on a single line by wrapping it with a set of curly braces `{}`. This also removes any ambiguity with how new lines are handled when JSX is converted to HTML.

```js
// Basic example
return (
  <div>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
  </div>
);

// With components example
return (
  <div>
    {'If you click '}
    <a>
      here
    </a>
    {' you will be taken to '}
    <a>
      Google
    </a>
    {'.'}
  </div>
)
```

When dealing with strings where variables are mixed, string literals are preferred as it allows other developers to easily read and enhance as a sentence.

```js
return (
  <div>
    {`My name is ${name} and I am ${age} years old.`}
  </div>
);
```

## Inline styles on html elements

Applying inline styles directly on a default html element in React is only recommended when prototyping.

The recommended approach is to use a styling tool such as [styled components](https://github.com/styled-components/styled-components) or [aphrodite](https://github.com/Khan/aphrodite). Alternatively if you use the (Tab-X)[http://tabx.tabdigital.com.au] component library, it will use one of these tools in the underlying component so you don't need to worry about this.

Using the default inline styles can cause performance problems if the component is rendered multiple times. This is because it injects the styles into the actual DOM element as opposed to a stylesheet in the head of the DOM. Which results in increased computation if the component is constantly re-rendered or if there are multiple instances of it.

```js
// bad
return (
  <div
    style={{
      height: '64px',
      color: 'black',
    }}
  />
);

// good
return (
  <Box
    style={{
      height: '64px',
      color: 'black',
    }}
  />
);

// good
// with aphrodite
const styles = StyleSheet.create({
  box: {
    height: '64px',
    color: 'black',
  },
});

return (
  <div
    className={css(styles.box)}
  />
);
```

## Avoid classes in general

Classes have always been around since the days of es5, but have really caught on with es6 with the introduction of the syntactical sugar, `class` keyword.

But although JavaScript supports classes, it doesn't mean we use should it. JavaScript in nature is a functional language and there are a few pitfalls when using a class as opposed to a plain function.

There are use cases for classes though and the key one is when later down the line you want multiple instances of a variable that you need to compare and check compatibility. A great example of this is the `Error` class that you may want to extend to `CustomError` and in the future check if `myVar instanceof Error`.

## Exporting inline

When developing a module, it's good to export variables inline, as opposed to exporting everything at the end of a module.

This reduces the thought process of an oncoming developer and requirement of having a full understanding of all surrounding code.

The exception would be a React component as specified [above](#Basic-module-structure-of-React-components) for the enhancement possibilities.

---

If a new developer wants to add another function to this list, perhaps in the middle because it's functionality relates closely with another function, they want to copy similar code and modify the name and functionality. Because they may not read the whole file for context they may mistakenly forget to export and question why the code does not work as expected.
```js
export const myFunc = () => {};

export const anotherFunc = () => {};

// ... more exports
```

In the following examples, you'll see that variables are defined and immediately exported. This is not necessary and can be simplified. An edge case to this would be if the variable is both exported and used in the module.
```js
// good
export default () => {};

// bad
const myFunc = () => {};

export default myFunc;

// good
export { default as thirdPartyLibrary } from 'third-party-library';
export { default as firstPartyLibrary } from 'first-party-library';

// bad
import thirdPartyLibrary from 'third-party-library';
import firstPartyLibrary from 'first-party-library';

export thirdPartyLibrary;
export firstPartyLibrary;
```

## Type Definition T Suffix

When creating a type with flowtype or otherwise, it's generally a good practice to suffix all type definitions with `T`. This is a standard adopted from Uber's codebase and and aims to reduce the cognitive load when naming a type in relation to a variable.

For example, imagine you have a race object you'd like to type. You may declare a variable called `race`, what would you name the type? `Race`, `RaceObj`, `RaceType`? It's pretty hard and may easily come into conflicts.

```
const RaceT = { ... };

const race: RaceT = {};
const Race: RaceT = new RaceClass();
```

An exception to this rule is with the type `Props` which has generally been accepted among the wider JS community as the standard type name for the object type that would be passed into any React component.

# };
