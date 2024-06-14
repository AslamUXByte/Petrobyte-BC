const express = require("express");
const { getProducts, getProductsById,postProducts, putProducts, deleteProducts } = require("../controllers/productcontroller");
const router = express.Router();

router.get("/GETAllProduct", getProducts);
router.get("/GETProductbyId", getProductsById);
router.post("/POSTProduct", postProducts);
router.put("/PUTProduct", putProducts);
router.delete("/DELETEProduct", deleteProducts);

module.exports = router;
