const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.port || 5000;
connectDb();
app.use(cors());
app.use(express.json()); // To get error from json data input we have to add this line
app.use("/api/contents", require("./routes/contentRouter"));
app.use("/api/user", require("./routes/userRouter"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`This server is running onport ${port}`);
});
