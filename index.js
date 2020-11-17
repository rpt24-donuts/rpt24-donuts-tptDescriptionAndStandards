const express = require('express');

const app = express();
app.use(express.static(`${__dirname}/client/dist`));
app.get('/', (req, res) => {
  res.render('index');
  res.send('done');
});

app.get('/:Id', (req, res) => {
  const productId = req.params.Id;
  console.log(productId);
  res.send('done')
});
app.listen(3001, () => {
  console.log('Example app listening at http://localhost:3001');
});
