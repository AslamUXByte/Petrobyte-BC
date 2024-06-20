const CreditHistory = require("../models/credithistory");

let getCreditHistory = async (req, res) => {
  try {
    const ccId=req.query.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    let CreditHistorys =await CreditHistory.find({cc_id:ccId}).skip(startIndex).limit(limit).populate("cc_id").populate("emp_id")

    let count =await CreditHistory.countDocuments({});

    res.status(200).json({
      message: {
        count,
        CreditHistorys,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let getCreditHistoryById = async (req, res) => {
  let id = req.query.id;
  try {
    let CreditHistory = CreditHistory.findOne({ _id: id });
    res.status(200).json({ message: CreditHistory });
  } catch (error) {
    res.json(error);
  }
};

let postCreditHistory = async (req, res) => {
  try {
    let creditData = req.body;

    let insertCreditHistory = CreditHistory.create(creditData);
    res.status(200).json({ message: "Credit Added" });
  } catch (error) {
    res.json(error);
  }
};

let putCreditHistory = async (req, res) => {
  try {
    let creditData = req.body;
    let id = creditData.id;
    let CreditHistory = CreditHistory.find({ _id: id });

    if (!CreditHistory) {
      res.status(200).json({ message: "No CreditHistory Found" });
    } else {
      const putCreditHistory = CreditHistory.findOneAndUpdate(
        { _id: id },
        creditData,
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Credit Details Updated" });
    }
  } catch (error) {
    res.json(error);
  }
};

let deleteCreditHistory = async (req, res) => {
  let id = req.query.id;

  try {
    let CreditHistory = CreditHistory.find({ _id: id });

    if (!CreditHistory) {
      res.status(200).json({ message: "No CreditHistory Found" });
    } else {
      const deleteCreditHistory = CreditHistory.findOneAndDelete({ _id: id });
      res.status(200).json({ message: "CreditHistory Removed" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getCreditHistory,
  getCreditHistoryById,
  postCreditHistory,
  putCreditHistory,
  deleteCreditHistory,
};
