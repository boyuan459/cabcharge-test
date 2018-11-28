import { Map, List } from 'immutable';
import * as Actions from './actions';

const initialState = new Map({
    error: null,
    loading: false,
    sent: new List(),
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SEND_EMAIL:
            return state.set('loading', true);
        case Actions.SEND_EMAIL_SUCCESS:
            return state.set('loading', false)
                    .set('error', null)
                    .set('sent', state.get('sent').push(action.email));
        case Actions.SEND_EMAIL_FAILURE:
            return state.set('loading', false)
                    .set('error', action.error);
        default:
            return state;
    }
}