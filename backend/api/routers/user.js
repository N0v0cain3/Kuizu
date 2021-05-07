const User = require("../controllers/user")
const router = require("express").Router()

router.post("/signup",User.signup)


router.post("/login",User.login)

module.exports = router