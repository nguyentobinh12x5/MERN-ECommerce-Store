require("dotenv").config();
const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const app = express();

const port = process.env.PORT;
app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
//Route
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
//Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};
app.listen(port, () => {
  connect();
  console.log(`Server running on port: http://localhost:${port}`);
});
