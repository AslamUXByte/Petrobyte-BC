const express = require("express");
const {  getCreditHistory,
    postCreditHistory,
    putCreditHistory,
    deleteCreditHistory, } = require("../controllers/credithistorycontroller");
const router = express.Router();

router.get("/GETAllCreditHistory", getCreditHistory);
router.post("/POSTCreditHistory", postCreditHistory);
router.put("/PUTCreditHistory", putCreditHistory);
router.delete("/DELETECreditHistory", deleteCreditHistory);

module.exports = router;
