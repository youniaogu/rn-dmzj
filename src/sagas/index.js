import {
  all,
  fork,
  put,
  call,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  loadMangaListCompletion,
  loadMangaChapterCompletion,
  loadMangaPageCompletion,
} from '../actions';
import fetchData from './fetchData';

function* loadMangaListSaga() {
  yield takeLatest('LOAD_MANGA_LIST', function*() {
    const {types, readergroup, status, zone, sort, page} = yield select(
      state => state.mangaList,
    );

    const data = yield call(fetchData, {
      url: `https://m.dmzj.com/classify/${types}-${readergroup}-${status}-${zone}-${sort}-${page}.json`,
    });

    yield put(loadMangaListCompletion(data));
  });
}

function* loadMangaChapterSaga() {
  yield takeEvery('LOAD_MANGA_CHAPTER', function*({id, name}) {
    const data = yield call(fetchData, {
      url: `http://192.168.1.40:3000/chapter/${name}`,
    });

    yield put(loadMangaChapterCompletion(id, data));
  });
}

function* loadMangaPageSaga() {
  yield takeEvery('LOAD_MANGA_PAGE', function*({id, cid}) {
    const data = yield call(fetchData, {
      url: `http://192.168.1.40:3000/page/${cid}/${id}`,
    });

    yield put(loadMangaPageCompletion(data.error, {...data, id}));
  });
}

export default function*() {
  yield all([
    fork(loadMangaListSaga),
    fork(loadMangaChapterSaga),
    fork(loadMangaPageSaga),
  ]);
}
