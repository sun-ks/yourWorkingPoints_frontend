import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit";
import testReducer from "./reducers/TodosSlice";
import authReducer from "./reducers/AuthSlice";
import services from "../services/index";

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //defaults to localStorage for web

const {postAPI, userAPI, pointAPI, ticketAPI, companyAPI, clientAPI} = services;

const reducers = {
  testReducer,
  authReducer,
  [postAPI.reducerPath]: postAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [pointAPI.reducerPath]: pointAPI.reducer,
  [ticketAPI.reducerPath]: ticketAPI.reducer,
  [companyAPI.reducerPath]: companyAPI.reducer,
  [clientAPI.reducerPath]: clientAPI.reducer
}

const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['testReducer', 'authReducer'] //only navigation will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const setupStore = () => {
  return configureStore({
    //reducer: rootReducer,
    reducer: persistedReducer, 
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
      .concat(postAPI.middleware)
      .concat(userAPI.middleware)
      .concat(pointAPI.middleware)
      .concat(ticketAPI.middleware)
      .concat(companyAPI.middleware)
      .concat(companyAPI.middleware)
      .concat(clientAPI.middleware)
      //devTools: true, // Enable Redux DevTools
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];