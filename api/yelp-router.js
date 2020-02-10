const router = require("express").Router();
const axios = require("axios");
const Users = require("../users/users-model");

router.get("/search", async (req, res) => {
  const { id } = req.query;

  const data = await Users.findById(id);
  axios
    .get(`https://api.yelp.com/v3/businesses/search?location=${data.city}`, {
      headers: {
        authorization: process.env.REACT_APP_YELP_API_KEY
      },
    params: {
      limit: 50
    }})
    .then(restaurants => {
      res.status(200).json(restaurants.data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
