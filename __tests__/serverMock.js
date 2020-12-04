const request = require('supertest');
const app = require('../index.js');
const dataMaker = require('../dataGenerator.js');
const durations = ['Lifelong tool', '1 semester', '1 year', '1 quarter', '2 quarters', '3 quarters'];
const pages = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/products/1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});


describe('Test database path', () => {
  test('It should return the correct product information from the database', (done) => {
    request(app)
      .get('/products/1/description-and-standards')
      .then((response) => {

        expect(dataMaker.hipString.includes(JSON.parse(response.res.text).productDescription.split(' ')[5])).toBe(true);

        expect(pages.includes(JSON.parse(response.res.text).pageLength)).toBe(true);
        expect(durations.includes(JSON.parse(response.res.text).teachingDuration)).toBe(true);
        done();
      });
  });
  test('It should return the correct product information from the database', (done) => {
    request(app)
      .get('/products/99/description-and-standards')
      .then((response) => {

        expect(dataMaker.hipString.includes(JSON.parse(response.res.text).productDescription.split(' ')[5])).toBe(true);

        expect(pages.includes(JSON.parse(response.res.text).pageLength)).toBe(true);
        expect(durations.includes(JSON.parse(response.res.text).teachingDuration)).toBe(true);
        done();
      });
  });
});
