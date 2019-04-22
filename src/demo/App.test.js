import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

it('renders with full navbar and Home page', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders text in another locale', () => {
  const component = renderer.create(<App />);
  const { history } = component.root.findByProps({ href: '/' }).props;

  history.push('/fr/')

  // this is generated randomly; set it to avoid spurious diffs
  history.location.key = 'test';

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot();
});
