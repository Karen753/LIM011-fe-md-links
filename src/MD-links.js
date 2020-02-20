const { validateLinks } = require('./validate.js');
const {
  absolutePath, convertPath, traeInfoLinks,
} = require('../src/index.js');

const mdLinks = (path, option) => {
  const promesa = new Promise((resolve) => {
    const absPath = (absolutePath(path)) ? path : convertPath(path);
    if (option.validate === true) {
      return validateLinks(absPath).then((linkValid) => resolve(linkValid));
    }
    return resolve(traeInfoLinks(absPath));
  });
  return promesa;
};
// mdLinks('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md', { validate: false }).then((resp) => console.log(resp));

module.exports = { mdLinks };
