const express = require("express");
const router = express.Router();
import { LoginUser, SignupUser } from "../controllers/userController";

//login
router.post("/login", loginUser);

//signup
router.post("/signup", SignupUser);

module.exports = router;
