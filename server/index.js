import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import Problem from "./model/problem.js";
import User from "./model/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware.js";
const { sign, verify } = jwt;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI + "/Anti-Tess")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.post("/api/signup", async (req, res) => {
  // console.log(req);
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({ username, password });
  const result = await user.save();
  res.json(result);
});
app.post("/api/signin", async (req, res) => {
  const username = req.body.username;
  const pass = req.body.password;
  console.log(username, pass);
  const user = await User.findOne({
    username: username,
    password: pass,
  });
  if (user) {
    const token = sign(
      {
        userId: user.username,
      },
      process.env.JWT_SECERT
    );
    res.json({
      token: token,
    });
    return;
  }
});

app.post("/api/problems", async (req, res) => {
  try {
    // Extract problem data from the request body
    const problemsData = req.body;
    // Save each problem to the database
    const savedProblems = await Problem.insertMany(problemsData);

    // Respond with the saved problems
    res.status(201).json(savedProblems);
  } catch (error) {
    console.error("Error saving problems:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

app.put("/api/approve", authMiddleware, async (req, res) => {
  const { imageUrl, approval } = req.body;
  try {
    if (approval === "delete") {
      await Problem.findOneAndDelete({ imageUrl });
      res.status(200).json({ message: "Problem deleted successfully" });
    } else {
      await Problem.findOneAndUpdate({ imageUrl }, { status: approval });
      res.status(200).json({ message: "Status updated successfully" });
    }
  } catch (err) {
    res.status(400).json({
      message: "Error in updating the status or deleting the problem",
    });
  }
});

app.get("/api/approve", authMiddleware, async (req, res) => {
  const problems = await Problem.find();
  res.json(problems);
});

app.get("/api/issues", async (req, res) => {
  const problems = await Problem.find({ status: "approved" });
  res.json(problems);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
