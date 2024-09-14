const express = require("express");
const {
  getCashByDate,
  postCash,
  putCash,
  getCashByEmployee
} = require("../controllers/cashmanagementcontroller");
const router = express.Router();

router.get("/GETCashDetails", getCashByDate);
router.post("/POSTCashDetails", postCash);
router.put("/PUTCashDetails", putCash);
router.get("/GETCashDetailsByEmployee", getCashByEmployee);

module.exports = router;
