const express = require("express");
const { getFuels, postFuels, putFuels, deleteFuels, getfuelPriceHistoryByDate } = require("../controllers/fuelpricecontroller");
const router = express.Router();

router.get("/GETAllFuel", getFuels);
router.post("/POSTFuel", postFuels);
router.put("/PUTFuel", putFuels);
router.delete("/DELETEFuel", deleteFuels);
router.get("/GETFuelPriceHistory", getfuelPriceHistoryByDate);

module.exports = router;
