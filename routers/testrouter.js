const express = require("express");
const { getTest,
    getTestById,
    postTest,
    putTest,
    deleteTest, } = require("../controllers/testcontroller");
const router = express.Router();

router.get("/GETAllTest", getTest);
router.get("/GETTestbyId", getTestById);
router.post("/POSTTest", postTest);
router.put("/PUTTest", putTest);
router.delete("/DELETETest", deleteTest);

module.exports = router;
