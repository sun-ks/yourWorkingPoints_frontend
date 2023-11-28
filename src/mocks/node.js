import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import "@testing-library/jest-dom";

export const server = setupServer(...handlers);


// Enable the API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable the API mocking after the tests finished.
afterAll(() => server.close())

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})