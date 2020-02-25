const fetch = require('node-fetch');
const { traeInfoLinks } = require('./index.js');


// funcion para recorrer y validar los links
const validateLinks = (ruta) => {
  const arrayObjects = traeInfoLinks(ruta);
  const arrayPromises = [];
  arrayObjects.forEach((objDelArray) => {
    const obj = { ...objDelArray };
    arrayPromises.push(fetch(objDelArray.Href).then((res) => {
      if (res.status >= 200 && res.status <= 399) {
        obj.status = res.status;
        obj.statusText = 'ok';
        return obj;
      }
      obj.status = res.status;
      obj.statusText = 'fail';
      return obj;
    }).catch(() => {
      obj.status = 'link no valido';
      obj.statusText = 'fail';
      return obj;
    }));
  });
  return Promise.all(arrayPromises);
};

module.exports = { validateLinks };
