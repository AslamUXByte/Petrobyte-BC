const express = require("express");
const { getUser, getUserById, putUser, deleteUser } = require("../controllers/usercontroller");
const router = express.Router();

router.get("/GETAllUser", getUser);
router.get("/GETUserbyId", getUserById);
router.put("/PUTUser", putUser);
router.delete("/DELETEUser", deleteUser);

module.exports = router;
