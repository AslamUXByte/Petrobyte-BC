const express = require('express');
const db = require('./models');
const mongoose = require("mongoose");
const cors = require('cors');

const userRouter = require('./routers/userrouter')
const authRouter = require('./routers/authrouter')
const empRouter = require('./routers/employeerouter')

const port = process.env.PORT || 8000;
const MONGO_URL=`mongodb+srv://petro-main-db-06f20494b77:HNz3517CNn3pYv751y2714ASRfqVdw@prod-us-central1-1.lfuy1.mongodb.net/petro-main-db-06f20494b77`
//mongodb+srv://aslamaks:65gb5BaIq8K8rSZC@petrobytescluster.avn0nwi.mongodb.net/?retryWrites=true&w=majority&appName=PetrobytesCluster

const app = express();
app.use(cors());
app.use(express.json())

//MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/employee',empRouter)

// Sync Database PSQL
// db.sequelize.sync()
//   .then(() => {
//     console.log('Database connected and synchronized');
//   })
//   .catch(err => {
//     console.error('Error connecting to the database: ', err);
//   });

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
