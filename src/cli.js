#!/usr/bin/env node
const { mdLinks } = require('./MD-links.js');
const { totalLink, uniqueLink, brokenLink } = require('./stats.js');

const ruta = process.argv[2];

const option = {
  validate: process.argv.indexOf('--validate') > 0,
  stats: process.argv.indexOf('--stats') > 0,
};

// uso de iife
((path, opt) => {
  if (opt.validate && opt.stats) {
    mdLinks(path, opt).then((resp) => {
      const statsValidate = `Total: ${totalLink(resp)} \nUnique: ${uniqueLink(resp)} \nBroken: ${brokenLink(resp)}`;
      return console.log(statsValidate);
    }).catch(() => console.error('Ingrese una ruta valida'));
  } else if (opt.stats) {
    mdLinks(path, opt.stats).then((resp) => {
      const stats = `Total: ${totalLink(resp)} \nUnique: ${uniqueLink(resp)}`;
      return console.log(stats);
    }).catch(() => console.error('Ingrese una ruta valida'));
  } else if (opt.validate) {
    mdLinks(path, { validate: true }).then((resp) => {
      resp.forEach((element) => {
        let linkValidos = '';
        linkValidos += `${element.Href} ${element.Text} ${element.status} ${element.statusText}`;
        return console.log(linkValidos);
      });
    }).catch(() => console.error('Ingrese una ruta valida'));
  } return mdLinks(path, { validate: false }).then((resp) => {
    resp.forEach((el) => {
      let linkInfo = '';
      linkInfo += `${el.File} ${el.Href} ${el.Text}`;
      return console.log(linkInfo);
    });
  });
})(ruta, option);

// (function())()
