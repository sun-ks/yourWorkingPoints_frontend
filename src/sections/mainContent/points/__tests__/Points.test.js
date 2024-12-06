import { fireEvent, render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

import React from 'react';

import { server } from '../../../../mocks/node';
import { renderTestApp } from '../../../../tests/helpers/renderTestApp';

describe('Points page', () => {
    test('Should display Points Page with Points', async () => {
        render(
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
                                is_active: true,
                            },
                        },
                    },
                },
            }),
        );

        const contentPoints = await screen.findAllByTestId('content-point');

        expect(contentPoints.length).toEqual(2);

        const choicePointElements = screen.getAllByText('choise_point');

        expect(choicePointElements.length).toBe(2);

        expect(screen.getByText('create_point')).toBeInTheDocument();

        expect(screen.getByTestId('navigator')).toBeInTheDocument();

        expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    test('Should display Alert Dialog without Ok button', async () => {
        render(
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
                                is_active: true,
                            },
                        },
                    },
                },
            }),
        );

        const deleteBtns = await screen.findAllByLabelText('point.delete');

        fireEvent.click(deleteBtns[0]);

        expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();

        expect(screen.queryByTestId('alert-dialog-btn-ok')).toBeNull();
    });

    test('Should display Alert Dialog with Ok button', async () => {
        render(
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
                                is_active: true,
                            },
                        },
                    },
                },
            }),
        );

        const deleteBtns = await screen.findAllByLabelText('point.delete');

        fireEvent.click(deleteBtns[1]);

        expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();

        expect(screen.getByTestId('alert-dialog-btn-ok')).toBeInTheDocument();
    });

    test('Should display empty Points page', async () => {
        server.use(
            http.get(
                `${process.env.REACT_APP_API_URL}points/pointsWithHaveTickets`,
                ({ request }) => {
                    return HttpResponse.json(null);
                },
            ),
        );

        render(
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
                                is_active: true,
                            },
                        },
                    },
                },
            }),
        );

        expect(
            await screen.findByText('No items available.'),
        ).toBeInTheDocument();
    });
});
