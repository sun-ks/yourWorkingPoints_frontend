import React from "react";
import { findAllByAltText, render, screen, waitFor } from '@testing-library/react';
import Points from './Points';
import {renderTestApp} from '../../../../tests/helpers/renderTestApp';

import {server} from '../../../../mocks/node'

describe('Points',  ()=>{
  test ('shuld display Points Page', async () => {
    render (
      renderTestApp(null, {
        route: '/',
        initialState: {
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
      })
    );
  
    //screen.getByText('TEST-1234')
    //await waitFor(() => screen.findAllByText('Loading...'));
    //await screen.findAllByText('Yany 1013 MOCKED')
    await waitFor(() => expect(screen.getAllByTestId('content-point')).toBeInTheDocument);

    screen.debug(undefined, 2333333);
    
    //screen.debug(undefined, 300000);
    //const linkElement = screen.findAllByAltText('/ua/i');
    //expect(linkElement).toBeInTheDocument();
  });
})

