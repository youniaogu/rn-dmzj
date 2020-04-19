import {combineReducers} from 'redux';

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

const initialWebpicState = {};

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
    case 'LOAD_MANGA_PAGE_COMPLETION': {
      const {id, data} = action;

      return {
        ...state,
        [id]: {
          ...state[id],
          name: data.chapter_name,
          url: data.page_url,
        },
      };
    }
    default:
      return state;
  }
}
function webpicReducer(state = initialWebpicState, action) {
  switch (action.type) {
    case 'GET_IMG_BASE64_COMPLETION': {
      return {
        ...state,
        ...action.data,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  mangaList: mangaListReducer,
  lists: listsReducer,
  webpic: webpicReducer,
  page: pageReducer,
});
