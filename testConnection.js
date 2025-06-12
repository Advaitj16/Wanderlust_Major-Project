const mongoose = require("mongoose");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

async function testConnection() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        mongoose.connection.close();
    }
}

testConnection();
