const jwt = require("jsonwebtoken");

// verify token and assign returned user data to request 
// and send data to next middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token; // token was sended in request
  if (authHeader) {
    const token = authHeader.split(" ")[1]; 

    // verify token
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user; // assign user in request
      next(); // leave this middleware
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

// check if the user is doing work with his own account or not
// admin can do anything with all other users
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

// check user is admin or not
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
