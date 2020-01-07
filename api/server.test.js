const request = require("supertest");

const server = require("./server");
const db = require("../database/dbConfig");

describe("server", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("should set db environment to testing", function() {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("should return 201 Created", function() {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "TEST", password: "TEST" })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
});
