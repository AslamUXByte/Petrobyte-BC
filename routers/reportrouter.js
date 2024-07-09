const express = require("express");
const { getAccounts } = require("../controllers/reportcontroller");
const router = express.Router();

router.get('/GETAccount',getAccounts)

module.exports = router;
