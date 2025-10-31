import express from "express";
import { getTeachers, addTeacher, updateTeacher, deleteTeacher } from "../controllers/teacherController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getTeachers);
router.post("/", protect, authorizeRoles("admin"), addTeacher);
router.put("/:id", protect, authorizeRoles("admin"), updateTeacher);
router.delete("/:id", protect, authorizeRoles("admin"), deleteTeacher);

export default router;
