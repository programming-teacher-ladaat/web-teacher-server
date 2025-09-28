import express from "express";
import { createCourse, getCourses, getCourse, updateCourse, deleteCourse } from "../controllers/course.controller.js";
import validate from "../middleware/validate.middleware.js";
import { courseSchema } from "../validation/course.schema.js";
import { auth, authAdmin } from "../middleware/auth.middleware.js";
import { cloudinaryUpload } from "../middleware/cloudinary-upload.middleware.js";

const router = express.Router();
// Protect all course routes with auth
router.use(auth);

router.post("/", authAdmin, cloudinaryUpload('files', 10, 'courses_files'), validate(courseSchema), createCourse);
router.get("/", getCourses);
router.get("/:id", getCourse);
router.put("/:id", authAdmin, validate(courseSchema), updateCourse);
router.delete("/:id", authAdmin, deleteCourse);

export default router;
