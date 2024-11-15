import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import "./i18n";
const store = setupStore();

let persistor = persistStore(store)

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development_test') {
    return
  }

	const { worker } = await import("./mocks/browser.js");
	return worker.start();
}

enableMocking().then(() => {
	ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );
});