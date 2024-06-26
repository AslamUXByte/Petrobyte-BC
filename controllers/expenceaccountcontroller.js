const ExpenceAccount = require("../models/expenceaccount");

let getExpenceAccountDetails = async (req, res) => {
  try{
  const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const startIndex = (page - 1) * limit;

    let expenceDetails = await ExpenceAccount.find()
      .populate("emp_id")
      .skip(startIndex)
      .limit(limit);
    let count = await ExpenceAccount.countDocuments({});

    res.status(200).json({
      message: {
        count,
        expenceDetails,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.json(error);
  }
};

let getExpenceAccountDetailsByDate = async (req, res) => {
  let date = req.query.date;
  let dispencer =req.query.dispencer
  try {
    let expenceDetails = await ExpenceAccount.find({ date: date, dispencer:dispencer }).populate("emp_id");
    res.status(200).json({ message: expenceDetails });
  } catch (error) {
    res.json(error);
  }
};

let postExpenceAccountDetails = async (req, res) => {
  let expenceDetails = req.body;
  try {

      let saveData = await ExpenceAccount.create(expenceDetails);
    
    res.status(200).json({ message: "Saved" });
  } catch (error) {
    res.json(error);
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
    res.status(200).json({ message: "Details Updated" });
  } catch (error) {
    res.json(error);
  }
};

let deleteExpenceAccountDetails = async (req, res) => {
  let id = req.query.id;

  try {
    const deleteData = await ExpenceAccount.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Removed" });
  } catch (error) {
    res.json(error);
  }
};



module.exports = {
  getExpenceAccountDetails,
  getExpenceAccountDetailsByDate,
  postExpenceAccountDetails,
  putExpenceAccountDetails,
  deleteExpenceAccountDetails,
};
