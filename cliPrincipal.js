#!/usr/bin/env node
const { cli } = require('./src/cli');

const ruta = process.argv[2];

const option = {
  validate: process.argv.indexOf('--validate') > 0,
  stats: process.argv.indexOf('--stats') > 0,

};
cli(ruta, option).then((res) => console.log(res)).catch(() => console.error('Ingrese ruta valida'));
