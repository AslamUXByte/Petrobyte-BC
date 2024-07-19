const express = require("express");
const { getFuels, postFuels, putFuels, deleteFuels } = require("../controllers/fuelpricecontroller");
const router = express.Router();

router.get("/GETAllFuel", getFuels);
router.post("/POSTFuel", postFuels);
router.put("/PUTFuel", putFuels);
router.delete("/DELETEFuel", deleteFuels);

module.exports = router;
