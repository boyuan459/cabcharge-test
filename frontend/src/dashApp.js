import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, history } from './redux/store';
import PublicRoute from './router';

import { loadState, saveState } from './helpers/utility';
import throttle from 'lodash/throttle';

const persistedState = loadState();

const store = configureStore(persistedState);

//save store to local storage every second
store.subscribe(throttle(() => {
    saveState(store.getState())
}, 1000));

const DashApp = () => (
    <Provider store={store}>
        <PublicRoute history={history} />
    </Provider>
);

export default DashApp;