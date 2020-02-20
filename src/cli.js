#!/usr/bin/env node
const { mdLinks } = require('./MD-links.js');
const { validateLinks } = require('./validate');
// Grab provided args.
const [,, ...args] = process.argv;
// console.log(args);

const ruta = process.argv[2];
// console.log(ruta);

const options = process.argv[3];
// console.log(options);

const cli = (path, opt) => {
  if (opt === '--validate') {
    mdLinks(path, { validate: true }).then((resp) => console.log(resp.Href));
  } else {
    mdLinks(path, { validate: false }).then((resp) => console.log(resp.Href));
  }
};
cli(ruta, options);
