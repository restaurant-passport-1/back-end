const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = "secret krabby patty ingredient";

    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ message: "You need auhtorization to access, please login" });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login and try again." });
  }
};
