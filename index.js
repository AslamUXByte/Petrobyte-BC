const express = require("express");
// const db = require('./models');
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require('node-cron');

const userRouter = require("./routers/userrouter");
const authRouter = require("./routers/authrouter");
const empRouter = require("./routers/employeerouter");
const fuelAccRouter = require("./routers/fuelaccountrouter");
const productAccRouter = require("./routers/productaccountrouter");
const productRouter = require("./routers/productrouter");
const fuelPriceRouter = require("./routers/fuelpricerouter");
const creditCustomerRouter = require("./routers/creditcustomerrouter");
const creditHistoryRouter = require("./routers/credithostoryrouter");
const dispencerRouter = require("./routers/dispencerrouter");
const subDispencerRouter = require("./routers/subdispencerrouter");
const testRouter = require("./routers/testrouter");
const expenceAccRouter = require("./routers/expenceaccountrouter");
const cmRouter = require("./routers/cashmanagementrouter");
const accountReportRouter = require("./routers/reportrouter");
const { postfuelPriceHistoryByDate } = require("./controllers/fuelpricecontroller");

const port = process.env.PORT || 8000;
// const MONGO_URL=`mongodb+srv://petro-main-db-06f20494b77:HNz3517CNn3pYv751y2714ASRfqVdw@prod-us-central1-1.lfuy1.mongodb.net/petro-main-db-06f20494b77`
const MONGO_URL = `mongodb+srv://aslamaks:65gb5BaIq8K8rSZC@petrobytescluster.avn0nwi.mongodb.net/?retryWrites=true&w=majority&appName=PetrobytesCluster`;

const app = express();
app.use(cors());
app.use(express.json());

// PSQL
// db.sequelize.sync()
//   .then(() => {
//     console.log('Database connected and synchronized');
//   })
//   .catch(err => {
//     console.error('Error connecting to the database: ', err);
//   });

// MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/employee", empRouter);
app.use("/fuelAccounts", fuelAccRouter);
app.use("/productAccounts", productAccRouter);
app.use("/product", productRouter);
app.use("/fuelPrice", fuelPriceRouter);
app.use("/creditcustomer", creditCustomerRouter);
app.use("/creditHistory", creditHistoryRouter);
app.use("/dispencer", dispencerRouter);
app.use("/subdispencer", subDispencerRouter);
app.use("/test", testRouter);
app.use("/expenceaccount", expenceAccRouter);
app.use("/cashManagement", cmRouter);
app.use("/accountReport", accountReportRouter);

cron.schedule('50 23 * * *', postfuelPriceHistoryByDate, {
  timezone: "Asia/Kolkata"
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
