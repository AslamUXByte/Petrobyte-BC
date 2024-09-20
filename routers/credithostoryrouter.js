const express = require("express");
const {
  getCreditHistory,
  postCreditHistory,
  putCreditHistory,
  deleteCreditHistory,
  getVehicleNumber,
} = require("../controllers/credithistorycontroller");
const router = express.Router();

router.get("/GETAllCreditHistory", getCreditHistory);
router.post("/POSTCreditHistory", postCreditHistory);
router.put("/PUTCreditHistory", putCreditHistory);
router.delete("/DELETECreditHistory", deleteCreditHistory);
router.delete("/DELETECreditHistory", deleteCreditHistory);
router.get("/GETvehicleNumber", getVehicleNumber);

module.exports = router;
