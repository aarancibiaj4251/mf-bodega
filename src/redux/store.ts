import { persistStore } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import {configureStore, Tuple} from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(sagaMiddleware, logger),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
