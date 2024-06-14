const CreditCustomer = require("../models/creditcustomer");

let getCC = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    let CCs = await CreditCustomer.find().skip(startIndex).limit(limit);

    let count = await CreditCustomer.countDocuments({});

    res.status(200).json({
      message: {
        count,
        CCs,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let getCCById = async (req, res) => {
  let id = req.query.id;
  try {
    let CC = await CreditCustomer.findOne({ _id: id });
    res.status(200).json({ message: CC });
  } catch (error) {
    res.json(error);
  }
};

let postCC = async (req, res) => {
  try {
    let empData = req.body;
    let email = empData.emp_email;
    let CC = await CreditCustomer.findOne({ emp_email: email });

    if (CC) {
      res.status(200).json({ message: "Credit Customer Alredy Registerd" });
    } else {
      let insertCC = await CreditCustomer.create(empData);
      res.status(200).json({ message: "Staff Registerd Successfully" });
    }
  } catch (error) {
    res.json(error);
  }
};

let putCC = async (req, res) => {
  let empData = req.body;
  try {
    let id = empData.id;
    let CC = await CreditCustomer.find({ _id: id });

    if (!CC) {
      res.status(200).json({ message: "No CC Found" });
    } else {
      const putCC = await CreditCustomer.findOneAndUpdate(
        { _id: id },
        empData,
        {
          new: true,
        }
      );
      res.status(200).json({ message: "CC Details Updated" });
    }
  } catch (error) {
    res.json(error);
  }
};

let deleteCC = async (req, res) => {
  let id = req.query.id;

  try {
    let CC = await CreditCustomer.find({ _id: id });

    if (!CC) {
      res.status(200).json({ message: "No CC Found" });
    } else {
      const deleteCC = await CreditCustomer.findOneAndDelete({ _id: id });
      res.status(200).json({ message: "CC Removed" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getCC,
  getCCById,
  postCC,
  putCC,
  deleteCC,
};
