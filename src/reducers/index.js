import {combineReducers} from 'redux';

import home from './home';

const appReducer = combineReducers({
  home,
});

export default function(state, action) {
  return appReducer(state, action);
}
