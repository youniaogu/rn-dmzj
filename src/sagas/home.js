import {all, fork, put, call, select, takeEvery} from 'redux-saga/effects';
import {loadMangaCompletion} from '../actions';
import fetchData from './fetchData';

function* loadMangaSaga() {
  yield takeEvery('LOAD_MANGA', function*() {
    const {types, readergroup, status, zone, sort, page} = yield select(
      state => state.home.manga,
    );

    const result = yield call(fetchData, {
      url: `https://m.dmzj.com/classify/${types}-${readergroup}-${status}-${zone}-${sort}-${page}.json`,
    });

    yield put(loadMangaCompletion(result));
  });
}

export default function*() {
  yield all([fork(loadMangaSaga)]);
}
