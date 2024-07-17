const express = require("express");
const { getAccounts,getAccountsReport } = require("../controllers/reportcontroller");
const router = express.Router();

router.get('/GETAccount',getAccounts)
router.get('/GETAccountPrint',getAccountsReport)

module.exports = router;
