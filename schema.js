const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password!23',
  database: 'SandD',
});
const dataMaker = require('./dataGenerator.js');

const standards = dataMaker.standardGenerator();

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

for (let j = 0; j < standards.length - 1; j++) {
  con.query(`insert into Standards (Standards, Description ) values ('${standards[j]}', '${dataMaker.standardDescriptionGenerator()}');`, (err, result) => {
    if (err) throw err;
  });
}
for (let i = 0; i < 100; i++) {
  con.query(`insert into Product (Descriptions, Pages, answer_key, teaching_dur) values ('${dataMaker.descriptionGenerator()}', ${dataMaker.pagesGenerator()}, '${dataMaker.answerKeyGenerator()}', '${dataMaker.teachingDurationGenerator()}');`, (err, result) => {
    if (err) throw err;
  });
}

for (let i = 0; i < 101; i++) {
  const rand = Math.floor(Math.random() * 4);
  const randomStandard = Math.floor(Math.random() * standards.length);

  for (let j = 0; j < rand; j++) {
    console.log(i, j);

    con.query(`insert into SandD (Product_id, Standards_id) values (${i}, ${randomStandard + j});`, (err, result) => {
      if (err) throw err;
      console.log('done populating DB data');
    });
  }
}
