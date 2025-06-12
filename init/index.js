const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

async function main () {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
    await initDB(); // Call initDB after successful connection
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: "681c79e24d80e8035c1b5cc1"}))
    await Listing.insertMany(initData.data).catch(err => {
        console.error("Error inserting data:", err);
    });

    console.log("Data was Initialised");
}

main().catch(err => {
    console.log(err);
});

initDB();

