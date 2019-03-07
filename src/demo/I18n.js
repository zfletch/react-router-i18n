import { createI18n } from '../lib';

const locales = ['en', 'fr'];

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    topics: 'Topics',
    homePage: {
      title: 'Home',
    },
    aboutPage: {
      title: 'About',
    },
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    topics: 'Sujets',
    homePage: {
      title: 'Accueil',
      text: "Ceci est la page d'accueil",
    },
    aboutPage: {
      title: 'À propos',
      text: 'À propos du sujet',
    },
  },
}

const I18n = createI18n(
  locales,
  translations,
)

export default I18n;
