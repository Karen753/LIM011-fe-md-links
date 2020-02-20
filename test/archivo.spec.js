/* eslint-disable max-len */
const {
  absolutePath, convertPath, itsAFile, isMDLink, itsADirectory, readFile, getAllPathOfDirectory, allFilePaths, traeInfoLinks,
} = require('../src/index.js');
const { validateLinks } = require('../src/validate.js');
const { mdLinks } = require('../src/MD-links.js');

jest.mock('node-fetch');

const arrayLinks = [{
  Href: 'https://es.wikipedia.org/wiki/Markdown',
  Text: 'Markdown',
  File:
 '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md',
},
{
  Href: 'https://www.google.com.pe/404',
  Text: 'google',
  File:
 '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md',
},
{
  Href: 'https://www.googlom.pe0',
  Text: 'google break',
  File:
 '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md',
}];

const arrayLinkValid = [{
  Href: 'https://es.wikipedia.org/wiki/Markdown',
  Text: 'Markdown',
  File:
 '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md',
  status: 200,
  statusText: 'ok',
},
{
  Href: 'https://www.google.com.pe/404',
  Text: 'google',
  File:
 '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md',
  status: 404,
  statusText: 'fail',
},
{
  Href: 'https://www.googlom.pe0',
  Text: 'google break',
  File:
 '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md',
  status: 'link no valido',
  statusText: 'fail',
}];

// test para saber si es una ruta absoluta
describe('absolutePath', () => {
  it('deberia ser una función', () => {
    expect(typeof absolutePath).toBe('function');
  });
  it('si es una ruta absoluta devuelve true', () => {
    expect(absolutePath('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/README.md')).toBe(true);
  });
  it('si no es una ruta absoluta devuelve false', () => {
    expect(absolutePath('README.md')).toBe(false);
  });
});

// test para convertir una ruta relativa a absoluta
describe('convertPath', () => {
  it('deberia ser una función', () => {
    expect(typeof convertPath).toBe('function');
  });
  it('deberia devolver una ruta absoluta', () => {
    expect(convertPath('README.md')).toBe('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/README.md');
  });
});

// test para saber si es un archivo
describe('itsAFile', () => {
  it('deberia ser una función', () => {
    expect(typeof itsAFile).toBe('function');
  });
  it('si es un archivo retorna true', () => {
    expect(itsAFile('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/README.md')).toBe(true);
  });
  it('si es una carpeta retorna false', () => {
    expect(itsAFile('/home/karen/Escritorio/MD-links/LIM011-fe-md-links')).toBe(false);
  });
});

// test para verificar que un archivo sea formato Mark Down
describe('isMDLink', () => {
  it('deberia ser una función', () => {
    expect(typeof isMDLink).toBe('function');
  });
  it('si la ruta es MD me devuelve la extensión de la ruta', () => {
    expect(isMDLink('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/README.md')).toBe(true);
  });
});

// test para saber si es un directorio
describe('itsADirectory', () => {
  it('deberia ser una función', () => {
    expect(typeof itsADirectory).toBe('function');
  });
  it('si la ruta es un directorio devuelve true', () => {
    expect(itsADirectory('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba')).toBe(true);
  });
  it('si la ruta devuelve algo distinto a un archivo es false', () => {
    expect(itsADirectory('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md')).toBe(false);
  });
});

// test para leer mi archivo,
describe('readFile', () => {
  it('deberia ser una funcion', () => {
    expect(typeof readFile).toBe('function');
  });
  it('deberia leer el contenido del archivo', () => {
    expect(readFile('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/readme.md')).toBe('HOLA SOY UN README');
  });
});

// test para obetner todas las rutas
describe('getAllPathOfDirectory', () => {
  it('deberias ser una funcion', () => {
    expect(typeof getAllPathOfDirectory).toBe('function');
  });
  it('deberia mostrar todas las rutas de un directorio', () => {
    expect(getAllPathOfDirectory('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba')).toEqual(['/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/README',
      '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/carpetadentro.js',
      '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md',
      '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/readme.md']);
  });
});

// test para obtener solo las rutas en formato .md

describe('allFilePaths', () => {
  it('deberia ser una funcion', () => {
    expect(typeof allFilePaths).toBe('function');
  });
  it('deberia devolver las rutas que contengan solo formato md', () => {
    expect(allFilePaths('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba')).toEqual(['/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/README/readmedentro.md',
      '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md',
      '/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/readme.md']);
  });
});

// test para tarer la infornmacion de los links

describe('traeInfoLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof traeInfoLinks).toBe('function');
  });
  it(' deberia traer la informacion de cada link que encuentre', () => {
    expect(traeInfoLinks('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md')).toEqual(arrayLinks);
  });
});

// test para validar links
describe('validateLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('deberia devolver un array con la validación', (done) => {
    validateLinks('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md').then((resp) => {
      expect(resp).toStrictEqual(arrayLinkValid);
      done();
    });
  });
});

// test de la funcion MDlinks

describe('mdLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('si el usuario no quiere validar(false) devuelve solo 3 caracteristicas', (done) => {
    mdLinks('carpetaprueba/ejemplo.md', false).then((resp) => {
      expect(resp).toStrictEqual(arrayLinks);
      done();
    });
  });
  it('si el usuario desea validar(true) devolverá 5 caracteres', (done) => {
    mdLinks('carpetaprueba/ejemplo.md', true).then((resp) => {
      expect(resp).toStrictEqual(arrayLinkValid);
      done();
    });
  });
});
