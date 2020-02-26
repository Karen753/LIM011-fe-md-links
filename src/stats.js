
const totalLink = (dataLink) => dataLink.length;

const uniqueLink = (dataLink) => {
  const arrayLinks = [];
  dataLink.forEach((element) => {
    arrayLinks.push(element.Href);
  });
  const unique = new Set(arrayLinks);
  const numberOfUnique = unique.size;

  return numberOfUnique;
};


const brokenLink = (dataLink) => {
  const linkRoto = dataLink.filter((elm) => elm.statusText === 'fail');
  const numLinkRoto = linkRoto.length;
  return numLinkRoto;
};

module.exports = {
  totalLink,
  uniqueLink,
  brokenLink,
};
