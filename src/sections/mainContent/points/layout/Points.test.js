import { render, screen, act, waitFor } from '@testing-library/react';
import Points from './Points';
import { renderTestApp } from '../../../../tests/helpers/renderTestApp';

test.skip('should display Points Page', async () => {
  render(
    renderTestApp(<Points />, {
      route: '/',
      initialState: {
        authReducer: {
          user: {
            accessToken: 'your-access-token',
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

  setInterval(async()=>{
    const dataElement = await screen.findAllByTestId('content-points');


    // Perform assertions or other actions
    
  }, 4000)
screen.debug(null, 30000);
  // After the waitFor, the data should be available, so you can proceed with your assertions
  

  // Additional assertions or actions if needed
  // const linkElement = screen.findAllByAltText('/ua/i');
  // expect(linkElement).toBeInTheDocument();
});
