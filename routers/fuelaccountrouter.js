const express = require("express");
const { getFuelAccountDetails, getFuelAccountDetailsByDate,postFuelAccountDetails, putFuelAccountDetails, deleteFuelAccountDetails,getFuelAccountOverview } = require("../controllers/fuelaccountcontroller");
const router = express.Router();

router.get("/", getFuelAccountDetails);
router.get("/overview", getFuelAccountOverview);
router.get("/bydate", getFuelAccountDetailsByDate);
router.post("/", postFuelAccountDetails);
router.put("/", putFuelAccountDetails);
router.delete("/", deleteFuelAccountDetails);

module.exports = router;
