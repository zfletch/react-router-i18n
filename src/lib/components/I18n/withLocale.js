import React from 'react';
import PropTypes from 'prop-types';

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

  NewComponent.propTypes = {
    to: PropTypes.string.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        locale: PropTypes.string,
      }),
    }).isRequired,
    ignoreLocale: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    staticContext: PropTypes.object,
  };

  NewComponent.defaultProps = {
    ignoreLocale: false,
    staticContext: undefined,
  };

  return withRouter(NewComponent);
};

export default withLocale;
