const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const compression = require('compression');
const mysqlLogin = require('./mysqlKey.js');

app.use(compression());

// app.get('*.js', (req, res, next) => {
//   req.url += '.gz';
//   console.log('sending compressed file');
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
// });
app.use(express.static(`${__dirname}/client/dist`));
const con = mysql.createConnection({
  // host: '172.31.10.193',
  user: 'root',
  password: mysqlLogin.password,
  database: 'SandD',
  // port: '3306',
});
app.get('/products/:Id', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.get('/products/:Id/description-and-standards', (req, res) => {
  const productId = req.params.Id;
  const productInfo = {};
  con.query(`select * from Product where id = ${productId};`, (productQueryErr, productQueryResult) => {
    if (productQueryErr) throw productQueryErr;
    if (productQueryResult[0].answerKeyIncluded === 1) {
      productInfo.answerKeyIncluded = 'Yes';
    } else if (productQueryResult[0].answerKeyIncluded === 0) {
      productInfo.answerKeyIncluded = 'No';
    } else {
      productInfo.answerKeyIncluded = 'N/A';
    }
    productInfo.productDescription = productQueryResult[0].productDescription;
    productInfo.pageLength = productQueryResult[0].pageLength;
    productInfo.teachingDuration = productQueryResult[0].teachingDuration;
    productInfo.standards = {};
    con.query(`Select s1.standards, s1.StandardsDescription from Standards s1 inner join StandardsandDescriptions SandD on SandD.Standards_id = s1.ID where SandD.Product_id =${productId}`, (querySandDErr, resultSandD) => {
      if (querySandDErr) throw productQueryErr;
      if (resultSandD.length !== 0) {
        resultSandD.forEach((standard) => {
          productInfo.standards[standard.standards] = standard.StandardsDescription;
        });
      } else {
        productInfo.standards['N/A'] = 'N/A';
      }
      res.json(productInfo);
    });
  });
});

app.delete('/products/:Id', (req, res) => {
  const productId = req.params.Id;
  con.query(`DELETE FROM StandardsandDescriptions WHERE Product_id = ${productId}`, (SandDDeleteErr) => {
    if (SandDDeleteErr) throw SandDDeleteErr;
    con.query(`DELETE FROM Product WHERE ID = ${productId}`, (prodDeleteErr, prodDeleteRes) => {
      if (prodDeleteErr) throw prodDeleteErr;
      res.send(prodDeleteRes);
    });
  });
});

app.post('/products/add', (req, res) => {
  const {
    productDescription, pageLength, answerKeyIncluded, teachingDuration,
  } = req.body;
  const query = `INSERT INTO Product (productDescription, pageLength, answerKeyIncluded, teachingDuration) VALUES (${productDescription}, ${pageLength}, ${answerKeyIncluded}, ${teachingDuration})`;
  con.query(query, (prodPostErr) => {
    if (prodPostErr) throw prodPostErr;
    res.json(req.body);
  });
});

// TODO: need a way to look up product by name or other identifier than description
app.put('/products/updateProductDescription', (req, res) => {
  const { productDescription, id } = req.body;
  con.query(`UPDATE Product SET productDescription = ${productDescription} WHERE ID = ${id}`, (updateErr, updateResponse) => {
    if (updateErr) throw updateErr;
    res.send(updateResponse);
  });
});

app.listen(3002, () => {
  console.log('listening at http://localhost:3002');
});

module.exports = app;
