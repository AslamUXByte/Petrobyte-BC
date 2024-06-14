const express = require("express");
const { getProductAccountDetails,
    getProductAccountDetailsByDate,
    postProductAccountDetails,
    putProductAccountDetails,
    deleteProductAccountDetails, } = require("../controllers/productaccountcontroller");
const router = express.Router();

router.get("/GETAllProductAccount", getProductAccountDetails);
router.get("/GETProductAccountbydate", getProductAccountDetailsByDate);
router.post("/POSTProductAccount", postProductAccountDetails);
router.put("/PUTProductAccount", putProductAccountDetails);
router.delete("/DELETEProductAccount", deleteProductAccountDetails);

module.exports = router;
