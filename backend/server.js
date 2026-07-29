const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const contactRoute = require("./routes/contactRoutes");
const demoRoute = require("./routes/demoRoutes");
const ambulanceRoute = require("./routes/ambulanceRoutes");
const airplaneRoute=require("./routes/airplaneRoutes");
const vaccinationRoute=require("./routes/vaccinationRoutes");
const labTestRoute = require("./routes/labTestRoutes");
const pharmacyRoute = require("./routes/pharmacyRoutes");
const bookRoute = require("./routes/bookRoutes");
const nearestRoute = require("./routes/nearestRoutes");
const { addNotificationClient, removeNotificationClient } = require("./utils/notifications");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/notifications", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  addNotificationClient(res);
  res.write(`event: connected\ndata: ${JSON.stringify({ message: "Realtime notifications connected" })}\n\n`);

  req.on("close", () => removeNotificationClient(res));
});

mongoose
  .connect("mongodb://127.0.0.1:27017/healthcare")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", userRoutes);
app.use("/api", contactRoute);
app.use("/api", demoRoute);
app.use("/api", ambulanceRoute);
app.use("/api", airplaneRoute);
app.use("/api", vaccinationRoute);
app.use("/api", labTestRoute);
app.use("/api", pharmacyRoute);
app.use("/api", bookRoute);
app.use("/api", nearestRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
