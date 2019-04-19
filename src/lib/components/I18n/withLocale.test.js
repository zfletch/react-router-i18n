import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Route } from 'react-router-dom';
import withLocale from './withLocale';

const OriginalComponent = ({ to, text }) => (
  <div>
    {to}
    {text}
  </div>
);
const WrappedComponent = withLocale(OriginalComponent);

it('renders without crashing', () => {
  const component = (
    <MemoryRouter>
      <WrappedComponent to="test" />
    </MemoryRouter>
  );

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders normally when there is no match', () => {
  const component = (
    <MemoryRouter initialEntries={['/home/']}>
      <Route exact path="/:locale?/home" component={() => <WrappedComponent to="test" />} />
    </MemoryRouter>
  );

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

it('adds the locale to `to` when there is a match', () => {
  const component = (
    <MemoryRouter initialEntries={['/fr/home/']}>
      <Route exact path="/:locale?/home" component={() => <WrappedComponent to="test" />} />
    </MemoryRouter>
  );

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

it('passes through any other arguments', () => {
  const component = (
    <MemoryRouter>
      <WrappedComponent to="test" text="example" />
    </MemoryRouter>
  );

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
