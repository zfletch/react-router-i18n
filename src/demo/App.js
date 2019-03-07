import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Link, NavLink } from '../lib';

import I18n from './I18n';

const base = '/:locale(en|fr)?';

const App = () => (
  <Router>
    <div>
      <Route path={base} component={Header} />
      <hr />

      <Route exact path={base} component={Home} />
      <Route path={`${base}/about`} component={About} />
      <Route path={`${base}/topics`} component={Topics} />
    </div>
  </Router>
);

const stripLocale = (pathname, locale) => {
  if (!locale) {
    return pathname;
  }

  return pathname.replace(`/${locale}`, '');
};

const Header = ({ location: { pathname }, match: { params: { locale }}}) => (
  <ul>
    <li>
      <NavLink to="/">
        <I18n t="home" />
      </NavLink>
    </li>
    <li>
      <NavLink to="/about">
        <I18n t="about" />
      </NavLink>
    </li>
    <li>
      <NavLink to="/topics">
        <I18n t="topics" />
      </NavLink>
    </li>
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
  </ul>
);

const Home = () => (
  <div>
    <h2>
      <I18n t="homePage.title" />
    </h2>
    <p>
      <I18n t="homePage.text">
        This is the homepage
      </I18n>
    </p>
  </div>
);

const About = () => (
  <div>
    <h2>
      <I18n t="aboutPage.title" />
    </h2>
    <p>
      <I18n t="aboutPage.text">
        About the project
      </I18n>
    </p>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>
      <I18n t="topics" />
    </h2>
    <ul>
      <li>
        <Link ignoreLocale to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link ignoreLocale to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link ignoreLocale to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default App;
