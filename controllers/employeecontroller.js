const Employee = require("../models/employee");

let getEmployee = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    let employees = await Employee.find().skip(startIndex).limit(limit);

    let count = await Employee.countDocuments({});

    res.status(200).json({
      message: {
        count,
        employees,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let getEmployeeById = async (req, res) => {
  let email = req.query.email;
  try {
    let employee = await Employee.findOne({ emp_email: email });
    res.status(200).json({ message: employee });
  } catch (error) {
    res.json(error);
  }
};

let postEmployee = async (req, res) => {
  let empData = req.body;
  try {
    let email = empData.emp_email;
    let employee = await Employee.findOne({ emp_email: email });
    console.log(employee);

    if (employee) {
      res.status(200).json({ message: "Staff Alredy Registerd" });
    } else {
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
    let id = empData.id;
    let employee = await Employee.find({ _id: id });

    if (!employee) {
      res.status(200).json({ message: "No Staff Found" });
    } else {
      const result = await Employee.findOneAndUpdate({ _id: id }, empData, {
        new: true,
      });
      res.status(200).json({ message: "Staff Details Updated" });
    }
  } catch (error) {
    res.json(error);
  }
};

let deleteEmployee = async (req, res) => {
  let id = req.query.id;

  try {
    let employee = await Employee.find({ _id: id });

    if (!employee) {
      res.status(200).json({ message: "No Staff Found" });
    } else {
      const result = await Employee.findOneAndDelete({ _id: id });
      res.status(200).json({ message: "Staff Removed" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getEmployee,
  getEmployeeById,
  postEmployee,
  putEmployee,
  deleteEmployee,
};
