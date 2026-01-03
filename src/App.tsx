import { BrowserRouter } from 'react-router-dom';

import React, { useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import { WebSocketProvider } from './context/WebSocketProvider';
import { useAppDispatch } from './hooks/redux';
import Router from './routes';
import { fetchUsers } from './store/reducers/ActionCreators';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <WebSocketProvider>
      <div className="App">
        <CssBaseline />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </WebSocketProvider>
  );
}

export default App;
