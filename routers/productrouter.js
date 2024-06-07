

const express = require("express");
const { getProducts, getProductsById,postProducts, putProducts, deleteProducts } = require("../controllers/productcontroller");
const router = express.Router();

router.get("/", getProducts);
router.get("/byId", getProductsById);
router.post("/", postProducts);
router.put("/", putProducts);
router.delete("/", deleteProducts);

module.exports = router;
