import {all, fork, call, takeEvery} from 'redux-saga/effects';
import fetchData from './fetchData';

function* mySaga() {
  yield takeEvery('ADD', function*() {
    const result = yield call(fetchData, {
      url: 'https://jsonplaceholder.typicode.com/users',
    });
  });
}

export default function*() {
  yield all([fork(mySaga)]);
}
