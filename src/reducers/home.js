import {combineReducers} from 'redux';

const initialState = {
  number: 0,
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        number: state.number + 1,
      };
    default:
      return state;
  }
}

export default combineReducers({
  counter: counterReducer,
});
