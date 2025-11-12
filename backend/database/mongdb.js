const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://asmitkhanal467_db_user:hello@cluster0.vp0eqem.mongodb.net/?appName=Cluster0"
    );
    console.log("Database Connected Successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
}
module.exports = connectToDB;
