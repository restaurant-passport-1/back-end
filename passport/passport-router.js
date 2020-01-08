const router = require("express").Router();
const Passport = require("./passport-model");

router.get("/", (req, res) => {
  Passport.find()
    .then(passport => {
      res.status(200).json(passport);
    })
    .catch(err => {
      res.status(500).json({ error: "Cannot GET passport" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Passport.findById(id)
    .then(pass => {
      if (pass) {
        res.json(pass);
      } else {
        res.status(404).json({ message: "Could not find passport" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting passport" });
    });
});

router.post("/", (req, res) => {
  if (!req.body.user_id) {
    res.status(400).json({ message: "Error! user_id is required." });
  }
  const passport = req.body;
  Passport.add(passport)
    .then(passport => {
      res.status(200).json(passport);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error adding passport" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Passport.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ message: "Passport deleted" });
      } else {
        res
          .status(404)
          .json({ message: "Could not find passport with given ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error deleting" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Passport.update(id, changes)
    .then(updated => {
      if (updated) {
        Passport.findId(id)
          .then(user => res.status(200).json(user))
          .catch(err => {
            console.log(err);
            res
              .status(500)
              .json({ message: "The information could not be modified" });
          });
      } else {
        res
          .status(404)
          .json({ error: "The user with the specified ID does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "There was an error updating information" });
    });
});

router.get("/:id/user", (req, res) => {
  const { id } = req.params;

  Passport.findPassports(id)
    .then(pass => {
      if (pass.length) {
        res.status(200).json(pass);
      } else {
        res.status(404).json({ message: "Could not find data for given user" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error finding passport" });
    });
});

module.exports = router;
