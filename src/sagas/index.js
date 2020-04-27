import {all, fork, put, call, select, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {
  store,
  loadMangaListCompletion,
  loadMangaChapterCompletion,
  loadMangaPageCompletion,
  searchMangaCompletion,
  collectCompletion,
} from '../actions';
import {fetchData} from './fetchData';

function* InitSaga() {
  yield takeLatest('INIT', function*() {
    let collection = JSON.parse(
      yield call(AsyncStorage.getItem, '@collection'),
    );

    if (Object.prototype.toString.call(collection) !== '[object Array]') {
      collection = [];
    }

    console.log(collection);

    yield put(store({collection}));
  });
}

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
  yield takeLatest('LOAD_MANGA_CHAPTER', function*({id, name}) {
    const data = yield call(fetchData, {
      url: `https://m.dmzj.com/info/${id}.html`,
      body: 'html',
      type: 'chapter',
    });

    yield put(loadMangaChapterCompletion(id, data));
  });
}

function* loadMangaPageSaga() {
  yield takeLatest('LOAD_MANGA_PAGE', function*({id, cid}) {
    const data = yield call(fetchData, {
      url: `https://m.dmzj.com/view/${cid}/${id}.html`,
      body: 'html',
      type: 'page',
    });

    yield put(loadMangaPageCompletion(data.error, {...data, id}));
  });
}

function* searchMangaSaga() {
  yield takeLatest('SEARCH_MANGA', function*({name}) {
    const data = yield call(fetchData, {
      url: `https://m.dmzj.com/search/${name}.html`,
      body: 'html',
      type: 'search',
    });

    yield put(searchMangaCompletion(data.error, data));
  });
}

function* collectSaga() {
  yield takeLatest('COLLECT', function*({id}) {
    let result = [];
    let collection = JSON.parse(
      yield call(AsyncStorage.getItem, '@collection'),
    );

    if (Object.prototype.toString.call(collection) !== '[object Array]') {
      collection = [];
    }

    const index = collection.indexOf(id);
    if (index !== -1) {
      result = collection.filter(item => item !== id);
    } else {
      collection.push(id);
      result = [].concat(collection);
    }
    yield call(AsyncStorage.setItem, '@collection', JSON.stringify(result));

    return yield put(collectCompletion(false, result));
  });
}

export default function*() {
  yield all([
    fork(InitSaga),
    fork(loadMangaListSaga),
    fork(loadMangaChapterSaga),
    fork(loadMangaPageSaga),
    fork(searchMangaSaga),
    fork(collectSaga),
  ]);
}
