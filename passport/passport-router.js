const router = require("express").Router();
const Passport = require("./passport-model");
const restricted = require("../auth/auth-middleware");

router.get("/", restricted, (req, res) => {
  Passport.find()
    .then(passport => {
      res.status(200).json(passport);
    })
    .catch(err => {
      res.status(500).json({ error: "Cannot GET passport" });
    });
});

module.exports = router;
