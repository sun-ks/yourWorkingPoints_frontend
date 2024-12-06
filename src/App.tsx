import { BrowserRouter } from 'react-router-dom';

import React, { useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import Router from './routes';
import { postAPI } from './services/PostService';
import { fetchUsers } from './store/reducers/ActionCreators';
import { todosSlice } from './store/reducers/TodosSlice';

function App() {
  const state = useAppSelector((state) => state.testReducer);

  const { incriment, dicriment, todoFetcing } = todosSlice.actions;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(200);

  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
