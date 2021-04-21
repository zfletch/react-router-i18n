import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

const newToPath = (to, locale) => (
  to[0] === '/'
    ? `/${locale}${to}`
    : `${locale}/${to}`
);

const newToObject = (to, locale) => {
  const { pathname } = to;

  if (typeof pathname !== 'string') { return to; }

  const toObj = { ...to, pathname: newToPath(pathname, locale) };

  return toObj;
};

const newToFunction = (to, locale) => (
  (location) => {
    const result = to(location);

    return typeof result === 'string'
      ? newToPath(result, locale)
      : newToObject(result, locale);
  }
);

const newTo = (to, params) => {
  if (!params) { return to; }

  const { locale } = params;

  if (!locale) { return to; }

  const type = typeof to;

  if (type === 'string') { return newToPath(to, locale); }
  if (type === 'function') { return newToFunction(to, locale); }

  return newToObject(to, locale);
};

const withLocale = (WrappedComponent) => {
  const NewComponent = ({
    to,
    match,
    history,
    location,
    ignoreLocale,
    staticContext,
    ...rest
  }) => {
    const { params } = match;

    if (ignoreLocale) {
      return (
        <WrappedComponent
          to={to}
          {...rest}
        />
      );
    }

    return (
      <WrappedComponent
        to={newTo(to, params)}
        {...rest}
      />
    );
  };

  NewComponent.propTypes = {
    to: PropTypes.oneOfType([
      PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      PropTypes.object,
      PropTypes.func,
    ]).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        locale: PropTypes.string,
      }),
    }).isRequired,
    ignoreLocale: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    staticContext: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object,
  };

  NewComponent.defaultProps = {
    ignoreLocale: false,
    staticContext: undefined,
    history: undefined,
    location: undefined,
  };

  return withRouter(NewComponent);
};

export default withLocale;
