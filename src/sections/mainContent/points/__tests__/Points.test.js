import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import {renderTestApp} from '../../../../tests/helpers/renderTestApp';
import { server } from '../../../../mocks/node';
import { http, HttpResponse } from "msw";

describe('Points page',  () => {
  test('Should display Points Page with Points', async () => {
    render (
      renderTestApp(null, { route: '/', initialState: null })
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
    render (renderTestApp(null, { route: '/', initialState: null }));

    const deleteBtns = await screen.findAllByLabelText('point.delete');

    fireEvent.click(deleteBtns[0]);

    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();

    expect(screen.queryByTestId('alert-dialog-btn-ok')).toBeNull();
  });

  test('Should display Alert Dialog with Ok button', async () => {
    render (renderTestApp(null, { route: '/', initialState: null }));

    const deleteBtns = await screen.findAllByLabelText('point.delete');

    fireEvent.click(deleteBtns[1]);

    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();

    expect(screen.getByTestId('alert-dialog-btn-ok')).toBeInTheDocument();
  });

  test('Should display empty Points page', async () => {
    server.use (
      http.get(`${process.env.REACT_APP_API_URL}points/pointsWithHaveTickets`, ({ request }) => {
        return HttpResponse.json(null);
      }),
    );

    render (renderTestApp(null, { route: '/', initialState: null }));

    expect(await screen.findByText('No items available.')).toBeInTheDocument();
  });
});