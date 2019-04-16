import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import withLocale from './withLocale';

it('renders without crashing', () => {
  const OriginalComponent = () => (<div />);
  const WrappedComponent = withLocale(OriginalComponent);
  const div = window.document.createElement('div');
  const component = (
    <MemoryRouter>
      <WrappedComponent />
    </MemoryRouter>
  );
  render(component, div);
});
