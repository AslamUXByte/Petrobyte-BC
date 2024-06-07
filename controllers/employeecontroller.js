const Employee = require("../models/employee");

let getEmployee = async (req, res) => {
  try {
    let employee = await Employee.find();
    res.status(200).json({ message: employee });
  } catch (error) {
    res.json(error);
  }
};

let getEmployeeById = async (req, res) => {
  let email = req.query.email;
  try {
    let employee = await Employee.findOne({ emp_email:email });
    res.status(200).json({ message: employee });
  } catch (error) {
    res.json(error);
  }
};

let postEmployee = async (req, res) => {
  let empData = req.body;
  try {
    let email = empData.emp_email;
    let employee = await Employee.findOne({ emp_email:email });
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

let putEmployee = async (req, res) => {
  let empData = req.body;
  try {
    let email = empData.emp_email;
    let employee = await Employee.find({ emp_email:email });

    if (!employee) {
      res.status(200).json({ message: "No Staff Found" });
    }else{
      const result = await Employee.findOneAndUpdate({ emp_email: empData.email }, empData, { new: true });
      res.status(200).json({ message: "Staff Details Updated" });
    }
  } catch (error) {
    res.json(error);
  }
};

let deleteEmployee = async (req, res) => {
  let email = req.query.email;

  try {
    let employee = await Employee.find({ emp_email:email });

    if (!employee) {
      res.status(200).json({ message: "No Staff Found" });
    }else{
      const result = await Employee.findOneAndDelete({ emp_email: email });
      res.status(200).json({ message: "Staff Removed" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getEmployee, getEmployeeById,postEmployee, putEmployee, deleteEmployee };
