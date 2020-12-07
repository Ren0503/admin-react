import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './en';

const messages = {
    fr: () => import('./fr.js').then(messages => messages.default),
};

export default polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return messages[locale]();
    }

    // Always fallback on english
    return englishMessages;
}, 'en');