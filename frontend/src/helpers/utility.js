import { Map } from 'immutable';

export function clearToken() {
    localStorage.removeItem('id_token');
}

export function getToken() {
    try {
        const idToken = localStorage.getItem('id_token');
        return new Map({ idToken });
    } catch (err) {
        clearToken();
        return new Map();
    }
}

export function getLinkFromMenu(item, url) {
    let link = '';
    if (item.link) {
        if (item.parentLink) {
            link = `${url}/${item.parentLink}/${item.link}`;
        } else {
            link = `${url}/${item.link}`;
        }
    } else {
        if (item.parentLink) {
            link = `${url}/${item.parentLink}`;
        } else {
            link = url;
        }
    }
    return link;
}

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        const state = JSON.parse(serializedState);
        if (Object.keys(state).length === 0 && state.constructor === Object) {
            return undefined;
        }
        const menusState = new Map({
            menus: state.Menus.menus,
            menusLoading: state.Menus.menusLoading
        });
        return {
            Menus: menusState
        };
    } catch (err) {
        console.log('load state error', err);
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        if (state) {
            const obj = {};
            obj['Menus'] = state['Menus'];
            const serializedState = JSON.stringify(obj);
            localStorage.setItem('state', serializedState);
        }
    } catch (err) {
        console.error('save state error', err);
    }
}

export const clearState = () => {
    try {
        localStorage.removeItem('state');
    } catch (err) {
        console.log('clear state error', err);
    }
}

export const saveTokens = tokens => {
    try {
        localStorage.setItem('tokens', JSON.stringify(tokens));
    } catch (err) {
        console.error('save tokens error', err);
    }
}

export const getTokens = () => {
    try {
        const tokens = localStorage.getItem('tokens');
        return tokens ? JSON.parse(tokens) : undefined;
    } catch (err) {
        return undefined;
    }
}

export const clearTokens = () => {
    try {
        localStorage.removeItem('tokens');
    } catch (err) {
        console.error('clear tokens error', err);
    }
}

export const buildQueryString = params => {
    let index = 0;
    let queryString = '';
    for(var key in params) {
        index++;
        if (index === 1) {
            queryString += key + '=' + encodeURIComponent(params[key]);
        } else {
            queryString += '&' + key + '=' + encodeURIComponent(params[key]);
        }
    }
    return queryString;
}