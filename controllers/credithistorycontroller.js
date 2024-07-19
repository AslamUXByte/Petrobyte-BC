const CreditHistory = require("../models/credithistory");

let getCreditHistory = async (req, res) => {
  try {
    const ccId = req.query.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let date = req.query.date;
    let query = {
      cc_id: ccId,
    };

    if (date) {
      query.date = { $regex: date, $options: "i" };
    }

    let CreditHistorys = await CreditHistory.find(query)
      .skip(startIndex)
      .limit(limit)
      .populate("cc_id")
      .populate("emp_id")
      .populate("fuel_type");

    let count = await CreditHistory.countDocuments({});

    if (CreditHistorys) {
      res.status(200).json({
        message: {
          count,
          CreditHistorys,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
      });
    } else {
      res
        .status(400)
        .json({ message: "Something Went Wrong, Please try again" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong, Please try again" });
  }
};

let postCreditHistory = async (req, res) => {
  try {
    let creditData = req.body;

    let insertCreditHistory = await CreditHistory.create(creditData);
    if (insertCreditHistory) res.status(200).json({ message: "Credit Added" });
    else res.status(200).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong, Please try again" });
  }
};

let putCreditHistory = async (req, res) => {
  try {
    let creditData = req.body;
    let id = creditData.id;
    console.log(creditData);

    const putCreditHistory = await CreditHistory.findOneAndUpdate(
      { _id: id },
      creditData,
      {
        new: true,
      }
    );
    if (putCreditHistory)
      res.status(200).json({ message: "Credit Details Updated" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong, Please try again" });
  }
};

let deleteCreditHistory = async (req, res) => {
  let id = req.query.id;

  try {
    const deleteCreditHistory = await CreditHistory.findOneAndDelete({
      _id: id,
    });
    if (deleteCreditHistory)
      res.status(200).json({ message: "CreditHistory Removed" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong, Please try again" });
  }
};

module.exports = {
  getCreditHistory,
  postCreditHistory,
  putCreditHistory,
  deleteCreditHistory,
};
