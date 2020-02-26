const path = require('path');
const { validateLinks } = require('../src/validate.js');

jest.mock('node-fetch');

const arrayLinkValid = [{
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
  Href: 'https://www.googlom.pe0',
  Text: 'google break',
  File:
    path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md'),
  status: 'link no valido',
  statusText: 'fail',
}];

describe('validateLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('deberia devolver un array con la validación', (done) => {
    validateLinks(path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md')).then((resp) => {
      expect(resp).toStrictEqual(arrayLinkValid);
      done();
    });
  });
});
