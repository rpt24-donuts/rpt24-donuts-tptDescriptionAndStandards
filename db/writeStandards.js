const fs = require('fs');
const faker = require('faker');
const generator = require('./dataGenerator.js');

const writeUsers = fs.createWriteStream('standards.csv');
writeUsers.write('id,standard,description\n', 'utf8');

const standards = generator.standardGenerator();

function writeProducts(writer, encoding, callback) {
  let i = standards.length;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const id = i;
      const standard = standards[i];
      const description = faker.lorem.sentence();
      const data = `${id},${standard},${description}\n`;
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

writeProducts(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
