require("dotenv").config();
const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  //verify the token
  //1. extract the token from the incoming req's Authorization header ---> req.headers
  //2. use jwt to decode the token
  //3. if req contains a user id? --- req.body.userId ?
  //3.1 if so, compare to the id extracted from token
  //4.  fire next function
  try {
    const token = req.headers.authorization.split("")[1];
    console.log("req.headers", req.headers);
    const decodedToken = jwt.verify(token, process.env.SECREAT);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw Error("Invalid user ID");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid request" });
  }
};

module.exports = Auth;
