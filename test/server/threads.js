const app = require("../../server/index.js");
const request = require("supertest")(app);

describe("GET /thread/:thread_id", () => {
  it("responds with thread and comments", (done) => {
    request
      .get("/thread/9")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res)=>{
        if(res.length <= 1){
          throw new Error("missing part of response")
        }
      })
      .expect(200,done);
  });

  it("handles nonexistent threads", (done) => {
    request
      .get("/thread/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res)=>{
        if(res !== []){
          throw new Error("response populated when it shouldn't be")
        }
      })
      .expect(200,done);
  });
});
