const csvFilePath = './products1.csv';
const csv = require('csvtojson');

async function toJson() {
  const jsonArray = await csv().fromFile(csvFilePath);
  return jsonArray;
}

toJson();
