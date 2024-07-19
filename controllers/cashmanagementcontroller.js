const CM = require("../models/cashmanagement");

const getCashByDate = async (req, res) => {
  try {
    let date = req.query.date;
    let cashDetails = await CM.find({ date: date });
    if (cashDetails) res.status(200).json({ message: cashDetails });
    else res.status(400).json({ message: "No Data" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

const postCash = async (req, res) => {
  let cashDetails = req.body;
  try {
    let saveCash = await CM.create(cashDetails);
    if (saveCash) res.status(200).json({ message: "Saved" });
    else res.status(400).json({ message: "Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

const putCash = async (req, res) => {
  try {
    let cashDetails = req.body;

    let updateCash = await CM.updateOne({ _id: cashDetails._id }, cashDetails);
    if (updateCash) res.status(200).json({ message: "Updated" });
    else res.status(400).json({ message: "Failed, Try Again" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error" });
  }
};

module.exports = { getCashByDate, postCash, putCash };
