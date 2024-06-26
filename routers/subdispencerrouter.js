const express = require("express");
const { getSubDispencer,postSubDispencer,updateLiveRating } = require("../controllers/subdispencercontroller");
const router = express.Router();

router.get("/GETAllSubDispencer", getSubDispencer);
router.post("/POSTSubDispencer", postSubDispencer);
router.put("/updateLiveReading", updateLiveRating);

module.exports = router;
