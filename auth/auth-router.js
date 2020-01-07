const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");
const validateUser = require("../users/users-helpers");
const restricted = require("./auth-middleware");

router.post("/register", validateUser, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(registered => {
      res.status(201).json(registered);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error registering" });
    });
});

router.post("/login", validateUser, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({
          token,
          user_id: user.id,
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Login failed" });
    });
});

function signToken(user) {
  const payload = {
    username: user.username,
    id: user.id
  };

  const secret = "secret krabby patty ingredient";

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
