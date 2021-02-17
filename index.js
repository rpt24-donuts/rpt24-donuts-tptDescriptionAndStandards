const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const { Pool } = require('pg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

app.use(express.static(`${__dirname}/client/dist`));

const pool = new Pool({
  user: 'kendallbutt',
  host: 'localhost',
  database: 'kendallbutt',
  password: '',
  port: 5432,
});

app.get('/products/:Id', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.get('/products/:Id/description-and-standards', (req, res) => {
  const productId = req.params.Id;
  const productInfo = {};
  pool.query(`SELECT * FROM products WHERE id = ${productId};`, (err, productQueryResult) => {
    if (err) {
      res.send(err);
    } else if (productQueryResult.rows.length) {
      if (productQueryResult.rows[0].answer_key_included === true) {
        productInfo.answerKeyIncluded = 'Yes';
      } else {
        productInfo.answerKeyIncluded = 'No';
      }
      productInfo.productDescription = productQueryResult.rows[0].description;
      productInfo.pageLength = productQueryResult.rows[0].page_length;
      productInfo.teachingDuration = productQueryResult.rows[0].teaching_duration;
      productInfo.standards = {};
      pool.query(`SELECT s1.standard, s1.description FROM standards s1 JOIN standards_to_products stp on stp.standards_id = s1.id WHERE stp.product_id =${productId}`, (err1, resultStp) => {
        if (err1) {
          res.send(err1);
        } else {
          if (resultStp.rows.length) {
            resultStp.rows.forEach((standard) => {
              productInfo.standards[standard.standard] = standard.description;
            });
          } else {
            productInfo.standards['N/A'] = 'N/A';
          }
          res.json(productInfo);
        }
      });
    } else {
      res.sendStatus(404);
    }
  });
});

app.get('/products/:searchTerm/description', (req, res) => {
  const { searchTerm } = req.params;
  const productInfo = {};
  pool.query(`SELECT * FROM products WHERE document_vectors @@ to_tsquery('${searchTerm}') LIMIT 1`, (err, productQueryResult) => {
    if (err) {
      res.send(err);
    } else if (productQueryResult.rows.length) {
      if (productQueryResult.rows[0].answer_key_included === true) {
        productInfo.answerKeyIncluded = 'Yes';
      } else {
        productInfo.answerKeyIncluded = 'No';
      }
      productInfo.productDescription = productQueryResult.rows[0].description;
      productInfo.pageLength = productQueryResult.rows[0].page_length;
      productInfo.teachingDuration = productQueryResult.rows[0].teaching_duration;
      productInfo.standards = {};
      const productId = productQueryResult.rows[0].id;
      pool.query(`SELECT s1.standard, s1.description FROM standards s1 JOIN standards_to_products stp on stp.standards_id = s1.id WHERE stp.product_id =${productId}`, (err1, resultStp) => {
        if (err1) {
          res.send(err1);
        } else {
          if (resultStp.rows.length) {
            resultStp.rows.forEach((standard) => {
              productInfo.standards[standard.standard] = standard.description;
            });
          } else {
            productInfo.standards['N/A'] = 'N/A';
          }
          res.json(productInfo);
        }
      });
    } else {
      res.sendStatus(404);
    }
  });
});

app.delete('/products/:Id', (req, res) => {
  const productId = req.params.Id;
  pool.query(`DELETE FROM standards_to_products WHERE product_id = ${productId}`, (err, status) => {
    if (err) {
      res.send(err);
    } else if (status.rowCount) {
      pool.query(`DELETE FROM products WHERE id = ${productId}`, (err1, status1) => {
        if (err) {
          res.send(err1);
        } else if (status1.rowCount) {
          res.send(status);
        } else {
          res.status(404).send('Product not found in products table');
        }
      });
    } else {
      res.status(404).send('Product not found  in join table');
    }
  });
});

app.post('/products/add', (req, res) => {
  const {
    productDescription, pageLength, answerKeyIncluded, teachingDuration,
  } = req.body;
  const query = `INSERT INTO products (description, page_length, answer_key_included, teaching_duration) VALUES (${productDescription}, ${pageLength}, ${answerKeyIncluded}, ${teachingDuration})`;
  pool.query(query, (err, status) => {
    if (err) {
      res.send(err);
    } else if (status.rowCount) {
      res.send(status);
    } else {
      res.status(404).send('Failed to add product');
    }
  });
});

// TODO: need a way to look up product by name or other identifier than description
app.put('/products/updateProductDescription', (req, res) => {
  const { productDescription, id } = req.body;
  pool.query(`UPDATE products SET description = ${productDescription} WHERE id = ${id}`, (err, status) => {
    if (err) {
      res.send(err);
    } else if (status.rowCount) {
      res.send(status);
    } else {
      res.status(404).send('Failed to update product');
    }
  });
});

app.listen(3002, () => {
  console.log('listening at http://localhost:3002');
});

module.exports = app;
