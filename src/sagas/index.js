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

    for (let i = 0; i < data.length; i++) {
      yield put(getImgBase64(data[i].cover));
    }

    yield put(loadMangaListCompletion(data));
  });
}

function* getImgBase64Saga() {
  yield takeEvery('GET_IMG_BASE64', function*({cover}) {
    const data = yield call(fetchData, {
      url: `http://192.168.1.40:3000/refpic/${cover}`,
    });

    yield put(getImgBase64Completion({[cover]: data.base64}));
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

function* loadMangaPageSaga() {
  yield takeEvery('LOAD_MANGA_PAGE', function*({id, cid}) {
    const data = yield call(fetchData, {
      url: `http://192.168.1.40:3000/manga/page/${cid}/${id}`,
    });

    yield put(loadMangaPageCompletion(id, data));
  });
}

export default function*() {
  yield all([
    fork(loadMangaListSaga),
    fork(getImgBase64Saga),
    fork(loadMangaChapterSaga),
    fork(loadMangaPageSaga),
  ]);
}
