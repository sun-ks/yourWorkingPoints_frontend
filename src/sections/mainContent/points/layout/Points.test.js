import React from "react";
import { findAllByAltText, render, screen, waitFor } from '@testing-library/react';
import Points from './Points';
import {renderTestApp} from '../../../../tests/helpers/renderTestApp';

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
  
    await waitFor(() => expect(screen.getAllByTestId('content-point')).toBeInTheDocument);
    
    await waitFor(() => expect(screen.getByText('Michael')).toBeInTheDocument);
    
    screen.debug(undefined, 2333333);
  });
})

