import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit";
import testReducer from "./reducers/TodosSlice";
import services from "../services/index";

const {postAPI} = services;


const reducers = {
  testReducer,
  [postAPI.reducerPath]: postAPI.reducer,

  
}

const rootReducer = combineReducers(reducers);
console.log(reducers)
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(postAPI.middleware),
        //devTools: true, // Enable Redux DevTools

  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];