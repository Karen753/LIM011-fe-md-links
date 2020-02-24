#!/usr/bin/env node
const { mdLinks } = require('./MD-links.js');
const { totalLink, uniqueLink, brokenLink } = require('./stats.js');

// Grab provided args.
const [,, ...args] = process.argv;
// console.log(args);

const ruta = process.argv[2];
// console.log(ruta)

const option = {
  validate: process.argv.indexOf('--validate') > 0,
  stats: process.argv.indexOf('--stats') > 0,

};
// console.log(option.stats);

const cli = (path, opt) => {
  if (opt.validate && opt.stats) {
    mdLinks(path, opt).then((resp) => {
      const statsValidate = `Total: ${totalLink(resp)} \nUnique: ${uniqueLink(resp)} \nBroken: ${brokenLink(resp)}`;
      return console.log(statsValidate);
    });
  } else if (opt.stats) {
    mdLinks(path, opt.stats).then((resp) => {
      const stats = `Total: ${totalLink(resp)} \nUnique: ${uniqueLink(resp)}`;
      return console.log(stats);
    });
  } else if (opt.validate) {
    mdLinks(path, { validate: true }).then((resp) => {
      resp.forEach((element) => {
        let linkValidos = '';
        linkValidos += `${element.Href} ${element.Text} ${element.status} ${element.statusText}`;
        return console.log(linkValidos);
      });
    });
  }
};
cli(ruta, option);
