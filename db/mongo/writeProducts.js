const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost/tpt_products';

// const client = new MongoClient(uri);
const docs = require('./products1.csv');

MongoClient.connect(uri, (err, db) => {
  // Get the collection
  const col = db.collection('collection');

  // Initialize the Ordered Batch
  // You can use initializeUnorderedBulkOp to initialize Unordered Batch
  const batch = col.initializeOrderedBulkOp();

  // const chunk = docs.slice(0, 50);
  batch.insert(docs);
  // let i = 0;
  // while (i < 10000000) {
  //   i += 1000;
  // }

  // Execute the operations
  batch.execute((err, result) => {
    console.dir(err);
    console.dir(result);
    db.close();
  });
});
// async function run() {
//   try {
//     await client.connect();

//     const database = client.db('tpt_products');
//     const collection = database.collection('products');

//     const options = { ordered: true };

//     const result = await collection.insertMany(docs, options);
//     console.log(`${result.insertedCount} documents were inserted`);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
