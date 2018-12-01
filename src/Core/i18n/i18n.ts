import RNLanguages from 'react-native-languages';
import i18nJs from 'i18n-js';

const en = require('./translations/en.json');
const cs = require('./translations/cs.json');

i18nJs.locale = RNLanguages.language;
i18nJs.fallbacks = true;
i18nJs.translations = { cs, en };

export const i18n = i18nJs;
