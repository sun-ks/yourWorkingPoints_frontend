import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import './i18n';
import { persistor, store } from './store/store';
import theme from './theme';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development_test') {
    return;
  }
  const { worker } = await import('./mocks/browser.js');
  return worker.start();
}

enableMocking().then(() => {
  const container = document.getElementById('root');
  if (!container) return;

  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>,
  );
});
