const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.connection_string);
    console.log(
      "Database connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log("This is error : ", err);
    process.exit(1);
  }
};
module.exports = connectDb;
