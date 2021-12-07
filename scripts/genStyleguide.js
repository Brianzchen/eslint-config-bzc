// @flow
const fs = require('fs');

const webReadmeFile = './styleguide.md';

fs.readFile(webReadmeFile, 'utf8', (err, contents) => {
  if (err) {
    console.error(`could not read ${webReadmeFile} file`);
    return;
  }

  const lineSplit = contents.split('\n');
  const headers = lineSplit
    .filter((o) => o.startsWith('## '))
    .map((o, i) => {
      const value = o.substring('## '.length);
      return `${i + 1}. [${value}](#${value.toLowerCase().replace(/ /g, '-')})`;
    });

  const contentsLine = lineSplit.findIndex((o) => o === '# Table of Contents');
  const endOfContentsLine = lineSplit.findIndex((o) => o === '<!-- end of contents -->');

  lineSplit.splice(contentsLine + 1, endOfContentsLine - contentsLine - 1, ...headers);
  fs.writeFile(webReadmeFile, lineSplit.join('\n'), (writeErr) => {
    if (writeErr) {
      console.error(`failed to write to web ${webReadmeFile} file`);
    }
  });
});
