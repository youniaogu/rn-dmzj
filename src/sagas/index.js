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
  getImgBase64,
  getImgBase64Completion,
  loadMangaChapterCompletion,
} from '../actions';
import fetchData from './fetchData';

function* loadMangaListSaga() {
  yield takeLatest('LOAD_MANGA_LIST', function*() {
    const {types, readergroup, status, zone, sort, page} = yield select(
      state => state.home.mangaList,
    );

    const result = yield call(fetchData, {
      url: `https://m.dmzj.com/classify/${types}-${readergroup}-${status}-${zone}-${sort}-${page}.json`,
    });

    for (let i = 0; i < result.length; i++) {
      yield put(getImgBase64(result[i].cover));
    }

    yield put(loadMangaListCompletion(result));
  });
}

function* getImgBase64Saga() {
  yield takeEvery('GET_IMG_BASE64', function*({cover}) {
    const result = yield call(fetchData, {
      url: `http://192.168.1.40:3000/refpic/${cover}`,
    });

    yield put(getImgBase64Completion({[cover]: result.base64}));
  });
}

function* loadMangaChapterSaga() {
  yield takeEvery('LOAD_MANGA_CHAPTER', function*({id, name}) {
    const data = yield call(fetchData, {
      url: `http://192.168.1.40:3000/manga/chapter/${name}`,
    });

    yield put(loadMangaChapterCompletion(id, data));
  });
}

export default function*() {
  yield all([
    fork(loadMangaListSaga),
    fork(getImgBase64Saga),
    fork(loadMangaChapterSaga),
  ]);
}
