const Dispencer = require("../models/dispencer");

let getAllDispencer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    let dispencers = await Dispencer.find().populate({
      path: "sub_dispencer_id",
      populate: {
        path: "fuel_id",
      },
    });
    // .skip(startIndex).limit(limit);

    const mergeData = (data) => {
      const result = [];

      // Flatten the data array
      const flatData = data.flat();

      // Group by dispencer_name
      const grouped = flatData.reduce((acc, item) => {
        if (!acc[item.dispencer_name]) {
          acc[item.dispencer_name] = {
            _id: item._id,
            dispencer_name: item.dispencer_name,
            sub_dispencer_id: [],
          };
        }
        acc[item.dispencer_name].sub_dispencer_id.push({
          _id: item.sub_dispencer_id._id,
          sub_dispencer: item.sub_dispencer_id.sub_dispencer,
          fuel_id: item.sub_dispencer_id.fuel_id,
          live_reading: item.live_reading,
        });
        return acc;
      }, {});

      // Convert grouped object back to array
      for (const key in grouped) {
        if (grouped.hasOwnProperty(key)) {
          result.push(grouped[key]);
        }
      }

      return result;
    };

    const allDispencers = mergeData(dispencers);

    let count = await Dispencer.countDocuments({});

    res.status(200).json({
      message: {
        count,
        allDispencers,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

let getDispencers = async (req, res) => {
  try {
    let dispencers = await Dispencer.find().populate({
      path: "sub_dispencer_id",
      populate: {
        path: "fuel_id",
      },
    });
    res.status(200).json({ message: dispencers });
  } catch (error) {
    res.json(error);
  }
};

let postDispencer = async (req, res) => {
  try {
    let dispencerData = req.body;
    for (let dispencer of dispencerData) {
      let insertDispencer = await Dispencer.create(dispencer);
    }
    res.status(200).json({ message: "Dispencer Added Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong, Try Again" });
  }
};

let putDispencer = async (req, res) => {
  try {
    let dispencerData = req.body;

    let dispencer = await Dispencer.find({
      _id: dispencerData[0].id,
    });
    let dispencerName = await Dispencer.find({
      dispencer_name: dispencerData[0].id,
    });

    res.status(200).json({ message: dispencer });
  } catch (error) {
    res.json(error);
  }
};

let deleteDispencer = async (req, res) => {
  try {
    let name = req.query.name;

    const removeDispencer = await Dispencer.deleteMany({
      dispencer_name: name,
    });
    if (removeDispencer) res.status(200).json({ message: "Dispencer Removed" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json("Something Went Wrong");
  }
};

let deleteSubDispencer = async (req, res) => {
  try {
    let dispencerName = req.query.name;
    let subDispencerId = req.query.id;
    let dispencerId = await Dispencer.findOne({
      dispencer_name: dispencerName,
      sub_dispencer_id: subDispencerId,
    });
    const removeSubDispencer = await Dispencer.deleteOne({
      _id: dispencerId._id,
    });
    if (removeSubDispencer)
      res.status(200).json({ message: "SubDispencer Removed" });
    else res.status(400).json({ message: "Action Failed, Try Again" });
  } catch (error) {
    res.status(400).json("Something Went Wrong");
  }
};

let getSubDispencer = async (req, res) => {
  try {
    let name = req.query.name;
    let dispencersFromDb = await Dispencer.find({
      dispencer_name: name,
    }).populate("sub_dispencer_id");
    let dispencerToSend = [];
    dispencersFromDb.map((item) => {
      dispencerToSend.push(item.sub_dispencer_id);
    });
    res.status(200).json({ message: dispencerToSend });
  } catch (error) {
    res.status(400).json("Something Went Wrong");
  }
};

module.exports = {
  getAllDispencer,
  getDispencers,
  postDispencer,
  putDispencer,
  deleteDispencer,
  deleteSubDispencer,
  getSubDispencer,
};
