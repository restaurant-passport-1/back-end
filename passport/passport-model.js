const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  add,
  remove,
  update
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

function add(data, id) {
  return db("passport")
    .insert({ ...data, user_id: id })
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
