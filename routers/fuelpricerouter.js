const express = require("express");
const { getFuels, postFuels, putFuels, deleteFuels,postfuelPriceHistoryByDate, getfuelPriceHistoryByDate } = require("../controllers/fuelpricecontroller");
const router = express.Router();

router.get("/GETAllFuel", getFuels);
router.post("/POSTFuel", postFuels);
router.put("/PUTFuel", putFuels);
router.delete("/DELETEFuel", deleteFuels);
router.get("/GETFuelPriceHistory", getfuelPriceHistoryByDate);
router.get("/POSTFuelPriceHistory", postfuelPriceHistoryByDate);

module.exports = router;
