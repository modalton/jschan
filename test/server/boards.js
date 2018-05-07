const app = require("../../server/index.js");
const request = require("supertest")(app);


//To see createBoard functionality check auth.js for authorized test

describe("GET /:board/catalog", function() {
  it("responds w/JSON & 200", function(done) {
    request
      .get("/b/catalog")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("handles nonexistent boards", function(done) {
    request
      .get("/notaboard/catalog")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  
});


describe("POST :board/createThread", () => {
  it("create thread attached to board", (done) => {
    request
      .post("/b/createThread")
      .send({title:"New Thread", body:"My body", picture_url:"http://not.com"})
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("attempting to create thread on nonexistent board sends 400", (done) => {
    request
      .post("/notaboard/createThread")
      .send({title:"New Thread", body:"My body", picture_url:"http://not.com"})
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400, done);
  });
});

