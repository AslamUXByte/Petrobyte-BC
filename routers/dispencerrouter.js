const express = require("express");
const {
  getDispencer,
  getDispencerById,
  postDispencer,
  putDispencer,
  deleteDispencer,
  updateLiveReading,
} = require("../controllers/dispencercontroller");
const router = express.Router();

router.get("/GETAllDispencer", getDispencer);
router.get("/GETDispeencerbyId", getDispencerById);
router.post("/POSTDispencer", postDispencer);
router.put("/PUTDispencer", putDispencer);
router.put("/updateLiveReading", updateLiveReading);
router.delete("/DELETEDispencer", deleteDispencer);

module.exports = router;
