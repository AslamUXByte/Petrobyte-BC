const Employee = require("../models/employee");

let getEmployee = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    let emp_name = req.query.name;
    let query = {
      emp_status:"ACTIVE"
    };

    if (emp_name) {
      query.emp_name = { $regex: emp_name, $options: "i" };
    }

    let employees = await Employee.find(query).skip(startIndex).limit(limit);

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
    res.status(400).json({ message: "Internal Error" });
  }
};

let getEmployeeById = async (req, res) => {
  let email = req.query.email;
  try {
    let employee = await Employee.findOne({ emp_email: email });
    res.status(200).json({ message: employee });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
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
      if(insertEmployee) res.status(200).json({ message: "Staff Registerd Successfully" });
      else res.status(400).json({ message: "Failed, Try Again" });
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

let putEmployee = async (req, res) => {
  let empData = req.body;
  try {
    let id = empData.id;
    let employee = Employee.find({ _id: id });

    const result = await Employee.findOneAndUpdate({ _id: id }, empData, {
      new: true,
    });
    if(result) res.status(200).json({ message: "Staff Details Updated" });
    else res.status(400).json({ message: "Failed" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

let deleteEmployee = async (req, res) => {
  let id = req.query.id;

  try {
    const result = await Employee.findByIdAndUpdate({ _id: id },{emp_status:"DISABLED"});
    if(result)res.status(200).json({ message: "Staff Removed" });
    else res.status(400).json({ message: "Operation Failed" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

module.exports = {
  getEmployee,
  getEmployeeById,
  postEmployee,
  putEmployee,
  deleteEmployee,
};
