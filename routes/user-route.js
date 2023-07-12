const express = require("express");
;
const { getUsers, login, createUser, deleteUser } = require("../controller/user-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/users", getUsers);
router.post("/login", login);
router.use(checkAuth)
router.post("/create", createUser);
router.delete("/delete/:id", deleteUser);


module.exports = router;
