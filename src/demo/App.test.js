
import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

it('renders with full navbar and Home page', () => {
  	const tree = renderer.create(<App />).toJSON();
  	expect(tree).toMatchSnapshot();
});