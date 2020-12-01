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
app.get('/:Id', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
  // res.send('done');
});

app.get('/:Id/description-and-standards', (req, res) => {
  console.log('starting');
  console.log(req.params.Id)
  const productId = req.params.Id.split(':')[1]; //express route parameters
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
    productInfo.standards = [];
    productInfo.standardsDescription = [];
    con.query(`select * from StandardsandDescriptions where Product_id = ${productId};`, (querySandDErr, resultSandD) => {
      if (querySandDErr) throw querySandDErr;
      const standardIds = [];
      if (resultSandD.length !== 0) {
        resultSandD.forEach((standardId) => standardIds.push(standardId.Standards_id));
        standardIds.forEach((id, i) => { //look into using a join query, could implement
          con.query(`select * from Standards where ID = ${id}`, (standardQueryError, standardQueryResult) => {
            if (standardQueryError) throw standardQueryError;

            productInfo.standards.push(standardQueryResult[0].standards);
            productInfo.standardsDescription.push(standardQueryResult[0].standardsDescription);
            if (i === standardIds.length - 1) {
              res.json(productInfo);
            }
          });
        });
      } else {
        productInfo.standards.push('N/A');
        productInfo.standardsDescription.push('N/A');
        res.json(productInfo);
      }
    });
  });
});
app.listen(3002, () => {
  console.log('listening at http://localhost:3002');
});
module.exports = app;
