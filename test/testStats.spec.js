const path = require('path');
const { totalLink, uniqueLink, brokenLink } = require('../src/stats');

jest.mock('node-fetch');

const input = [{
  Href: 'https://es.wikipedia.org/wiki/Markdown',
  Text: 'Markdown',
  File:
  path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md'),
  status: 200,
  statusText: 'ok',
},
{
  Href: 'https://www.google.com.pe/404',
  Text: 'google',
  File:
  path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md'),
  status: 404,
  statusText: 'fail',
},
{
  Href: 'https://www.google.com.pe/404',
  Text: 'google',
  File:
  path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md'),
  status: 404,
  statusText: 'fail',
},
{
  Href: 'https://www.googlom.pe0',
  Text: 'google break',
  File:
  path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md'),
  status: 'link no valido',
  statusText: 'fail',
}];

describe('totalLink', () => {
  it('deberia ser una funcion', () => {
    expect(typeof totalLink).toBe('function');
  });
  it('deberia devolver la cantitdad de links', () => {
    const output = 4;
    expect(totalLink(input)).toEqual(output);
  });
});

describe('uniqueLink', () => {
  it('deberia ser una funcion', () => {
    expect(typeof uniqueLink).toBe('function');
  });
  it('deberia devolver la cantidad de links unicos', () => {
    const output = 3;
    expect(uniqueLink(input)).toEqual(output);
  });
});

describe('brokenLink', () => {
  it('deberia ser una funcion', () => {
    expect(typeof brokenLink).toBe('function');
  });
  it('deberia devolver la cantidad de links rotos', () => {
    const output = 3;
    expect(brokenLink(input)).toEqual(output);
  });
});
