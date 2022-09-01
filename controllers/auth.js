const passport = require("passport");

module.exports = {
    authenticate,
}

passport.authenticate("google", {
    scope: ["profile", "email"],
})

passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
})