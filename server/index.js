import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import Problem from "./model/problem.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

  app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username: username,
        password: password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECERT);
        res.json({
            token: token
        })
        return;
    }
  }
  )

app.post("/api/problems", async (req, res) => {
  const { subject, unitTest, description, imageUrl, rollno, section, status } =
    req.body;
  const problem = new Problem({
    subject,
    unitTest,
    description,
    imageUrl,
    rollno,
    section,
    status,
  });
  await problem.save();
  res.json(problem);
});

app.put("/api/approve", async (req, res) => {
  const { imageUrl, approval } = req.body;
  try {
    await Problem.findOneAndUpdate({ imageUrl }, { status: approval });
    res.status(200).json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error in updating the status" });
  }
});

app.get("/api/approve-problems", async (req, res) => {
  const problems = await Problem.find({ status: "default" });
  res.json(problems);
  // res.json({ message: "Approve Problems" });
});

app.get("/api/issues", async (req, res) => {
  const problems = await Problem.find({ status: "approved" });
  res.json(problems);
  // res.json({ message: "Issues" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
