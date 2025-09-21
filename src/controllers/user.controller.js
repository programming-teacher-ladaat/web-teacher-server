import User from "../models/user.model.js";

export async function createUser(req, res, next) {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

export async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
}

export async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id).populate("courses");
        if (!user) {
            const err = new Error("Not Found");
            err.status = 404;
            throw err;
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function updateUser(req, res, next) {
    try {
        // If password is being updated, use document.save() so pre-save hooks run
        if (req.body && Object.prototype.hasOwnProperty.call(req.body, "password")) {
            const user = await User.findById(req.params.id);
            if (!user) {
                const err = new Error("Not Found");
                err.status = 404;
                throw err;
            }
            // assign provided fields to the user document
            Object.assign(user, req.body);
            const saved = await user.save();
            return res.json(saved);
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            const err = new Error("Not Found");
            err.status = 404;
            throw err;
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function deleteUser(req, res, next) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}
