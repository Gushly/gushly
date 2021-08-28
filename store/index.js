import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from '../sagas';

import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);
export default store;

export const action = ({ type, payload }) => store.dispatch({ type, payload });
