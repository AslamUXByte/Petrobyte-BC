const FuelAccount = require("../models/fuelaccount");
const ProductAccount = require("../models/productaccount");
const ExpenceAccount = require("../models/expenceaccount");
const CreditHistory = require("../models/credithistory");
const CM = require("../models/cashmanagement");

const getAccounts = async (req, res) => {
  // const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || 10;

  // const startIndex = (page - 1) * limit;

  // let date = req.query.date;
  let query = {};

  // if (date) {
  //   query.date = { $regex: date, $options: "i" };
  // }

  let fuelAccounts = await FuelAccount.find(query);
  // .skip(startIndex)
  // .limit(limit);
  let productAccounts = await ProductAccount.find(query);
  // .skip(startIndex)
  // .limit(limit);
  let expenceAccounts = await ExpenceAccount.find(query);
  // .skip(startIndex)
  // .limit(limit);
  let creditAccounts = await CreditHistory.find(query);
  // .skip(startIndex)
  // .limit(limit);
  let cms = await CM.find(query);
  // .skip(startIndex)
  // .limit(limit);

  const fuelAcc = Object.values(
    fuelAccounts.reduce((acc, { date, amount }) => {
      acc[date] = acc[date] || { date, total_fuel_amount: 0 };
      acc[date].total_fuel_amount += amount;
      return acc;
    }, {})
  );

  const productAcc = Object.values(
    productAccounts.reduce((acc, { date, total_amount }) => {
      acc[date] = acc[date] || { date, total_product_amount: 0 };
      acc[date].total_product_amount += parseFloat(total_amount);
      return acc;
    }, {})
  );

  const expenceAcc = Object.values(
    expenceAccounts.reduce((acc, { date, expence_amount }) => {
      acc[date] = acc[date] || { date, total_expence_amount: 0 };
      acc[date].total_expence_amount += expence_amount;
      return acc;
    }, {})
  );

  const creditAcc = Object.values(
    creditAccounts.reduce((acc, { date, amount, amount_type }) => {
      acc[date] = acc[date] || {
        date,
        total_credit_amount: 0,
        total_debit_amount: 0,
      };

      if (amount_type == "Credit") {
        acc[date].total_credit_amount += amount;
      }
      if (amount_type == "Debit") {
        acc[date].total_debit_amount += amount;
      }
      return acc;
    }, {})
  );

  const cmAcc = fuelAccounts.map((item) => ({
    date: item.date,
    total_cash_inhand: item.cash_inhand,
    total_cash_bank: item.cash_bank,
    total_cash_other: item.cash_other,
  }));

  const addToMergedData = (mergedData, array, keys) => {
    array.forEach((item) => {
      const date = item.date;
      if (!mergedData[date]) {
        mergedData[date] = {
          date,
          total_fuel_amount: 0,
          total_product_amount: 0,
          total_expence_amount: 0,
          total_credit_amount: 0,
          total_debit_amount: 0,
          total_cash_inhand: 0,
          total_cash_bank: 0,
          total_cash_other: 0,
        };
      }
      keys.forEach((key) => {
        if (item[key] !== undefined) {
          mergedData[date][key] = item[key];
        }
      });
    });
  };

  // Merging all data into a single object
  const mergedData = {};
  addToMergedData(mergedData, fuelAcc, ["total_fuel_amount"]);
  addToMergedData(mergedData, productAcc, ["total_product_amount"]);
  addToMergedData(mergedData, expenceAcc, ["total_expence_amount"]);
  addToMergedData(mergedData, creditAcc, [
    "total_credit_amount",
    "total_debit_amount",
  ]);
  addToMergedData(mergedData, cmAcc, [
    "total_cash_inhand",
    "total_cash_bank",
    "total_cash_other",
  ]);

  // Converting the merged object back to an array
  const account = Object.values(mergedData);

  res.status(200).json({
    message: {
      // count: account.length,
      account,
      // currentPage: page,
      // totalPages: Math.ceil(account.length / limit),
    },
  });
};

const getAccountsReport = async (req, res) => {
  const from = req.query.fromDate;
  const to = req.query.toDate;

  let fuelAccounts = await FuelAccount.find({
    date: {
      $gte: from,
      $lte: to,
    },
  });
  let productAccounts = await ProductAccount.find({
    date: {
      $gte: from,
      $lte: to,
    },
  });
  let expenceAccounts = await ExpenceAccount.find({
    date: {
      $gte: from,
      $lte: to,
    },
  });
  // let creditAccounts = await CreditHistory.find({
  //   date: {
  //     $gte: from,
  //     $lte: to,
  //   },
  // });
  // let cms = await CM.find({
  //   date: {
  //     $gte: from,
  //     $lte: to,
  //   },
  // });

  const fuelAcc = Object.values(
    fuelAccounts.reduce((acc, { date, amount }) => {
      acc[date] = acc[date] || { date, total_fuel_amount: 0 };
      acc[date].total_fuel_amount += amount;
      return acc;
    }, {})
  );

  const productAcc = Object.values(
    productAccounts.reduce((acc, { date, total_amount }) => {
      acc[date] = acc[date] || { date, total_product_amount: 0 };
      acc[date].total_product_amount += parseFloat(total_amount);
      return acc;
    }, {})
  );

  const expenceAcc = Object.values(
    expenceAccounts.reduce((acc, { date, expence_amount }) => {
      acc[date] = acc[date] || { date, total_expence_amount: 0 };
      acc[date].total_expence_amount += expence_amount;
      return acc;
    }, {})
  );

  // const creditAcc = Object.values(
  //   creditAccounts.reduce((acc, { date, amount, amount_type }) => {
  //     acc[date] = acc[date] || {
  //       date,
  //       total_credit_amount: 0,
  //       total_debit_amount: 0,
  //     };

  //     if (amount_type == "Credit") {
  //       acc[date].total_credit_amount += amount;
  //     }
  //     if (amount_type == "Debit") {
  //       acc[date].total_debit_amount += amount;
  //     }
  //     return acc;
  //   }, {})
  // );

  // const cmAcc = cms.map((item) => ({
  //   date: item.date,
  //   total_cash_inhand: item.cash_inhand,
  //   total_cash_bank: item.cash_bank,
  //   total_cash_other: item.cash_other,
  // }));

  const addToMergedData = (mergedData, array, keys) => {
    array.forEach((item) => {
      const date = item.date;
      if (!mergedData[date]) {
        mergedData[date] = {
          date,
          total_fuel_amount: 0,
          total_product_amount: 0,
          total_expence_amount: 0,
          // total_credit_amount: 0,
          // total_debit_amount: 0,
          // total_cash_inhand: 0,
          // total_cash_bank: 0,
          // total_cash_other: 0,
        };
      }
      keys.forEach((key) => {
        if (item[key] !== undefined) {
          mergedData[date][key] = item[key];
        }
      });
    });
  };

  // Merging all data into a single object
  const mergedData = {};
  addToMergedData(mergedData, fuelAcc, ["total_fuel_amount"]);
  addToMergedData(mergedData, productAcc, ["total_product_amount"]);
  addToMergedData(mergedData, expenceAcc, ["total_expence_amount"]);
  // addToMergedData(mergedData, creditAcc, [
  //   "total_credit_amount",
  //   "total_debit_amount",
  // ]);
  // addToMergedData(mergedData, cmAcc, [
  //   "total_cash_inhand",
  //   "total_cash_bank",
  //   "total_cash_other",
  // ]);

  // Converting the merged object back to an array
  const account = Object.values(mergedData);

  let fuelAmountToReport = 0;
  let productAmountToReport = 0;
  let expenceAmountToReport = 0;
  account.map((item) => {
    fuelAmountToReport = fuelAmountToReport + item.total_fuel_amount;
    productAmountToReport = productAmountToReport + item.total_product_amount;
    expenceAmountToReport = expenceAmountToReport + item.total_expence_amount;
  });

  res.status(200).json({
    message: {
      fuelAmountToReport,
      productAmountToReport,
      expenceAmountToReport,
      account,
    },
  });
};

module.exports = { getAccounts, getAccountsReport };
