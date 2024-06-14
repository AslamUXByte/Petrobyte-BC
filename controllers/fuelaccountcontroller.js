const FuelAccount = require("../models/fuelaccount");

let getFuelAccountDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const startIndex = (page - 1) * limit;

    let fuelDetails = await FuelAccount.find()
      .populate("emp_id")
      .skip(startIndex)
      .limit(limit);
    let count = await FuelAccount.countDocuments({});

    res.status(200).json({
      message: {
        count,
        fuelDetails,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.json(error);
  }
};

let getFuelAccountDetailsByDate = async (req, res) => {
  let date = req.query.date;
  let dispencer = req.query.dispencer;
  try {
    let fuelDetails = await FuelAccount.find({
      date: date,
      dispencer: dispencer,
    }).populate("emp_id");
    res.status(200).json({ message: fuelDetails });
  } catch (error) {
    res.json(error);
  }
};

let postFuelAccountDetails = async (req, res) => {
  let fuelDetails = req.body;
  try {
    for (let fuelDetail of fuelDetails) {
      let saveData = await FuelAccount.create(fuelDetail);
    }
    res.status(200).json({ message: "Saved" });
  } catch (error) {
    res.json(error);
  }
};

let putFuelAccountDetails = async (req, res) => {
  let fuelDetails = req.body;
  try {
    const putData = await FuelAccount.findOneAndUpdate(
      { _id: fuelDetails._id },
      fuelDetails,
      { new: true }
    );
    res.status(200).json({ message: "Details Updated" });
  } catch (error) {
    res.json(error);
  }
};

let deleteFuelAccountDetails = async (req, res) => {
  let id = req.query.id;

  try {
    const deleteData = await FuelAccount.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Removed" });
  } catch (error) {
    res.json(error);
  }
};

const getFuelAccountOverview = async (req, res) => {
  try {
    let fuelDetails = await FuelAccount.find();

    const dateWiseGroupedData = fuelDetails.reduce((acc, curr) => {
      let group = acc.find((g) => g[0].date === curr.date);
      if (group) {
        group.push(curr);
      } else {
        acc.push([curr]);
      }

      return acc;
    }, []);

    const dateAndDispencerWiseGroupedData = dateWiseGroupedData.map((item) =>
      item.reduce((acc, curr) => {
        let group = acc.find((g) => g[0].dispencer === curr.dispencer);
        if (group) {
          group.push(curr);
        } else {
          acc.push([curr]);
        }

        return acc;
      }, [])
    );

    let fuelAccountOverview = [];

    dateAndDispencerWiseGroupedData.map((dateWiseData) => {
      dateWiseData.map((dispencerWiseDatas) => {
        let petrolTotalAmount = 0;
        let deiselTotalAmount = 0;
        let date = null;
        let dispencer = null;
        dispencerWiseDatas.map((dispencerWiseData) => {
          if (dispencerWiseData.fueltype == "Petrol") {
            petrolTotalAmount = petrolTotalAmount + dispencerWiseData.amount;
          }
          if (dispencerWiseData.fueltype == "Deisel") {
            deiselTotalAmount = deiselTotalAmount + dispencerWiseData.amount;
          }
          date = dispencerWiseData.date;
          dispencer = dispencerWiseData.dispencer;
        });
        let dataToSend = {
          date: date,
          dispencer: dispencer,
          petrolSaleAmount: petrolTotalAmount,
          deiselSaleAmount: deiselTotalAmount,
          netAmount: petrolTotalAmount + deiselTotalAmount,
        };
        fuelAccountOverview.push(dataToSend);
      });
    });

    res.status(200).json(fuelAccountOverview);
  } catch (error) {}
};

module.exports = {
  getFuelAccountDetails,
  getFuelAccountDetailsByDate,
  postFuelAccountDetails,
  putFuelAccountDetails,
  deleteFuelAccountDetails,
  getFuelAccountOverview,
};
