exports.up = function(knex) {
  return knex.schema.createTable("passport", tbl => {
    tbl.increments();

    tbl.string("restaurantName", 255).notNullable();
    tbl.string("streetAddress", 255);
    tbl.string("city", 255).notNullable();
    tbl.string("zipcode", 255);
    tbl.string("phoneNumber", 255);
    tbl.string("websiteUrl", 255);
    tbl.integer("myRating").notNullable();
    tbl.string("notes", 255);
    tbl.boolean("stamped");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("passport");
};
