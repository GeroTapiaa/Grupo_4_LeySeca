const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  getAvatar,
  verifyEmail,
} = require("../../controllers/API/apiUserController");

/* /api/users */

router
  .get("/", getAllUsers)
  .get("/:id", getUser)
  .get("/avatar/:avatar", getAvatar)
  .post("/verify-email", verifyEmail);
module.exports = router;
