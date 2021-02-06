const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost/tpt_products';

const docs = require('./products1.csv');

MongoClient.connect(uri, (err, db) => {
  const col = db.collection('collection');

  const batch = col.initializeOrderedBulkOp();

  batch.insert(docs);

  batch.execute((err, result) => {
    console.dir(err);
    console.dir(result);
    db.close();
  });
});
