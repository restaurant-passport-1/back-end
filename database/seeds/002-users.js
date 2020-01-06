exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "Addy",
          password: "pass",
          name: "Addison",
          city: "Evansville",
          email: "adddison.hill@gmail.com"
        },
        {
          username: "Dwight",
          password: "pass",
          name: "Dwight Schrute",
          city: "Scranton",
          email: "schrutefarms@office.com"
        },
        {
          username: "Michael",
          password: "pass",
          name: "Michael Scott",
          city: "Scranton",
          email: "thatswhatshesaid@dundermifflin.com"
        }
      ]);
    });
};
