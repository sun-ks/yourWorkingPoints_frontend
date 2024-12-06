import { createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { async } from 'q';

import { ITodos } from '../../types/ITodos';
import { AppDispatch } from '../store';

/*export const fetchUsers = () => async(dispatch: AppDispatch) => {
	try {
		dispatch(userSlice.actions.todoFetcing())
		const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
		dispatch(userSlice.actions.todoFetchSucsses(response.data))
	} catch (e:any) {
		dispatch(userSlice.actions.todoFetchErr(e))
	}
}*/

export const fetchUsers = createAsyncThunk(
    'users/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<ITodos[]>(
                'https://jsonplaceholder.typicode.com/todos',
            );
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('error fetch users');
        }
    },
);
