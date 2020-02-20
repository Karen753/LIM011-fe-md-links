/* eslint-disable max-len */
const fetch = require('node-fetch');
const { traeInfoLinks } = require('./index.js');


// funcion para recorrer y validar los links
const validateLinks = (ruta) => {
  const arrayObjects = traeInfoLinks(ruta);
  const arrayPromises = [];
  arrayObjects.forEach((objDelArray) => {
    const copyOfObjDelArray = { ...objDelArray };
    arrayPromises.push(fetch(objDelArray.Href).then((res) => {
      if (res.status >= 200 && res.status <= 399) {
        copyOfObjDelArray.status = res.status;
        copyOfObjDelArray.statusText = 'ok';
      } else {
        copyOfObjDelArray.status = res.status;
        copyOfObjDelArray.statusText = 'fail';
      }
      return copyOfObjDelArray;
    }).catch(() => {
      copyOfObjDelArray.status = 'link no valido';
      copyOfObjDelArray.statusText = 'fail';
      return copyOfObjDelArray;
    }));
  });
  return Promise.all(arrayPromises);
};
// validateLinks('/home/karen/Escritorio/MD-links/LIM011-fe-md-links/carpetaprueba/ejemplo.md').then((resp) => console.log(resp));
module.exports = { validateLinks };
