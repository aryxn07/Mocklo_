const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    gender: String,
    country: String,
    city: String
});

module.exports = mongoose.model("User", userSchema);