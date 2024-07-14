const express = require("express");
const {
  getCashByDate,
  postCash,
  putCash,
} = require("../controllers/cashmanagementcontroller");
const router = express.Router();

router.post("/GETCashDetails", getCashByDate);
router.post("/POSTCashDetails", postCash);
router.post("/PUTCashDetails", putCash);

module.exports = router;
