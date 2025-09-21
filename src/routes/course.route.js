import express from 'express';
import { createCourse, getCourses, getCourse, updateCourse, deleteCourse } from '../controllers/course.controller.js';
import validate from '../middleware/validate.middleware.js';
import { courseSchema } from '../validation/course.schema.js';

const router = express.Router();

router.post('/', validate(courseSchema), createCourse);
router.get('/', getCourses);
router.get('/:id', getCourse);
router.put('/:id', validate(courseSchema), updateCourse);
router.delete('/:id', deleteCourse);

export default router;
