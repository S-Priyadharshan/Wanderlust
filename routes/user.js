const express= require("express");
const router= express.Router();
const wrapAsync= require("../utils/wrapAsync");
const passport= require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signup))

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl,
    passport.authenticate("local", { 
        failureRedirect: "/login", 
        failureFlash: true
    }),
    wrapAsync(userController.login)
)

router.get("/logout", userController.logout);

module.exports = router;

// stu

// Newuser
// user1

//user2
//user2@password

//user3
//user3@pass