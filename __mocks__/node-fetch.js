const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});

fetchMock
  .mock('https://es.wikipedia.org/wiki/Markdown', 200)
  .mock('https://www.google.com.pe/404', 404)
  .mock('https://www.googlom.pe0', { throws: new TypeError('Failed to fetch') });

module.exports = fetchMock;
