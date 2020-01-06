const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  add,
  remove,
  update,
  findId,
  findPassports
};

function find() {
  return db("passport").select(
    "id",
    "restaurantName",
    "city",
    "myRating",
    "stamped"
  );
}

function findBy(filter) {
  return db("passport").where(filter);
}

function findById(user_id) {
  return db("passport")
    .where({ user_id })
    .first();
}

function add(passport) {
  return db("passport")
    .insert(passport, "id")
    .then(ids => {
      const [id] = ids;

      return findById(id);
    });
}

function remove(id) {
  return db("passport")
    .where({ id })
    .first()
    .delete();
}

function update(id, changes) {
  return db("passport")
    .where({ id })
    .update(changes);
}

function findId(id) {
  return db("passport")
    .where({ id })
    .first();
}

function findPassports(id) {
  return db("passport")
    .join("users", "passport.user_id", "users.id")
    .select(
      "passport.id",
      "passport.restaurantName",
      "passport.streetAddress",
      "passport.city",
      "passport.zipcode",
      "passport.phoneNumber",
      "passport.websiteUrl",
      "passport.myRating",
      "passport.notes",
      "passport.stamped",
      "users.username"
    )
    .orderBy("passport.id")
    .where({ "passport.user_id": id });
}
