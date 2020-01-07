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
      .send({
        username: "TEST",
        password: "TEST",
        city: "TEST",
        name: "TEST",
        email: "TEST"
      })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });

  it("should return 200 on login", async () => {
    // User registers
    const response = await request(server)
      .post("/api/auth/register")
      .send({
        username: "TEST1",
        password: "TEST1",
        city: "TEST1",
        name: "TEST1",
        email: "TEST1"
      });

    // User logs in
    const loginResponse = await request(server)
      .post("/api/auth/login")
      .send({ username: "TEST1", password: "TEST1" });
    expect(loginResponse.status).toBe(200);
  });
});
