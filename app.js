require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
app.set("trust proxy", true);


async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

main()
.then(() => {
    console.log("Connected to MongoDB Atlas");
})
.catch(err => console.error(err));

app.set("view engine" ,"ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));

app.use(express.json());

const ejsMate  = require("ejs-mate");
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname , "/public"))); 

app.get("/locations", async(req,res)=>{
  const clientIp = req.ip;
    const request = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.GEO_API_KEY}&ipAddress=${clientIp}`) // &ipAddress=83.44.92.17 (Spain)
    const jsonResponse = await request.json()
    let data={};
    data.lat=jsonResponse.location.lat;
    data.lng=jsonResponse.location.lng;
    data.country=jsonResponse.location.country;
    data.city=jsonResponse.location.city;
        console.log(data.country);                                     

//  IN -> India

const countryMap = {
  IN: "India",
  US: "United States",
  DE: "Germany",
  FR: "France",
  ES: "Spain",
  CN: "China"
};
const response = await User.find({
  country: countryMap[data.country]
});
    console.log(response);
    res.render("locations/index.ejs",{data,response});
})

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
})
