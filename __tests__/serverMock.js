const request = require("supertest");
const app = require("../index.js");

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/:Id")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
  });
});
});

//'/:Id/DS'


describe("Test database path", () => {
  test("It should return the correct product information from the database", done => {
    request(app)
      .get("/1:Id/DS")
      .then(response => {
      // console.log(JSON.parse(response.res.text))
        expect(JSON.parse(response.res.text)["productDescriptions"].includes("Copper")).toBe(true);
        expect(JSON.parse(response.res.text)["pageLength"]).toBe(250);
        expect(JSON.parse(response.res.text)["teachingDuration"]).toBe('1 semester');

        expect(JSON.parse(response.res.text)["standards"][0]).toBe("N/A");
        done();


  });

});
test("It should return the correct product information from the database", done => {
  request(app)
    .get("/99:Id/DS")
    .then(response => {
    // console.log(JSON.parse(response.res.text))
      expect(JSON.parse(response.res.text)["productDescriptions"].includes("Affogato")).toBe(true);
      expect(JSON.parse(response.res.text)["pageLength"]).toBe(150);
      expect(JSON.parse(response.res.text)["teachingDuration"]).toBe('1 quarter');
      console.log(JSON.parse(response.res.text)["standards"][0])
      expect(JSON.parse(response.res.text)["standards"][0]).toBe('CCRA.SL.4.4');
      done();


});

});

});