const app = require("./app");

const connectDb = require("./configs/db");

const cloudinary = require("cloudinary");

require("dotenv").config({ path: "backend/configs/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, async () => {
  try {
    await connectDb();
    console.log(`Mongodb: ${process.env.MONGO_DB_URL}`);
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.log(err);
  }
});
