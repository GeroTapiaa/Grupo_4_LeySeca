var express = require("express");
var router = express.Router();
const {
  login,
  register,
  update,
  profile,
  profileEdit,

  userRegister,
  loginRegister,
  logout,
  
} = require("../controllers/userController");
const sessionCheck = require("../middleware/cookieCheck");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const { uploadUsers } = require("../middleware/uploadFiles");
const userSession = require("../middleware/userSessionCheck");
const userCheck =require("../middleware/userCheck");


router
  .get("/login",userCheck, login)
  .post("/login", loginRegister)
  .get("/register",userCheck, register)
  .post(
    "/register",
    uploadUsers.single("avatar"),
    registerValidator,
    userRegister
  )
  .get("/profile", sessionCheck, userSession, profile)
  .get("/profileEdit/:id", profileEdit)
  .put("/update/:id", uploadUsers.single("avatar"), update)
  .get("/logout", logout)
  

module.exports = router;
