const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());          // <-- Add this
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/healthcare")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api", userRoutes);
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});

const contactRoute=require("./routes/contactRoutes");
app.use(express.json());
app.use("/api", contactRoute);