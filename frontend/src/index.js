import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './config/themes/theme';
import AppLocale from './languageProvider';
import { getLocale } from './services/locale';
import './index.css';
import DashApp from './dashApp';
import registerServiceWorker from './registerServiceWorker';

const locale = getLocale();
const currentAppLocale = AppLocale[locale] || AppLocale.en;

ReactDOM.render(
    <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
            <MuiThemeProvider theme={theme}>
                <DashApp />
            </MuiThemeProvider>
        </IntlProvider>
    </LocaleProvider>, document.getElementById('root'));
registerServiceWorker();
