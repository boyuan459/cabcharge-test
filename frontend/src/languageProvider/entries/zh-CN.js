import appLocaleData from 'react-intl/locale-data/zh';
import antdZh from 'antd/lib/locale-provider/zh_CN';
import zhMessages from '../locales/zh-CN.json';

const ZhLang = {
    messages: {
        ...zhMessages,
    },
    locale: 'zh-CN',
    data: appLocaleData,
    antd: antdZh
};

export default ZhLang;