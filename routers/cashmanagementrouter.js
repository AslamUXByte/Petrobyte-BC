const express = require("express");
const { postCash } = require("../controllers/cashmanagementcontroller");
const router = express.Router();

router.post("/POSTCashDetails", postCash);

module.exports = router;
