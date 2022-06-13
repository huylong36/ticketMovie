import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
import users from "./routers/users.js";
import mongoose from "mongoose";
const PORT = process.env.port || 5000;
const url =
  "mongodb+srv://admin:admin@cluster0.mgd65.mongodb.net/?retryWrites=true&w=majority";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use("/user", users);

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connectDB okeee");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};
connectDB();
