const FuelAccount = require("../models/fuelaccount");
const ProductAccount = require("../models/productaccount");
const ExpenceAccount = require("../models/expenceaccount");
const CM = require("../models/cashmanagement");

const getAccounts = async (req,res)=>{
    let fuelAccounts = await FuelAccount.find()
    let productAccounts = await ProductAccount.find()
    let ExpenceAccounts =  await ExpenceAccount.find()
    let cms = await CM.find()

    const fuelAcc = Object.values(fuelAccounts.reduce((acc, { date, amount }) => {
        acc[date] = acc[date] || { date, total_fuel_amount: 0 };
        acc[date].total_fuel_amount += amount;
        return acc;
    }, {}));

    const productAcc = Object.values(productAccounts.reduce((acc, { date, total_amount }) => {
        acc[date] = acc[date] || { date, total_product_amount: 0 };
        acc[date].total_product_amount += parseFloat(total_amount);
        return acc;
    }, {}));

    const expenceAcc = Object.values(ExpenceAccounts.reduce((acc, { date, expence_amount }) => {
        acc[date] = acc[date] || { date, total_expence_amount: 0 };
        acc[date].total_expence_amount += expence_amount;
        return acc;
    }, {}));

    const cmAcc = cms.map((item) => ({
        date:item.date,
        total_cash_inhand: item.cash_inhand,
        total_cash_bank: item.cash_bank,
        total_cash_other: item.cash_other
    }));

    const addToMergedData = (mergedData, array, keys) => {
        array.forEach(item => {
            const date = item.date;
            if (!mergedData[date]) {
                mergedData[date] = {
                    date,
                    total_fuel_amount: 0,
                    total_product_amount: 0,
                    total_expence_amount: 0,
                    total_cash_inhand: 0,
                    total_cash_bank: 0,
                    total_cash_other: 0
                };
            }
            keys.forEach(key => {
                if (item[key] !== undefined) {
                    mergedData[date][key] = item[key];
                }
            });
        });
    };
    
    // Merging all data into a single object
    const mergedData = {};
    addToMergedData(mergedData, fuelAcc, ['total_fuel_amount']);
    addToMergedData(mergedData, productAcc, ['total_product_amount']);
    addToMergedData(mergedData, expenceAcc, ['total_expence_amount']);
    addToMergedData(mergedData, cmAcc, ['total_cash_inhand', 'total_cash_bank', 'total_cash_other']);
    
    // Converting the merged object back to an array
    const account = Object.values(mergedData);

    res.status(200).json({message:account})

}

module.exports ={getAccounts}