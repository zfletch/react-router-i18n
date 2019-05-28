import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import createI18n from './createI18n';

const locales = ['en', 'fr'];
let translations = {
  en: {
    home: 'Home',
  },
  fr: {
    home: 'Accueil',
  },
};

let I18n;
beforeEach(() => {
  I18n = createI18n(
    locales,
    translations,
  );
});

it('renders without crashing', () => {
  const component = (
    <MemoryRouter>
      <I18n t="home" />
    </MemoryRouter>
  );

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

it('shows the translation of another locale', () => {
  const component = (
    <MemoryRouter initialEntries={['/fr/']}>
      <I18n t="home" />
    </MemoryRouter>
  );

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('nested translations', () => {
  beforeAll(() => {
    translations = {
      en: {
        nested: {
          translation: 'Nested',
        },
      },
    };
  });

  it('shows a nested translation', () => {
    const component = (
      <MemoryRouter>
        <I18n t="nested.translation" />
      </MemoryRouter>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('function translations', () => {
  beforeAll(() => {
    translations = {
      en: {
        time: ({ hour, minute }) => `${hour}:${minute}`,
      },
    };
  });

  it('executes the function and uses the result as the translation', () => {
    const component = (
      <MemoryRouter>
        <I18n t="time" args={{ hour: '12', minute: '30' }} />
      </MemoryRouter>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('default translations', () => {
  beforeAll(() => {
    translations = {
      en: {
        home: 'Home',
      },
    };
  });

  it('uses the default language translation when there is none', () => {
    const component = (
      <MemoryRouter initialEntries={['/fr/']}>
        <I18n t="home" />
      </MemoryRouter>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses props.children when there is no translation', () => {
    const component = (
      <MemoryRouter>
        <I18n t="other">
          Other
        </I18n>
      </MemoryRouter>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('does not render when there is no translation', () => {
    const component = (
      <MemoryRouter>
        <I18n t="other" />
      </MemoryRouter>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses the default if one is given and there is no translation', () => {
    I18n = createI18n(
      locales,
      translations,
      'Missing',
    );

    const component = (
      <MemoryRouter>
        <I18n t="other" />
      </MemoryRouter>
    );

    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
