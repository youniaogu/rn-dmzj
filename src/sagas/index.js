import {all, fork, put, call, select, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {
  store,
  loadMangaListCompletion,
  loadMangaChapterCompletion,
  loadMangaPageCompletion,
  setProgressCompletion,
  searchMangaCompletion,
  collectCompletion,
} from '../actions';
import {fetchData} from './fetchData';

function* InitSaga() {
  yield takeLatest('INIT', function*() {
    const key = ['collection', 'lists', 'type', 'status', 'sort', 'progress'];
    const data = yield call([AsyncStorage, AsyncStorage.multiGet], key);

    const result = data.reduce((obj, item, index) => {
      obj[key[index]] = JSON.parse(item[1]);
      return obj;
    }, {});

    if (
      Object.prototype.toString.call(result.collection) !== '[object Array]'
    ) {
      result.collection = [];
    }
    if (Object.prototype.toString.call(result.lists) !== '[object Object]') {
      result.lists = {};
    }

    yield put(store(result));
  });
}

function* loadMangaListSaga() {
  yield takeLatest('LOAD_MANGA_LIST', function*() {
    const {type, readergroup, status, zone, sort, page} = yield select(
      state => state.mangaList,
    );

    const result = yield call(fetchData, {
      url: `https://m.dmzj.com/classify/${type}-${readergroup}-${status}-${zone}-${sort}-${page}.json`,
    });

    let lists = JSON.parse(yield call(AsyncStorage.getItem, 'lists'));
    if (Object.prototype.toString.call(lists) !== '[object Object]') {
      lists = {};
    }

    const keys = result.map(item => item.id);
    const data = result.reduce((dict, item) => {
      const {id, name, authors, status, cover, chapter = []} = item;

      dict[id] = {
        ...lists[id],
        id,
        name,
        authors,
        status,
        cover,
        chapter,
      };

      return dict;
    }, {});

    yield call(
      [AsyncStorage, AsyncStorage.multiSet],
      [
        ['lists', JSON.stringify({...lists, ...data})],
        ['type', JSON.stringify(type)],
        ['status', JSON.stringify(status)],
        ['sort', JSON.stringify(sort)],
      ],
    );

    yield put(loadMangaListCompletion(keys, data));
  });
}

function* loadMangaChapterSaga() {
  yield takeLatest('LOAD_MANGA_CHAPTER', function*({id}) {
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

function* setProgressSaga() {
  yield takeLatest('SET_PROGRESS', function*({obj}) {
    const {cid} = obj;

    let progress = JSON.parse(yield call(AsyncStorage.getItem, 'progress'));
    if (Object.prototype.toString.call(progress) !== '[object Object]') {
      progress = {};
    }

    progress[cid] = {...progress[cid], ...obj};

    yield call(AsyncStorage.setItem, 'progress', JSON.stringify(progress));
    yield put(setProgressCompletion({progress}));
  });
}

function* searchMangaSaga() {
  yield takeLatest('SEARCH_MANGA', function*({name}) {
    const result = yield call(fetchData, {
      url: `https://m.dmzj.com/search/${name}.html`,
      body: 'html',
      type: 'search',
    });

    let lists = JSON.parse(yield call(AsyncStorage.getItem, 'lists'));
    if (Object.prototype.toString.call(lists) !== '[object Object]') {
      lists = {};
    }

    const keys = result.map(item => item.id);
    const data = result.reduce((dict, item) => {
      const {id, name, authors, status, cover, chapter = []} = item;

      dict[id] = {
        ...lists[id],
        id,
        name,
        authors,
        status,
        cover,
        chapter,
      };

      return dict;
    }, {});
    yield call(
      AsyncStorage.setItem,
      'lists',
      JSON.stringify({...lists, ...data}),
    );

    yield put(searchMangaCompletion(keys, data));
  });
}

function* collectSaga() {
  yield takeLatest('COLLECT', function*({id}) {
    let result = [];
    let collection = JSON.parse(yield call(AsyncStorage.getItem, 'collection'));

    if (Object.prototype.toString.call(collection) !== '[object Array]') {
      collection = [];
    }

    if (collection.indexOf(id) !== -1) {
      result = collection.filter(item => item !== id);
    } else {
      collection.shift(id);
      result = [].concat(collection);
    }
    yield call(AsyncStorage.setItem, 'collection', JSON.stringify(result));

    return yield put(collectCompletion(false, result));
  });
}

function* clearStorageSaga() {
  yield takeLatest('CLEAR_STORAGE', function*() {
    AsyncStorage.clear();
  });
}

export default function*() {
  yield all([
    fork(InitSaga),
    fork(loadMangaListSaga),
    fork(loadMangaChapterSaga),
    fork(loadMangaPageSaga),
    fork(setProgressSaga),
    fork(searchMangaSaga),
    fork(collectSaga),
    fork(clearStorageSaga),
  ]);
}
