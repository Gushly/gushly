import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';
import rootReducer from '../reducers';


const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer, enhancer)
  store.sagaTask = sagaMiddleware.run(sagas);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
