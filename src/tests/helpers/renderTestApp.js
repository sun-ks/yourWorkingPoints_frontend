import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import React from 'react';

import AppRouter from '../../routes';
import { setupStore } from '../../store/store';

export const renderTestApp = (component, options) => {
    const store = setupStore(options?.initialState);

    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={[options?.route]}>
                <AppRouter />
                {component}
            </MemoryRouter>
        </Provider>
    );
};
