var express = require("express");
var router = express.Router();
const {
  login,
  register,
  update,
  profile,
  edit,
  userRegister,
  loginRegister,
  logout,
} = require("../controllers/userController");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const { uploadUsers } = require("../middlewares/uploadFiles");

router
  .get("/login", login)
  .post("/login", loginValidator, loginRegister)
  .get("/register", register)
  .post(
    "/register",
    uploadUsers.single("avatar"),
    registerValidator,
    userRegister
  )
  .get("/profile", profile)
  .get("/profileEdit/:id", edit)
  .put("/update/:id", update)
  .get("/logout", logout);

module.exports = router;
