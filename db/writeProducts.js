const fs = require('fs');
const faker = require('faker');
const generator = require('./dataGenerator.js');

const writeUsers = fs.createWriteStream('products1.csv');
writeUsers.write('productDescription,pageLength,answerKeyIncluded,teachingDuration\n', 'utf8');

function writeProducts(writer, encoding, callback) {
  let i = 10000000;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const id = i;
      const productDescription = faker.lorem.paragraph();
      const pageLength = generator.pagesGenerator();
      const answerKeyIncluded = generator.answerKeyGenerator();
      const teachingDuration = generator.teachingDurationGenerator();
      const data = `${id},${productDescription},${pageLength},${answerKeyIncluded},${teachingDuration}\n`;
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
