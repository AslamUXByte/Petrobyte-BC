const CreditCustomer = require("../models/creditcustomer");

let getCC = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    let ccName = req.query.name;
    let query = {};

    if (ccName) {
      query.cc_name = { $regex: ccName, $options: "i" };
    }

    let CCs = await CreditCustomer.find(query).skip(startIndex).limit(limit);

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
    res.status(400).json({ message:"Something went wrong" });
  }
};

let postCC = async (req, res) => {
  try {
    let ccData = req.body;
    let contactNo = ccData.cc_contact_no;
    let creditor = await CreditCustomer.findOne({ cc_contact_no: contactNo });

    if (creditor) {
      res.status(400).json({ message: "Credit Customer Alredy Registerd" });
    } else {

    let insertCC = await CreditCustomer.create(ccData);
    if (insertCC)
      res
        .status(200)
        .json({ message: "Credit Customer Registerd Successfully" });
    else res.status(400).json({ message: "Internal Error, Try Again Later" });
  }
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again Later" });
  }
};

let putCC = async (req, res) => {
  try {
    let ccData = req.body;
    let id = ccData.id;
    let CC = CreditCustomer.find({ _id: id });

    if (!CC) {
      res.status(200).json({ message: "No CC Found" });
    } else {
      const putCC = await CreditCustomer.findOneAndUpdate({ _id: id }, ccData, {
        new: true,
      });
      if (putCC) res.status(200).json({ message: "CC Details Updated" });
      else res.status(400).json({ message: "Action Failed, Try Again" });
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again Later" });
  }
};

let deleteCC = async (req, res) => {
  let id = req.query.id;

  try {
    const deleteCC = await CreditCustomer.findOneAndDelete({ _id: id });
    if (deleteCC) res.status(200).json({ message: "CC Removed" });
    else res.status(200).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again Later" });
  }
};

const updateCreditAmount = async (req, res) => {
  try {
    let ccData = req.body;
    console.log(ccData);

    const putCC = await CreditCustomer.findOneAndUpdate(
      { _id: ccData.id },
      { credit_amount: ccData.credit_amount },
      {
        new: true,
        runValidators: true,
      }
    );
    if (putCC) res.status(200).json({ message: "Amount Updated" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again Later" });
  }
};

module.exports = {
  getCC,
  postCC,
  putCC,
  deleteCC,
  updateCreditAmount,
};
