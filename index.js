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

app.get('/:Id/DS', (req, res) => {
  console.log('starting')
  const productId = req.params.Id.split(':')[0];
  const productInfo = {};
  con.query(`select * from Product where id = ${productId};`, (productQueryErr, productQueryResult) => {
    if (productQueryErr) throw productQueryErr;

    productInfo.productDescriptions = productQueryResult[0].Descriptions;
    productInfo.pageLength = productQueryResult[0].Pages;
    productInfo.answerKeyIncluded = productQueryResult[0].answer_key;
    productInfo.teachingDuration = productQueryResult[0].teaching_dur;
    productInfo.standards = [];
    productInfo.standardsDescription = [];
    con.query(`select * from SandD where Product_id = ${productId};`, (querySandDErr, resultSandD) => {
      if (querySandDErr) throw querySandDErr;
      const standardIds = [];
      if (resultSandD.length !== 0) {
        resultSandD.forEach((standardId) => standardIds.push(standardId.Standards_id));
        standardIds.forEach((id, i) => {
          con.query(`select * from Standards where ID = ${id}`, (standardQueryError, standardQueryResult) => {
            if (standardQueryError) throw standardQueryError;

            productInfo.standards.push(standardQueryResult[0].Standards);
            productInfo.standardsDescription.push(standardQueryResult[0].Description);
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
  // {productDescriptions:string, pageLength: int, answerKeyIncluded: string, teachingDuration: string, standards: string}
});
app.listen(3001, () => {
  console.log('listening at http://localhost:3001');
});
module.exports = app