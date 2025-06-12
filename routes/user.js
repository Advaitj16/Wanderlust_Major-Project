const express = require("express");
const router =  express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {isLoggedIn,saveRedirectUrl} = require("../middleware");
const { signup, renderSignupform, renderLoginform, login, logout } = require("../controllers/user");

router.route("/signup")
.get( renderSignupform)
.post( wrapAsync(signup));

router.route("/login")
.get(renderLoginform)
.post(
   saveRedirectUrl,
   passport.authenticate("local",{failureRedirect: '/login', failureFlash: true}) ,
   login);

router.get("/logout",logout);


module.exports = router;