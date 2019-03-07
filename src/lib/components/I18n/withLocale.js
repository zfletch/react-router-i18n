import React from 'react';

import { withRouter } from 'react-router-dom';

const withLocale = (WrappedComponent) => {
  const NewComponent = ({
    to, match, ignoreLocale, staticContext, ...rest
  }) => {
    const { params } = match;

    if (ignoreLocale) {
      return (
        <WrappedComponent
          to={to}
          match={match}
          {...rest}
        />
      );
    }

    let path = to;

    if (params && params.locale) {
      path = path[0] === '/'
        ? `/${params.locale}${path}`
        : `${params.locale}/${path}`;
    }

    return (
      <WrappedComponent
        to={path}
        match={match}
        {...rest}
      />
    );
  };

  return withRouter(NewComponent);
};

export default withLocale;
