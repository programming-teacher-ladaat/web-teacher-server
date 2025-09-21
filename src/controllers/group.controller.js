import Group from "../models/group.model.js";

export async function createGroup(req, res, next) {
    try {
        const group = await Group.create(req.body);
        res.status(201).json(group);
    } catch (err) {
        next(err);
    }
}

export async function getGroups(req, res, next) {
    try {
        const groups = await Group.find().populate("students").populate("courses");
        res.json(groups);
    } catch (err) {
        next(err);
    }
}

export async function getGroup(req, res, next) {
    try {
        const group = await Group.findById(req.params.id).populate("students").populate("courses");
        if (!group) {
            const err = new Error("Not Found");
            err.status = 404;
            throw err;
        }
        res.json(group);
    } catch (err) {
        next(err);
    }
}

export async function updateGroup(req, res, next) {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!group) {
            const err = new Error("Not Found");
            err.status = 404;
            throw err;
        }
        res.json(group);
    } catch (err) {
        next(err);
    }
}

export async function deleteGroup(req, res, next) {
    try {
        await Group.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}
