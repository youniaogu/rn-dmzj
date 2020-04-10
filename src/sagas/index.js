import {fork, all} from 'redux-saga/effects';
import home from './home';

export default function*() {
  yield all([fork(home)]);
}
