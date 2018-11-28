import { fork } from 'redux-saga/effects';
import emailSaga from './email/saga';

export default function* rootSaga(getState) {
    yield fork(emailSaga);
}