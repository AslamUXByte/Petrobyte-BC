const express = require("express");
const { getProductAccountDetails,
    getProductAccountDetailsById,
    postProductAccountDetails,
    putProductAccountDetails,
    deleteProductAccountDetails, } = require("../controllers/productaccountcontroller");
const router = express.Router();

router.get("/", getProductAccountDetails);
router.get("/byId", getProductAccountDetailsById);
router.post("/", postProductAccountDetails);
router.put("/", putProductAccountDetails);
router.delete("/", deleteProductAccountDetails);

module.exports = router;
