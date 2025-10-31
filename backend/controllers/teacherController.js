import Teacher from "../models/Teacher.js";

export const getTeachers = async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
};

export const addTeacher = async (req, res) => {
  const newTeacher = new Teacher(req.body);
  await newTeacher.save();
  res.status(201).json(newTeacher);
};

export const updateTeacher = async (req, res) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(teacher);
};

export const deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: "Teacher deleted" });
};
