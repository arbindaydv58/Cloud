import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
  email: String,
}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);
