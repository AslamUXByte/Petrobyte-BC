const express = require("express");
const { getFuelAccountDetails, getFuelAccountDetailsByDate,postFuelAccountDetails, putFuelAccountDetails, deleteFuelAccountDetails,getFuelAccountOverview } = require("../controllers/fuelaccountcontroller");
const router = express.Router();

router.get("/GETAllFuelAccount", getFuelAccountDetails);
router.get("/GETFuelAccountOverview", getFuelAccountOverview);
router.get("/GETFUelAccountbydate", getFuelAccountDetailsByDate);
router.post("/POSTFuelAccount", postFuelAccountDetails);
router.put("/PUTFuelAccount", putFuelAccountDetails);
router.delete("/DELETEFuelAccount", deleteFuelAccountDetails);

module.exports = router;
