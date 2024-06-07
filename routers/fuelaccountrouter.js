const express = require("express");
const { getFuelAccountDetails, getFuelAccountDetailsById,postFuelAccountDetails, putFuelAccountDetails, deleteFuelAccountDetails } = require("../controllers/fuelaccountcontroller");
const router = express.Router();

router.get("/", getFuelAccountDetails);
router.get("/byId", getFuelAccountDetailsById);
router.post("/", postFuelAccountDetails);
router.put("/", putFuelAccountDetails);
router.delete("/", deleteFuelAccountDetails);

module.exports = router;
