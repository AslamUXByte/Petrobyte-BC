const express = require("express");
const { getFuels, getFuelsById,postFuels, putFuels, deleteFuels } = require("../controllers/fuelpricecontroller");
const router = express.Router();

router.get("/", getFuels);
router.get("/byId", getFuelsById);
router.post("/", postFuels);
router.put("/", putFuels);
router.delete("/", deleteFuels);

module.exports = router;
