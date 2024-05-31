const express = require("express");
const { getUser, getUserById, putUser, deleteUser } = require("../controllers/usercontroller");
const router = express.Router();

router.get("/", getUser);
router.get("/byId", getUserById);
router.put("/", putUser);
router.delete("/", deleteUser);

module.exports = router;
