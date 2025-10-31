import express from "express";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", protect, authorizeRoles("admin", "teacher"), addStudent);
router.put("/:id", protect, authorizeRoles("admin", "teacher"), updateStudent);
router.delete("/:id", protect, authorizeRoles("admin"), deleteStudent);

export default router;
