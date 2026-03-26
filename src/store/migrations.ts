import { initialDataGridOrderState } from './reducers/dataGridOrder/initialState';

export const migrations = {
  5: (state: any) => {
    console.log('state4', state);
    return {
      ...state,
      dataGridOrderReducer: {
        ...initialDataGridOrderState,
        ...(state?.dataGridOrderReducer ?? {}),
      },
    };
  },
};
