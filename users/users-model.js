const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  remove,
  update
};

function find() {
  return db("users").select("id", "username", "city");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function remove(id) {
  return db("users")
    .where({ id })
    .first()
    .delete();
}

function update(changes, id) {
  return db("users")
    .where({ id })
    .update(changes);
}
