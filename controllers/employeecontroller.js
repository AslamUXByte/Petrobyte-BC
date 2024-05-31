const Employee = require("../models/employee");

let getEmployee = async (req, res) => {
  try {
    let employee = await Employee.findAll();
    res.status(200).json({ message: employee });
  } catch (error) {
    res.json(error);
  }
};

let getEmployeeById = async (req, res) => {
  let email = req.query.email;
  try {
    let employee = await Employee.findOne({ email });
    res.status(200).json({ message: employee });
  } catch (error) {
    res.json(error);
  }
};

let postEmployee = async (req, res) => {
  let empData = req.body;
  try {
    let email = empData.emp_email;
    let employee = await Employee.findOne({ email });
    console.log(employee);

    if (employee) {
      res.status(200).json({ message: "Staff Alredy Registerd" });
    }else{
      let insertEmployee = await Employee.create(empData);
      res.status(200).json({ message: "Staff Registerd Successfully" });
    }
  } catch (error) {
    res.json(error);
  }
};

let putEmployee = async (req, res) => {};

let deleteEmployee = async (req, res) => {};

module.exports = { getEmployee, getEmployeeById,postEmployee, putEmployee, deleteEmployee };
