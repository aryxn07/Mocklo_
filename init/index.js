require("dotenv").config();

const mongoose = require("mongoose");
const allData = require("./data.js");

const User = require("../models/user.js");

// console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    // await User.deleteMany({});      

    await User.insertMany(allData.data);

    console.log("Database Seeded!");

    mongoose.connection.close();

})
.catch(err => console.log(err));