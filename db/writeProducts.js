const fs = require('fs');
const csvWriter = require('csv-write-stream');
const generator = require('./dataGenerator.js');

// const prodDataGen = () => {
//   let done = false;
//   writer.pipe(fs.createWriteStream('productData.csv'));
//   for (let i = 0; i <= 10000000; i += 1) {
//     writer.write({
//       productDescription: generator.descriptionGenerator(),
//       pageLength: generator.pagesGenerator(),
//       answerKeyIncluded: generator.answerKeyGenerator(),
//       teachingDuration: generator.teachingDurationGenerator(),
//     });
//   }
//   writer.end();
//   done = true;
//   return done;
// };

const writeUsers = fs.createWriteStream('products1.csv');
writeUsers.write('productDescription,pageLength,answerKeyIncluded,teachingDuration\n', 'utf8');

function writeProducts(writer, encoding, callback) {
  let i = 100;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const productDescription = generator.descriptionGenerator();
      const pageLength = generator.pagesGenerator();
      const answerKeyIncluded = generator.answerKeyGenerator();
      const teachingDuration = generator.teachingDurationGenerator();
      const data = `${productDescription},${pageLength},${answerKeyIncluded},${teachingDuration}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeProducts(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
