const express = require("express");
const { getExpenceAccountDetails,
    getExpenceAccountDetailsByDate,
    postExpenceAccountDetails,
    putExpenceAccountDetails,
    deleteExpenceAccountDetails, } = require("../controllers/expenceaccountcontroller");
const router = express.Router();

router.get("/GETAllExpenceAccount", getExpenceAccountDetails);
router.get("/GETExpenceAccountbydate", getExpenceAccountDetailsByDate);
router.post("/POSTExpenceAccount", postExpenceAccountDetails);
router.put("/PUTExpenceAccount", putExpenceAccountDetails);
router.delete("/DELETEExpenceAccount", deleteExpenceAccountDetails);

module.exports = router;
