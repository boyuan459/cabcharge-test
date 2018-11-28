import * as Actions from './actions';
import { select, put, call, takeEvery } from 'redux-saga/effects';
import { send } from '../../services/email';

function* handleSendEmail(action) {
    try {
        const result = yield call(send, action.data);
        console.log('SAGA', result);
        const email = { ...action.data, id: result.id };
        yield put(Actions.sendEmailSuccess(email));
    } catch (error) {
        yield put(Actions.sendEmailFailed(error));
    }
}

export default function* saga() {
    yield takeEvery(Actions.SEND_EMAIL, handleSendEmail);
}