import React from "react";
import { setupStore } from "../../store/store";
import {Provider} from "react-redux";
import AppRouter from "../../routes";
import {MemoryRouter} from "react-router-dom";


export const renderTestApp = (component, options) => {
	const store = setupStore(options?.initialState);
	
	return (
		<Provider store={store}>
			<MemoryRouter initialEntries={[options?.route]}>
				<AppRouter />
				{component}
			</MemoryRouter>
		</Provider>
	)
}