# React Router I18n

This is a small opinionated library for I18n (internationalization) using React Router.

## Demo

[https://zfletch.github.io/react-router-i18n/](https://zfletch.github.io/react-router-i18n/)

## Installation

`yarn add react-router-i18n`

Note that this package has the following peer dependencies:

```json
{
  "react": "^16.8.4",
  "react-dom": "^16.8.1",
  "react-router-dom": "^4.3.0 || ^5.0.0"
}
```

(See project on [npm](https://www.npmjs.com/package/react-router-i18n))

## How to use

### Demo

See the demo [App.js](/src/demo/App.js) and [I18n.js](/src/demo/I18n.js).

### Setup

First, create a component called `I18n`. It should look like this:

```jsx
import { createI18n } from 'react-router-i18n';

// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'fr'];

// Dictionary of translations
const translations = {
  en: {
    hello: 'Hello',
  },
  fr: {
    hello: 'Bonjour',
  }
}

const I18n = createI18n(
  locales,
  translations,
);

export default I18n;
```

Then make the following changes to your routes:

```jsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Match locales with regular expression containing each locale separated by `|`
const base = '/:locale(en|fr)?';

const App = () => (
  <Router>
    <>
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path={base} component={Home} />

      {/* <Route path="/hello" component={Hello} /> */}
      <Route path={`${base}/hello`} component={Hello} />
    </>
  </Router>
);

export default App;
```

### Usage

Once you have everything set up, you can use the `I18n` component for localization:

```jsx
import React from 'react';

import I18n from './I18n';

const Hello = () => (
  <div>
    <I18n t="hello" />
  </div>
)

export default Hello;
```

Since we defined `"hello"` in the `translations` object above,
this component will display "Hello" when the user visits `/hello`, or `/en/hello`.
It will display "Bonjour" when the user visits `/fr/hello`.

#### Links

To preserve the locale in links, the library provides `Link`, `NavLink`, and `Redirect` components.
These can be used anywhere the React Router component with the same name is used:

```jsx
import React from 'react';
import { Link, NavLink, Redirect } from 'react-router-i18n';

import I18n from './I18n';

const Hello = () => (
  <div>
    <I18n t="hello" />

    <Link to="/">
      <I18n t="homepage" />
    </Link>
  </div>
);

export default Hello;
```

To create a link that does not preserve the locale, use `ignoreLocale`:

```jsx
import React from 'react';
import { Link, NavLink, Redirect } from 'react-router-i18n';

import I18n from './I18n';

const Hello = () => (
  <div>
    <I18n t="hello" />

    <NavLink ignoreLocale to="/en/hello">
      English
    </NavLink>
    <NavLink ignoreLocale to="/fr/hello">
      French
    </NavLink>
  </div>
);

export default Hello;
```

##### Note

A `Link` must be used inside of a route that receives the `locale` param. For example:

```jsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-i18n';

const base = '/:locale(en|fr)?';

const App = () => (
  <Router>
    <>
      {/* This will not work because it does not receive `locale` */}
      {/* <Link to="/home">Home</Link> */}

      {/* Use code like this instead */}
      <Route path={base} render={() => <Link to="/home">Home</Link>} />

      <Route exact path={base} component={Home} />
      <Route path={`${base}/hello`} component={Hello} />
    </>
  </Router>
);

export default App;
```

#### Other functionality

##### Nested translations

The `translations` object can have objects inside of it. For example:

```javascript
const translations = {
  en: {
    home: {
      title: 'Home',
    }
  },
  fr: {
    home: {
      title: 'Accueil',
    }
  },
};
```

These can be used by giving the `I18n` component `t="home.title"`:

```jsx
<I18n t="home.title" />
```

##### Function translations

The `translations` object can have a function as the translation. For example:

```javascript
const translations = {
  en: {
    time: ({ hour, minute }) => `${hour}:${minute}`,
  },
  fr: {
    time: ({ hour, minute }) => `${hour}h${minute}`,
  },
};
```

An argument can be passed to the function by giving the `I18n` component `args`:

```jsx
<I18n t="time" args={{ hour: '12', minute: '30' }}  />
```

##### Translations outside of &lt;I18n&gt;

Translation text can also be retrieved outside of an `I18n` component using the `getTranslation` function. For example:

```javascript
const translations = {
  en: {
    search: 'Search...'
  },
  fr: {
    search: 'Rechercher...',
  },
}
```

```jsx
const { location } = this.props;

<input placeholder={I18n.getTranslation(location, 'search')} />
```

Note that
[location](https://github.com/ReactTraining/react-router/blob/0f5d701648568cf95bef66c9be0798c15eef6d50/packages/react-router/docs/api/location.md)
needs to be passed in as the first argument.
The `location` prop is passed to a component from React Router.

The `getTranslation` function takes an optional third argument that corresponds to the `args` attribute of the I18n component:

```jsx
const { location } = this.props;

<input placeholder={I18n.getTranslation(location, 'time', { hour: '12', minute: '30' })} />
```

##### Default translation

If there is no translation found for the given locale, the library will look in the following places:

1. The same `t` in the default locale (i.e. the first locale in the locales array).
2. The children of the `<I18n>` component.
3. The `missingText` passed to the `createI18n` function. By default this is `false`, so if no translation text is found, the `<I18n>` component will simply not render.

For example, given the following `I18n` component:

```jsx
import { createI18n } from 'react-router-i18n';

// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'fr'];

// Dictionary of translations
const translations = {
  en: {
    hello: 'Hello',
  },
  fr: {
    goodbye: 'Au revoir',
  }
};

const I18n = createI18n(
  locales,
  translations,
  'Unknown text',
);

export default I18n;
```

Used in this way:

```jsx
<>
  <I18n t="hello" />
  <I18n t="goodbye">
    Goodbye
  </I18n>
  <I18n t="other" />
</>
```

The page when viewed with `/fr` will show:

```
Hello
Au revoir
Unknown text
```

With `/en` it will show:

```
Hello
Goodbye
Unknown text
```

## Development

### Installation

`yarn install`

### Running tests

`yarn test`

### Running demo application

`yarn start`

### Deploying demo application

`yarn deploy`

### Building

`yarn build`

### Publishing

```
yarn build
npm publish
```

(Make sure to update the `version` in `package.json` before publishing a new release.)

## Upgrading Notes

This library is build on top of [DimiMikadze/create-react-library](https://github.com/DimiMikadze/create-react-library).
To upgrade to the latest version of `create-react-library`:

* In `package.json`, everything above `devDependencies` should not be updated,
  but everything below it should be replaced by the new versions in `create-react-library`.
* Add back the dependencies for the project
* All of the files in `./scripts` should be replaced with new versions in `create-react-library`.
* All of the files in `./config` should be replaced with new versions in `create-react-library`.
* Test to make sure that building and deploying demo application still work
