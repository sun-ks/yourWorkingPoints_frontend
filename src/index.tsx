import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import "./i18n";

const store = setupStore();

let persistor = persistStore(store)


ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
  document.getElementById('root')
);