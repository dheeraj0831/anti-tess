import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  unitTest: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["approved", "rejected", "default"],
    default: "default",
  },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
