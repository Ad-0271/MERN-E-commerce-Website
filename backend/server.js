const app = require("./app");

const connectDb = require("./configs/db");

require("dotenv").config({ path: "backend/configs/config.env" });

app.listen(process.env.PORT, async () => {
  try {
    await connectDb();
    console.log(`Mongodb: ${process.env.MONGO_DB_URL}`);
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    console.log(err);
  }
});
