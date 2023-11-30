import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";

const app = express();

app.use(express.json());

dotenv.config();

app.use("/auth", router);

app.listen(5000, () => {
  console.log("app listen on port 5000");
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
