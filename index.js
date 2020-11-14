var express = require('express')
var app = express()
app.use(express.static(__dirname+'/client/dist'))
app.get('/', function (req, res) {
  res.render('index')
  res.send('done')
})


app.get('/:Id', function(req, res) {
  let productId = req.params.Id;
  console.log(productId)
})
app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:3001`)
})