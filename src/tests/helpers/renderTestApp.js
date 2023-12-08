import React from "react";
import { setupStore } from "../../store/store";
import {Provider} from "react-redux";
import AppRouter from "../../routes";
import {MemoryRouter} from "react-router-dom";



export const renderTestApp = (component, options) => {
  const initialState = options.initialState ? options.initialState :
    {
      authReducer: {
        user: {
          accessToken: 'eyJhbGciOiJIUzI',
          userInfo: {
            name: 'igor2',
            user_id: 'bd03ab15-28d1-4b2c-8aac-2d3910384c80',
            email: 'igor2@email.com',
            role: 'owner',
            is_active: true
          }
        }
      },
    }

	const store = setupStore(initialState);
	
	return (
		<Provider store={store}>
			<MemoryRouter initialEntries={[options?.route]}>
				<AppRouter />
				{component}
			</MemoryRouter>
		</Provider>
	)
}