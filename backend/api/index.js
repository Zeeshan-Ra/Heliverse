import express from "express";
import connectDB from "../db/connect.js";
import User from "../models/user.model.js";
import userRoutes from "../routes/user.routes.js";
import teamRoutes from "../routes/team.routes.js";
import cors from "cors";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(
  cors()
);

https: app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);

const uploadUsers = async () => {
  try {
    await User.deleteMany({});
    const users = await User.create(data);
    console.log("Users uploaded to DB");
  } catch (error) {
    console.log(error);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 8000");
});
