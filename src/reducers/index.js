import {combineReducers} from 'redux';
import {getSize} from '../components/util';

const initialMangaListState = {
  list: [],
  types: 0,
  readergroup: 0,
  status: 0,
  zone: 0,
  sort: 0, // 0人气，1更新
  page: 0,
};

const initialPageState = {};

const initialListsState = {};

function mangaListReducer(state = initialMangaListState, action) {
  switch (action.type) {
    case 'LOAD_MANGA_LIST': {
      let {page, list} = state;
      if (list.length !== 0) {
        page++;
      }

      return {
        ...state,
        page,
      };
    }
    case 'LOAD_MANGA_LIST_COMPLETION': {
      return {
        ...state,
        list: state.list.concat(action.list.map(item => item.id)),
      };
    }
    default:
      return state;
  }
}

function listsReducer(state = initialListsState, action) {
  switch (action.type) {
    case 'LOAD_MANGA_LIST_COMPLETION': {
      const data = [].concat(action.list).reduce((dict, item) => {
        dict[item.id] = item;

        return dict;
      }, {});

      return {
        ...state,
        ...data,
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

export default combineReducers({
  mangaList: mangaListReducer,
  lists: listsReducer,
  page: pageReducer,
});
