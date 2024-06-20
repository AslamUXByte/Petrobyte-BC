const Dispencer = require("../models/dispencer");

let getDispencer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    let dispencers = await Dispencer.find().populate('fuel_id').skip(startIndex).limit(limit);

    let count = await Dispencer.countDocuments({});


    res.status(200).json({
      message: {
        count,
        dispencers,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let getDispencerById = async (req, res) => {
  let id = req.query.id;
  try {
    let dispencer = await Dispencer.findOne({ _id: id });
    res.status(200).json({ message: dispencer });
  } catch (error) {
    res.json(error);
  }
};

let postDispencer = async (req, res) => {
  let dispencerData = req.body;
  try {
    let insertDispencer = await Dispencer.create(dispencerData);
    res.status(200).json({ message: "Dispencer Added Successfully" });
  } catch (error) {
    res.json(error);
  }
};

let putDispencer = async (req, res) => {
  try {
    let dispencerData = req.body;
    let id = dispencerData.id;
    let dispencer = await Dispencer.find({ _id: id });

    if (!dispencer) {
      res.status(200).json({ message: "No Dispencer Found" });
    } else {
      const updateDispencer = await Dispencer.findOneAndUpdate(
        { _id: id },
        dispencerData,
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Dispencer Details Updated" });
    }
  } catch (error) {
    res.json(error);
  }
};

let deleteDispencer = async (req, res) => {
  try {
    let id = req.query.id;
    let dispencer = await Dispencer.find({ _id: id });

    if (!dispencer) {
      res.status(200).json({ message: "No Dispencer Found" });
    } else {
      const removeDispencer = await Dispencer.findOneAndDelete({ _id: id });
      res.status(200).json({ message: "Dispencer Removed" });
    }
  } catch (error) {
    res.json(error);
  }
};

let updateLiveReading = async (req,res) => {
  try {
    let liveReadingData = req.body;
    const updateLiveData = await Dispencer.findOneAndUpdate(
      { _id: liveReadingData.id },
      liveReadingData,
      {
        new: true,
      }
    );
    res.status(200).json({message:"Reading Updated"})
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getDispencer,
  getDispencerById,
  postDispencer,
  putDispencer,
  deleteDispencer,
  updateLiveReading
};
