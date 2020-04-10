import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configStore(preloadedState) {
  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(require('redux-logger').createLogger());
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares),
  );
  sagaMiddleware.run(sagas);

  return store;
}
