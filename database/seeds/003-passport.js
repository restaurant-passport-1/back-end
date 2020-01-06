exports.seed = function(knex) {
  return knex("passport").insert([
    {
      restaurantName: "Cheddars",
      streetAddress: " 2100 N Green River Rd",
      city: "Evansville",
      zipcode: "47715",
      phoneNumber: "812-491-9976",
      websiteUrl: "cheddars.com",
      myRating: 4,
      notes: "Good place for home cooked style food, and good drinks",
      stamped: true,
      user_id: 1
    },
    {
      restaurantName: "Texas Roadhouse",
      streetAddress: "7900 Eagle Crest Blvd",
      city: "Evansville",
      zipcode: "47715",
      phoneNumber: "812-477-7427",
      websiteUrl: "forms.texasroadhouse.com",
      myRating: 5,
      notes: "Really packed during dinner rush but worth the wait",
      stamped: true,
      user_id: 2
    },
    {
      restaurantName: "Azzip",
      streetAddress: " 2121 N Green River Rd",
      city: "Evansville",
      zipcode: "47715",
      phoneNumber: "812-901-0490",
      websiteUrl: "azzippizza.com",
      myRating: 4,
      notes:
        "Good variety of different pizzas, including locations having unique flavors",
      stamped: true,
      user_id: 1
    }
  ]);
};
