const algo = [{
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

const totalLink = (dataLink) => dataLink.length;
// console.log(totalLink(algo));

const uniqueLink = (dataLink) => {
  const arrayLinks = [];
  dataLink.forEach((element) => {
    arrayLinks.push(element.Href);
  });
  const unique = new Set(arrayLinks);
  const numberOfUnique = unique.size;

  return numberOfUnique;
};
// console.log(uniqueLink(algo));

const brokenLink = (dataLink) => {
  const linkRoto = dataLink.filter((elm) => elm.statusText === 'fail');
  const numLinkRoto = linkRoto.length;
  return numLinkRoto;
};
// console.log(brokenLink(algo));

module.exports = {
  totalLink,
  uniqueLink,
  brokenLink,
};
