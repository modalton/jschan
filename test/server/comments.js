const app = require("../../server/index.js");
const request = require("supertest")(app);


describe("POST comment/:thread_id", () => {
  it("respond with json", (done) => {
    request
      .post("/comment/9")
      .send({ body:"Comment body", picture_url:"http://not.com"})
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
