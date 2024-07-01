const express = require("express");
const {
  getAllDispencer,
  getDispencers,
  postDispencer,
  putDispencer,
  deleteDispencer,
  deleteSubDispencer,
} = require("../controllers/dispencercontroller");
const router = express.Router();

router.get("/GETAllDispencer", getAllDispencer);
router.get("/GETDispencers", getDispencers);
router.post("/POSTDispencer", postDispencer);
router.put("/PUTDispencer", putDispencer);
router.delete("/DELETEDispencer", deleteDispencer);
router.delete("/DELETESubDispencer", deleteSubDispencer);

module.exports = router;
