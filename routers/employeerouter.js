const express = require("express");
const { getEmployee, getEmployeeById,postEmployee, putEmployee, deleteEmployee } = require("../controllers/employeecontroller");
const router = express.Router();

router.get("/", getEmployee);
router.get("/byId", getEmployeeById);
router.post("/", postEmployee);
router.put("/", putEmployee);
router.delete("/", deleteEmployee);

module.exports = router;
