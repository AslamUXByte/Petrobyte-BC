const express = require("express");
const { getEmployee, getEmployeeById,postEmployee, putEmployee, deleteEmployee } = require("../controllers/employeecontroller");
const router = express.Router();

router.get("/GETAllEmployee", getEmployee);
router.get("/GETEmployeebyId", getEmployeeById);
router.post("/POSTEmployee", postEmployee);
router.put("/PUTEmployee", putEmployee);
router.delete("/DELETEEmployee", deleteEmployee);

module.exports = router;
