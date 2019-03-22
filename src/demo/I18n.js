import { createI18n } from '../lib';

const locales = ['en', 'fr', 'pl'];

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    topics: 'Topics',
    homePage: {
      title: 'Home',
      text: "This is the homepage",
    },
    aboutPage: {
      title: 'About',
      text: "About the project",
    },
    topicPage: {
      select: 'Please select a topic',
      components: 'Components',
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
    topicPage: {
      select: 'Choisissez un sujet',
      rendering: 'Rendu avec React',
      components: 'Composants',
    },
  },
  pl: {
    home: 'Eomehay',
    about: 'Boutaay',
    topics: 'Opicstay',
    homePage: {
      title: 'Omehay',
      text: "Histay siay hetay omehay agepay",
    },
    aboutPage: {
      title: 'Boutaay',
      text: 'Boutaay hetay rojectpay',
    },
    topicPage: {
      select: 'Leasepay electsay aay opictay',
      rendering: 'Enderedray ithway React',
      components: 'Omponentscay',
    },
  },  
}

const I18n = createI18n(
  locales,
  translations,
)

export default I18n;
