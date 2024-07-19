const ExpenceAccount = require("../models/expenceaccount");

let getExpenceAccountDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const startIndex = (page - 1) * limit;

    let date = req.query.date;
    let query = {};

    if (date) {
      query.date = { $regex: date, $options: "i" };
    }

    let expenceDetails = await ExpenceAccount.find(query)
      .populate("emp_id")
      .skip(startIndex)
      .limit(limit);
    let count = await ExpenceAccount.countDocuments({});

    if(expenceDetails){

      res.status(200).json({
        message: {
          count,
          expenceDetails,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
      });
    }else{
      res.status(400).json({ message: "No Data" });
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again" });
  }
};

let getExpenceAccountDetailsByDate = async (req, res) => {
  let date = req.query.date;
  let dispencer = req.query.dispencer;
  try {
    let expenceDetails = await ExpenceAccount.find({
      date: date,
      dispencer: dispencer,
    }).populate("emp_id");
    res.status(200).json({ message: expenceDetails });
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again" });
  }
};

let postExpenceAccountDetails = async (req, res) => {
  let expenceDetails = req.body;
  console.log(expenceDetails);
  try {
    let saveData = await ExpenceAccount.create(expenceDetails);
    if(saveData) res.status(200).json({ message: "Added" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again" });
  }
};

let putExpenceAccountDetails = async (req, res) => {
  let expenceDetails = req.body;
  try {
    const putData = await ExpenceAccount.findOneAndUpdate(
      { _id: expenceDetails._id },
      expenceDetails,
      { new: true }
    );
    if(putData) res.status(200).json({ message: "Details Updated" });
    else res.status(400).json({ message: "Action Failed" });
  } catch (error) {
    res.status(400).json({ message: "Action Failed, Try Again" });
  }
};

let deleteExpenceAccountDetails = async (req, res) => {
  let id = req.query.id;

  try {
    const deleteData = await ExpenceAccount.findOneAndDelete({ _id: id });
    if(deleteData) res.status(200).json({ message: "Deleted" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again" });
  }
};

module.exports = {
  getExpenceAccountDetails,
  getExpenceAccountDetailsByDate,
  postExpenceAccountDetails,
  putExpenceAccountDetails,
  deleteExpenceAccountDetails,
};
