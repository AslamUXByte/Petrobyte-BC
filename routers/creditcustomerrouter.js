const express = require("express");
const { getCC,
    getCCById,
    postCC,
    putCC,
    deleteCC, } = require("../controllers/creditcustomercontroller");
const router = express.Router();

router.get("/GETAllCC", getCC);
router.get("/GETCCbyId", getCCById);
router.post("/POSTCC", postCC);
router.put("/PUTCC", putCC);
router.delete("/DELETECC", deleteCC);

module.exports = router;
