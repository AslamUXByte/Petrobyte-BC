const express = require("express");
const { getProductAccountDetails,
    getProductAccountDetailsByDate,
    postProductAccountDetails,
    putProductAccountDetails,
    deleteProductAccountDetails, } = require("../controllers/productaccountcontroller");
const router = express.Router();

router.get("/", getProductAccountDetails);
router.get("/bydate", getProductAccountDetailsByDate);
router.post("/", postProductAccountDetails);
router.put("/", putProductAccountDetails);
router.delete("/", deleteProductAccountDetails);

module.exports = router;
