import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Link, NavLink } from '../lib';

import I18n from './I18n';

const base = '/:locale(en|fr|pig)?';

const stripLocale = (pathname, locale) => {
  if (!locale) {
    return pathname;
  }

  return pathname.replace(`/${locale}`, '');
};

const Header = ({
  location: { pathname },
  match: { params: { locale } },
  history,
}) => (
  <ul className="header" history={history}>
    <li>
      <NavLink to="/">
        <I18n t="home" />
      </NavLink>
    </li>
    <li>
      <NavLink to={{ pathname: '/about' }}>
        <I18n t="about" />
      </NavLink>
    </li>
    <li>
      <NavLink to={(location) => ({ ...location, pathname: '/topics' })}>
        <I18n t="topics" />
      </NavLink>
    </li>
    <br />
    <li>
      <NavLink ignoreLocale to={`/fr${stripLocale(pathname, locale)}`}>
        <I18n t="french">
          Français
        </I18n>
      </NavLink>
    </li>
    <li>
      <NavLink ignoreLocale to={`/en${stripLocale(pathname, locale)}`}>
        <I18n t="english">
          English
        </I18n>
      </NavLink>
    </li>
    <li>
      <NavLink ignoreLocale to={`/pig${stripLocale(pathname, locale)}`}>
        <I18n t="piglatin">
          Pig Latin
        </I18n>
      </NavLink>
    </li>
  </ul>
);

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      locale: PropTypes.string,
    }).isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

const Home = () => (
  <>
    <h2>
      <I18n t="homePage.title" />
    </h2>
    <p>
      <I18n t="homePage.text">
        This is the homepage
      </I18n>
    </p>
  </>
);

const Topic = ({ match: { params: { topicId } } }) => (
  <>
    <h3>
      <I18n t={topicId} />
    </h3>
  </>
);

Topic.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      topicId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const About = () => (
  <>
    <h2>
      <I18n t="aboutPage.title" />
    </h2>
    <p>
      <I18n t="aboutPage.text">
        About the project
      </I18n>
    </p>
  </>
);

const Topics = ({ match: { url, path } }) => (
  <>
    <h2>
      <I18n t="topics" />
    </h2>
    <ul>
      <li>
        <Link ignoreLocale to={`${url}/rendering`}>
          <I18n t="topicPage.rendering">
            Rendering with React
          </I18n>
        </Link>
      </li>
      <li>
        <Link ignoreLocale to={`${url}/components`}>
          <I18n t="topicPage.components">
            Components
          </I18n>
        </Link>
      </li>
      <li>
        <Link ignoreLocale to={`${url}/props_v_state`}>
          <I18n t="topicPage.props">
            Props v. State
          </I18n>
        </Link>
      </li>
    </ul>

    <Route path={`${path}/:topicId`} component={Topic} />
    <Route
      exact
      path={path}
      render={() => (
        <h3>
          {' '}
          <I18n t="topicPage.select"> Please select a topic. </I18n>
          {' '}
        </h3>
      )}
    />
  </>
);

Topics.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
};

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <>
      <Route path={base} component={Header} />
      <hr />
      <Route exact path={base} component={Home} />
      <Route path={`${base}/about`} component={About} />
      <Route path={`${base}/topics`} component={Topics} />
    </>
  </Router>
);

export default App;
