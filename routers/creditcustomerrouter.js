const express = require("express");
const { getCC,
    postCC,
    putCC,
    deleteCC,updateCreditAmount } = require("../controllers/creditcustomercontroller");
const router = express.Router();

router.get("/GETAllCC", getCC);
router.post("/POSTCC", postCC);
router.put("/PUTCC", putCC);
router.delete("/DELETECC", deleteCC);
router.put("/updateCreditAmount", updateCreditAmount);

module.exports = router;
