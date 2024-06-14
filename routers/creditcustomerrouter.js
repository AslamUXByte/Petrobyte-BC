const express = require("express");
const { getCC,
    getCCById,
    postCC,
    putCC,
    deleteCC, } = require("../controllers/creditcustomercontroller");
const router = express.Router();

router.get("/GETAllCC", getCC);
router.get("/GETCCbyId", getCCById);
router.post("/POSTAllCC", postCC);
router.put("/PUTAllCC", putCC);
router.delete("/DELETEAllCC", deleteCC);

module.exports = router;
