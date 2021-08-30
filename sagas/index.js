import { all } from 'redux-saga/effects';
import employerSaga from './employer';

export default function* IndexSaga() {
  yield all([
    employerSaga(),
  ]);
}
