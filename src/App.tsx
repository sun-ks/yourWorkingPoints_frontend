import './App.css';
import React, { useEffect } from 'react';
import { todosSlice } from './store/reducers/TodosSlice';
import {fetchUsers} from './store/reducers/ActionCreators';
import {useAppSelector, useAppDispatch}  from './hooks/redux';
import {postAPI} from './services/PostService'
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  const state = useAppSelector(state => state.testReducer);

  const {incriment, dicriment, todoFetcing} = todosSlice.actions;
  console.log(state)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, []);

  const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(200);

  return (
    <div className="App">
     <CssBaseline/>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      {/*
      <h2>Clasical Counter: {state.count}</h2>
      <br/>
      <Button onClick={()=>{dispatch(incriment(state.count))}} variant="contained">Incriment</Button>
      <Button onClick={()=>{dispatch(dicriment(state.count))}} variant="outlined">Dincriment</Button>
      <br/>
      <button >Dincriment</button>
      <br/>
      - - -
      <PostContainer/>
      <div>
        {state.error && <p>{state.error}</p>}
        {state.todos.length > 0 && (
          <pre>{JSON.stringify(state.todos, null, 2)}</pre>
        )}
      </div>
        */}
    </div>
  );
}

export default App;
