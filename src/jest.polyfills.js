// jest.polyfills.js
/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

const { TextDecoder, TextEncoder } = require('node:util')

// Add REACT_APP_API_URL for tests
process.env.REACT_APP_API_URL = 'http://179.29.10.19:3000/api/'

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
})
 
const { Blob, File } = require('node:buffer')
const { fetch, Headers, FormData, Request, Response } = require('undici')
 
Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
})



// Mock clearImmediate
//global.clearImmediate = () => {};