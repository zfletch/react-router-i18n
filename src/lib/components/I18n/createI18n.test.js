import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import createI18n from './createI18n';

it('renders without crashing', () => {
  const locales = ['en', 'fr'];
  const translations = {
    en: {
      home: 'Home',
    },
    fr: {
      home: 'Accueil',
    },
  };
  const I18n = createI18n(
    locales,
    translations,
  );
  const component = (
    <MemoryRouter>
      <I18n t="home" />
    </MemoryRouter>
  );
  const div = window.document.createElement('div');
  render(component, div);
});
