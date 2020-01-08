const router = require("express").Router();
const axios = require("axios");

router.get("/search", (req, res) => {
  axios
    .get("https://api.yelp.com/v3/businesses/search?location=Evansville", {
      headers: {
        authorization: process.env.REACT_APP_YELP_API_KEY
      }
    })
    .then(restaurants => {
      res.status(200).json(restaurants.data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
