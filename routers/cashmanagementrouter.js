const express = require("express");
const {
  getCashByDate,
  postCash,
  putCash,
} = require("../controllers/cashmanagementcontroller");
const router = express.Router();

router.get("/GETCashDetails", getCashByDate);
router.post("/POSTCashDetails", postCash);
router.put("/PUTCashDetails", putCash);

module.exports = router;
