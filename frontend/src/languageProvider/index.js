import EnLang from './entries/en-US';
import ZhLang from './entries/zh-CN';
import { addLocaleData } from 'react-intl';

const AppLocale = {
    en: EnLang,
    'en-GB': EnLang,
    'zh-CN': ZhLang
};

addLocaleData(AppLocale["en"].data);
addLocaleData(AppLocale["en-GB"].data);
addLocaleData(AppLocale["zh-CN"].data);

export default AppLocale;
