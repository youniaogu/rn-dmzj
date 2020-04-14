import {combineReducers} from 'redux';

const initialMangaState = {
  list: [],
  types: 0,
  readergroup: 0,
  status: 0,
  zone: 0,
  sort: 0, // 0人气，1更新
  page: 0,
};

function mangaReducer(state = initialMangaState, action) {
  switch (action.type) {
    case 'LOAD_MANGA': {
      let {page, list} = state;
      if (list.length !== 0) {
        page++;
      }

      return {
        ...state,
        page,
      };
    }
    case 'LOAD_MANGA_COMPLETION': {
      return {
        ...state,
        list: state.list.concat(action.list),
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  manga: mangaReducer,
});
