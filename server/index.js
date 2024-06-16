import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import Problem from "./model/problem.js";
import User from "./model/user.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import authMiddleware from './middleware.js'
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
app.post("/api/signup",async (req,res)=>{
  // console.log(req);
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({username,password})
  const result = await user.save();
  console.log(result);
  res.json(result);

})
app.post("/api/signin", async (req, res) => {
  
  const username = req.body.username;
  const pass = req.body.password;
  console.log(username,pass);
  const user = await User.findOne({
    username: username,
    password: pass
  });
  console.log(user);
  if (user) {
    const token = sign(
      {
        userId: user.username,
      },
      process.env.JWT_SECERT
    );
    console.log(token)
    res.json({
      token: token,
    });
    return;
  }
});

app.post("/api/problems",async (req, res) => {
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

app.put("/api/approve",  authMiddleware ,async (req, res) => {
  const { imageUrl, approval } = req.body;
  try {
    await Problem.findOneAndUpdate({ imageUrl }, { status: approval });
    res.status(200).json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error in updating the status" });
  }
});

app.get("/api/approve-problems", authMiddleware ,async (req, res) => {
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
