import antdEn from 'antd/lib/locale-provider/en_US';
import appLocaleData from 'react-intl/locale-data/en';
import enMessages from '../locales/en-US.json';

const EnLang = {
    messages: {
        ...enMessages,
    },
    locale: 'en-US',
    data: appLocaleData,
    antd: antdEn
};

export default EnLang;