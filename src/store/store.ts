import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Middleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import services from '../services/index';
import authReducer from './reducers/AuthSlice';
import dataGridOrderReducer from './reducers/dataGridOrder/DataGridOrderSlice';
import testReducer from './reducers/TodosSlice';

//defaults to localStorage for web

const {
  postAPI,
  userAPI,
  pointAPI,
  ticketAPI,
  companyAPI,
  clientAPI,
  warehouseAPI,
} = services;

const reducers = {
  testReducer,
  authReducer,
  dataGridOrderReducer,
  [postAPI.reducerPath]: postAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [pointAPI.reducerPath]: pointAPI.reducer,
  [ticketAPI.reducerPath]: ticketAPI.reducer,
  [companyAPI.reducerPath]: companyAPI.reducer,
  [clientAPI.reducerPath]: clientAPI.reducer,
  [warehouseAPI.reducerPath]: warehouseAPI.reducer,
};

const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['testReducer', 'authReducer', 'dataGridOrderReducer'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Custom middleware for logging
const loggingMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type === 'auth/logOut') {
    console.log('Persisted state cleared due to logout', store);
  }

  return result;
};

export const setupStore = (initialState = {}) => {
  return configureStore({
    //reducer: rootReducer,
    reducer: persistedReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(loggingMiddleware)
        .concat(postAPI.middleware)
        .concat(userAPI.middleware)
        .concat(pointAPI.middleware)
        .concat(ticketAPI.middleware)
        .concat(companyAPI.middleware)
        .concat(companyAPI.middleware)
        .concat(clientAPI.middleware)
        .concat(warehouseAPI.middleware),
    //devTools: true, // Enable Redux DevTools
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
