require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const Auth = async (req, res, next) => {
  //verify the token
  //1. extract the token from the incoming req's Authorization header ---> req.headers
  //2. use jwt to decode the token
  //3. if req contains a user id? --- req.body.userId ?
  //3.1 if so, compare to the id extracted from token
  //4.  fire next function
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.SECREAT);

      req.userId = decodedData.id;

      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid request" });
  }
};

// const Auth = async (req, res, next) => {
//   const { authorization } = req.headers;
//   console.log("destructured authorization", authorization);

//   if (!authorization) {
//     return res
//       .status(400)
//       .json({ error: "Authorization token is required/ You need to login" });
//   }

//   const token = authorization.split(" ")[1];
//   console.log("token", token);

//   try {
//     const { _id } = jwt.verify(token, process.env.SECREAT);
//     req.user = await User.findOne({ _id }).select("_id");
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ error: "Invalid Request" });
//   }
// };

module.exports = Auth;
