import {
  Link as RRLink,
  NavLink as RRNavLink,
  Redirect as RRRedirect,
} from 'react-router-dom';

import withLocale from './withLocale';
import createI18n from './createI18n';

const Link = withLocale(RRLink);
const NavLink = withLocale(RRNavLink);
const Redirect = withLocale(RRRedirect);

export {
  createI18n,
  Link,
  NavLink,
  Redirect,
};
