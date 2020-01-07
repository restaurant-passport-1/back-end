const request = require("supertest");

const db = require("../database/dbConfig");

const server = require("../api/server");

describe("Passport-Router", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("returns 200 status code for logged in user seeing passport", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "TEST",
        password: "TEST",
        city: "TEST",
        name: "TEST",
        email: "TEST"
      })
      .then(() => {
        return request(server)
          .post("/api/auth/login")
          .send({ username: "TEST", password: "TEST" })
          .expect(200)
          .then(res => {
            const token = res.body.token;

            return request(server)
              .get("/api/auth/passport")
              .set("authorization", token)
              .expect(200);
          });
      });
  });

  it("returns 200 status code for adding passport, then can find that users passport", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "TEST",
        password: "TEST",
        city: "TEST",
        name: "TEST",
        email: "TEST"
      })
      .then(() => {
        return request(server)
          .post("/api/auth/login")
          .send({ username: "TEST", password: "TEST" })
          .expect(200)
          .then(res => {
            const token = res.body.token;

            return request(server)
              .post("/api/auth/passport/")
              .set("authorization", token)
              .send({
                restaurantName: "Pizza Hut",
                streetAddress: "601 E Boonville New Harmony Rd",
                city: "Evansville",
                zipcode: "47725",
                phoneNumber: "812-867-8540",
                websiteUrl: "pizzahut.com",
                myRating: 4,
                notes: "Good breadsticks, decent pizza",
                stamped: 1,
                user_id: 1
              })
              .expect(200)
              .then(() => {
                return request(server)
                  .get("/api/auth/passport/1/user")
                  .set("authorization", token)
                  .expect(200);
              });
          });
      });
  });
});
