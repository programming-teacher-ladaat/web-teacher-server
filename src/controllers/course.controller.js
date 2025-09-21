import Course from "../models/course.model.js";

export async function createCourse(req, res, next) {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        next(err);
    }
}

export async function getCourses(req, res, next) {
    try {
        const courses = await Course.find().populate("group");
        res.json(courses);
    } catch (err) {
        next(err);
    }
}

export async function getCourse(req, res, next) {
    try {
        const course = await Course.findById(req.params.id).populate("group");
        if (!course) {
            const err = new Error("Not Found");
            err.status = 404;
            throw err;
        }
        res.json(course);
    } catch (err) {
        next(err);
    }
}

export async function updateCourse(req, res, next) {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            const err = new Error("Not Found");
            err.status = 404;
            throw err;
        }
        res.json(course);
    } catch (err) {
        next(err);
    }
}

export async function deleteCourse(req, res, next) {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}
