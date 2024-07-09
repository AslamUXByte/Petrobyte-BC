const CM = require("../models/cashmanagement");

const postCash = async (req, res) => {
  let cashDetails = req.body;
  try {
    let saveCash = await CM.create(cashDetails);
    if (saveCash) res.status(200).json("Saved");
    else res.status(400).json("Error");
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = { postCash };
