
const path = require('path');
const fs = require('fs');
const marked = require('marked');


const absolutePath = (ruta) => {
  const condition = path.isAbsolute(ruta);
  return condition;
};

const convertPath = (ruta) => {
  const condition = path.resolve(ruta);
  return condition;
};

// FUNCION QUE SIRVE PARA RUTAS RELATIVAS Y ABSOLUTAS.
const itsAFile = (ruta) => {
  const condition = fs.lstatSync(ruta).isFile();
  return condition;
};

// FUNCION QUE SIRVE PARA RUTAS RELATIVAS Y ABSOLUTAS.
const itsADirectory = (ruta) => {
  const result = fs.lstatSync(ruta).isDirectory();
  return result;
};

// FUNCION QUE SIRVE PARA RUTAS RELATIVAS Y ABSOLUTAS.
const isMDLink = (ruta) => path.extname(ruta) === '.md';

// REVISA UN CARPETA Y TRAE LAS CARPETAS O ARCHIVOS EN UNA RUTA ABSOLUTA
const getAllPathOfDirectory = (ruta) => fs.readdirSync(ruta, 'utf-8').map((element) => path.resolve(ruta, element));


const allFilePaths = (ruta) => {
  let lista = [];
  if (itsADirectory(ruta)) {
    getAllPathOfDirectory(ruta).forEach((el) => {
      if (itsAFile(el)) {
        lista = lista.concat(el);
      } else {
        lista = lista.concat(allFilePaths(el));
      }
    });
  } else {
    lista = lista.concat(ruta);
  }
  let listMDlinks = [];
  lista.forEach((el) => {
    if (isMDLink(el)) {
      listMDlinks = listMDlinks.concat(el);
    }
  });
  return listMDlinks;
};
// console.log(allFilePaths('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba'));


const readFile = (ruta) => fs.readFileSync(ruta, 'utf8');

const traeInfoLinks = (ruta) => {
  const arrayInfo = [];
  const rendere = new marked.Renderer();
  allFilePaths(ruta).forEach((rutaMD) => {
    rendere.link = (strHref, strTitle, strText) => {
      arrayInfo.push({ Href: strHref, Text: strText, File: rutaMD });
    };
    // el marked convierte en html el documento
    marked(readFile(rutaMD), { renderer: rendere });
  });
  return arrayInfo;
};
console.log(process.cwd());
console.log(path.join('hola', 'ruta2'));
 

module.exports = {
  absolutePath,
  convertPath,
  itsAFile,
  isMDLink,
  itsADirectory,
  readFile,
  getAllPathOfDirectory,
  allFilePaths,
  traeInfoLinks,
};
