const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, admin) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.admin = admin;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateJWT;
