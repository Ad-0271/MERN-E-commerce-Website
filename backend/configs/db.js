const mongoose = require("mongoose");

// require("dotenv").config({ path: "backend/configs/config.env" });

module.exports = () => {
  return mongoose.connect(`${process.env.MONGO_DB_URL}`);
};
