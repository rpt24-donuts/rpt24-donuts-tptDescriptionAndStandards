const express = require('express');

const app = express();
const mysql = require('mysql');
// app.set('view engine', 'html');
app.use(express.static(`${__dirname}/client/dist`));
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password!23',
  database: 'SandD',
});
app.get('/products/:Id', (req, res) => {
  console.log('in here')
  res.sendFile(`${__dirname}/client/dist/index.html`);
  // res.send('done');
});
//https://localhost:3001/products/{}/description-and-standards
app.get('/products/:Id/description-and-standards', (req, res) => {
  console.log('starting');
  console.log(req.params.Id)
  let productId = req.params.Id; //express route parameters
  let productInfo = {};
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
      if (querySandDErr) throw productQueryErr
      if (resultSandD.length !== 0) {
      resultSandD.forEach(standard=>{

        productInfo.standards[standard.standards] = standard.StandardsDescription
      })
      console.log('standards', productInfo.standards)
    } else {
      productInfo.standards['N/A'] = 'N/A'

    }
    res.json(productInfo);
    })
  });
});
app.listen(3002, () => {
  console.log('listening at http://localhost:3002');
});
module.exports = app;
