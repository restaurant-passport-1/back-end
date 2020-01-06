exports.seed = function(knex) {
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
};
