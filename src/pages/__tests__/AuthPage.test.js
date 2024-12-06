import { act, fireEvent, render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

import React from 'react';

import { server } from '../../mocks/node';
import { renderTestApp } from '../../tests/helpers/renderTestApp';

describe('Auth page', () => {
    test('Should render Log In page', async () => {
        render(renderTestApp(null, { route: '/auth/sign_in' }));

        expect(screen.getByText('sign_in.title')).toBeInTheDocument();

        expect(screen.getByText('sign_in.do_not_account')).toBeInTheDocument();

        expect(screen.getByText('forgot_password')).toBeInTheDocument();

        expect(screen.getByText('sign_in.btn_submit')).toBeInTheDocument();
    });

    test('Should render Log In and go to create first point', async () => {
        server.use(
            http.post(
                `${process.env.REACT_APP_API_URL}auth/login/`,
                ({ request }) => {
                    return HttpResponse.json({
                        accessToken: 'accessToken',
                        userInfo: {
                            name: 'igor2',
                            user_id: 'bd03ab15-28d1-4b2c-8aac-2d3910384c80',
                            email: 'igor2@email.com',
                            role: 'owner',
                            created: '2023-08-31T10:44:06.715Z',
                            is_active: true,
                        },
                    });
                },
            ),
        );

        server.use(
            http.get(
                `${process.env.REACT_APP_API_URL}points`,
                ({ request }) => {
                    return HttpResponse.json([]);
                },
            ),
        );

        render(renderTestApp(null, { route: '/auth/sign_in' }));

        const emailInput = screen.getByLabelText(/email/i);

        fireEvent.change(emailInput, { target: { value: 'test@email.com' } });

        const passwordInput = screen.getByLabelText(/password/i);

        // Set the value of the password input
        fireEvent.change(passwordInput, { target: { value: '123' } });

        const loginButton = screen.getByText('sign_in.btn_submit');

        fireEvent.click(loginButton);

        const contentPoints = await screen.findByTestId('first-point-page');

        expect(contentPoints).toBeInTheDocument();
    });

    test('Should render Sign Up page', async () => {
        render(renderTestApp(null, { route: '/auth/sign_up' }));

        expect(screen.getByText('sign_up.title')).toBeInTheDocument();

        expect(
            screen.getByText('printTicket.will_in_print'),
        ).toBeInTheDocument();

        expect(screen.getByText('sign_up.btn_submit')).toBeInTheDocument();
    });

    test('Should render Forgot password page', async () => {
        render(renderTestApp(null, { route: '/auth/forgot' }));

        expect(screen.getByText('forgot.title')).toBeInTheDocument();

        expect(screen.getByText('forgot.do_not_account')).toBeInTheDocument();

        expect(screen.getByText('forgot.btn_submit')).toBeInTheDocument();

        screen.debug(null, 30000);
    });
});
