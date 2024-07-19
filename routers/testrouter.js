const express = require("express");
const { getTest,
    postTest,
    deleteTest, } = require("../controllers/testcontroller");
const router = express.Router();

router.get("/GETAllTest", getTest);
router.post("/POSTTest", postTest);
router.put("/DELETETest", deleteTest);

module.exports = router;
