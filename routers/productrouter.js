const express = require("express");
const { getProducts, postProducts, putProducts, deleteProducts } = require("../controllers/productcontroller");
const router = express.Router();

router.get("/GETAllProduct", getProducts);
router.post("/POSTProduct", postProducts);
router.put("/PUTProduct", putProducts);
router.delete("/DELETEProduct", deleteProducts);

module.exports = router;
