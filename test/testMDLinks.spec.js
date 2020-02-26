const path = require('path');
const { mdLinks } = require('../src/MD-links.js');

jest.mock('node-fetch');

const arrayLinks = [{
  Href: 'https://es.wikipedia.org/wiki/Markdown',
  Text: 'Markdown',
  File:
    path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md'),
},
{
  Href: 'https://www.google.com.pe/404',
  Text: 'google',
  File:
    path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md'),
},
{
  Href: 'https://www.googlom.pe0',
  Text: 'google break',
  File:
    path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md'),
}];

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

describe('mdLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('si el usuario no quiere validar(false) devuelve solo 3 caracteristicas', (done) => {
    mdLinks(path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md'), { validate: false }).then((resp) => {
      expect(resp).toStrictEqual(arrayLinks);
      done();
    });
  });
  it('si el usuario desea validar(true) devolverá 5 caracteres', (done) => {
    mdLinks(path.join(process.cwd(), 'carpetaprueba', 'ejemplo.md'), { validate: true }).then((resp) => {
      expect(resp).toStrictEqual(arrayLinkValid);
      done();
    });
  });
});
