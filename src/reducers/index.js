import {combineReducers} from 'redux';

const initialMangaListState = {
  list: [],
  type: 0,
  readergroup: 0,
  status: 0,
  zone: 0,
  sort: 0, // 0人气，1更新
  page: 0,
  loadStatus: 0,
};

const initialPageState = {};

const initialListsState = {};

const initialMangaState = {
  refresh: false,
  loadStatus: 0,
};

const initialSearchState = {
  list: [],
  loadStatus: 0,
};

const initialCollectionState = {
  list: [],
};

const initialProgressState = {};

function mangaListReducer(state = initialMangaListState, action) {
  switch (action.type) {
    case 'STORE': {
      return {
        ...state,
        status: +action.data.status,
        type: +action.data.type,
        sort: +action.data.sort,
      };
    }
    case 'HANDLE_PICKER_INPUT': {
      const {name, value} = action;

      return {
        ...state,
        [name]: value,
      };
    }
    case 'LOAD_MANGA_LIST': {
      if (action.isReset) {
        return {
          ...state,
          page: 0,
          list: [],
          loadStatus: 1,
        };
      }

      let {page, list} = state;
      if (list.length !== 0) {
        page++;
      }

      return {
        ...state,
        page,
        loadStatus: 1,
      };
    }
    case 'LOAD_MANGA_LIST_COMPLETION': {
      return {
        ...state,
        list: [...state.list, ...action.keys],
        loadStatus: 2,
      };
    }
    default:
      return state;
  }
}

function listsReducer(state = initialListsState, action) {
  switch (action.type) {
    case 'STORE': {
      return {
        ...state,
        ...action.data.lists,
      };
    }
    case 'SEARCH_MANGA_COMPLETION':
    case 'LOAD_MANGA_LIST_COMPLETION': {
      return {
        ...state,
        ...action.data,
      };
    }
    case 'LOAD_MANGA_CHAPTER_COMPLETION': {
      const {id, data} = action;

      return {
        ...state,
        [id]: {
          ...state[id],
          chapter: data,
        },
      };
    }
    default:
      return state;
  }
}

function mangaReducer(state = initialMangaState, action) {
  switch (action.type) {
    case 'LOAD_MANGA_CHAPTER': {
      return {
        ...state,
        loadStatus: 1,
        refresh: action.isRefresh ? true : false,
      };
    }
    case 'LOAD_MANGA_CHAPTER_COMPLETION': {
      return {
        ...state,
        loadStatus: 2,
        refresh: false,
      };
    }
    default:
      return state;
  }
}

function pageReducer(state = initialPageState, action) {
  switch (action.type) {
    case 'LOAD_MANGA_PAGE': {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          loadStatus: 1,
        },
      };
    }
    case 'LOAD_MANGA_PAGE_COMPLETION': {
      const {error, data} = action;

      if (error) {
        return {
          ...state,
          [data.id]: {
            ...state[data.id],
            loadStatus: 0,
          },
        };
      }

      return {
        ...state,
        [data.id]: {
          ...state[data.id],
          name: data.chapter_name,
          urls: data.page_url.map(item => {
            return {
              uri: item,
              headers: {
                referer: 'https://m.dmzj.com',
              },
            };
          }),
          loadStatus: 2,
        },
      };
    }
    default:
      return state;
  }
}

function searchReducer(state = initialSearchState, action) {
  switch (action.type) {
    case 'SEARCH_MANGA': {
      return {
        ...state,
        loadStatus: 1,
      };
    }
    case 'SEARCH_MANGA_COMPLETION': {
      if (action.error) {
        return {
          ...state,
          loadStatus: 0,
        };
      }

      return {
        ...state,
        list: action.keys,
        loadStatus: 2,
      };
    }
    default:
      return state;
  }
}

function collectionReducer(state = initialCollectionState, action) {
  switch (action.type) {
    case 'STORE': {
      return {
        ...state,
        list: action.data.collection,
      };
    }
    case 'COLLECT_COMPLETION': {
      return {
        ...state,
        list: action.list,
      };
    }
    case 'LOAD_MANGA_CHAPTER_COMPLETION': {
      const {id} = action;
      const index = state.list.indexOf(id);

      let list = state.list;
      if (index > 0) {
        list.splice(index, 1);
        list.unshift(id);
      }

      return {
        ...state,
        list,
      };
    }
    default:
      return state;
  }
}

function progressReducer(state = initialProgressState, action) {
  switch (action.type) {
    case 'STORE':
    case 'SET_PROGRESS_COMPLETION': {
      return {
        ...state,
        ...action.data.progress,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  mangaList: mangaListReducer,
  lists: listsReducer,
  page: pageReducer,
  manga: mangaReducer,
  search: searchReducer,
  collection: collectionReducer,
  progress: progressReducer,
});
