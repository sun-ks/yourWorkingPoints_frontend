import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import Content from './Content';
import { renderTestApp } from '../../../tests/helpers/renderTestApp';
import { companyAPI } from '../../../services/CompanyService'

// Mocking the useUpdateCompanyMutation
jest.mock('../../../services/CompanyService', () => {
  const originalModule = jest.requireActual('../../../services/CompanyService');
  return {
    ...originalModule,
    companyAPI: {
      ...originalModule.companyAPI,
      useGetCompanyQuery: jest.fn(),
    },
  };
});

test('should display Points Page Content', async () => {
  // Spying on useGetCompanyQuery
  const useGetCompanyQuerySpy = jest.spyOn(companyAPI, 'useGetCompanyQuery');

  // Mock the return value of useGetCompanyQuery
  useGetCompanyQuerySpy.mockReturnValue({
    data: {
      company_id: '8b5d23a5-52be-4098-bd47-0918b0d130b6',
      company_name: 'FOP Storozhuk',
      created: '2023-08-31T10:44:06.692Z',
    },
    error: null,
    isLoading: false,
  });

  render(
    renderTestApp(null, {
      route: '/settings',
      initialState: {
        authReducer: {
          user: {
            accessToken: 'your-access-token',
            userInfo: {
              name: 'igor2',
              user_id: 'bd03ab15-28d1-4b2c-8aac-2d3910384c80',
              email: 'igor2@email.com',
              role: 'owner',
              is_active: true,
            },
          },
        },
      },
    })
  );

  // Assertions or other test logic

  // Check if useGetCompanyQuerySpy has been called
 

  screen.debug(null, 200000)

  // Optionally, you can check the number of times it has been called and with what arguments
  // expect(useGetCompanyQuerySpy).toHaveBeenCalledTimes(1);
  // expect(useGetCompanyQuerySpy).toHaveBeenCalledWith(/* your arguments here */);
});


