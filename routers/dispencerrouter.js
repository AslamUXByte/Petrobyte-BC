const express = require("express");
const {
  getAllDispencer,
  getDispencers,
  postDispencer,
  putDispencer,
  deleteDispencer,
  deleteSubDispencer,
  getSubDispencer
} = require("../controllers/dispencercontroller");
const router = express.Router();

router.get("/GETAllDispencer", getAllDispencer);
router.get("/GETDispencers", getDispencers);
router.post("/POSTDispencer", postDispencer);
router.put("/PUTDispencer", putDispencer);
router.delete("/DELETEDispencer", deleteDispencer);
router.delete("/DELETESubDispencer", deleteSubDispencer);
router.get("/GETSubDispencer", getSubDispencer);

module.exports = router;
