const SubDispencer = require("../models/subdispencer");

let getSubDispencer = async (req, res) => {
  try {
    let subDispencers = await SubDispencer.find().populate("fuel_id");

    res.status(200).json(subDispencers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let postSubDispencer = async (req, res) => {
  try {
    let subDispencerData = req.body;
    let insertDispencer = await SubDispencer.create(subDispencerData);

    res.status(200).json({ message: insertDispencer });
  } catch (error) {
    res.json(error);
  }
};

let updateLiveRating = async (req, res) => {
  try {
    let putReading = req.body;
    let updateReading = await SubDispencer.findOneAndUpdate(
      { _id: putReading.sub_dispencer_id },
      { live_reading: putReading.live_reading },
      { new: true, runValidators: true }
    );
    res.status(200).json({message:"Reading Updated"})
  } catch (error) {
    res.status(400).json({message:"Reading Updation Failed"})
  }
};

module.exports = {
  getSubDispencer,
  postSubDispencer,
  updateLiveRating
};
