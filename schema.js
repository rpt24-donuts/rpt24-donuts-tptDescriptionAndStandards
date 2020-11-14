var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password!23",
  database: 'SandD'
});
const dataMaker = require('./dataGenerator.js')
var standards = dataMaker.standardGenerator();

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})

for (var j = 0; j < standards.length-1; j++){
  con.query(`insert into Standards (Standards, Description ) values ('${standards[j]}', '${dataMaker.standardDescriptionGenerator()}');`, function(err, result){
    if (err) throw err;

      })
    }
  for (var i=0; i<100;i++) {
        con.query(`insert into Product (Descriptions, Pages, answer_key, teaching_dur) values ('${dataMaker.descriptionGenerator()}', ${dataMaker.pagesGenerator()}, '${dataMaker.answerKeyGenerator()}', '${dataMaker.teachingDurationGenerator()}');`, function(err, result) {
          if (err) throw err;
      })
    }

for (var i = 0; i<101;i++){
  var rand = Math.floor(Math.random()*4);
  var randomStandard = Math.floor(Math.random()*standards.length);

  for (var j =0; j<rand; j++) {
    console.log(i,j)


    con.query(`insert into SandD (Product_id, Standards_id) values (${i}, ${randomStandard+j});`, function(err, result) {
    if (err) throw err;
    console.log('done populating DB data')
  })


}
}
