import './App.css';
import React, { useEffect } from 'react';
import { todosSlice } from './store/reducers/TodosSlice';
import {fetchUsers} from './store/reducers/ActionCreators';
import {useAppSelector, useAppDispatch}  from './hooks/redux';
import  PostContainer from './components/PostContainer';
import {postAPI} from './services/PostService'
function App() {

  const state = useAppSelector(state => state.testReducer);

  const {incriment, dicriment, todoFetcing} = todosSlice.actions;
  console.log(state)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, []);

  const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(200);
  console.log(posts)

  return (
    <div className="App">
      <h2>Clasical Counter: {state.count}</h2>
      <br/>
      <button onClick={()=>{dispatch(incriment(state.count))}}>Incriment</button>
      <br/>
      <button onClick={()=>{dispatch(dicriment(state.count))}}>Dincriment</button>
      <br/>
      - - -
      <PostContainer/>
      <div>
        {state.error && <p>{state.error}</p>}
        {state.todos.length > 0 && (
          <pre>{JSON.stringify(state.todos, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export default App;
