const fs = require('fs');
const generator = require('./dataGenerator.js');

const standards = generator.standardGenerator();

const writeUsers = fs.createWriteStream('joins.csv');
writeUsers.write('id,Product_id,Standards_id\n', 'utf8');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 10000000;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const id = i;
      const Product_id = i;
      const Standards_id = getRandomInt(standards.length - 1);
      const data = `${id},${Product_id},${Standards_id}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
