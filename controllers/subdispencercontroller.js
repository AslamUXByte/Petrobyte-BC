const SubDispencer = require("../models/subdispencer");

let getSubDispencer = async (req, res) => {
  try {
    let subDispencers = await SubDispencer.find().populate("fuel_id");

    res.status(200).json(subDispencers);
  } catch (error) {
    res.status(400).json({ message:"Internal Error, Try Again" });
  }
};

let postSubDispencer = async (req, res) => {
  try {
    let subDispencerData = req.body;
    let insertDispencer = await SubDispencer.create(subDispencerData);

    if(insertDispencer) res.status(200).json({ message: "Added" });
    else res.status(400).json({ message: "Failed" });
  } catch (error) {
    res.status(400).json({ message: "Internal Error, Try Again" });
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
    if(updateReading) res.status(200).json({message:"Reading Updated"})
    else res.status(400).json({message:"Action Failed, Try Again"})
  } catch (error) {
    res.status(400).json({message:"Internal Error, Try Again"})
  }
};

module.exports = {
  getSubDispencer,
  postSubDispencer,
  updateLiveRating
};
