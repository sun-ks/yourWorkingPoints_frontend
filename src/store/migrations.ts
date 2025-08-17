import { initialDataGridOrderState } from './reducers/dataGridOrder/initialState';

export const migrations = {
  1: (state: any) => ({
    ...initialDataGridOrderState,
    ...state, // merge збережений state
  }),
};
