import React from 'react';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from 'react-router-dom';

const hasKey = (obj, key) => (
  Object.prototype.hasOwnProperty.call(obj, key)
);

const dig = (obj, keys) => {
  if (!obj) {
    return null;
  }

  const [first, ...rest] = keys;

  if (rest.length === 0) {
    if (hasKey(obj, first)) {
      return obj[first];
    }

    return null;
  }

  if (hasKey(obj, first)) {
    return dig(obj[first], rest);
  }

  return null;
};

const getLocale = (path, defaultLocale, pathname) => {
  const { params } = matchPath(pathname, { path });

  if (!params) { return defaultLocale; }

  const { locale } = params;

  if (!locale) { return defaultLocale; }

  return locale;
};

const getValue = (path, defaultLocale, pathname, t, children, translations, missingText) => {
  const locale = getLocale(path, defaultLocale, pathname);
  const splitT = t.split('.');

  if (hasKey(translations, locale)) {
    const translation = dig(translations[locale], splitT);

    if (translation !== null) {
      return translation;
    }
  }

  const defaultTranslation = dig(translations[defaultLocale], splitT);

  if (defaultTranslation !== null) {
    return defaultTranslation;
  }

  if (children !== undefined) { return children; }

  return missingText;
};

const getTranslation = (
  path,
  defaultLocale,
  pathname,
  t,
  args,
  children,
  translations,
  missingText,
) => {
  const value = getValue(path, defaultLocale, pathname, t, children, translations, missingText);

  if (typeof value === 'function') {
    return value(args);
  }

  return value;
};

const createI18n = (locales, translations, missingText = false) => {
  const [defaultLocale] = locales;
  const path = `/:locale(${locales.join('|')})?`;

  const I18n = ({
    location: { pathname },
    children,
    t,
    args,
  }) => (
    <>
      {getTranslation(path, defaultLocale, pathname, t, args, children, translations, missingText)}
    </>
  );

  I18n.getTranslation = ({ pathname }, t, args = {}) => (
    getTranslation(path, defaultLocale, pathname, t, args, undefined, translations, missingText)
  );

  I18n.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    children: PropTypes.node,
    t: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    args: PropTypes.object,
  };
  I18n.defaultProps = {
    children: undefined,
    args: undefined,
  };

  return withRouter(I18n);
};

export default createI18n;
